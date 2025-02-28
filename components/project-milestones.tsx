import Image from 'next/image'
import Link from 'next/link'
import { SectionHeader } from './section-header'

interface ProjectMilestone {
  title: string
  client: string
  excerpt: string
  fullContent: string
  imageSrc: string
  date: string
  tags: string[]
}

export function ProjectMilestones() {
  const milestones: ProjectMilestone[] = [
    {
      title: 'Digital Communication Platform',
      client: 'Grün Berlin',
      excerpt: 'Creating a platform that visualizes municipal infrastructure projects and offers participation opportunities for citizens.',
      fullContent: `
        <p>Berlin's mobility transition requires not only new infrastructure, but also transparency and the active involvement of citizens. How can we get all interest groups on board and make the processes comprehensible?</p>
        <p>Together with Grün Berlin, we have developed a digital communication platform that visualises progress in real time and offers interactive opportunities for participation.</p>
        <p>The platform creates a space in which citizens can give feedback and actively participate in urban development. Acceptance for sustainable urban projects is promoted through the transparent presentation of all projects and targeted communication with various interest groups.</p>
        <p>With this platform, Grün Berlin shows how mobility transition and urban development can be shaped together with the population - for a liveable, sustainable city.</p>
      `,
      imageSrc: '/images/1x1-three-people-standing-and-laughting-outside.png',
      date: 'March 2023',
      tags: ['Public Participation', 'Urban Development', 'UX Design']
    },
    {
      title: 'Interactive Grid Simulation',
      client: 'E.ON',
      excerpt: 'Developing "What\'s Netz", an interactive energy grid simulation with gamification elements for showrooms and trade fairs.',
      fullContent: `
        <p>The energy transition is more than just the expansion of renewable energies - it means making the energy distribution grids future-proof. This is exactly where What's Netz comes in: a digital grid simulation that explains complex grid structures in a fun and understandable way.</p>
        <p>Developed in collaboration with E.ON and RaySono, What's Netz offers interactive 3D graphics, intuitive navigation and gamification elements that make energy grids and their significance tangible.</p>
        <p>The application is aimed at decision-makers from politics and the media, provides schools with a valuable learning tool and inspires at trade fairs and in showrooms. It makes the big picture visible - how grids work, what measures are necessary and how municipalities of all sizes can actively shape the energy transition.</p>
        <p>Our focus was on creating an experience that not only informs, but also inspires. Based on Ray Sono's vision, we developed the UI and UX design from scratch and implemented it technically with React Three Fibre.</p>
        <p>What's Netz is an example of how digital transformation not only imparts knowledge, but also inspires people to take action - for a sustainable and better connected future.</p>
      `,
      imageSrc: '/images/1x1-curious-group-of-people.png',
      date: 'November 2022',
      tags: ['Interactive Installation', 'Energy', '3D Visualization']
    },
    {
      title: 'Digital Services for Modern Living',
      client: 'Tertianum Premium Residences',
      excerpt: 'Creating digital solutions that redefine modern living and cater to the needs of an aging society.',
      fullContent: `
        <p>Demographic change is placing new demands on modern living and creating fundamental needs that require new ways of living together. Since 2019, we have been supporting Tertianum in developing innovative solutions for an ageing society and driving digital innovation in the property sector.</p>
        <p>Our work focuses on the development of digital services that offer personalised and needs-based experiences, as well as AI-based visual worlds that present properties in an interactive and appealing way. This is complemented by a holistic digital experience at sales level, which includes flexible and customised web experiences for various application areas.</p>
        <p>With these solutions, Tertianum combines technological innovation with service excellence, thereby strengthening its position as a pioneer for future-oriented living.</p>
      `,
      imageSrc: '/images/1x1-group-of-people-smiling-at-each-other-conference-hall.png',
      date: 'June 2021',
      tags: ['Digital Services', 'Real Estate', 'User Experience']
    }
  ]

  return (
    <section id="milestones" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Project Milestones"
          subtitle="Key achievements and innovations from my client work"
          emoji="🏆"
        />

        <div className="mt-12 space-y-12">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className="bg-secondary rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group"
            >
              <div className="md:flex">
                <div className="md:w-2/5 relative">
                  <div className="relative h-64 md:h-full w-full">
                    <Image
                      src={milestone.imageSrc}
                      alt={milestone.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent md:bg-gradient-to-t md:from-black/70 md:via-black/40 md:to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                      <div className="text-sm font-medium mb-1">{milestone.date}</div>
                      <h3 className="text-xl md:text-2xl font-medium">{milestone.title}</h3>
                      <p className="text-sm text-white/80 mt-1">Client: {milestone.client}</p>
                    </div>
                  </div>
                </div>

                <div className="md:w-3/5 p-6 md:p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {milestone.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-muted rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-base mb-4">{milestone.excerpt}</p>

                  <details className="group">
                    <summary className="cursor-pointer text-sm font-medium text-primary inline-flex items-center">
                      Read full story
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform duration-300 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div
                      className="mt-4 text-sm text-muted-foreground prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: milestone.fullContent }}
                    />
                  </details>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}