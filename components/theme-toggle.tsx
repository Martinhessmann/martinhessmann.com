"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useThemeStore } from "@/lib/store/theme-store"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useThemeStore()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="w-6 h-6 rounded-full flex items-center justify-center bg-transparent hover:bg-white/10 transition-colors"
          aria-label="Toggle theme"
        >
          {/* Show the icon based on current theme (system shows monitor) */}
          <Sun className={`h-4 w-4 absolute text-white transition-all ${resolvedTheme === 'light' && theme !== 'system' ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
          <Moon className={`h-4 w-4 absolute text-white transition-all ${resolvedTheme === 'dark' && theme !== 'system' ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
          <Monitor className={`h-4 w-4 absolute text-white transition-all ${theme === 'system' ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[160px] bg-popover backdrop-blur-2xl border-[0.5px] border-border rounded-xl shadow-[0_10px_38px_-10px_rgba(0,0,0,0.35),0_10px_20px_-15px_rgba(0,0,0,0.2)] mt-1 pt-1 pb-1 px-0 text-[13px]"
        sideOffset={6}
      >
        <DropdownMenuItem
          className={`cursor-default text-popover-foreground ${theme === 'light' ? 'bg-primary text-primary-foreground' : 'hover:bg-primary hover:text-primary-foreground'} focus:bg-primary focus:text-primary-foreground rounded-[4px] mx-1 my-0.5 py-[6px] px-3 font-normal`}
          onClick={() => setTheme('light')}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`cursor-default text-popover-foreground ${theme === 'dark' ? 'bg-primary text-primary-foreground' : 'hover:bg-primary hover:text-primary-foreground'} focus:bg-primary focus:text-primary-foreground rounded-[4px] mx-1 my-0.5 py-[6px] px-3 font-normal`}
          onClick={() => setTheme('dark')}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`cursor-default text-popover-foreground ${theme === 'system' ? 'bg-primary text-primary-foreground' : 'hover:bg-primary hover:text-primary-foreground'} focus:bg-primary focus:text-primary-foreground rounded-[4px] mx-1 my-0.5 py-[6px] px-3 font-normal`}
          onClick={() => setTheme('system')}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}