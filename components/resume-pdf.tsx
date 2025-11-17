import React from 'react'
import { Document, Page, View, Text, Link, StyleSheet, Font } from '@react-pdf/renderer'
import { Resume } from '@/types/resume'

// Create styles matching print CSS
// React-PDF uses points (pt) as default unit - numbers are treated as points
// Base font size is 10pt, so: 1rem = 10pt, 0.75rem = 7.5pt, 0.5rem = 5pt, etc.
// Accent color for section cues and links
const ACCENT = '#2563EB' // Blue 600-ish

const styles = StyleSheet.create({
  page: {
    padding: '28.35 42.52', // 1cm = 28.35pt, 1.5cm = 42.52pt
    fontSize: 10,
    lineHeight: 1.25,
    fontFamily: 'Helvetica',
    color: '#000',
  },
  header: {
    marginBottom: 10, // 1rem = 10pt
  },
  h1: {
    fontSize: 20,
    marginBottom: 2.5, // 0.25rem = 2.5pt
    lineHeight: 1.2,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 11,
    marginBottom: 5, // 0.5rem = 5pt
    color: '#555',
  },
  summary: {
    fontSize: 9,
    marginBottom: 5, // 0.5rem = 5pt
    lineHeight: 1.25,
  },
  contact: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7.5, // 0.75rem = 7.5pt
    fontSize: 9,
    marginTop: 5, // 0.5rem = 5pt
    color: '#555',
  },
  section: {
    marginBottom: 10, // 1rem = 10pt
  },
  h2: {
    fontSize: 13,
    marginBottom: 6, // 0.6rem = 6pt
    marginTop: 7.5, // 0.75rem = 7.5pt
    fontWeight: 'bold',
    color: ACCENT, // Introduce color instead of underline
  },
  workItem: {
    borderLeft: `2px solid ${ACCENT}`,
    paddingLeft: 7.5, // 0.75rem = 7.5pt
    marginBottom: 7.5, // 0.75rem = 7.5pt
    minHeight: 0, // Allow React-PDF to calculate
  },
  workHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5, // 0.5rem = 5pt
  },
  workHeaderLeft: {
    flex: 1,
  },
  h3: {
    fontSize: 11,
    marginBottom: 2.5, // 0.25rem = 2.5pt
    fontWeight: 'bold',
  },
  company: {
    fontSize: 9,
    color: '#555',
  },
  date: {
    fontSize: 9,
    color: '#555',
  },
  workSummary: {
    fontSize: 9,
    marginBottom: 5, // 0.5rem = 5pt
    lineHeight: 1.25,
  },
  highlights: {
    fontSize: 9,
    lineHeight: 1.25,
  },
  highlightItem: {
    flexDirection: 'row',
    marginBottom: 3, // 0.3rem = 3pt
  },
  bullet: {
    marginRight: 5, // 0.5rem = 5pt
    color: '#555',
  },
  projectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5, // 0.5rem = 5pt
  },
  projectItem: {
    width: '48%',
    borderLeft: `2px solid ${ACCENT}`,
    paddingLeft: 7.5, // 0.75rem = 7.5pt
    marginBottom: 6, // 0.6rem = 6pt
    paddingTop: 3, // 0.3rem = 3pt
    paddingBottom: 3, // 0.3rem = 3pt
    minHeight: 0, // Allow React-PDF to calculate
  },
  projectName: {
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 2, // 0.2rem = 2pt
  },
  projectUrl: {
    fontSize: 8,
    color: '#555',
    marginBottom: 2, // 0.2rem = 2pt
  },
  projectDescription: {
    fontSize: 9,
    color: '#555',
    marginBottom: 3, // 0.3rem = 3pt
    lineHeight: 1.25,
  },
  projectKeywords: {
    fontSize: 8,
    color: '#555',
    lineHeight: 1.25,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7.5, // 0.75rem = 7.5pt
  },
  skillItem: {
    width: '48%',
    marginBottom: 6, // 0.6rem = 6pt
  },
  skillName: {
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 2, // 0.2rem = 2pt
  },
  skillKeywords: {
    fontSize: 8,
    color: '#555',
  },
  educationItem: {
    borderLeft: `2px solid ${ACCENT}`,
    paddingLeft: 7.5, // 0.75rem = 7.5pt
    marginBottom: 5, // 0.5rem = 5pt
    minHeight: 0, // Allow React-PDF to calculate
  },
  educationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5, // 0.5rem = 5pt
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4, // 0.4rem = 4pt
  },
  languageName: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  languageFluency: {
    fontSize: 8,
    color: '#555',
  },
  interestItem: {
    width: '48%',
    marginBottom: 6, // 0.6rem = 6pt
  },
  interestName: {
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 2, // 0.2rem = 2pt
  },
  interestKeywords: {
    fontSize: 8,
    color: '#555',
  },
  link: {
    color: ACCENT,
    textDecoration: 'none',
  },
})

interface ResumePdfProps {
  resume: Resume
}

export function ResumePdf({ resume }: ResumePdfProps) {
  // Sort projects alphabetically
  const sortedProjects = resume.projects
    ? [...resume.projects].sort((a, b) =>
        (a.name || '').localeCompare(b.name || '', undefined, { sensitivity: 'base' })
      )
    : []

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.h1}>{resume.basics.name}</Text>
          {resume.basics.label && <Text style={styles.label}>{resume.basics.label}</Text>}
          {resume.basics.summary && <Text style={styles.summary}>{resume.basics.summary}</Text>}
          <View style={styles.contact}>
            {resume.basics.location && (
              <Text>
                {resume.basics.location.city || ''}
                {resume.basics.location.city && resume.basics.location.countryCode && ', '}
                {resume.basics.location.countryCode || ''}
              </Text>
            )}
            {resume.basics.email && (
              <Link src={`mailto:${resume.basics.email}`} style={styles.link}>
                {resume.basics.email}
              </Link>
            )}
            {resume.basics.phone && (
              <Link src={`tel:${resume.basics.phone}`} style={styles.link}>
                {resume.basics.phone}
              </Link>
            )}
            {resume.basics.url && (
              <Link src={resume.basics.url} style={styles.link}>
                {resume.basics.url}
              </Link>
            )}
          </View>
        </View>

        {/* Work Experience */}
        {resume.work && resume.work.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.h2}>Work Experience</Text>
            {resume.work.map((job, index) => (
              <View key={index} style={styles.workItem} wrap={false}>
                <View style={styles.workHeader}>
                  <View style={styles.workHeaderLeft}>
                    <Text style={styles.h3}>{job.position}</Text>
                    <Text style={styles.company}>{job.name}</Text>
                  </View>
                  {job.startDate && (
                    <Text style={styles.date}>
                      {job.startDate}
                      {job.endDate ? ` - ${job.endDate}` : ' - Present'}
                    </Text>
                  )}
                </View>
                {job.summary && <Text style={styles.workSummary}>{job.summary}</Text>}
                {job.highlights && job.highlights.length > 0 && (
                  <View style={styles.highlights}>
                    {job.highlights.map((highlight, highlightIndex) => (
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

        {/* Projects */}
        {sortedProjects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.h2}>Projects</Text>
            <View style={styles.projectsGrid}>
              {sortedProjects.map((project, index) => (
                <View key={index} style={styles.projectItem} wrap={false}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
                    <Text style={styles.projectName}>{project.name}</Text>
                    {project.startDate && (
                      <Text style={styles.projectUrl}>
                        since {parseInt(project.startDate.split('-')[0])}
                      </Text>
                    )}
                  </View>
                  {project.url && (
                    <Link src={project.url} style={[styles.projectUrl, styles.link]}>
                      {project.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                    </Link>
                  )}
                  {project.description && (
                    <Text style={styles.projectDescription}>{project.description}</Text>
                  )}
                  {project.keywords && project.keywords.length > 0 && (
                    <Text style={styles.projectKeywords}>
                      {project.keywords
                        .filter((keyword) => keyword !== project.entity)
                        .join(' • ')}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Skills */}
        {resume.skills && resume.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.h2}>Skills</Text>
            <View style={styles.skillsGrid}>
              {resume.skills.map((skill, index) => (
                <View key={index} style={styles.skillItem}>
                  <Text style={styles.skillName}>{skill.name}</Text>
                  {skill.keywords && skill.keywords.length > 0 && (
                    <Text style={styles.skillKeywords}>{skill.keywords.join(', ')}</Text>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Education */}
        {resume.education && resume.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.h2}>Education</Text>
            {resume.education.map((edu, index) => (
              <View key={index} style={styles.educationItem} wrap={false}>
                <View style={styles.educationHeader}>
                  <View>
                    <Text style={styles.h3}>
                      {edu.studyType} in {edu.area}
                    </Text>
                    <Text style={styles.company}>{edu.institution}</Text>
                  </View>
                  {edu.startDate && (
                    <Text style={styles.date}>
                      {edu.startDate}
                      {edu.endDate ? ` - ${edu.endDate}` : ''}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Languages */}
        {resume.languages && resume.languages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.h2}>Languages</Text>
            {resume.languages.map((lang, index) => (
              <View key={index} style={styles.languageItem}>
                <Text style={styles.languageName}>{lang.language}</Text>
                <Text style={styles.languageFluency}>{lang.fluency}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Interests */}
        {resume.interests && resume.interests.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.h2}>Interests</Text>
            <View style={styles.skillsGrid}>
              {resume.interests.map((interest, index) => (
                <View key={index} style={styles.interestItem}>
                  <Text style={styles.interestName}>{interest.name}</Text>
                  {interest.keywords && interest.keywords.length > 0 && (
                    <Text style={styles.interestKeywords}>{interest.keywords.join(', ')}</Text>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  )
}
