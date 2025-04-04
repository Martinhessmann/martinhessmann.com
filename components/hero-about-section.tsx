import Image from 'next/image'
import { SocialLinks } from './social-links'
import { ProfileImage } from './profile-image'
import { AppBar } from './app-bar'

export function HeroAboutSection() {
  return (
    <section id="about" className="pt-8 pb-16 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Mac App Bar (now sticky) */}
          <AppBar />

          <div className="bg-secondary rounded-b-lg p-8 shadow-md">
            {/* Hero content */}
            <div className="flex flex-col md:flex-row gap-8 mb-12">
              <div className="md:w-1/3">
                <div className="relative aspect-square overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src="/images/1x1-thoughtful-man-looking-up-in-the-air.png"
                    alt="Martin Heßmann"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <div className="text-sm font-medium">Berlin, Germany</div>
                    <div className="text-xs">Friedrichshain</div>
                  </div>
                </div>
              </div>

              <div className="md:w-2/3">
                <h1 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
                  Product Generalist
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-6">
                  I'm Martin Heßmann, a Product Generalist who bridges the gap between design,
                  development, and business needs. I'm neither exclusively a PM, Developer, nor Designer—but
                  a blend of all three, helping teams create intuitive, accessible, and impactful
                  digital experiences.
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="inline-block bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">Product Strategy</span>
                  <span className="inline-block bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">UX Design</span>
                  <span className="inline-block bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">Frontend Development</span>
                  <span className="inline-block bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">Team Leadership</span>
                  <span className="inline-block bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">Design Systems</span>
                </div>

                <SocialLinks />
              </div>
            </div>

            {/* About content grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>
        </div>
      </div>
    </section>
  )
}