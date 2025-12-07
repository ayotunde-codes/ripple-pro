"use client"

import * as React from "react"
import { Check } from "lucide-react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

interface Platform {
  id: string
  name: string
  icon: React.ReactNode
}

interface MultiSelectDropdownProps {
  platforms: Platform[]
  selected: string[]
  onChange: (selected: string[]) => void
  error?: boolean
}

export function MultiSelectDropdown({ platforms, selected, onChange, error }: MultiSelectDropdownProps) {
  const [open, setOpen] = React.useState(false)

  const selectAll = () => {
    onChange(platforms.map((platform) => platform.id))
  }

  const clearAll = () => {
    onChange([])
  }

  const toggle = (platformId: string) => {
    if (selected.includes(platformId)) {
      onChange(selected.filter((id) => id !== platformId))
    } else {
      onChange([...selected, platformId])
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between",
            error ? "border-red-500" : "",
            !selected.length && "text-muted-foreground",
          )}
        >
          {selected.length === 0
            ? "Select platforms"
            : `${selected.length} platform${selected.length === 1 ? "" : "s"} selected`}
          <span className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search platforms..." />
          <CommandList>
            <CommandEmpty>No platforms found.</CommandEmpty>
            <CommandGroup>
              <div className="flex items-center justify-between p-2 border-b">
                <Button variant="ghost" size="sm" onClick={selectAll} className="text-xs">
                  Select All
                </Button>
                <Button variant="ghost" size="sm" onClick={clearAll} className="text-xs">
                  Clear All
                </Button>
              </div>
              {platforms.map((platform) => (
                <CommandItem key={platform.id} onSelect={() => toggle(platform.id)} className="flex items-center gap-2">
                  <div className="flex items-center gap-2 flex-1">
                    {platform.icon}
                    {platform.name}
                  </div>
                  <CheckboxPrimitive.Root
                    checked={selected.includes(platform.id)}
                    className={cn(
                      "h-4 w-4 border rounded flex items-center justify-center",
                      selected.includes(platform.id) ? "bg-primary border-primary" : "border-input",
                    )}
                  >
                    <CheckboxPrimitive.Indicator>
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </CheckboxPrimitive.Indicator>
                  </CheckboxPrimitive.Root>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
