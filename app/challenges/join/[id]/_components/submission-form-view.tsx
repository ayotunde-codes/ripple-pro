import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTheme } from "next-themes"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { Challenge } from "./challenge-data"
import { submissionSchema, type SubmissionFormData, getInitialSubmissionData } from "./submission-schema"

interface SubmissionFormViewProps {
  challenge: Challenge
  onClose: () => void
  onSubmit: (data: SubmissionFormData) => Promise<void>
}

export function SubmissionFormView({ challenge, onClose, onSubmit }: SubmissionFormViewProps) {
  const { theme } = useTheme()
  const isDarkMode = theme === "dark"

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SubmissionFormData>({
    resolver: zodResolver(submissionSchema),
    defaultValues: getInitialSubmissionData(challenge.platforms),
  })

  return (
    <div className="container mx-auto max-w-md px-4">
      <div
        className={`${isDarkMode ? "bg-black text-white" : "bg-[#FDF4FF] text-[#1F1F1F]"} rounded-xl p-6 relative mb-20`}
      >
        {/* Close button */}
        <button onClick={onClose} className={`absolute top-6 right-6 ${isDarkMode ? "text-white" : "text-black"}`}>
          <X size={20} />
        </button>

        {/* Title */}
        <h1 className="text-xl font-semibold mb-2">{challenge.title}</h1>

        {/* Subtitle */}
        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-6`}>Submit your content links</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {challenge.platforms.map((platform) => (
            <div key={platform} className="space-y-2">
              <label className={`text-sm font-medium capitalize ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                {platform} link
              </label>
              <Input
                placeholder={`Enter your ${platform} content link`}
                className={`rounded-lg ${
                  isDarkMode ? "border-gray-800 bg-gray-900 text-white" : "border-gray-200 bg-white text-black"
                } py-5`}
                {...register(platform as keyof SubmissionFormData)}
              />
              {errors[platform as keyof SubmissionFormData] && (
                <p className="text-sm text-red-600 mt-1">
                  {errors[platform as keyof SubmissionFormData]?.message}
                </p>
              )}
            </div>
          ))}

          <Button
            type="submit"
            className="w-full bg-[#B125F9] hover:bg-[#B125F9]/90 text-white rounded-full py-6 mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit links"}
          </Button>
        </form>
      </div>
    </div>
  )
}
