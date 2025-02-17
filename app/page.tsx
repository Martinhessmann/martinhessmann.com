import { promises as fs } from 'fs'
import path from 'path'
import { MDXRemote } from 'next-mdx-remote/rsc'

import { ThemeToggle } from '@/components/theme-toggle'

export default async function Home() {
  const filePath = path.join(process.cwd(), 'README.md')
  const content = await fs.readFile(filePath, 'utf8')

  return (
    <>
      <ThemeToggle />
      <main className="min-h-screen w-full max-w-3xl mx-auto px-4 py-8 md:py-16 prose prose-neutral dark:prose-invert prose-headings:font-normal prose-a:text-[#1068bf] dark:prose-a:text-[#75b7ff] prose-headings:font-sans prose-p:font-sans prose-li:font-sans">
        <MDXRemote source={content} />
      </main>
    </>
  )
}

