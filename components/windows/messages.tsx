'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ClientConversation, Message } from '@/types/types'
import { getAllConversations } from '@/lib/content'
import { ScrollArea } from '@/components/ui/scroll-area'

export function Messages() {
  const [selectedConversation, setSelectedConversation] = useState<string>('teambank')

  const conversations = getAllConversations()
  const currentConversation = conversations.find(c => c.client.id === selectedConversation)

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Messages toolbar */}
      <div className="bg-card border-b border-border px-4 py-2 flex items-center">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-foreground mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
          </svg>
          <span className="text-sm font-medium">Client Partnerships</span>
        </div>
        <div className="flex-grow"></div>
        <div className="flex items-center space-x-2">
          <button className="p-1 text-muted-foreground hover:bg-muted rounded">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="p-1 text-muted-foreground hover:bg-muted rounded">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-grow flex overflow-hidden">
        {/* Conversations sidebar */}
        <div className="w-[280px] flex-shrink-0 border-r border-border bg-card flex flex-col">
          <div className="p-3 sticky top-0 bg-card z-10 border-b border-border">
            <div className="relative">
              <input
                type="text"
                placeholder="Search conversations"
                className="w-full bg-muted border-none rounded-lg pl-8 pr-4 py-1 text-sm focus:ring-primary focus:border-primary"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-foreground absolute left-2 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <ScrollArea className="flex-grow">
            <div className="conversations-list">
              {conversations.map((convo) => (
                <div
                  key={convo.client.id}
                  className={`p-3 flex items-center cursor-pointer ${
                    selectedConversation === convo.client.id
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-muted text-foreground'
                  }`}
                  onClick={() => setSelectedConversation(convo.client.id)}
                >
                  <div className="w-10 h-10 relative rounded-full overflow-hidden mr-3">
                    <Image
                      src={convo.client.contactImage || convo.client.icon || '/images/placeholder-client.png'}
                      alt={convo.client.contact || convo.client.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <span className="font-medium text-base">
                        {convo.client.contact || 'Contact'}
                      </span>
                      <span className="text-xs text-muted-foreground">{convo.lastActivity}</span>
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      <span className="text-muted-foreground">{convo.client.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Conversation content */}
        {currentConversation && (
          <div className="flex-grow flex flex-col h-full overflow-hidden">
            {/* Header - Sticky */}
            <div className="border-b border-border p-3 flex items-center bg-card z-10">
              <div className="w-8 h-8 relative rounded-full overflow-hidden mr-3">
                <Image
                  src={currentConversation.client.contactImage || currentConversation.client.icon || '/images/placeholder-client.png'}
                  alt={currentConversation.client.contact || currentConversation.client.name}
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-medium text-sm">{currentConversation.client.contact || 'Contact'}</div>
                <div className="text-xs text-muted-foreground">{currentConversation.client.name}</div>
              </div>
            </div>

            {/* Messages - Scrollable */}
            <ScrollArea className="flex-grow">
              <div className="space-y-4">
                {currentConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'client' ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-xs rounded-lg p-3 ${
                        message.sender === 'client'
                          ? 'bg-muted text-foreground'
                          : 'bg-primary text-primary-foreground'
                      }`}
                    >
                      <div className="text-sm">{message.content}</div>
                      <div className="text-xs mt-1 opacity-70 text-right">
                        {message.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input area - Sticky */}
            <div className="p-3 border-t border-border bg-card">
              <div className="flex items-center">
                <button className="p-2 text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                <input
                  type="text"
                  placeholder="Write a message..."
                  className="flex-grow mx-2 py-2 px-3 rounded-full bg-muted border-none focus:ring-primary focus:border-primary"
                />
                <button className="p-2 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}