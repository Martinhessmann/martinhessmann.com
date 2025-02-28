import Link from 'next/link'
import { Github, Linkedin, Mail, Twitter } from 'lucide-react'

export function SocialLinks() {
  return (
    <div className="flex items-center space-x-4 mt-4">
      <Link
        href="https://github.com/martinhessmann"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-primary transition-colors"
        aria-label="GitHub"
      >
        <Github className="h-5 w-5" />
      </Link>
      <Link
        href="https://linkedin.com/in/martinhessmann"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-primary transition-colors"
        aria-label="LinkedIn"
      >
        <Linkedin className="h-5 w-5" />
      </Link>
      <Link
        href="https://twitter.com/martinhessmann"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-primary transition-colors"
        aria-label="Twitter"
      >
        <Twitter className="h-5 w-5" />
      </Link>
      <Link
        href="mailto:hello@martinhessmann.com"
        className="text-muted-foreground hover:text-primary transition-colors"
        aria-label="Email"
      >
        <Mail className="h-5 w-5" />
      </Link>
    </div>
  )
}