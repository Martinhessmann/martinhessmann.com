import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

interface BlogPostParams {
  params: {
    slug: string
  }
}

export default function BlogPost({ params }: BlogPostParams) {
  const posts = {
    'getting-started': {
      title: 'Getting Started (2010-2014)',
      date: '2010-2014',
      emoji: '🎓',
      content: (
        <>
          <p className="mb-4">
            My journey into the world of design and technology began at HTW Berlin, where I studied Communication Design. I chose this path because I wanted to grow up, be independent, and provide for my family. But what I really enjoyed back then were the bike rides through the city, exploring Berlin's vibrant design scene, and connecting with fellow creatives.
          </p>
          <p className="mb-4">
            During my studies, I discovered my passion for digital design and user experience. The intersection of creativity and technology fascinated me, and I found myself drawn to projects that involved creating digital interfaces and experiences.
          </p>
          <p className="mb-4">
            This period was foundational for me, as I developed not only technical skills but also a design philosophy centered around solving real problems for real people. I learned that good design goes beyond aesthetics—it's about understanding user needs and creating solutions that are both beautiful and functional.
          </p>
          <div className="my-8 relative h-64 rounded-lg overflow-hidden">
            <Image
              src="/images/blog/education.jpg"
              alt="Education period"
              fill
              className="object-cover"
            />
          </div>
          <p className="mb-4">
            My first professional experiences during this time helped me understand the industry and where I wanted to position myself. I was particularly drawn to digital product design, where I could combine my creative skills with a structured approach to problem-solving.
          </p>
        </>
      )
    },
    'from-design-to-ux': {
      title: 'From Design to UX (2013-2018)',
      date: '2013-2018',
      emoji: '🎨',
      content: (
        <>
          <p className="mb-4">
            At Ape Unit GmbH, where I started as an intern in 2013 and later became a UX/UI Designer (2014-2018), I realized I needed more than just visuals—I needed structure, principles, and a plan. This was my transition period from graphic design to user experience design.
          </p>
          <p className="mb-4">
            Working on various digital products, I discovered the power of user-centered design approaches. I learned to conduct user research, create personas, map user journeys, and test prototypes with real users. This methodical approach to design was a revelation to me.
          </p>
          <div className="my-8 relative h-64 rounded-lg overflow-hidden">
            <Image
              src="/images/blog/ux-design.jpg"
              alt="UX Design process"
              fill
              className="object-cover"
            />
          </div>
          <p className="mb-4">
            During this period, I worked on projects for clients in various industries, from fintech to education and healthcare. Each project brought new challenges and learning opportunities, helping me develop a versatile skill set and a deep understanding of different user needs.
          </p>
          <p className="mb-4">
            I also began to appreciate the collaborative nature of UX design, working closely with developers, product managers, and other stakeholders to create cohesive digital experiences. This interdisciplinary approach became a cornerstone of my professional philosophy.
          </p>
        </>
      )
    },
    'art-direction': {
      title: '"Art" Direction (2018-2023)',
      date: '2018-2023',
      emoji: '🖌️',
      content: (
        <>
          <p className="mb-4">
            I never really understood why we called it "Art Direction," but as our team grew at Unit 4 and we had more than one designer on a project, we could finally split up cognitive and creative work. This period marked my transition into leadership roles in design and product management.
          </p>
          <p className="mb-4">
            As an Art Director and later as a Product Manager, I was responsible for guiding teams and shaping digital products from concept to launch. I learned to balance creative vision with business objectives, technical constraints, and user needs.
          </p>
          <div className="my-8 relative h-64 rounded-lg overflow-hidden">
            <Image
              src="/images/blog/leadership.jpg"
              alt="Leadership in design"
              fill
              className="object-cover"
            />
          </div>
          <p className="mb-4">
            Leading design teams taught me the importance of clear communication, effective delegation, and creating an environment where creativity can flourish. I developed frameworks and processes that helped our teams work more efficiently while maintaining high quality standards.
          </p>
          <p className="mb-4">
            During this time, I also deepened my understanding of product strategy and how design decisions impact business outcomes. I worked closely with stakeholders to align product development with organizational goals, always advocating for the user's perspective.
          </p>
        </>
      )
    },
    'ankommen': {
      title: '"AN"kommen (2023-Present)',
      date: '2023-Present',
      emoji: '🚀',
      content: (
        <>
          <p className="mb-4">
            Now, at AN, I feel like I've reached a point where I'm happy with my role. I have the freedom to decide how we advise clients, what solutions we propose, how we structure teams, and how we approach problems. This is my current chapter, focusing on product strategy and innovation in the digital landscape.
          </p>
          <p className="mb-4">
            As a Digital Product Manager and UX Designer, I combine my technical knowledge, design expertise, and business acumen to create digital products that deliver value to both users and organizations. I'm particularly interested in how emerging technologies can be harnessed to solve complex problems.
          </p>
          <div className="my-8 relative h-64 rounded-lg overflow-hidden">
            <Image
              src="/images/blog/current-role.jpg"
              alt="Current professional role"
              fill
              className="object-cover"
            />
          </div>
          <p className="mb-4">
            I'm also passionate about mentoring and knowledge sharing. I believe in fostering a culture of continuous learning and growth, both for myself and for the teams I work with. This includes staying updated on industry trends, experimenting with new tools and methodologies, and sharing insights with the broader community.
          </p>
          <p className="mb-4">
            Looking ahead, I'm excited about the possibilities that lie at the intersection of design, technology, and business. I'm committed to creating digital experiences that are not only user-friendly and aesthetically pleasing but also ethically responsible and inclusive.
          </p>
        </>
      )
    },
    'side-projects': {
      title: 'Side Projects',
      date: 'Ongoing',
      emoji: '🛠️',
      content: (
        <>
          <p className="mb-4">
            These aren't really side projects—they're more like things I pass on. Community work. Sharing experiences, making connections, valuing the things I do or did. Personal projects and explorations that keep me learning and growing outside of my main professional work.
          </p>
          <p className="mb-4">
            One of my ongoing interests is exploring new technologies and design tools. I regularly experiment with emerging platforms and frameworks, building small applications or prototypes to understand their capabilities and limitations. This hands-on approach helps me stay current in a rapidly evolving field.
          </p>
          <div className="my-8 relative h-64 rounded-lg overflow-hidden">
            <Image
              src="/images/blog/side-projects.jpg"
              alt="Side projects and explorations"
              fill
              className="object-cover"
            />
          </div>
          <p className="mb-4">
            I'm also involved in mentoring aspiring designers and product managers. Sharing knowledge and helping others navigate their career paths is incredibly rewarding. It's a way for me to give back to the community and also to refine my own understanding of the field.
          </p>
          <p className="mb-4">
            Additionally, I contribute to open-source projects and participate in design communities. These collaborations expose me to diverse perspectives and approaches, enriching my own practice and connecting me with like-minded professionals around the world.
          </p>
        </>
      )
    },
    'whats-next': {
      title: "What's Next?",
      date: 'Future',
      emoji: '🔮',
      content: (
        <>
          <p className="mb-4">
            I don't really know where the AI bubble is going, and to be honest, it's kind of crazy to watch fully generative images, videos, marketing funnels, and ads evolve at this speed. Looking ahead to future opportunities and challenges in the ever-evolving digital product landscape is both exciting and daunting.
          </p>
          <p className="mb-4">
            As artificial intelligence and machine learning continue to transform our industry, I'm particularly interested in how these technologies can enhance rather than replace human creativity. I believe there's immense potential in human-AI collaboration, especially in design and product development.
          </p>
          <div className="my-8 relative h-64 rounded-lg overflow-hidden">
            <Image
              src="/images/blog/future-vision.jpg"
              alt="Future vision"
              fill
              className="object-cover"
            />
          </div>
          <p className="mb-4">
            I'm also keeping an eye on developments in augmented and virtual reality, as these technologies have the potential to fundamentally change how we interact with digital products. The shift from 2D interfaces to immersive experiences presents fascinating design challenges and opportunities.
          </p>
          <p className="mb-4">
            Whatever the future holds, I'm committed to approaching it with curiosity, adaptability, and a user-centered mindset. I believe that regardless of technological advancements, understanding human needs and behaviors will remain at the core of effective digital product design.
          </p>
        </>
      )
    }
  }

  const post = posts[params.slug as keyof typeof posts]

  if (!post) {
    notFound()
  }

  return (
    <article className="prose prose-lg dark:prose-invert max-w-none">
      <div className="flex items-center gap-4 mb-6">
        <span className="text-5xl">{post.emoji}</span>
        <div>
          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
          <p className="text-muted-foreground">{post.date}</p>
        </div>
      </div>

      {post.content}

      <div className="mt-12 pt-6 border-t border-border">
        <Link
          href="/#journey"
          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Journey
        </Link>
      </div>
    </article>
  )
}