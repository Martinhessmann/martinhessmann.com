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
  ogImage?: string
  ogImageDownloaded?: boolean // Flag to indicate if OG image was downloaded locally
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
  ogImage?: string // Add ogImage property
  ogImageDownloaded?: boolean // Flag to indicate if OG image was downloaded locally
}

export function SafariSuggestions() {
  const [clientWebsites, setClientWebsites] = useState<ClientWebsite[]>([
    {
      title: 'The African Forum for Utility Regulators',
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
      title: 'Tertianum Premium Residences',
      url: 'tertianum-premiumresidences.de',
      lastVisited: '6 days ago',
      tags: ['Design', 'Dev', 'PM'],
      since: '2018',
      imagePath: '/images/clients/tertianum-premiumresidences.de.jpg'
    },
    {
      title: 'Tertianum Premium Group',
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
      title: 'SpotsUp',
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
      title: 'Stadt Weide Land',
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
      title: 'Porsche Lifestyle Group Pressroom',
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
      title: 'Fonds für Wohnen und Mobilität',
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
                favicon: siteMetadata.favicon,
                ogImage: siteMetadata.ogImage,
                ogImageDownloaded: siteMetadata.ogImageDownloaded
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

  // Function to get the best available image for a site
  const getBestImage = (site: ClientWebsite) => {
    // If the OG image was downloaded locally, use that
    if (site.ogImageDownloaded && site.ogImage && site.ogImage.startsWith('/')) {
      return site.ogImage;
    }

    // Otherwise use the local screenshot
    if (site.imagePath) {
      // Check if there's an og variant available
      const ogVariantPath = site.imagePath.replace('.jpg', '-og.jpg');
      // Try to use the -og.jpg variant if it exists
      return ogVariantPath;
    }

    // If no local images available but we have an ogImage URL, use it directly
    if (site.ogImage) {
      // Handle relative URLs
      if (!site.ogImage.startsWith('http')) {
        return `https://${site.url}${site.ogImage.startsWith('/') ? '' : '/'}${site.ogImage}`;
      }
      return site.ogImage;
    }

    // Fallback to placeholder
    return '';
  };

  // Helper to create subtle background color from theme color
  const getSubtleBackground = (color?: string) => {
    if (!color) return undefined;
    try {
      // Create a subtle background by adding alpha channel
      if (color.startsWith('#')) {
        // Convert hex to RGB
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, 0.07)`;
      } else if (color.startsWith('rgb')) {
        // If it's already RGB format, just add alpha
        return color.replace('rgb', 'rgba').replace(')', ', 0.07)');
      }
    } catch (e) {
      console.error('Error parsing color:', e);
    }
    return undefined;
  };

  // Set to true to use glass effect, false to use subtle background
  const useGlassEffect = true;

  // State to detect if we're in dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for dark mode
  useEffect(() => {
    // Check if document is defined (client-side only)
    if (typeof document !== 'undefined') {
      // Initial check
      setIsDarkMode(document.documentElement.classList.contains('dark'));

      // Create observer for theme changes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type === 'attributes' &&
            mutation.attributeName === 'class'
          ) {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
          }
        });
      });

      // Start observing
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      });

      // Cleanup
      return () => observer.disconnect();
    }
  }, []);

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
                style={useGlassEffect ? {
                  // Glass effect styling - adapt for dark/light mode
                  background: isDarkMode
                    ? 'rgba(30, 41, 59, 0.5)' // Dark glass
                    : 'rgba(255, 255, 255, 0.7)', // Light glass
                  backdropFilter: 'blur(8px)',
                  border: site.themeColor
                    ? `1px solid ${site.themeColor}`
                    : isDarkMode
                      ? '1px solid rgba(255, 255, 255, 0.1)'
                      : '1px solid rgba(0, 0, 0, 0.1)'
                } : {
                  // Subtle background styling
                  borderLeft: site.themeColor ? `4px solid ${site.themeColor}` : '4px solid transparent',
                  background: getSubtleBackground(site.themeColor) || 'var(--secondary)'
                }}
              >
                <div className="aspect-video relative overflow-hidden bg-muted">
                  {/* Use the best available image */}
                  {(site.ogImage || site.imagePath) ? (
                    <Image
                      src={getBestImage(site)}
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
                    style={{ display: (site.ogImage || site.imagePath) ? 'none' : 'block' }}
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
                  </div>

                  <p className="text-xs text-muted-foreground">
                    {site.since && `Since ${site.since}`}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}