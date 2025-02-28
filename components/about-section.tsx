import Image from 'next/image'
import { SectionHeader } from './section-header'

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="About Me"
          subtitle="A bit about who I am and where I'm from"
          emoji="👋"
        />

        <div className="mt-12 bg-secondary rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Image column */}
            <div className="md:w-1/3 relative">
              <div className="relative h-64 md:h-full">
                <Image
                  src="/images/1x1-thoughtful-man-looking-up-in-the-air.png"
                  alt="Martin Heßmann"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <div className="text-sm font-medium">Berlin, Germany</div>
                  <div className="text-xs">Friedrichshain</div>
                </div>
              </div>
            </div>

            {/* Content column */}
            <div className="md:w-2/3 p-6">
              <div className="prose prose-sm md:prose-base">
                <p className="text-base md:text-lg mb-4">
                  Hey, I'm Martin 👋 I live in Friedrichshain, former East-Berlin, just 500 meters from where my parents first moved in together—back when getting married was the only way the GDR government would allow them to share an apartment.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                  <div className="bg-background/50 p-4 rounded-lg">
                    <h3 className="text-sm font-bold flex items-center mb-2">
                      <span className="text-lg mr-2">🎯</span> What I Do
                    </h3>
                    <p className="text-sm">
                      I help teams create user-centered digital products by bridging the gap between design, development, and business needs.
                    </p>
                  </div>

                  <div className="bg-background/50 p-4 rounded-lg">
                    <h3 className="text-sm font-bold flex items-center mb-2">
                      <span className="text-lg mr-2">💡</span> How I Think
                    </h3>
                    <p className="text-sm">
                      I believe in simplicity, clarity, and purpose. Good design should be invisible, and good products should solve real problems.
                    </p>
                  </div>

                  <div className="bg-background/50 p-4 rounded-lg">
                    <h3 className="text-sm font-bold flex items-center mb-2">
                      <span className="text-lg mr-2">🌱</span> What I Value
                    </h3>
                    <p className="text-sm">
                      Collaboration, continuous learning, and creating meaningful experiences that positively impact people's lives.
                    </p>
                  </div>

                  <div className="bg-background/50 p-4 rounded-lg">
                    <h3 className="text-sm font-bold flex items-center mb-2">
                      <span className="text-lg mr-2">🎮</span> When I'm Not Working
                    </h3>
                    <p className="text-sm">
                      I enjoy cycling through Berlin, exploring new coffee shops, and tinkering with side projects that may never see the light of day.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="inline-block bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">Product Strategy</span>
                  <span className="inline-block bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">UX Design</span>
                  <span className="inline-block bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">Frontend Development</span>
                  <span className="inline-block bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">Team Leadership</span>
                  <span className="inline-block bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">Design Systems</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}