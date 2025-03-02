import Image from 'next/image'
import Link from 'next/link'
import { SectionHeader } from './section-header'

interface ClientContact {
  name: string
  position: string
  company: string
  imageSrc: string
  linkedIn?: string
}

interface ClientPartnership {
  name: string
  description: string
  logoSrc: string
  url: string
  platform: string
  industry: string
  contacts: ClientContact[]
}

export function ClientPartnerships() {
  const clientPartnerships: ClientPartnership[] = [
    {
      name: 'Tertianum Premium Residences',
      description: 'Digital services and solutions for future-oriented living catering to an aging society.',
      logoSrc: '/images/clients/tertianum-logo.jpg',
      url: 'https://www.tertianum.de/',
      platform: 'Digital Services',
      industry: 'Real Estate',
      contacts: [
        {
          name: 'Julia Schmidt',
          position: 'Digital Marketing Manager',
          company: 'Tertianum Premium Residences',
          imageSrc: '/images/contacts/julia-schmidt.jpg',
          linkedIn: 'https://linkedin.com/in/example'
        }
      ]
    },
    {
      name: 'EVG / WoMoFonds',
      description: 'Sustainable investment platform for eco-friendly mobile homes and alternative living solutions.',
      logoSrc: '/images/clients/womofonds-logo.jpg',
      url: 'https://www.womofonds.de/',
      platform: 'Investment Platform',
      industry: 'Finance & Sustainability',
      contacts: [
        {
          name: 'Michael Weber',
          position: 'Head of Digital',
          company: 'EVG',
          imageSrc: '/images/contacts/michael-weber.jpg',
          linkedIn: 'https://linkedin.com/in/example'
        }
      ]
    },
    {
      name: 'Electronica Group (SpotsUp, Fairworks)',
      description: 'Digital products for shared economy and HR management, focusing on modern workplace solutions.',
      logoSrc: '/images/clients/electronica-group-logo.jpg',
      url: 'https://electronica.group',
      platform: 'Web Applications',
      industry: 'Technology',
      contacts: [
        {
          name: 'Sarah Müller',
          position: 'Product Owner',
          company: 'Electronica Group',
          imageSrc: '/images/contacts/sarah-muller.jpg',
          linkedIn: 'https://linkedin.com/in/example'
        },
        {
          name: 'Thomas Klein',
          position: 'CTO',
          company: 'Electronica Group',
          imageSrc: '/images/contacts/thomas-klein.jpg',
          linkedIn: 'https://linkedin.com/in/example'
        }
      ]
    },
    {
      name: 'TeamBank AG',
      description: 'Leading banking solutions provider specializing in consumer finance and digital banking experiences.',
      logoSrc: '/images/clients/teambank-logo.jpg',
      url: 'https://www.teambank.de/',
      platform: 'Financial Services',
      industry: 'Banking',
      contacts: [
        {
          name: 'Andreas Becker',
          position: 'Digital Transformation Lead',
          company: 'TeamBank AG',
          imageSrc: '/images/contacts/andreas-becker.jpg',
          linkedIn: 'https://linkedin.com/in/example'
        }
      ]
    }
  ]

  return (
    <section id="clients" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Client Partnerships"
          subtitle="Long-term collaborations with innovative organizations and their teams"
          emoji="🤝"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {clientPartnerships.map((partnership) => (
            <div
              key={partnership.name}
              className="bg-secondary rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group"
            >
              <div className="h-40 bg-white flex items-center justify-center p-6">
                <div className="relative w-full h-full">
                  <Image
                    src={partnership.logoSrc}
                    alt={`${partnership.name} logo`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">{partnership.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{partnership.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs px-2 py-1 bg-muted rounded-full">{partnership.platform}</span>
                  <span className="text-xs px-2 py-1 bg-muted rounded-full">{partnership.industry}</span>
                </div>

                {/* Client contacts */}
                {partnership.contacts.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">Key Contacts:</h4>
                    <div className="flex flex-wrap gap-3">
                      {partnership.contacts.map((contact, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="relative w-8 h-8 rounded-full overflow-hidden">
                            <Image
                              src={contact.imageSrc}
                              alt={contact.name}
                              fill
                              sizes="32px"
                              className="object-cover"
                            />
                          </div>
                          <div className="text-xs">
                            <div className="font-medium">{contact.name}</div>
                            <div className="text-muted-foreground">{contact.position}</div>
                            {contact.linkedIn && (
                              <Link
                                href={contact.linkedIn}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline inline-flex items-center gap-1"
                              >
                                LinkedIn
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                  <polyline points="15 3 21 3 21 9"></polyline>
                                  <line x1="10" y1="14" x2="21" y2="3"></line>
                                </svg>
                              </Link>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Link
                  href={partnership.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-primary group-hover:underline"
                >
                  Visit website
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}