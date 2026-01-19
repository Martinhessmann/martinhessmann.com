"use client"

import { motion } from "framer-motion"

export function Section10Footer() {
  return (
    <footer id="contact" className="py-16 lg:py-24 bg-gray-950 text-white">
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
              className="text-3xl md:text-4xl font-bold tracking-tight"
              style={{ fontFamily: "'TeXGyreHeros', sans-serif" }}
            >
              Let's build something lasting.
            </h2>

            <p
              className="text-lg text-gray-400 italic"
              style={{ fontFamily: "'EB Garamond', serif" }}
            >
              "I seek partnerships where I can drive sustained impact — not project-hopping, but building something lasting."
            </p>

            <p className="text-gray-400">
              Berlin-based. Open to hybrid, remote (CET), or relocation for the right opportunity.
            </p>

            {/* Contact Links */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="mailto:martin@martinhessmann.com"
                className="inline-flex items-center justify-center px-6 py-3 bg-amber-500 text-gray-950 font-medium rounded hover:bg-amber-400 transition-colors"
              >
                Get in touch
              </a>
              <a
                href="https://linkedin.com/in/martinhessmann"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-600 text-white font-medium rounded hover:border-gray-400 transition-colors"
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
              <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-3">
                Drawn to
              </h3>
              <p className="text-gray-300">
                Work with real-world impact: sustainable infrastructure, mobility, civic technology, and services that solve genuine human needs.
              </p>
            </div>

            {/* Links */}
            <div>
              <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-3">
                Links
              </h3>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://github.com/martinhessmann"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://mastodon.social/@martin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Mastodon
                </a>
                <a
                  href="?view=resume"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Full Resume
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="mt-16 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Martin Heßmann
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-400 transition-colors">Impressum</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Datenschutz</a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
