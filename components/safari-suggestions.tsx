'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SectionHeader } from './section-header'
import { PlaceholderImage } from './placeholder-image'

interface WebsiteMetadata {
  url: string
  imagePath?: string
  ogTitle?: string
  ogDescription?: string
  themeColor?: string
  siteName?: string
  favicon?: string
  error?: string
}

interface ClientWebsite {
  title: string
  url: string
  lastVisited: string // e.g. "2 days ago", "Last week"
  tags: Array<'Design' | 'Dev' | 'PM'>
  since?: string // e.g. "2019", "2021" - optional year since working with client
  imagePath?: string // Local path if we store images locally
  ogTitle?: string
  ogDescription?: string
  themeColor?: string
  siteName?: string
  favicon?: string
}

export function SafariSuggestions() {
  const [clientWebsites, setClientWebsites] = useState<ClientWebsite[]>([
    {
      title: 'Afurnet',
      url: 'afurnet.org',
      lastVisited: '5 days ago',
      tags: ['Design', 'PM'],
      since: '2022',
      imagePath: '/images/clients/afurnet.org.jpg'
    },
    {
      title: 'Brasserie Colette',
      url: 'brasseriecolette.de',
      lastVisited: '2 weeks ago',
      tags: ['Design', 'Dev'],
      since: '2020',
      imagePath: '/images/clients/brasseriecolette.de.jpg'
    },
    {
      title: 'DPF Investment',
      url: 'dpf-investment.de',
      lastVisited: '3 weeks ago',
      tags: ['Design', 'PM'],
      since: '2021',
      imagePath: '/images/clients/dpf-investment.de.jpg'
    },
    {
      title: 'RAS Services',
      url: 'ras-services.de',
      lastVisited: 'Last month',
      tags: ['Design', 'Dev', 'PM'],
      since: '2019',
      imagePath: '/images/clients/ras-services.de.jpg'
    },
    {
      title: 'Tertianum Premium',
      url: 'tertianum-premiumresidences.de',
      lastVisited: '6 days ago',
      tags: ['Design', 'Dev', 'PM'],
      since: '2018',
      imagePath: '/images/clients/tertianum-premiumresidences.de.jpg'
    },
    {
      title: 'Tertianum',
      url: 'tertianum.de',
      lastVisited: '1 week ago',
      tags: ['Design', 'PM'],
      since: '2019',
      imagePath: '/images/clients/tertianum.de.jpg'
    },
    {
      title: 'E.ON - What\'s Netz',
      url: 'eon.com/de/c/whatsnetz.html',
      lastVisited: '3 days ago',
      tags: ['Design', 'Dev'],
      since: '2021',
      imagePath: '/images/clients/eon.com-de-c-whatsnetz.jpg'
    },
    {
      title: 'SpotsUp Rent',
      url: 'spotsup.rent',
      lastVisited: '2 weeks ago',
      tags: ['Dev', 'PM'],
      since: '2022',
      imagePath: '/images/clients/spotsup.rent.jpg'
    },
    {
      title: 'Electronica Group',
      url: 'electronica.group',
      lastVisited: '1 month ago',
      tags: ['Design', 'Dev'],
      since: '2020',
      imagePath: '/images/clients/electronica.group.jpg'
    },
    {
      title: 'Fairworks',
      url: 'fairworks.com',
      lastVisited: 'Last week',
      tags: ['Design', 'PM'],
      since: '2021',
      imagePath: '/images/clients/fairworks.com.jpg'
    },
    {
      title: 'Grün Berlin',
      url: 'gruen-berlin.de',
      lastVisited: '4 days ago',
      tags: ['Design', 'Dev', 'PM'],
      since: '2019',
      imagePath: '/images/clients/gruen-berlin.de.jpg'
    },
    {
      title: 'Infrasignal',
      url: 'infrasignal.de',
      lastVisited: '1 week ago',
      tags: ['Design', 'Dev'],
      since: '2020',
      imagePath: '/images/clients/infrasignal.de.jpg'
    },
    {
      title: 'Stadtweideland',
      url: 'stadtweideland.de',
      lastVisited: '3 weeks ago',
      tags: ['Design', 'PM'],
      since: '2022',
      imagePath: '/images/clients/stadtweideland.de.jpg'
    },
    {
      title: 'easyCredit Partner',
      url: 'partner.easycredit.de',
      lastVisited: '2 days ago',
      tags: ['Design', 'Dev'],
      since: '2020',
      imagePath: '/images/clients/partner.easycredit.de.jpg'
    },
    {
      title: 'Porsche Design Press',
      url: 'press.porsche-design.com',
      lastVisited: '1 month ago',
      tags: ['Design', 'PM'],
      since: '2019',
      imagePath: '/images/clients/press.porsche-design.com.jpg'
    },
    {
      title: 'TeamBank',
      url: 'teambank.de',
      lastVisited: 'Last week',
      tags: ['Design', 'Dev', 'PM'],
      since: '2018',
      imagePath: '/images/clients/teambank.de.jpg'
    },
    {
      title: 'Dein WoMo',
      url: 'dein-womo.de',
      lastVisited: '6 days ago',
      tags: ['Design', 'Dev'],
      since: '2021',
      imagePath: '/images/clients/dein-womo.de.jpg'
    },
    {
      title: 'WoMo Fonds',
      url: 'womofonds.de',
      lastVisited: '5 days ago',
      tags: ['Design', 'PM'],
      since: '2021',
      imagePath: '/images/clients/womofonds.de.jpg'
    }
  ])

  // Load metadata if available
  useEffect(() => {
    const loadMetadata = async () => {
      try {
        const response = await fetch('/data/website-metadata.json');
        if (!response.ok) {
          console.warn('Metadata file not found. Run npm run fetch-previews to generate it.');
          return;
        }

        const metadata: WebsiteMetadata[] = await response.json();

        setClientWebsites(prevSites =>
          prevSites.map(site => {
            // Find the matching metadata
            const siteMetadata = metadata.find(meta =>
              meta.url === site.url ||
              site.url.includes(meta.url) ||
              meta.url.includes(site.url)
            );

            if (siteMetadata) {
              // Merge metadata with existing site data
              return {
                ...site,
                ogTitle: siteMetadata.ogTitle,
                ogDescription: siteMetadata.ogDescription,
                themeColor: siteMetadata.themeColor,
                siteName: siteMetadata.siteName,
                favicon: siteMetadata.favicon
              };
            }

            return site;
          })
        );
      } catch (error) {
        console.error('Error loading website metadata:', error);
      }
    };

    loadMetadata();
  }, []);

  // Tag colors
  const tagColors = {
    Design: 'bg-blue-500',
    Dev: 'bg-purple-500',
    PM: 'bg-amber-500'
  }

  // Handle image load errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const imgElement = e.currentTarget;
    imgElement.style.display = 'none';

    // Get parent and find the fallback element
    const parent = imgElement.parentElement;
    if (parent) {
      const fallback = parent.querySelector('.fallback-image') as HTMLDivElement;
      if (fallback) {
        fallback.style.display = 'block';
      }
    }
  };

  // Function to get a website's display title
  const getDisplayTitle = (site: ClientWebsite) => {
    return site.ogTitle || site.siteName || site.title;
  };

  return (
    <section id="websites" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Suggestions"
          subtitle="Digital solutions I've helped design, develop and manage"
          emoji="🌐"
        />

        <div className="mt-8 mb-6">
          <div className="flex gap-3 justify-center">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              <span className="text-sm">Design</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-500"></span>
              <span className="text-sm">Development</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              <span className="text-sm">Project Management</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {clientWebsites.map((site) => (
            <Link
              href={`https://${site.url}`}
              target="_blank"
              rel="noopener noreferrer"
              key={site.url}
              className="group"
            >
              <div
                className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                style={{
                  // Use site theme color as card border if available
                  borderLeft: site.themeColor ? `4px solid ${site.themeColor}` : undefined,
                  background: 'var(--secondary)'
                }}
              >
                <div className="aspect-video relative overflow-hidden bg-muted">
                  {site.imagePath ? (
                    <Image
                      src={site.imagePath}
                      alt={getDisplayTitle(site)}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                      className="object-cover"
                      onError={handleImageError}
                    />
                  ) : null}

                  {/* Fallback for missing images */}
                  <div
                    className="fallback-image absolute inset-0 flex items-center justify-center"
                    style={{ display: site.imagePath ? 'none' : 'block' }}
                  >
                    <PlaceholderImage domain={site.url} width={300} height={169} />
                  </div>
                </div>
                <div className="p-3">
                  <div className="flex items-start gap-2">
                    {site.favicon && (
                      <img
                        src={site.favicon.startsWith('http') ? site.favicon : `https://${site.url}${site.favicon.startsWith('/') ? '' : '/'}${site.favicon}`}
                        alt=""
                        className="w-4 h-4 mt-0.5 rounded-sm"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium line-clamp-1 group-hover:text-primary transition-colors">
                        {getDisplayTitle(site)}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5 mb-1">{site.url}</p>
                    </div>
                  </div>

                  {site.ogDescription && (
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                      {site.ogDescription}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-1 mb-1">
                    {site.tags.map(tag => (
                      <span
                        key={tag}
                        className={`inline-block w-2 h-2 rounded-full ${tagColors[tag]}`}
                        title={tag}
                      />
                    ))}
                    {site.since && (
                      <span className="text-[10px] ml-auto text-muted-foreground">
                        Since {site.since}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground">{site.lastVisited}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}