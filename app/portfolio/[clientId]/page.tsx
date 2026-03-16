import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CLIENT_REALMS } from '@/data/clients'
import { ClientDetailContent } from '@/components/client-detail-content'
import { buildDraftAwareSections, getDraftAwareMoodImage } from '@/lib/image-curation-shared'
import { readImageCurationDraftStore } from '@/lib/image-curation-drafts'

interface PageProps {
  params: Promise<{ clientId: string }>
  searchParams?: Promise<{ draft?: string; edit?: string }> | { draft?: string; edit?: string }
}

export function generateStaticParams() {
  return CLIENT_REALMS.map((realm) => ({ clientId: realm.id }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { clientId } = await params
  const realm = CLIENT_REALMS.find((entry) => entry.id === clientId)

  if (!realm) {
    return {}
  }

  return {
    title: `${realm.displayName} – ${realm.hook}`,
    description: realm.keyMoment,
    alternates: {
      canonical: `/portfolio/${realm.id}`,
    },
    openGraph: {
      title: `${realm.displayName} – ${realm.hook}`,
      description: realm.keyMoment,
      images: realm.moodImage ? [realm.moodImage] : undefined,
    },
  }
}

export default async function ClientPage({ params, searchParams }: PageProps) {
  const { clientId } = await params
  const realm = CLIENT_REALMS.find((entry) => entry.id === clientId)
  const resolvedSearchParams = searchParams instanceof Promise ? await searchParams : searchParams
  const isDraftMode = resolvedSearchParams?.draft === '1' || resolvedSearchParams?.edit === '1'

  if (!realm) notFound()

  if (!isDraftMode) {
    return <ClientDetailContent realm={realm} standalone />
  }

  const draftStore = await readImageCurationDraftStore()

  return (
    <ClientDetailContent
      realm={realm}
      standalone
      sections={buildDraftAwareSections(realm, draftStore)}
      moodImage={getDraftAwareMoodImage(realm, draftStore)}
    />
  )
}
