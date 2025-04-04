'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu'
import { useWindowStore } from '@/lib/store/window-store'
import { AboutMartin } from '@/components/windows/about-martin'
import { ProjectInfo } from '@/components/windows/project-info'
import { ChevronRight } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { ThemeFavicon } from '@/components/theme-favicon'
import { useThemeStore } from '@/lib/store/theme-store'

export function Header() {
  const { addWindow, focusWindow } = useWindowStore()
  const { resolvedTheme } = useThemeStore()
  const [currentTime, setCurrentTime] = useState('')

  // Theme-based favicon source
  const faviconSrc = resolvedTheme === 'light'
    ? '/favicons/favicon.svg'
    : '/favicons/favicon-white.svg'

  // Update time every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, '0')
      const mins = now.getMinutes().toString().padStart(2, '0')
      setCurrentTime(`${hours}:${mins}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [])

  // Function to open About Martin window
  const openAboutMartin = () => {
    const windowId = 'about-martin'
    addWindow({
      id: windowId,
      title: 'About Martin Heßmann',
      icon: faviconSrc,
      component: <AboutMartin />,
      position: { x: 200, y: 100 },
      size: { width: 700, height: 500 }
    })
    focusWindow(windowId)
  }

  // Function to open Project Info window
  const openProjectInfo = () => {
    const windowId = 'project-info'
    addWindow({
      id: windowId,
      title: 'About This Project',
      icon: faviconSrc,
      component: <ProjectInfo />,
      position: { x: 250, y: 150 },
      size: { width: 700, height: 500 }
    })
    focusWindow(windowId)
  }

  // Function to open System Settings window
  const openSystemSettings = () => {
    const windowId = 'system-settings'
    addWindow({
      id: windowId,
      title: 'System Settings',
      icon: faviconSrc,
      component: <div className="p-6 flex flex-col items-center justify-center h-full">
        <h2 className="text-xl font-medium mb-4">System Settings</h2>
        <p className="text-center text-gray-400">System preferences would appear here.</p>
      </div>,
      position: { x: 300, y: 100 },
      size: { width: 700, height: 500 }
    })
    focusWindow(windowId)
  }

  // Function to open App Store window
  const openAppStore = () => {
    const windowId = 'app-store'
    addWindow({
      id: windowId,
      title: 'App Store',
      icon: faviconSrc,
      component: <div className="p-6 flex flex-col items-center justify-center h-full">
        <h2 className="text-xl font-medium mb-4">App Store</h2>
        <p className="text-center text-gray-400">App Store content would appear here.</p>
      </div>,
      position: { x: 350, y: 150 },
      size: { width: 800, height: 600 }
    })
    focusWindow(windowId)
  }

  return (
    <div className="absolute top-0 left-0 right-0 w-full bg-black/20 backdrop-blur-md text-white h-[24px] flex items-center z-50 p-4">
      {/* Apple/MH Logo dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center justify-center h-full w-[26px] cursor-pointer hover:bg-secondary/30">
            <ThemeFavicon size={14} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[220px] bg-popover backdrop-blur-2xl border-[0.5px] border-border rounded-xl shadow-[0_10px_38px_-10px_rgba(0,0,0,0.35),0_10px_20px_-15px_rgba(0,0,0,0.2)] mt-1 pt-1 pb-1 px-0 text-[13px]"
          sideOffset={6}
        >
          <DropdownMenuItem
            className="cursor-default text-popover-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-[4px] mx-1 my-0.5 py-[6px] px-3 font-normal"
            onClick={openAboutMartin}
          >
            About Martin Heßmann
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-default text-popover-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-[4px] mx-1 my-0.5 py-[6px] px-3 font-normal"
            onClick={openProjectInfo}
          >
            About This Project
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-border my-1 mx-0" />

          <DropdownMenuItem
            className="cursor-default text-popover-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-[4px] mx-1 my-0.5 py-[6px] px-3 font-normal"
            onClick={openSystemSettings}
          >
            System Settings...
            <DropdownMenuShortcut className="text-muted-foreground text-[11px]">⌘,</DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-default text-popover-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-[4px] mx-1 my-0.5 py-[6px] px-3 font-normal"
            onClick={openAppStore}
          >
            App Store
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-border my-1 mx-0" />

          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="cursor-default text-popover-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-[4px] mx-1 my-0.5 py-[6px] px-3 font-normal w-full">
              Recent Items
              <span className="ml-auto">
                <ChevronRight className="h-3 w-3 text-muted-foreground" />
              </span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent
              className="w-[220px] bg-popover backdrop-blur-2xl border-[0.5px] border-border rounded-xl shadow-[0_10px_38px_-10px_rgba(0,0,0,0.35),0_10px_20px_-15px_rgba(0,0,0,0.2)] pt-1 pb-1 px-0 text-[13px] mr-1"
              sideOffset={-3}
            >
              <DropdownMenuItem className="cursor-default text-popover-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-[4px] mx-1 my-0.5 py-[6px] px-3 font-normal">
                Project 1
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-default text-popover-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-[4px] mx-1 my-0.5 py-[6px] px-3 font-normal">
                Project 2
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-default text-popover-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-[4px] mx-1 my-0.5 py-[6px] px-3 font-normal">
                Project 3
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border my-1 mx-0" />
              <DropdownMenuItem className="cursor-default text-popover-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-[4px] mx-1 my-0.5 py-[6px] px-3 font-normal">
                Clear Menu
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuSeparator className="bg-border my-1 mx-0" />

          <DropdownMenuItem className="cursor-default text-popover-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-[4px] mx-1 my-0.5 py-[6px] px-3 font-normal">
            Force Quit...
            <DropdownMenuShortcut className="text-muted-foreground text-[11px]">⌥⌘⎋</DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-border my-1 mx-0" />

          <DropdownMenuItem className="cursor-default text-popover-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-[4px] mx-1 my-0.5 py-[6px] px-3 font-normal">
            Sleep
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-default text-popover-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-[4px] mx-1 my-0.5 py-[6px] px-3 font-normal">
            Restart...
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-default text-popover-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-[4px] mx-1 my-0.5 py-[6px] px-3 font-normal">
            Shut Down...
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-border my-1 mx-0" />

          <DropdownMenuItem className="cursor-default text-popover-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-[4px] mx-1 my-0.5 py-[6px] px-3 font-normal">
            Lock Screen
            <DropdownMenuShortcut className="text-muted-foreground text-[11px]">⌃⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-default text-popover-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-[4px] mx-1 my-0.5 py-[6px] px-3 font-normal">
            Log Out Martin Heßmann...
            <DropdownMenuShortcut className="text-muted-foreground text-[11px]">⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* App name - weight and spacing are crucial for macOS look */}
      <div className="font-medium text-[13px] flex items-center ml-2 text-white">MartinHessmann.com</div>

      {/* Right side status items - simplified and true to macOS */}
      <div className="ml-auto flex items-center h-full gap-[4px] pr-[8px]">
        <div className="text-[13px] font-medium flex items-center text-white">{currentTime}</div>
        <div className="flex items-center gap-[4px] ml-[8px]">
          {/* Theme toggle */}
          <ThemeToggle />

          {/* Status icons - subtle, clean appearance */}
          <div className="w-4 h-4 flex items-center justify-center">
            <div className="w-[10px] h-[10px] rounded-full bg-muted-foreground"></div>
          </div>
          <div className="w-4 h-4 flex items-center justify-center">
            <div className="w-[10px] h-[10px] rounded-full bg-muted-foreground"></div>
          </div>
          <div className="w-4 h-4 flex items-center justify-center">
            <div className="w-[10px] h-[10px] rounded-full bg-muted-foreground"></div>
          </div>
          {/* Control center icon */}
          <div className="w-5 h-4 flex items-center justify-center">
            <div className="h-2 w-[10px] bg-warning rounded-[2px]"></div>
          </div>
        </div>
      </div>
    </div>
  )
}