'use client'

import { useState } from 'react'
import { getAllSuccessStories } from '@/lib/content'
import { SuccessStory } from '@/types/types'

export function Stories() {
  const stories = getAllSuccessStories()
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)
  const currentStory = stories[currentStoryIndex]

  const goToSlide = (index: number) => {
    setCurrentStoryIndex(index)
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Toolbar */}
      <div className="bg-card border-b border-border px-4 py-2 flex items-center">
        <div className="flex items-center">
          <span className="text-sm font-medium">Success Stories</span>
        </div>
        <div className="flex-grow"></div>
        <div className="flex items-center space-x-2">
          <button className="p-1 text-muted-foreground hover:bg-muted rounded">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
          <button className="p-1 text-muted-foreground hover:bg-muted rounded">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      {currentStory && (
        <div className="flex-grow p-6 bg-background">
          <div className="max-w-4xl mx-auto">
            {/* Story Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-muted-foreground">{currentStory.year}</span>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm font-medium text-muted-foreground">Client: {currentStory.client}</span>
                </div>
              </div>
              <h1 className="text-2xl font-bold mb-2 text-foreground">{currentStory.title}</h1>
              <p className="text-muted-foreground">{currentStory.description}</p>
            </div>

            {/* Technologies */}
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-muted-foreground mb-2">Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {currentStory.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Impact Metrics */}
            <div>
              <h2 className="text-sm font-semibold text-muted-foreground mb-4">Impact</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentStory.impact.map((metric, index) => (
                  <div
                    key={index}
                    className="p-4 bg-card rounded-lg shadow-sm"
                  >
                    <div className="text-2xl font-bold text-primary mb-1">
                      {metric.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {metric.metric}
                    </div>
                    {metric.change && (
                      <div className="text-sm text-green-600 dark:text-green-400 mt-1">
                        {metric.change}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="bg-card border-t border-border p-4">
        <div className="flex justify-center items-center space-x-2">
          {stories.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentStoryIndex
                  ? 'bg-primary w-4'
                  : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}