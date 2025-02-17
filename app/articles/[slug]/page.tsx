import { promises as fs } from 'fs'
import path from 'path'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'

import { ThemeToggle } from '@/components/theme-toggle'

export default async function ArticlePage({
  params,
}: {
  params: { slug: string }
}) {
  const filePath = path.join(process.cwd(), 'content', `${params.slug}.md`)

  try {
    const content = await fs.readFile(filePath, 'utf8')

    return (
      <>
        <ThemeToggle />
        <main className="min-h-screen w-full max-w-3xl mx-auto px-4 py-8 md:py-16 prose">
          <MDXRemote source={content} />
          <div className="mt-16 pt-8 border-t border-muted-foreground/30">
            <a href="/" className="no-underline hover:underline">← Back to home</a>
          </div>
        </main>
      </>
    )
  } catch (error) {
    notFound()
  }
}