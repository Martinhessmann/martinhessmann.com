'use client'

import * as React from 'react'
import { MobileHomeScreen } from './mobile-home-screen'
import { MobileAppContainer } from './mobile-app-container'
import { useMobileAppStore } from '@/lib/store/mobile-app-store'
import { Projects } from './windows/projects'
import { Stories } from './windows/stories'
import { Messages } from './windows/messages'
import { Notes } from './windows/notes'
import { LegalNotice } from './windows/legal-notice'
import { AboutMartin } from './windows/about-martin'
import { ProjectInfo } from './windows/project-info'

export function MobileDesktop() {
  const { currentApp, closeApp, registerApp } = useMobileAppStore()

  // App configurations with their components
  const appConfigs = React.useMemo(() => ({
    'projects': {
      id: 'projects',
      title: 'Projects',
      icon: '/images/app-icons/04 Chrome.png',
      component: <Projects />
    },
    'stories': {
      id: 'stories',
      title: 'Stories',
      icon: '/images/app-icons/07 Photos.png',
      component: <Stories />
    },
    'messages': {
      id: 'messages',
      title: 'Messages',
      icon: '/images/app-icons/31 Messages.png',
      component: <Messages />
    },
    'notes': {
      id: 'notes',
      title: 'Notes',
      icon: '/images/app-icons/15 Notes.png',
      component: <Notes />
    },
    'legal-notice': {
      id: 'legal-notice',
      title: 'Legal Notice',
      icon: '/images/app-icons/02 System Settings.png',
      component: <LegalNotice />
    },
    'about-martin': {
      id: 'about-martin',
      title: 'About Martin',
      icon: '/images/app-icons/16 ChatGPT.png',
      component: <AboutMartin />
    },
    'project-info': {
      id: 'project-info',
      title: 'Project Info',
      icon: '/images/app-icons/12 Notion.png',
      component: <ProjectInfo />
    }
  }), [])

  // Listen for app opens from the home screen
  React.useEffect(() => {
    const handleAppOpen = (event: CustomEvent) => {
      const appId = event.detail.appId
      const appConfig = appConfigs[appId as keyof typeof appConfigs]

      if (appConfig) {
        registerApp(appConfig)
      }
    }

    // Listen for custom app-open events
    window.addEventListener('mobile-app-open', handleAppOpen as EventListener)

    return () => {
      window.removeEventListener('mobile-app-open', handleAppOpen as EventListener)
    }
  }, [appConfigs, registerApp])

  // Enhanced mobile app store hook to handle app opening
  React.useEffect(() => {
    const originalOpenApp = useMobileAppStore.getState().openApp

    useMobileAppStore.setState({
      openApp: (appId: string) => {
        const appConfig = appConfigs[appId as keyof typeof appConfigs]
        if (appConfig) {
          registerApp(appConfig)
        }
      }
    })

    return () => {
      useMobileAppStore.setState({ openApp: originalOpenApp })
    }
  }, [appConfigs, registerApp])

  const handleCloseApp = () => {
    closeApp()
  }

  return (
    <div className="h-screen w-screen overflow-hidden">
      {/* Home Screen */}
      {!currentApp && <MobileHomeScreen />}

      {/* Current App */}
      {currentApp && (
        <MobileAppContainer
          id={currentApp.id}
          title={currentApp.title}
          icon={currentApp.icon}
          onClose={handleCloseApp}
        >
          {currentApp.component}
        </MobileAppContainer>
      )}
    </div>
  )
}