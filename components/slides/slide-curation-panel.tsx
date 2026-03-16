"use client"

import { useRef, useState } from 'react'
import type { DraftSectionImage } from '@/types/image-curation'

interface SlideCurationPanelProps {
  realmName: string
  sectionTitle: string
  localEnabled: boolean
  images: DraftSectionImage[]
  heroImageSrc?: string
  status?: string
  onUpload: (files: File[]) => void | Promise<void>
  onMove: (src: string, direction: 'left' | 'right') => void
  onToggleEnabled: (src: string) => void
  onSetHero: (src: string) => void
  onCaptionChange: (src: string, value: string) => void
  onCaptionCommit: (src: string) => void
}

function StatusText({ status }: { status?: string }) {
  if (!status) return null

  const tone = status.toLowerCase()
  const className = tone.includes('error')
    ? 'text-red-200'
    : tone.includes('saved')
      ? 'text-emerald-200'
      : 'text-white/65'

  return <p className={`text-[12px] ${className}`}>{status}</p>
}

export function SlideCurationPanel({
  realmName,
  sectionTitle,
  localEnabled,
  images,
  heroImageSrc,
  status,
  onUpload,
  onMove,
  onToggleEnabled,
  onSetHero,
  onCaptionChange,
  onCaptionCommit,
}: SlideCurationPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return
    void onUpload(Array.from(fileList))
  }

  return (
    <div className="mt-5 rounded-[28px] border border-white/10 bg-[rgba(24,24,35,0.68)] p-4 text-white shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/55">Slide curation draft</p>
          <p className="mt-2 text-[14px] leading-[1.55] text-white/78">
            {realmName} · {sectionTitle}
          </p>
        </div>
        <StatusText status={status} />
      </div>

      <div
        className={`mt-4 rounded-[22px] border px-4 py-4 transition-colors ${
          isDragging ? 'border-white/50 bg-white/[0.08]' : 'border-white/12 bg-white/[0.03]'
        } ${localEnabled ? '' : 'opacity-60'}`}
        onDragOver={(event) => {
          if (!localEnabled) return
          event.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          if (!localEnabled) return
          event.preventDefault()
          setIsDragging(false)
          handleFiles(event.dataTransfer.files)
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[13px] leading-[1.55] text-white/70">
            Drop PNG, JPG, or WebP files here to add them to this section.
          </p>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={!localEnabled}
            className="rounded-full border border-white/15 px-3 py-2 text-[13px] font-medium text-white transition-colors hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Choose files
          </button>
        </div>
        {!localEnabled && (
          <p className="mt-2 text-[12px] text-white/45">
            Uploads only work in local development because deployed filesystem writes are not durable.
          </p>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          multiple
          className="hidden"
          onChange={(event) => {
            handleFiles(event.target.files)
            event.target.value = ''
          }}
        />
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {images.length === 0 ? (
          <div className="rounded-[20px] border border-dashed border-white/12 px-4 py-6 text-[13px] text-white/45">
            No draft images selected for this section yet.
          </div>
        ) : (
          images.map((image, index) => {
            const isHero = heroImageSrc === image.src

            return (
              <div
                key={image.src}
                className={`rounded-[22px] border p-3 transition-colors ${
                  image.enabled ? 'border-white/10 bg-white/[0.04]' : 'border-white/8 bg-black/20 opacity-60'
                }`}
              >
                <div className="overflow-hidden rounded-[16px] border border-white/10 bg-black/20">
                  <img src={image.src} alt={image.alt} className="h-40 w-full object-cover" />
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onSetHero(image.src)}
                    className={`rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.18em] ${
                      isHero ? 'border-white/40 bg-white/[0.14] text-white' : 'border-white/12 text-white/65 hover:bg-white/[0.08]'
                    }`}
                  >
                    {isHero ? 'Hero' : 'Make hero'}
                  </button>
                  <button
                    type="button"
                    onClick={() => onToggleEnabled(image.src)}
                    className="rounded-full border border-white/12 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/65 hover:bg-white/[0.08]"
                  >
                    {image.enabled ? 'Hide' : 'Show'}
                  </button>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-white/35">#{index + 1}</span>
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => onMove(image.src, 'left')}
                    disabled={index === 0}
                    className="rounded-full border border-white/12 px-2.5 py-1 text-[12px] text-white/70 hover:bg-white/[0.08] disabled:opacity-30"
                  >
                    Move left
                  </button>
                  <button
                    type="button"
                    onClick={() => onMove(image.src, 'right')}
                    disabled={index === images.length - 1}
                    className="rounded-full border border-white/12 px-2.5 py-1 text-[12px] text-white/70 hover:bg-white/[0.08] disabled:opacity-30"
                  >
                    Move right
                  </button>
                </div>
                <label className="mt-3 block">
                  <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/45">Caption</span>
                  <textarea
                    rows={3}
                    value={image.draftCaption ?? ''}
                    onChange={(event) => onCaptionChange(image.src, event.target.value)}
                    onBlur={() => onCaptionCommit(image.src)}
                    className="mt-2 w-full rounded-[16px] border border-white/10 bg-black/20 px-3 py-2 text-[13px] leading-[1.55] text-white placeholder:text-white/25"
                    placeholder="Write a short slide caption..."
                  />
                </label>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
