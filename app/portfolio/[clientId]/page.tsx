import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CLIENT_REALMS } from '@/data/clients'
import { ClientDetailContent } from '@/components/client-detail-content'

interface PageProps {
  params: Promise<{ clientId: string }>
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

export default async function ClientPage({ params }: PageProps) {
  const { clientId } = await params
  const realm = CLIENT_REALMS.find((entry) => entry.id === clientId)

  if (!realm) notFound()

  return <ClientDetailContent realm={realm} standalone />
}
