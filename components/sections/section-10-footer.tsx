"use client"

import { motion } from "framer-motion"

export function Section10Footer() {
  return (
    <footer id="contact" className="py-20 lg:py-28 bg-gray-950 bg-[radial-gradient(640px_420px_at_18%_12%,rgba(245,158,11,0.18),rgba(17,24,39,0))] text-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: CTA */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-xl md:text-2xl font-semibold tracking-tight"
              style={{ fontFamily: "'TeXGyreHeros', sans-serif" }}
            >
              Let's build something lasting.
            </h2>

            <p
              className="text-sm md:text-base text-gray-400 italic"
              style={{ fontFamily: "'EB Garamond', serif" }}
            >
              "I seek partnerships where I can drive sustained impact — not project-hopping, but building something lasting."
            </p>

            <p className="text-sm text-gray-400">
              Berlin-based.
            </p>

            {/* Contact Links */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="mailto:martin@martinhessmann.com"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-amber-400 text-gray-950 text-xs font-semibold uppercase tracking-[0.2em] border border-amber-300/60 hover:bg-amber-300 transition-colors"
              >
                Get in touch
              </a>
              <a
                href="https://linkedin.com/in/martin-hessmann?originalSubdomain=de"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-gray-600/70 text-white text-xs font-semibold uppercase tracking-[0.2em] hover:border-white/70 hover:text-white transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </motion.div>

          {/* Right: Details */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Mission alignment */}
            <div>
              <h3 className="text-[11px] text-gray-500 uppercase tracking-[0.3em] mb-3">
                Drawn to
              </h3>
              <p className="text-sm text-gray-300">
                Work with real-world impact: sustainable infrastructure, mobility, civic technology, and services that solve genuine human needs.
              </p>
            </div>

            {/* Links */}
            <div>
              <h3 className="text-[11px] text-gray-500 uppercase tracking-[0.3em] mb-3">
                Links
              </h3>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://github.com/martinhessmann"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://www.instagram.com/martinhessmann/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="/api/pdf"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Full Resume
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Martin Heßmann
          </p>
          <div className="flex gap-4 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-400 transition-colors">Impressum</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Datenschutz</a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
