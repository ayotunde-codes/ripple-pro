"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { useMobile } from "@/hooks/use-mobile"

export default function ChangePasswordPage() {
  const router = useRouter()
  const isMobile = useMobile()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const validateForm = () => {
    let isValid = true
    const newErrors = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required"
      isValid = false
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required"
      isValid = false
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters"
      isValid = false
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password"
      isValid = false
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setIsLoading(true)

      // Simulate API call
      setTimeout(() => {
        setIsLoading(false)
        toast({
          title: "Password updated",
          description: "Your password has been updated successfully.",
        })
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        })
      }, 1500)
    }
  }

  const handleCancel = () => {
    router.push("/dashboard")
  }

  // Mobile view for change password
  const MobileChangePasswordView = () => (
    <div className="space-y-6 pb-20">
      <div>
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword-mobile" className="text-gray-700">
              Current Password
            </Label>
            <Input
              id="currentPassword-mobile"
              name="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={handleInputChange}
              placeholder="Enter current password"
              className="rounded-full border-gray-200 h-14 px-5"
            />
            {errors.currentPassword && <p className="text-red-500 text-sm">{errors.currentPassword}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword-mobile" className="text-gray-700">
              New Password
            </Label>
            <Input
              id="newPassword-mobile"
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleInputChange}
              placeholder="Enter new password"
              className="rounded-full border-gray-200 h-14 px-5"
            />
            {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword-mobile" className="text-gray-700">
              Confirm New Password
            </Label>
            <Input
              id="confirmPassword-mobile"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm new password"
              className="rounded-full border-gray-200 h-14 px-5"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>
        </form>
      </div>

      <div className="fixed bottom-16 left-0 right-0 p-4 bg-white border-t border-gray-100 flex flex-col gap-2">
        <Button
          className="w-full bg-gradient-to-r from-[#E43EFC] to-[#B125F9] text-white rounded-full py-6"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Password"}
        </Button>
        <Button variant="outline" className="w-full rounded-full py-6 border-gray-200" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </div>
  )

  // Desktop view for change password
  const DesktopChangePasswordView = () => (
    <Card className="border-gray-200 shadow-sm rounded-xl">
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>Update your password to keep your account secure.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              name="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={handleInputChange}
              className="rounded-lg border-gray-200"
            />
            {errors.currentPassword && <p className="text-red-500 text-sm">{errors.currentPassword}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleInputChange}
              className="rounded-lg border-gray-200"
            />
            {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="rounded-lg border-gray-200"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              variant="outline"
              onClick={() => router.push("/profile/information")}
              className="rounded-lg border-gray-200"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-[#E43EFC] to-[#B125F9] hover:opacity-90 text-white rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )

  return isMobile ? <MobileChangePasswordView /> : <DesktopChangePasswordView />
}
