"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "@/components/ui/use-toast"
import { useCurrentUser } from "@/services/auth"
import { useUploadDocuments, useSubmitKYC } from "@/services/profile"
import { Upload, CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react"

export default function KYCPage() {
  const router = useRouter()
  const { data: currentUser } = useCurrentUser()
  
  const uploadDocuments = useUploadDocuments()
  const submitKYC = useSubmitKYC()

  const [nin, setNin] = useState("")
  const [idFile, setIdFile] = useState<File | null>(null)
  const [addressFile, setAddressFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const kycStatus = currentUser?.kyc_status
  const rejectionReason = currentUser?.rejection_reason

  // Status badge renderer
  const renderStatusBadge = () => {
    switch (kycStatus) {
      case "approved":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle className="mr-1 h-3 w-3" />
            Approved
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">
            <Clock className="mr-1 h-3 w-3" />
            Pending Review
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="destructive">
            <XCircle className="mr-1 h-3 w-3" />
            Rejected
          </Badge>
        )
      default:
        return (
          <Badge variant="outline">
            <AlertCircle className="mr-1 h-3 w-3" />
            Not Submitted
          </Badge>
        )
    }
  }

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: (file: File | null) => void
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Maximum file size is 2MB",
          variant: "destructive",
        })
        return
      }
      // Check file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"]
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Only JPEG, PNG, and PDF files are allowed",
          variant: "destructive",
        })
        return
      }
      setFile(file)
    }
  }

  const handleUploadDocuments = async () => {
    if (!nin || !idFile || !addressFile) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields and upload both documents",
        variant: "destructive",
      })
      return
    }

    if (nin.length !== 11) {
      toast({
        title: "Invalid NIN",
        description: "NIN must be 11 characters",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    uploadDocuments.mutate(
      {
        nin,
        id_file: idFile,
        address_file: addressFile,
      },
      {
        onSuccess: () => {
          toast({
            title: "Documents uploaded",
            description: "Your documents have been uploaded successfully. Submitting for review...",
          })
          // Auto-submit KYC after successful upload
          handleSubmitKYC()
        },
        onError: (error: any) => {
          setIsUploading(false)
          toast({
            title: "Upload failed",
            description: error?.response?.data?.message || "Failed to upload documents",
            variant: "destructive",
          })
        },
      }
    )
  }

  const handleSubmitKYC = () => {
    submitKYC.mutate(undefined, {
      onSuccess: () => {
        setIsUploading(false)
        toast({
          title: "KYC submitted",
          description: "Your KYC has been submitted for approval. You will be notified once reviewed.",
        })
        // Clear form
        setNin("")
        setIdFile(null)
        setAddressFile(null)
      },
      onError: (error: any) => {
        setIsUploading(false)
        toast({
          title: "Submission failed",
          description: error?.response?.data?.message || "Failed to submit KYC",
          variant: "destructive",
        })
      },
    })
  }

  const isApproved = kycStatus === "approved"
  const isPending = kycStatus === "pending"
  const isFormDisabled = isApproved || isPending || isUploading

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <Card className="border-gray-200 shadow-sm rounded-xl dark:bg-[#0E0E0E] dark:border-border-dark">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="dark:text-foreground-dark">KYC Verification</CardTitle>
              <CardDescription>
                Upload your documents for identity verification
              </CardDescription>
            </div>
            {renderStatusBadge()}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Rejection Alert */}
          {kycStatus === "rejected" && rejectionReason && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Rejection Reason:</strong> {rejectionReason}
              </AlertDescription>
            </Alert>
          )}

          {/* Approved Message */}
          {isApproved && (
            <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-600 dark:text-green-400">
                Your KYC has been approved. You're all set!
              </AlertDescription>
            </Alert>
          )}

          {/* Pending Message */}
          {isPending && (
            <Alert className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
              <Clock className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-600 dark:text-yellow-400">
                Your KYC is under review. We'll notify you once it's processed.
              </AlertDescription>
            </Alert>
          )}

          {/* File Requirements */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Requirements:</strong> Maximum file size: 2MB. Allowed formats: JPEG, PNG, PDF.
            </AlertDescription>
          </Alert>

          {/* NIN Input */}
          <div className="space-y-2">
            <Label htmlFor="nin" className="text-gray-700 dark:text-[#A9A9A9]">
              National Identification Number (NIN) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="nin"
              value={nin}
              onChange={(e) => setNin(e.target.value)}
              placeholder="Enter your 11-digit NIN"
              maxLength={11}
              disabled={isFormDisabled}
              className="rounded-lg border-gray-200 bg-gray-50 dark:bg-[#0E0E0E] dark:text-white dark:border-gray-700"
            />
          </div>

          {/* ID File Upload */}
          <div className="space-y-2">
            <Label htmlFor="id-file" className="text-gray-700 dark:text-[#A9A9A9]">
              ID Document (Passport/Driver's License/National ID) <span className="text-red-500">*</span>
            </Label>
            <div className="flex items-center gap-4">
              <Input
                id="id-file"
                type="file"
                onChange={(e) => handleFileChange(e, setIdFile)}
                accept=".jpg,.jpeg,.png,.pdf"
                disabled={isFormDisabled}
                className="rounded-lg border-gray-200 bg-gray-50 dark:bg-[#0E0E0E] dark:text-white dark:border-gray-700"
              />
              {idFile && (
                <Badge variant="outline" className="whitespace-nowrap">
                  <Upload className="mr-1 h-3 w-3" />
                  {idFile.name}
                </Badge>
              )}
            </div>
          </div>

          {/* Address File Upload */}
          <div className="space-y-2">
            <Label htmlFor="address-file" className="text-gray-700 dark:text-[#A9A9A9]">
              Proof of Address (Utility Bill/Bank Statement) <span className="text-red-500">*</span>
            </Label>
            <div className="flex items-center gap-4">
              <Input
                id="address-file"
                type="file"
                onChange={(e) => handleFileChange(e, setAddressFile)}
                accept=".jpg,.jpeg,.png,.pdf"
                disabled={isFormDisabled}
                className="rounded-lg border-gray-200 bg-gray-50 dark:bg-[#0E0E0E] dark:text-white dark:border-gray-700"
              />
              {addressFile && (
                <Badge variant="outline" className="whitespace-nowrap">
                  <Upload className="mr-1 h-3 w-3" />
                  {addressFile.name}
                </Badge>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <Button
              variant="outline"
              onClick={() => router.push("/profile/information")}
              className="rounded-full"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUploadDocuments}
              disabled={isFormDisabled}
              className="bg-gradient-to-r from-[#E43EFC] to-[#B125F9] hover:from-[#E43EFC]/90 hover:to-[#B125F9]/90 text-white rounded-full"
            >
              {isUploading
                ? "Uploading..."
                : isPending
                ? "Already Submitted"
                : isApproved
                ? "Approved"
                : "Upload & Submit"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

