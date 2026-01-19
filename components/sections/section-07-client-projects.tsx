import { getClientProjects } from "@/lib/clients-projects"
import { ClientProjectsGallery } from "./client-projects-gallery"

export function Section07ClientProjects() {
  const clients = getClientProjects()
  if (!clients.length) return null
  return <ClientProjectsGallery clients={clients} />
}
