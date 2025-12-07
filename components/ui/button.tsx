import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-background-dark dark:focus-visible:ring-ring-dark",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 dark:bg-destructive-dark dark:text-destructive-dark-foreground",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground dark:border-input-dark dark:bg-background-dark dark:hover:bg-accent-dark dark:hover:text-accent-dark-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:bg-secondary-dark dark:text-secondary-dark-foreground",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent-dark dark:hover:text-accent-dark-foreground",
        link: "text-primary underline-offset-4 hover:underline dark:text-primary",
        "fund-wallet":
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground dark:border-[#FAFAFA] dark:bg-black dark:text-[#FAFAFA] dark:hover:bg-black/80",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-full px-3",
        lg: "h-11 rounded-full px-8",
        icon: "h-10 w-10",
        "mobile-safe": "h-11 rounded-full px-8 md:mb-0 mb-20", // Added bottom margin on mobile
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
