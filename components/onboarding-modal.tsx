"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Loader2, Save } from "lucide-react"

// Create a simplified countries list instead of importing the package
const countries = [
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "NG", name: "Nigeria" },
  { code: "GH", name: "Ghana" },
  { code: "ZA", name: "South Africa" },
  { code: "KE", name: "Kenya" },
  { code: "IN", name: "India" },
  { code: "CN", name: "China" },
  { code: "JP", name: "Japan" },
  { code: "BR", name: "Brazil" },
  { code: "MX", name: "Mexico" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "IT", name: "Italy" },
  { code: "ES", name: "Spain" },
  { code: "NL", name: "Netherlands" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "SA", name: "Saudi Arabia" },
]

// Nigerian banks list
const nigerianBanks = [
  { code: "044", name: "Access Bank" },
  { code: "023", name: "Citibank Nigeria" },
  { code: "063", name: "Diamond Bank" },
  { code: "050", name: "Ecobank Nigeria" },
  { code: "070", name: "Fidelity Bank" },
  { code: "011", name: "First Bank of Nigeria" },
  { code: "214", name: "First City Monument Bank" },
  { code: "058", name: "Guaranty Trust Bank" },
  { code: "030", name: "Heritage Bank" },
  { code: "301", name: "Jaiz Bank" },
  { code: "082", name: "Keystone Bank" },
  { code: "526", name: "Parallex Bank" },
  { code: "076", name: "Polaris Bank" },
  { code: "101", name: "Providus Bank" },
  { code: "221", name: "Stanbic IBTC Bank" },
  { code: "068", name: "Standard Chartered Bank" },
  { code: "232", name: "Sterling Bank" },
  { code: "100", name: "Suntrust Bank" },
  { code: "032", name: "Union Bank of Nigeria" },
  { code: "033", name: "United Bank For Africa" },
  { code: "215", name: "Unity Bank" },
  { code: "035", name: "Wema Bank" },
  { code: "057", name: "Zenith Bank" },
]

const steps = ["Personal Info", "Social Media", "Settlement Account", "KYC Verification", "Complete"]

export function OnboardingModal({ initialStep = 0, onComplete }) {
  const [step, setStep] = useState(initialStep)
  const [personalInfo, setPersonalInfo] = useState({
    country: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    phoneCountryCode: "+234", // Default to Nigeria
    phoneNumber: "",
  })
  const [socialMedia, setSocialMedia] = useState({ instagram: "", facebook: "", twitter: "", tiktok: "", youtube: "" })
  const [settlementAccount, setSettlementAccount] = useState({
    bvn: "",
    bankCode: "",
    accountNumber: "",
    accountName: "",
    bvnVerified: false,
    bvnVerifying: false,
    bvnError: "",
    accountVerifying: false,
  })
  const [kybInfo, setKybInfo] = useState({ nin: "", idFile: null, addressFile: null })

  const countryList = countries

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)

      // Save progress to localStorage
      if (step === 2) {
        localStorage.setItem("hasSettlementAccount", "true")
      } else if (step === 3) {
        localStorage.setItem("hasCompletedKYB", "true")
      }
    } else {
      // Save completion status to localStorage
      localStorage.setItem("hasCompletedOnboarding", "true")
      if (onComplete) onComplete()
    }
  }

  const saveProgress = () => {
    // Save current progress based on the step
    localStorage.setItem("onboardingStep", step.toString())

    // Save personal info if on that step or completed
    if (step >= 0 && (personalInfo.firstName || personalInfo.lastName || personalInfo.country)) {
      localStorage.setItem("personalInfo", JSON.stringify(personalInfo))
    }

    // Save social media info if on that step or completed
    if (step >= 1 && Object.values(socialMedia).some((val) => val !== "")) {
      localStorage.setItem("socialMedia", JSON.stringify(socialMedia))
    }

    // Save settlement account info if on that step or completed
    if (step >= 2 && (settlementAccount.bvn || settlementAccount.bankCode)) {
      localStorage.setItem("settlementAccount", JSON.stringify(settlementAccount))
    }

    // Save KYB info if on that step
    if (step >= 3 && kybInfo.nin) {
      localStorage.setItem(
        "kybInfo",
        JSON.stringify({
          nin: kybInfo.nin,
          hasFiles: !!(kybInfo.idFile || kybInfo.addressFile),
        }),
      )
    }

    // Close the modal and return to dashboard
    if (onComplete) onComplete()
  }

  const verifyBVN = () => {
    setSettlementAccount({
      ...settlementAccount,
      bvnVerifying: true,
      bvnVerified: false,
      bvnError: "",
    })

    // Simulate BVN verification
    setTimeout(() => {
      // For demo purposes, accept "12345678901" as a valid BVN
      const isValid = settlementAccount.bvn === "12345678901"

      setSettlementAccount({
        ...settlementAccount,
        bvnVerifying: false,
        bvnVerified: isValid,
        bvnError: isValid ? "" : "BVN does not match user details",
      })
    }, 2000)
  }

  const verifyAccountNumber = () => {
    if (
      !settlementAccount.bankCode ||
      !settlementAccount.accountNumber ||
      settlementAccount.accountNumber.length !== 10
    ) {
      return
    }

    setSettlementAccount({
      ...settlementAccount,
      accountVerifying: true,
      accountName: "",
    })

    // Simulate account verification
    setTimeout(() => {
      const fakeName = "JOHN DOE SMITH"
      setSettlementAccount({
        ...settlementAccount,
        accountVerifying: false,
        accountName: fakeName,
      })
    }, 1500)
  }

  useEffect(() => {
    if (
      settlementAccount.bankCode &&
      settlementAccount.accountNumber &&
      settlementAccount.accountNumber.length === 10
    ) {
      verifyAccountNumber()
    }
  }, [settlementAccount.bankCode, settlementAccount.accountNumber])

  // Load saved progress on initial render
  useEffect(() => {
    const savedStep = localStorage.getItem("onboardingStep")
    if (savedStep && initialStep === 0) {
      setStep(Number.parseInt(savedStep, 10))
    }

    const savedPersonalInfo = localStorage.getItem("personalInfo")
    if (savedPersonalInfo) {
      try {
        setPersonalInfo(JSON.parse(savedPersonalInfo))
      } catch (e) {
        console.error("Error parsing saved personal info", e)
      }
    }

    const savedSocialMedia = localStorage.getItem("socialMedia")
    if (savedSocialMedia) {
      try {
        setSocialMedia(JSON.parse(savedSocialMedia))
      } catch (e) {
        console.error("Error parsing saved social media", e)
      }
    }

    const savedSettlementAccount = localStorage.getItem("settlementAccount")
    if (savedSettlementAccount) {
      try {
        setSettlementAccount(JSON.parse(savedSettlementAccount))
      } catch (e) {
        console.error("Error parsing saved settlement account", e)
      }
    }

    const savedKybInfo = localStorage.getItem("kybInfo")
    if (savedKybInfo) {
      try {
        const parsed = JSON.parse(savedKybInfo)
        setKybInfo({
          ...kybInfo,
          nin: parsed.nin,
        })
      } catch (e) {
        console.error("Error parsing saved KYB info", e)
      }
    }
  }, [initialStep])

  const isPersonalInfoComplete = () => {
    return (
      personalInfo.country &&
      personalInfo.firstName &&
      personalInfo.lastName &&
      personalInfo.dateOfBirth &&
      personalInfo.phoneCountryCode &&
      personalInfo.phoneNumber
    )
  }

  const isSocialMediaComplete = () => {
    return Object.values(socialMedia).some((value) => value !== "")
  }

  const isSettlementAccountComplete = () => {
    return (
      settlementAccount.bvnVerified &&
      settlementAccount.bankCode &&
      settlementAccount.accountNumber &&
      settlementAccount.accountName
    )
  }

  const handleClose = () => {
    if (onComplete) onComplete()
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Please enter your personal information exactly as it appears on your government-issued ID. Ensure all
              details are correct before proceeding.
            </p>
            <Select
              value={personalInfo.country}
              onValueChange={(value) => setPersonalInfo({ ...personalInfo, country: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                {countryList.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="First Name"
              value={personalInfo.firstName}
              onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })}
              required
            />
            <Input
              placeholder="Middle Name (if applicable)"
              value={personalInfo.middleName}
              onChange={(e) => setPersonalInfo({ ...personalInfo, middleName: e.target.value })}
            />
            <Input
              placeholder="Last Name"
              value={personalInfo.lastName}
              onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })}
              required
            />
            <Input
              type="date"
              placeholder="Date of Birth"
              value={personalInfo.dateOfBirth}
              onChange={(e) => setPersonalInfo({ ...personalInfo, dateOfBirth: e.target.value })}
              required
            />

            <div className="flex space-x-2">
              <Select
                value={personalInfo.phoneCountryCode}
                onValueChange={(value) => setPersonalInfo({ ...personalInfo, phoneCountryCode: value })}
                className="w-[120px] flex-shrink-0"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Code" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+234">+234 (NG)</SelectItem>
                  <SelectItem value="+1">+1 (US)</SelectItem>
                  <SelectItem value="+44">+44 (UK)</SelectItem>
                  <SelectItem value="+233">+233 (GH)</SelectItem>
                  <SelectItem value="+27">+27 (ZA)</SelectItem>
                  <SelectItem value="+254">+254 (KE)</SelectItem>
                  <SelectItem value="+91">+91 (IN)</SelectItem>
                  <SelectItem value="+86">+86 (CN)</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Phone Number"
                value={personalInfo.phoneNumber}
                onChange={(e) =>
                  setPersonalInfo({
                    ...personalInfo,
                    phoneNumber: e.target.value.replace(/\D/g, ""),
                  })
                }
                type="tel"
                className="flex-grow"
                required
              />
            </div>

            <div className="flex justify-end mt-4">
              <Button onClick={saveProgress} variant="outline" className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save progress and do this later
              </Button>
            </div>
          </div>
        )
      case 1:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Please enter at least one social media link to proceed.
            </p>
            <Input
              placeholder="Instagram"
              value={socialMedia.instagram}
              onChange={(e) => setSocialMedia({ ...socialMedia, instagram: e.target.value })}
            />
            <Input
              placeholder="Facebook"
              value={socialMedia.facebook}
              onChange={(e) => setSocialMedia({ ...socialMedia, facebook: e.target.value })}
            />
            <Input
              placeholder="X (Twitter)"
              value={socialMedia.twitter}
              onChange={(e) => setSocialMedia({ ...socialMedia, twitter: e.target.value })}
            />
            <Input
              placeholder="TikTok"
              value={socialMedia.tiktok}
              onChange={(e) => setSocialMedia({ ...socialMedia, tiktok: e.target.value })}
            />
            <Input
              placeholder="YouTube"
              value={socialMedia.youtube}
              onChange={(e) => setSocialMedia({ ...socialMedia, youtube: e.target.value })}
            />
            <div className="flex justify-end mt-4">
              <Button onClick={saveProgress} variant="outline" className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save progress and do this later
              </Button>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Set up your settlement account to receive payments. This is where your earnings will be sent.
            </p>
            <div className="relative">
              <div className="flex gap-2 items-center">
                <Input
                  placeholder="BVN"
                  value={settlementAccount.bvn}
                  onChange={(e) => setSettlementAccount({ ...settlementAccount, bvn: e.target.value })}
                  maxLength={11}
                  className={`${settlementAccount.bvnError ? "border-red-500" : ""}`}
                  disabled={settlementAccount.bvnVerified}
                />
                {!settlementAccount.bvnVerified && (
                  <Button
                    onClick={verifyBVN}
                    disabled={settlementAccount.bvnVerifying || settlementAccount.bvn.length !== 11}
                    className="whitespace-nowrap"
                  >
                    {settlementAccount.bvnVerifying ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    Verify BVN
                  </Button>
                )}
                {settlementAccount.bvnVerifying && <Loader2 className="h-4 w-4 animate-spin absolute right-2 top-3" />}
                {settlementAccount.bvnError && !settlementAccount.bvnVerifying && (
                  <X className="h-5 w-5 text-red-500 absolute right-2 top-3" />
                )}
              </div>
              {settlementAccount.bvnError && <p className="text-red-500 text-sm mt-1">{settlementAccount.bvnError}</p>}
            </div>

            <Select
              value={settlementAccount.bankCode}
              onValueChange={(value) => setSettlementAccount({ ...settlementAccount, bankCode: value })}
              disabled={!settlementAccount.bvnVerified}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Bank" />
              </SelectTrigger>
              <SelectContent>
                {nigerianBanks.map((bank) => (
                  <SelectItem key={bank.code} value={bank.code}>
                    {bank.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              placeholder="Account Number"
              value={settlementAccount.accountNumber}
              onChange={(e) =>
                setSettlementAccount({
                  ...settlementAccount,
                  accountNumber: e.target.value.replace(/\D/g, "").slice(0, 10),
                })
              }
              maxLength={10}
              disabled={!settlementAccount.bvnVerified}
            />

            <div className="relative">
              <Input
                placeholder="Account Name"
                value={settlementAccount.accountName}
                readOnly
                disabled
                className="bg-gray-50"
              />
              {settlementAccount.accountVerifying && (
                <Loader2 className="h-4 w-4 animate-spin absolute right-2 top-3" />
              )}
            </div>

            <div className="flex justify-end mt-4">
              <Button onClick={saveProgress} variant="outline" className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save progress and do this later
              </Button>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Maximum file size: 2MB. Allowed file types: JPEG, PNG, PDF.
            </p>
            <div className="space-y-2">
              <label className="text-sm font-medium">National Identification Number (NIN)</label>
              <Input
                placeholder="Enter your NIN"
                value={kybInfo.nin || ""}
                onChange={(e) => setKybInfo({ ...kybInfo, nin: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Upload ID Document</label>
              <Input
                type="file"
                onChange={(e) => setKybInfo({ ...kybInfo, idFile: e.target.files ? e.target.files[0] : null })}
                accept=".jpg,.jpeg,.png,.pdf"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Upload Proof of Address</label>
              <Input
                type="file"
                onChange={(e) => setKybInfo({ ...kybInfo, addressFile: e.target.files ? e.target.files[0] : null })}
                accept=".jpg,.jpeg,.png,.pdf"
              />
            </div>
            <div className="flex justify-end mt-4">
              <Button onClick={saveProgress} variant="outline" className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save progress and do this later
              </Button>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">You have successfully set up your account</h3>
            <Button
              onClick={() => window.location.reload()}
              className="bg-dashboard-purple hover:bg-dashboard-purple/90"
            >
              Go to Dashboard
            </Button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-[400px] relative">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-full p-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 opacity-90 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-10"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <CardHeader className="flex justify-between items-start">
          <div>
            <CardTitle>{steps[step]}</CardTitle>
            <CardDescription>
              Step {step + 1} of {steps.length}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {renderStep()}
          {step < steps.length - 1 && (
            <Button
              onClick={handleNext}
              className="mt-4 w-full bg-dashboard-purple hover:bg-dashboard-purple/90"
              disabled={
                (step === 0 && !isPersonalInfoComplete()) ||
                (step === 1 && !isSocialMediaComplete()) ||
                (step === 2 && !isSettlementAccountComplete() && !settlementAccount.bvnVerified)
              }
            >
              {step === 3 ? "Complete" : "Next"}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
