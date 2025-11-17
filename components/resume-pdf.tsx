import React from 'react'
import { Document, Page, View, Text, Link, StyleSheet, Font, Svg, Path, Circle, Rect } from '@react-pdf/renderer'
import { Resume } from '@/types/resume'

// Disable hyphenation to avoid mid-word breaks
Font.registerHyphenationCallback((word) => [word])

// Accent color for section cues and links
const ACCENT = '#2563EB' // Blue 600-ish
const DATE_RAIL_WIDTH = 90 // fixed rail for right-aligned dates

// SVG Icon Components with consistent sizing and spacing
// Using Phosphor Icons (https://github.com/phosphor-icons/react)
const ICON_SIZE = 6
const ICON_SPACING = 4

const IconDate = () => (
  <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 256 256" style={{ marginRight: ICON_SPACING, marginTop: 1 }}>
    <Path
      d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Z"
      fill="#222"
    />
  </Svg>
)

const IconLocation = () => (
  <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 256 256" style={{ marginRight: ICON_SPACING, marginTop: 1 }}>
    <Path
      d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z"
      fill="#222"
    />
  </Svg>
)

const IconEmail = () => (
  <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 256 256" style={{ marginRight: ICON_SPACING, marginTop: 1 }}>
    <Path
      d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-96,85.15L52.57,64H203.43ZM98.71,128,40,181.81V74.19Zm11.84,10.85,12,11.05a8,8,0,0,0,10.82,0l12-11.05,58,53.15H52.57ZM157.29,128,216,74.18V181.82Z"
      fill="#222"
    />
  </Svg>
)

const IconPhone = () => (
  <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 256 256" style={{ marginRight: ICON_SPACING, marginTop: 1 }}>
    <Path
      d="M222.37,158.46l-47.11-21.11-.13-.06a16,16,0,0,0-15.17,1.4,8.12,8.12,0,0,0-.75.56L134.87,160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16,16,0,0,0,1.32-15.06l0-.12L97.54,33.64a16,16,0,0,0-16.62-9.52A56.26,56.26,0,0,0,32,80c0,79.4,64.6,144,144,144a56.26,56.26,0,0,0,55.88-48.92A16,16,0,0,0,222.37,158.46ZM176,208A128.14,128.14,0,0,1,48,80,40.2,40.2,0,0,1,82.87,40a.61.61,0,0,0,0,.12l21,47L83.2,111.86a6.13,6.13,0,0,0-.57.77,16,16,0,0,0-1,15.7c9.06,18.53,27.73,37.06,46.46,46.11a16,16,0,0,0,15.75-1.14,8.44,8.44,0,0,0,.74-.56L168.89,152l47,21.05h0s.08,0,.11,0A40.21,40.21,0,0,1,176,208Z"
      fill="#222"
    />
  </Svg>
)

const IconWeb = () => (
  <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 256 256" style={{ marginRight: ICON_SPACING, marginTop: 1 }}>
    <Path
      d="M128,24h0A104,104,0,1,0,232,128,104.12,104.12,0,0,0,128,24Zm88,104a87.61,87.61,0,0,1-3.33,24H174.16a157.44,157.44,0,0,0,0-48h38.51A87.61,87.61,0,0,1,216,128ZM102,168H154a115.11,115.11,0,0,1-26,45A115.27,115.27,0,0,1,102,168Zm-3.9-16a140.84,140.84,0,0,1,0-48h59.88a140.84,140.84,0,0,1,0,48ZM40,128a87.61,87.61,0,0,1,3.33-24H81.84a157.44,157.44,0,0,0,0,48H43.33A87.61,87.61,0,0,1,40,128ZM154,88H102a115.11,115.11,0,0,1,26-45A115.27,115.27,0,0,1,154,88Zm52.33,0H170.71a135.28,135.28,0,0,0-22.3-45.6A88.29,88.29,0,0,1,206.37,88ZM107.59,42.4A135.28,135.28,0,0,0,85.29,88H49.63A88.29,88.29,0,0,1,107.59,42.4ZM49.63,168H85.29a135.28,135.28,0,0,0,22.3,45.6A88.29,88.29,0,0,1,49.63,168Zm98.78,45.6a135.28,135.28,0,0,0,22.3-45.6h35.66A88.29,88.29,0,0,1,148.41,213.6Z"
      fill="#222"
    />
  </Svg>
)

const IconTech = () => (
  <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 256 256" style={{ marginRight: ICON_SPACING, marginTop: 1 }}>
    <Path
      d="M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29ZM162.73,32.48a8,8,0,0,0-10.25,4.79l-64,176a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,96,224a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,162.73,32.48Z"
      fill="#222"
    />
  </Svg>
)

const IconSkill = () => (
  <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 256 256" style={{ marginRight: ICON_SPACING, marginTop: 1 }}>
    <Path
      d="M239.18,97.26A16.38,16.38,0,0,0,224.92,86l-59-4.76L143.14,26.15a16.36,16.36,0,0,0-30.27,0L90.11,81.23,31.08,86a16.46,16.46,0,0,0-9.37,28.86l45,38.83L53,211.75a16.38,16.38,0,0,0,24.5,17.82L128,198.49l50.53,31.08A16.4,16.4,0,0,0,203,211.75l-13.76-58.07,45-38.83A16.43,16.43,0,0,0,239.18,97.26Zm-15.34,5.47-48.7,42a8,8,0,0,0-2.56,7.91l14.88,62.8a.37.37,0,0,1-.17.48c-.18.14-.23.11-.38,0l-54.72-33.65a8,8,0,0,0-8.38,0L69.09,215.94c-.15.09-.19.12-.38,0a.37.37,0,0,1-.17-.48l14.88-62.8a8,8,0,0,0-2.56-7.91l-48.7-42c-.12-.1-.23-.19-.13-.5s.18-.27.33-.29l63.92-5.16A8,8,0,0,0,103,91.86l24.62-59.61c.08-.17.11-.25.35-.25s.27.08.35.25L153,91.86a8,8,0,0,0,6.75,4.92l63.92,5.16c.15,0,.24,0,.33.29S224,102.63,223.84,102.73Z"
      fill="#2563EB"
    />
  </Svg>
)

// Success/Achievement Icons
const IconTrophy = () => (
  <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 256 256" style={{ marginRight: ICON_SPACING, marginTop: 1 }}>
    <Path
      d="M232,64H208V48a8,8,0,0,0-8-8H56a8,8,0,0,0-8,8V64H24A16,16,0,0,0,8,80V96a40,40,0,0,0,40,40h3.65A80.13,80.13,0,0,0,120,191.61V216H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16H136V191.58c31.94-3.23,58.44-25.64,68.08-55.58H208a40,40,0,0,0,40-40V80A16,16,0,0,0,232,64ZM48,120A24,24,0,0,1,24,96V80H48v32q0,4,.39,8Zm144-8.9c0,35.52-29,64.64-64,64.9a64,64,0,0,1-64-64V56H192ZM232,96a24,24,0,0,1-24,24h-.5a81.81,81.81,0,0,0,.5-8.9V80h24Z"
      fill="#2563EB"
    />
  </Svg>
)

const IconRocket = () => (
  <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 256 256" style={{ marginRight: ICON_SPACING, marginTop: 1 }}>
    <Path
      d="M152,224a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16h32A8,8,0,0,1,152,224ZM128,112a12,12,0,1,0-12-12A12,12,0,0,0,128,112Zm95.62,43.83-12.36,55.63a16,16,0,0,1-25.51,9.11L158.51,200h-61L70.25,220.57a16,16,0,0,1-25.51-9.11L32.38,155.83a16.09,16.09,0,0,1,3.32-13.71l28.56-34.26a123.07,123.07,0,0,1,8.57-36.67c12.9-32.34,36-52.63,45.37-59.85a16,16,0,0,1,19.6,0c9.34,7.22,32.47,27.51,45.37,59.85a123.07,123.07,0,0,1,8.57,36.67l28.56,34.26A16.09,16.09,0,0,1,223.62,155.83ZM99.43,184h57.14c21.12-37.54,25.07-73.48,11.74-106.88C156.55,47.64,134.49,29,128,24c-6.51,5-28.57,23.64-40.33,53.12C74.36,110.52,78.31,146.46,99.43,184Zm-15,5.85Q68.28,160.5,64.83,132.16L48,152.36,60.36,208l.18-.13ZM208,152.36l-16.83-20.2q-3.42,28.28-19.56,57.69l23.85,18,.18.13Z"
      fill="#2563EB"
    />
  </Svg>
)

const IconUsers = () => (
  <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 256 256" style={{ marginRight: ICON_SPACING, marginTop: 1 }}>
    <Path
      d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"
      fill="#2563EB"
    />
  </Svg>
)

const IconChip = () => (
  <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 256 256" style={{ marginRight: ICON_SPACING, marginTop: 1 }}>
    <Path
      d="M152,96H104a8,8,0,0,0-8,8v48a8,8,0,0,0,8,8h48a8,8,0,0,0,8-8V104A8,8,0,0,0,152,96Zm-8,48H112V112h32Zm88,0H216V112h16a8,8,0,0,0,0-16H216V56a16,16,0,0,0-16-16H160V24a8,8,0,0,0-16,0V40H112V24a8,8,0,0,0-16,0V40H56A16,16,0,0,0,40,56V96H24a8,8,0,0,0,0,16H40v32H24a8,8,0,0,0,0,16H40v40a16,16,0,0,0,16,16H96v16a8,8,0,0,0,16,0V216h32v16a8,8,0,0,0,16,0V216h40a16,16,0,0,0,16-16V160h16a8,8,0,0,0,0-16Zm-32,56H56V56H200v95.87s0,.09,0,.13,0,.09,0,.13V200Z"
      fill="#2563EB"
    />
  </Svg>
)

const IconChart = () => (
  <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 256 256" style={{ marginRight: ICON_SPACING, marginTop: 1 }}>
    <Path
      d="M224,200h-8V40a8,8,0,0,0-8-8H152a8,8,0,0,0-8,8V80H96a8,8,0,0,0-8,8v40H48a8,8,0,0,0-8,8v64H32a8,8,0,0,0,0,16H224a8,8,0,0,0,0-16ZM160,48h40V200H160ZM104,96h40V200H104ZM56,144H88v56H56Z"
      fill="#2563EB"
    />
  </Svg>
)

const IconTarget = () => (
  <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 256 256" style={{ marginRight: ICON_SPACING, marginTop: 1 }}>
    <Path
      d="M221.87,83.16A104.1,104.1,0,1,1,195.67,49l22.67-22.68a8,8,0,0,1,11.32,11.32l-96,96a8,8,0,0,1-11.32-11.32l27.72-27.72a40,40,0,1,0,17.87,31.09,8,8,0,1,1,16-.9,56,56,0,1,1-22.38-41.65L184.3,60.39a87.88,87.88,0,1,0,23.13,29.67,8,8,0,0,1,14.44-6.9Z"
      fill="#2563EB"
    />
  </Svg>
)


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
    marginBottom: 12,
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
    marginTop: 12,
    marginBottom: 8,
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
    marginBottom: 10,
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
  workSummary: {
    fontSize: 9,
    marginBottom: 5,
    lineHeight: 1.35,
  },
  highlights: {
    fontSize: 9,
    lineHeight: 1.35,
    marginBottom: 4,
  },
  highlightItem: {
    flexDirection: 'row',
    marginBottom: 3,
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
    borderLeft: `2px solid ${ACCENT}`,
    paddingLeft: 7.5,
    marginBottom: 8,
    minHeight: 0,
  },
  educationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  // Successes styles
  successItem: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'flex-start',
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

  // Filter highlights to max 4, excluding tech lines
  const filterHighlights = (highlights: string[] = []) => {
    return highlights
      .filter((h) => !h.startsWith('Tech:'))
      .slice(0, 4)
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
        </View>

        {/* Two-Column Layout */}
        <View style={styles.twoColumn}>
          {/* Left Column: Work Experience & Education */}
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
                    {job.summary && <Text style={styles.workSummary}>{job.summary}</Text>}
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

            {/* Education */}
            {resume.education && resume.education.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.h2}>EDUCATION</Text>
                {resume.education.map((edu, index) => (
                  <View key={index} style={styles.educationItem} wrap={false}>
                    <View style={styles.educationHeader}>
                      <View>
                        <Text style={styles.h3}>
                          {edu.studyType} in {edu.area}
                        </Text>
                        <Text style={styles.company}>{edu.institution}</Text>
                      </View>
                      <View style={styles.dateRail}>
                        {edu.startDate && (
                          <View>
                            <View style={styles.iconTextRow}>
                              <IconDate />
                              <Text style={styles.dateLocation}>
                                {edu.startDate}
                                {edu.endDate ? ` – ${edu.endDate}` : ''}
                              </Text>
                            </View>
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
                        )}
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Right Column: Summary, Successes, Skills, Languages */}
          <View style={styles.rightColumn}>
            {/* Summary */}
            {resume.basics.summary && (
              <View style={styles.section}>
                <Text style={styles.h2}>SUMMARY</Text>
                <Text style={styles.summary}>{resume.basics.summary}</Text>
              </View>
            )}

            {/* Successes */}
            {resume.successes && resume.successes.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.h2}>KEY ACHIEVEMENTS</Text>
                {resume.successes.map((success, index) => {
                  let IconComponent = null
                  if (success.icon === 'trophy') IconComponent = IconTrophy
                  else if (success.icon === 'rocket') IconComponent = IconRocket
                  else if (success.icon === 'users') IconComponent = IconUsers
                  else if (success.icon === 'chip') IconComponent = IconChip
                  else if (success.icon === 'chart') IconComponent = IconChart
                  else if (success.icon === 'target') IconComponent = IconTarget

                  return (
                    <View key={index} style={styles.successItem}>
                      <View style={{ width: ICON_SIZE + ICON_SPACING }}>
                        {IconComponent ? <IconComponent /> : null}
                      </View>
                      <View style={styles.successContent}>
                        <Text style={styles.successTitle}>{success.title}</Text>
                        <Text style={styles.successSummary}>{success.summary}</Text>
                      </View>
                    </View>
                  )
                })}
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
                          {parseInt(project.startDate.split('-')[0])}
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
