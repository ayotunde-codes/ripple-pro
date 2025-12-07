import { Check } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useTheme } from "next-themes"

interface SuccessModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SuccessModal({ open, onOpenChange }: SuccessModalProps) {
  const { theme } = useTheme()
  const isDarkMode = theme === "dark"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`max-w-md ${
          isDarkMode ? "bg-black text-white border-gray-800" : "bg-white text-black border-gray-200"
        }`}
      >
        <div className="flex flex-col items-center justify-center py-8">
          <div className={`rounded-full ${isDarkMode ? "bg-green-900/30" : "bg-green-100"} p-3 mb-4`}>
            <Check className={`h-12 w-12 ${isDarkMode ? "text-green-500" : "text-green-600"}`} />
          </div>
          <DialogTitle className={isDarkMode ? "text-white" : "text-black"}>Submission Successful!</DialogTitle>
          <p className={`text-center ${isDarkMode ? "text-gray-400" : "text-gray-600"} mt-2`}>
            Your challenge submission was successful. Best of luck!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

