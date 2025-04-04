'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Message {
  id: string
  sender: string
  content: string
  timestamp: string
  isClient?: boolean
}

interface Conversation {
  id: string
  clientName: string
  clientLogo: string
  industry: string
  messages: Message[]
  lastActivity: string
}

export function ClientPartnerships() {
  const [selectedConversation, setSelectedConversation] = useState<string>('teambank')

  const conversations: Conversation[] = [
    {
      id: 'teambank',
      clientName: 'TeamBank AG',
      clientLogo: '/images/clients/teambank.png',
      industry: 'Banking & Finance',
      lastActivity: '2 days ago',
      messages: [
        {
          id: 'tb1',
          sender: 'TeamBank AG',
          content: "Martin, we're impressed with the customer feedback on the new app interface. Transactions are up 28% since launch!",
          timestamp: '2 days ago',
          isClient: true
        },
        {
          id: 'tb2',
          sender: 'Martin',
          content: "That's great to hear! The user-centered approach really paid off. We should consider expanding the personalization features in the next sprint.",
          timestamp: '2 days ago'
        },
        {
          id: 'tb3',
          sender: 'TeamBank AG',
          content: "Agreed. Let's schedule a workshop to explore those ideas. The board is very pleased with the results so far.",
          timestamp: '2 days ago',
          isClient: true
        }
      ]
    },
    {
      id: 'evg',
      clientName: 'EVG / WoMoFonds',
      clientLogo: '/images/clients/evg.png',
      industry: 'Real Estate & Investment',
      lastActivity: '1 week ago',
      messages: [
        {
          id: 'evg1',
          sender: 'EVG / WoMoFonds',
          content: "We've hit 12,000 users on the platform! The investment flow you designed is working exceptionally well.",
          timestamp: '1 week ago',
          isClient: true
        },
        {
          id: 'evg2',
          sender: 'Martin',
          content: "That's fantastic news! How are the conversion rates looking?",
          timestamp: '1 week ago'
        },
        {
          id: 'evg3',
          sender: 'EVG / WoMoFonds',
          content: 'Conversion is at 4.8%, up from 3.2% with the old system. The simplified verification process made a huge difference.',
          timestamp: '1 week ago',
          isClient: true
        }
      ]
    },
    {
      id: 'bundesministerium',
      clientName: 'Bundesministerium',
      clientLogo: '/images/clients/government.png',
      industry: 'Government',
      lastActivity: '2 weeks ago',
      messages: [
        {
          id: 'bm1',
          sender: 'Bundesministerium',
          content: 'The accessibility improvements have received positive feedback from advocacy groups. Thank you for the thorough implementation.',
          timestamp: '2 weeks ago',
          isClient: true
        },
        {
          id: 'bm2',
          sender: 'Martin',
          content: "I'm glad to hear that. Accessibility should be a standard, not an afterthought. Have you gathered any metrics on increased usage?",
          timestamp: '2 weeks ago'
        },
        {
          id: 'bm3',
          sender: 'Bundesministerium',
          content: 'Yes, service utilization is up 31% across all demographics, with the most significant increase in older users and those with disabilities.',
          timestamp: '2 weeks ago',
          isClient: true
        }
      ]
    },
    {
      id: 'medical',
      clientName: 'Medical Group GmbH',
      clientLogo: '/images/clients/medical.png',
      industry: 'Healthcare',
      lastActivity: '1 month ago',
      messages: [
        {
          id: 'mg1',
          sender: 'Medical Group GmbH',
          content: "The patient management system has reduced our administrative overhead by 35%. The staff can't stop praising the intuitive design.",
          timestamp: '1 month ago',
          isClient: true
        },
        {
          id: 'mg2',
          sender: 'Martin',
          content: "That's what we aimed for - allowing the staff to focus on patient care rather than wrestling with software. How's the mobile experience working?",
          timestamp: '1 month ago'
        },
        {
          id: 'mg3',
          sender: 'Medical Group GmbH',
          content: "Doctors love being able to access records on their tablets during rounds. It's transformed their workflow completely.",
          timestamp: '1 month ago',
          isClient: true
        }
      ]
    }
  ]

  const currentConversation = conversations.find(c => c.id === selectedConversation)

  return (
    <div className="h-full flex flex-col">
      {/* Messages toolbar */}
      <div className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2 flex items-center">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
          </svg>
          <span className="text-sm font-medium">Client Partnerships</span>
        </div>
        <div className="flex-grow"></div>
        <div className="flex items-center space-x-2">
          <button className="p-1 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="p-1 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-grow flex">
        {/* Conversations sidebar */}
        <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
          <div className="p-3 sticky top-0 bg-white dark:bg-gray-800 z-10">
            <div className="relative">
              <input
                type="text"
                placeholder="Search conversations"
                className="w-full bg-gray-100 dark:bg-gray-700 border-none rounded-lg pl-8 pr-4 py-1 text-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="conversations-list">
            {conversations.map((convo) => (
              <div
                key={convo.id}
                className={`p-3 flex items-center cursor-pointer ${
                  selectedConversation === convo.id
                    ? 'bg-blue-100 dark:bg-blue-900/30'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                onClick={() => setSelectedConversation(convo.id)}
              >
                <div className="w-10 h-10 relative rounded-full overflow-hidden mr-3">
                  <Image
                    src={convo.clientLogo}
                    alt={convo.clientName}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between">
                    <span className="font-medium text-sm">{convo.clientName}</span>
                    <span className="text-xs text-gray-500">{convo.lastActivity}</span>
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    <span className="text-gray-400">{convo.industry}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversation content */}
        {currentConversation && (
          <div className="w-2/3 flex flex-col">
            {/* Header - Sticky */}
            <div className="border-b border-gray-200 dark:border-gray-700 p-3 flex items-center sticky top-0 bg-white dark:bg-gray-800 z-10">
              <div className="w-8 h-8 relative rounded-full overflow-hidden mr-3">
                <Image
                  src={currentConversation.clientLogo}
                  alt={currentConversation.clientName}
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-medium text-sm">{currentConversation.clientName}</div>
                <div className="text-xs text-gray-500">{currentConversation.industry}</div>
              </div>
            </div>

            {/* Messages - Scrollable */}
            <div className="flex-grow overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
              <div className="space-y-4">
                {currentConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isClient ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-xs rounded-lg p-3 ${
                        message.isClient
                          ? 'bg-gray-200 dark:bg-gray-700'
                          : 'bg-blue-500 text-white'
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
            </div>

            {/* Input area - Sticky */}
            <div className="p-3 border-t border-gray-200 dark:border-gray-700 sticky bottom-0 bg-white dark:bg-gray-800">
              <div className="flex items-center">
                <button className="p-2 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                <input
                  type="text"
                  placeholder="Write a message..."
                  className="flex-grow mx-2 py-2 px-3 rounded-full bg-gray-100 dark:bg-gray-700 border-none focus:ring-blue-500 focus:border-blue-500"
                />
                <button className="p-2 text-blue-500">
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