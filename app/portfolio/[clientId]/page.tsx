import { notFound } from 'next/navigation'
import { CLIENT_REALMS } from '@/data/clients'
import { ClientDetailContent } from '@/components/client-detail-content'

interface PageProps {
  params: Promise<{ clientId: string }>
}

export function generateStaticParams() {
  return CLIENT_REALMS.map((r) => ({ clientId: r.id }))
}

export default async function ClientPage({ params }: PageProps) {
  const { clientId } = await params
  const realm = CLIENT_REALMS.find((r) => r.id === clientId)
  if (!realm) notFound()

  return <ClientDetailContent realm={realm} standalone />
}
