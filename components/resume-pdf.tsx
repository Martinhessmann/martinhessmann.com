import React from 'react'
import { Document, Page, View, Text, Link, StyleSheet, Font, Svg, Path, Circle, Rect } from '@react-pdf/renderer'
import { Resume } from '@/types/resume'
import { PHOSPHOR_FILL_PATHS } from './phosphor-paths'

// Disable hyphenation to avoid mid-word breaks
Font.registerHyphenationCallback((word) => [word])

// Accent color for section cues and links
const ACCENT = '#2563EB' // Blue 600-ish
const DATE_RAIL_WIDTH = 90 // fixed rail for right-aligned dates

// SVG Icon Components with consistent sizing and spacing
// Using Phosphor Icons fill weight (https://github.com/phosphor-icons/react)
const ICON_SIZE = 6
const ICON_SPACING = 4

// Icon components using Phosphor fill paths
// Using function declarations for React-PDF compatibility
// Icons use consistent styling - marginTop removed to rely on flexbox alignment
function IconDate() {
  return (
    <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 256 256" style={{ marginRight: ICON_SPACING }}>
      <Path d={PHOSPHOR_FILL_PATHS.CALENDAR} fill="#222" />
    </Svg>
  )
}

function IconLocation() {
  return (
    <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 256 256" style={{ marginRight: ICON_SPACING }}>
      <Path d={PHOSPHOR_FILL_PATHS.MAP_PIN} fill="#222" />
    </Svg>
  )
}

function IconEmail() {
  return (
    <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 256 256" style={{ marginRight: ICON_SPACING }}>
      <Path d={PHOSPHOR_FILL_PATHS.ENVELOPE} fill="#222" />
    </Svg>
  )
}

function IconPhone() {
  return (
    <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 256 256" style={{ marginRight: ICON_SPACING }}>
      <Path d={PHOSPHOR_FILL_PATHS.PHONE} fill="#222" />
    </Svg>
  )
}

function IconWeb() {
  return (
    <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 256 256" style={{ marginRight: ICON_SPACING }}>
      <Path d={PHOSPHOR_FILL_PATHS.GLOBE} fill="#222" />
    </Svg>
  )
}

function IconTech() {
  return (
    <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 256 256" style={{ marginRight: ICON_SPACING }}>
      <Path d={PHOSPHOR_FILL_PATHS.CODE} fill="#222" />
    </Svg>
  )
}

function IconSkill() {
  return (
    <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 256 256" style={{ marginRight: ICON_SPACING }}>
      <Path d={PHOSPHOR_FILL_PATHS.STAR} fill="#2563EB" />
    </Svg>
  )
}

function IconTrophy() {
  return (
    <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 256 256" style={{ marginRight: ICON_SPACING }}>
      <Path d={PHOSPHOR_FILL_PATHS.TROPHY} fill="#2563EB" />
    </Svg>
  )
}

function IconRocket() {
  return (
    <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 256 256" style={{ marginRight: ICON_SPACING }}>
      <Path d={PHOSPHOR_FILL_PATHS.ROCKET} fill="#2563EB" />
    </Svg>
  )
}

function IconUsers() {
  return (
    <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 256 256" style={{ marginRight: ICON_SPACING }}>
      <Path d={PHOSPHOR_FILL_PATHS.USERS} fill="#2563EB" />
    </Svg>
  )
}

function IconChip() {
  return (
    <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 256 256" style={{ marginRight: ICON_SPACING }}>
      <Path d={PHOSPHOR_FILL_PATHS.CPU} fill="#2563EB" />
    </Svg>
  )
}

function IconChart() {
  return (
    <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 256 256" style={{ marginRight: ICON_SPACING }}>
      <Path d={PHOSPHOR_FILL_PATHS.CHART_BAR} fill="#2563EB" />
    </Svg>
  )
}

function IconTarget() {
  return (
    <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 256 256" style={{ marginRight: ICON_SPACING }}>
      <Path d={PHOSPHOR_FILL_PATHS.TARGET} fill="#2563EB" />
    </Svg>
  )
}

const styles = StyleSheet.create({
  page: {
    padding: '28.35 42.52', // 1cm = 28.35pt, 1.5cm = 42.52pt
    fontSize: 10,
    lineHeight: 1.35,
    fontFamily: 'Helvetica',
    color: '#111',
  },
  // Header styles
  header: {
    marginBottom: 10,
  },
  h1: {
    fontSize: 24,
    marginBottom: 3,
    lineHeight: 1.2,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 11,
    marginBottom: 4,
    color: ACCENT,
  },
  summary: {
    fontSize: 9,
    marginBottom: 4,
    lineHeight: 1.35,
  },
  contact: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    fontSize: 8,
    marginTop: 4,
    color: '#333',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  iconTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  // Two-column layout
  twoColumn: {
    flexDirection: 'row',
    gap: 10,
  },
  leftColumn: {
    width: '67%',
  },
  rightColumn: {
    width: '33%',
  },
  // Section styles
  section: {
    marginTop: 10,
    marginBottom: 6,
  },
  h2: {
    fontSize: 12,
    marginBottom: 6,
    marginTop: 0,
    fontWeight: 'bold',
    color: ACCENT,
    textTransform: 'uppercase',
    borderBottom: `1px solid ${ACCENT}`,
    paddingBottom: 2,
  },
  // Work Experience styles
  workItem: {
    borderLeft: `2px solid ${ACCENT}`,
    paddingLeft: 7.5,
    marginBottom: 8,
    minHeight: 0,
  },
  workHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  workHeaderLeft: {
    flex: 1,
  },
  dateRail: {
    width: DATE_RAIL_WIDTH,
    alignItems: 'flex-end',
  },
  h3: {
    fontSize: 11,
    marginBottom: 2,
    fontWeight: 'bold',
  },
  company: {
    fontSize: 9,
    color: ACCENT,
    marginBottom: 2,
  },
  dateLocation: {
    fontSize: 8,
    color: '#222',
    textAlign: 'right',
    lineHeight: 1.3,
  },
  highlights: {
    fontSize: 9,
    lineHeight: 1.3,
    marginBottom: 3,
  },
  highlightItem: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bullet: {
    marginRight: 5,
    color: ACCENT,
  },
  techChips: {
    fontSize: 7,
    color: '#444',
    lineHeight: 1.3,
  },
  // Education styles
  educationItem: {
    marginBottom: 6,
    minHeight: 0,
  },
  // Successes styles
  successItem: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'flex-start',
  },
  successIconContainer: {
    width: ICON_SIZE + ICON_SPACING,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 1, // Small offset to align with first line of text
  },
  successContent: {
    flex: 1,
  },
  successTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 1,
  },
  successSummary: {
    fontSize: 8,
    color: '#444',
    lineHeight: 1.3,
  },
  // Skills styles
  skillsLevels: {
    gap: 4,
  },
  skillLevelRow: {
    marginBottom: 5,
  },
  skillLevelLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 2,
  },
  skillChips: {
    fontSize: 8,
    color: '#444',
    lineHeight: 1.3,
  },
  // Languages styles
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  languageName: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  languageFluency: {
    fontSize: 8,
    color: '#444',
  },
  // Projects (Page 2) styles
  projectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  projectItem: {
    width: '48%',
    borderLeft: `2px solid ${ACCENT}`,
    paddingLeft: 7.5,
    marginBottom: 8,
    paddingTop: 4,
    paddingBottom: 4,
    minHeight: 0,
  },
  projectName: {
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  projectYear: {
    fontSize: 8,
    color: '#444',
    marginBottom: 3,
  },
  projectDescription: {
    fontSize: 8,
    color: '#444',
    marginBottom: 3,
    lineHeight: 1.3,
  },
  projectTech: {
    fontSize: 7,
    color: '#555',
    lineHeight: 1.25,
  },
  link: {
    color: ACCENT,
    textDecoration: 'underline',
  },
})

interface ResumePdfProps {
  resume: Resume
}

export function ResumePdf({ resume }: ResumePdfProps) {
  // Filter and limit work experience to 3-4 most recent roles
  const recentWork = resume.work
    ? [...resume.work]
        .sort((a, b) => {
          const dateA = a.startDate || ''
          const dateB = b.startDate || ''
          return dateB.localeCompare(dateA)
        })
        .slice(0, 4)
    : []

  // Filter highlights to max 3, excluding tech lines (reduced for page 1 fit)
  const filterHighlights = (highlights: string[] = []) => {
    return highlights
      .filter((h) => !h.startsWith('Tech:'))
      .slice(0, 3)
  }

  // Sort projects: featured first, then by priority, then alphabetically
  const sortedProjects = resume.projects
    ? [...resume.projects].sort((a, b) => {
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        if (a.priority && b.priority) return a.priority - b.priority
        return (a.name || '').localeCompare(b.name || '', undefined, { sensitivity: 'base' })
      })
    : []

  // Projects for page 2 (non-featured or all if no featured flag)
  const page2Projects = sortedProjects.filter((p) => !p.featured).slice(0, 10)

  return (
    <Document>
      {/* Page 1: Key Facts */}
      <Page size="A4" style={styles.page}>
        {/* Header - Full Width */}
        <View style={styles.header}>
          <Text style={styles.h1}>{resume.basics.name}</Text>
          {resume.basics.label && <Text style={styles.label}>{resume.basics.label}</Text>}
          <View style={styles.contact}>
            {resume.basics.location && (
              <>
                <View style={styles.contactItem}>
                  <IconLocation />
                  <Text>
                    {resume.basics.location.city || ''}
                    {resume.basics.location.city && resume.basics.location.countryCode && ', '}
                    {resume.basics.location.countryCode || ''}
                  </Text>
                </View>
                {(resume.basics.email || resume.basics.phone || resume.basics.url) && (
                  <Text> • </Text>
                )}
              </>
            )}
            {resume.basics.email && (
              <>
                <View style={styles.contactItem}>
                  <IconEmail />
                  <Link src={`mailto:${resume.basics.email}`} style={styles.link}>
                    {resume.basics.email}
                  </Link>
                </View>
                {(resume.basics.phone || resume.basics.url) && <Text> • </Text>}
              </>
            )}
            {resume.basics.phone && (
              <>
                <View style={styles.contactItem}>
                  <IconPhone />
                  <Link src={`tel:${resume.basics.phone}`} style={styles.link}>
                    {resume.basics.phone}
                  </Link>
                </View>
                {resume.basics.url && <Text> • </Text>}
              </>
            )}
            {resume.basics.url && (
              <View style={styles.contactItem}>
                <IconWeb />
                <Link src={resume.basics.url} style={styles.link}>
                  {resume.basics.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                </Link>
              </View>
            )}
          </View>
          {/* Summary in header */}
          {resume.basics.summary && (
            <Text style={[styles.summary, { marginTop: 6 }]}>{resume.basics.summary}</Text>
          )}
        </View>

        {/* Two-Column Layout */}
        <View style={styles.twoColumn}>
          {/* Left Column: Work Experience Only */}
          <View style={styles.leftColumn}>
            {/* Work Experience */}
            {recentWork.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.h2}>WORK EXPERIENCE</Text>
                {recentWork.map((job, index) => (
                  <View key={index} style={styles.workItem} wrap={false}>
                    <View style={styles.workHeader}>
                      <View style={styles.workHeaderLeft}>
                        <Text style={styles.h3}>{job.position}</Text>
                        <Text style={styles.company}>{job.name}</Text>
                      </View>
                      <View style={styles.dateRail}>
                        {job.startDate && (
                          <View>
                            <View style={styles.iconTextRow}>
                              <IconDate />
                              <Text style={styles.dateLocation}>
                                {job.startDate}
                                {job.endDate ? ` – ${job.endDate}` : ' – Present'}
                              </Text>
                            </View>
                            {job.location && (
                              <View style={[styles.iconTextRow, { marginTop: 2 }]}>
                                <IconLocation />
                                <Text style={styles.dateLocation}>
                                  {job.location.city || ''}
                                  {job.location.city && job.location.countryCode && ', '}
                                  {job.location.countryCode || ''}
                                </Text>
                              </View>
                            )}
                          </View>
                        )}
                      </View>
                    </View>
                    {job.highlights && filterHighlights(job.highlights).length > 0 && (
                      <View style={styles.highlights}>
                        {filterHighlights(job.highlights).map((highlight, highlightIndex) => (
                          <View key={highlightIndex} style={styles.highlightItem}>
                            <Text style={styles.bullet}>•</Text>
                            <Text style={{ flex: 1 }}>{highlight}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Right Column: Education, Successes, Skills, Languages */}
          <View style={styles.rightColumn}>
            {/* Education */}
            {resume.education && resume.education.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.h2}>EDUCATION</Text>
                {resume.education.map((edu, index) => (
                  <View key={index} style={styles.educationItem} wrap={false}>
                    <View>
                      <Text style={styles.h3}>
                        {edu.studyType} in {edu.area}
                      </Text>
                      <Text style={styles.company}>{edu.institution}</Text>
                      {edu.startDate && (
                        <View style={[styles.iconTextRow, { marginTop: 3 }]}>
                          <IconDate />
                          <Text style={styles.dateLocation}>
                            {edu.startDate}
                            {edu.endDate ? ` – ${edu.endDate}` : ''}
                          </Text>
                        </View>
                      )}
                      {edu.location && (
                        <View style={[styles.iconTextRow, { marginTop: 2 }]}>
                          <IconLocation />
                          <Text style={styles.dateLocation}>
                            {edu.location.city || ''}
                            {edu.location.city && edu.location.countryCode && ', '}
                            {edu.location.countryCode || ''}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Successes */}
            {resume.successes && resume.successes.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.h2}>KEY ACHIEVEMENTS</Text>
                 {resume.successes.map((success, index) => (
                   <View key={index} style={styles.successItem}>
                     <View style={styles.successIconContainer}>
                       {success.icon === 'trophy' && <IconTrophy />}
                       {success.icon === 'rocket' && <IconRocket />}
                       {success.icon === 'users' && <IconUsers />}
                       {success.icon === 'chip' && <IconChip />}
                       {success.icon === 'chart' && <IconChart />}
                       {success.icon === 'target' && <IconTarget />}
                     </View>
                     <View style={styles.successContent}>
                       <Text style={styles.successTitle}>{success.title}</Text>
                       <Text style={styles.successSummary}>{success.summary}</Text>
                     </View>
                   </View>
                 ))}
              </View>
            )}

            {/* Skills */}
            {resume.skills && resume.skills.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.h2}>SKILLS</Text>
                {(() => {
                  const hasLevels = resume.skills?.some((s) => s.level)
                  if (hasLevels) {
                    const order = ['Expert', 'Advanced', 'Intermediate', 'Familiar', 'Beginner']
                    const grouped = new Map<string, typeof resume.skills>()
                    resume.skills?.forEach((s) => {
                      const level = (s.level || 'Other').trim()
                      if (!grouped.has(level)) grouped.set(level, [])
                      grouped.get(level)!.push(s)
                    })
                    const keys = Array.from(grouped.keys()).sort((a, b) => {
                      const ia = order.indexOf(a)
                      const ib = order.indexOf(b)
                      if (ia !== -1 && ib !== -1) return ia - ib
                      if (ia !== -1) return -1
                      if (ib !== -1) return 1
                      return a.localeCompare(b)
                    })
                    return (
                      <View style={styles.skillsLevels}>
                        {keys.map((level) => (
                          <View key={level} style={styles.skillLevelRow} wrap={false}>
                            <View style={styles.iconTextRow}>
                              <IconSkill />
                              <Text style={styles.skillLevelLabel}>{level}</Text>
                            </View>
                            <Text style={styles.skillChips}>
                              {grouped
                                .get(level)!
                                .map((s) => s.name)
                                .filter(Boolean)
                                .join(', ')}
                            </Text>
                          </View>
                        ))}
                      </View>
                    )
                  }
                  return null
                })()}
              </View>
            )}

            {/* Languages */}
            {resume.languages && resume.languages.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.h2}>LANGUAGES</Text>
                {resume.languages.map((lang, index) => (
                  <View key={index} style={styles.languageItem}>
                    <Text style={styles.languageName}>{lang.language}</Text>
                    <Text style={styles.languageFluency}>{lang.fluency}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>

      {/* Page 2: Projects Only */}
      {page2Projects.length > 0 && (
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.h2}>PROJECTS</Text>
            <View style={styles.projectsGrid}>
              {page2Projects.map((project, index) => (
                <View key={index} style={styles.projectItem} wrap={false}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 3 }}>
                    <Text style={styles.projectName}>{project.name}</Text>
                    {project.startDate && (
                      <View style={styles.iconTextRow}>
                        <IconDate />
                        <Text style={styles.projectYear}>
                          since {parseInt(project.startDate.split('-')[0])}
                        </Text>
                      </View>
                    )}
                  </View>
                  {project.url && (
                    <View style={[styles.iconTextRow, { marginBottom: 3 }]}>
                      <IconWeb />
                      <Link src={project.url} style={[styles.projectDescription, styles.link]}>
                        {project.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                      </Link>
                    </View>
                  )}
                  {project.description && (
                    <Text style={styles.projectDescription}>{project.description}</Text>
                  )}
                  {project.keywords && project.keywords.length > 0 && (
                    <View style={{ marginTop: 3 }}>
                      <View style={[styles.iconTextRow, { marginBottom: 1 }]}>
                        <IconTech />
                        <Text style={[styles.projectTech, { fontWeight: 'bold' }]}>
                          Tech:
                        </Text>
                      </View>
                      <Text style={styles.projectTech}>
                        {project.keywords
                          .filter((keyword) => keyword !== project.entity)
                          .slice(0, 6)
                          .join(' • ')}
                      </Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        </Page>
      )}
    </Document>
  )
}
