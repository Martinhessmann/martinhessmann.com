import path from 'path'
import React from 'react'
import {
  Document,
  Font,
  Image,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'
import type { HiringDeckSlide, SlideImage, SlideMetaItem } from '@/lib/hiring-deck'

Font.registerHyphenationCallback((word) => [word])

const FONT_DIR = path.join(process.cwd(), 'public', 'fonts')

Font.register({
  family: 'SlidesSans',
  fonts: [
    { src: `${FONT_DIR}/TeXGyreHeros-Regular.woff2` },
    { src: `${FONT_DIR}/TeXGyreHeros-Bold.woff2`, fontWeight: 'bold' },
  ],
})

Font.register({
  family: 'SlidesSerif',
  fonts: [{ src: `${FONT_DIR}/HedvigLettersSerif-24ptRegular.woff2` }],
})

const PAGE_SIZE: [number, number] = [960, 540]
const COLORS = {
  sand: '#F8F5EF',
  sandStrong: '#E4D5C2',
  ink: '#23211E',
  inkSoft: '#5D584F',
  midnight: '#181823',
  white: '#FFFFFF',
  card: 'rgba(255,255,255,0.92)',
  border: 'rgba(35,33,30,0.10)',
}

const styles = StyleSheet.create({
  page: {
    position: 'relative',
    paddingTop: 28,
    paddingRight: 32,
    paddingBottom: 32,
    paddingLeft: 32,
    backgroundColor: COLORS.sand,
    color: COLORS.ink,
    fontFamily: 'SlidesSans',
  },
  accentOrb: {
    position: 'absolute',
    width: 176,
    height: 176,
    borderRadius: 999,
    right: -52,
    top: -52,
    opacity: 0.2,
  },
  accentBar: {
    position: 'absolute',
    right: 40,
    top: 0,
    width: 160,
    height: 8,
    borderBottomLeftRadius: 999,
    borderBottomRightRadius: 999,
  },
  frame: {
    flex: 1,
  },
  label: {
    alignSelf: 'flex-start',
    paddingTop: 6,
    paddingRight: 14,
    paddingBottom: 6,
    paddingLeft: 14,
    borderRadius: 999,
    backgroundColor: COLORS.midnight,
    color: COLORS.white,
    fontSize: 9,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  card: {
    backgroundColor: COLORS.white,
    border: `1 solid ${COLORS.border}`,
    borderRadius: 22,
    paddingTop: 16,
    paddingRight: 18,
    paddingBottom: 16,
    paddingLeft: 18,
  },
  cardTight: {
    backgroundColor: COLORS.white,
    border: `1 solid ${COLORS.border}`,
    borderRadius: 18,
    paddingTop: 12,
    paddingRight: 14,
    paddingBottom: 12,
    paddingLeft: 14,
  },
  title: {
    fontFamily: 'SlidesSerif',
    fontSize: 34,
    lineHeight: 1.02,
    color: COLORS.ink,
  },
  titleLarge: {
    fontFamily: 'SlidesSerif',
    fontSize: 48,
    lineHeight: 0.96,
    color: COLORS.ink,
  },
  paragraph: {
    fontSize: 13,
    lineHeight: 1.55,
    color: COLORS.ink,
  },
  paragraphSoft: {
    fontSize: 11.5,
    lineHeight: 1.55,
    color: COLORS.inkSoft,
  },
  eyebrow: {
    fontSize: 8.5,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    color: COLORS.inkSoft,
  },
  row: {
    flexDirection: 'row',
    gap: 14,
  },
  column: {
    flexDirection: 'column',
    gap: 14,
  },
  grow: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  imageCard: {
    backgroundColor: COLORS.white,
    border: `1 solid ${COLORS.border}`,
    borderRadius: 22,
    overflow: 'hidden',
  },
  imageWrap: {
    paddingTop: 12,
    paddingRight: 12,
    paddingBottom: 0,
    paddingLeft: 12,
  },
  image: {
    width: '100%',
    height: 200,
    objectFit: 'contain',
    backgroundColor: '#FCFBF8',
    borderRadius: 14,
  },
  imageCover: {
    width: '100%',
    height: 200,
    objectFit: 'cover',
    backgroundColor: '#FCFBF8',
    borderRadius: 14,
  },
  imageCaption: {
    borderTop: `1 solid ${COLORS.border}`,
    paddingTop: 10,
    paddingRight: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    fontSize: 9.5,
    lineHeight: 1.45,
    color: COLORS.inkSoft,
  },
  factsGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  factCard: {
    flexGrow: 1,
    flexBasis: 0,
  },
  metaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  metaCard: {
    width: '31.8%',
  },
  metaValue: {
    fontSize: 11,
    lineHeight: 1.5,
    color: COLORS.ink,
    marginTop: 6,
  },
  metaLink: {
    fontSize: 11,
    lineHeight: 1.5,
    color: COLORS.ink,
    marginTop: 6,
    textDecoration: 'underline',
  },
  pillarGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  pillarCard: {
    flexGrow: 1,
    flexBasis: 0,
    minHeight: 110,
  },
  pillarTitle: {
    fontFamily: 'SlidesSerif',
    fontSize: 20,
    lineHeight: 1.08,
    color: COLORS.ink,
    marginTop: 8,
  },
  imageRow: {
    flexDirection: 'row',
    gap: 12,
  },
  imageHalf: {
    flexGrow: 1,
    flexBasis: 0,
  },
  imageStack: {
    flexGrow: 1,
    flexBasis: 0,
    gap: 12,
  },
  capabilityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  capabilityCard: {
    width: '48.6%',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingTop: 7,
    paddingRight: 10,
    paddingBottom: 7,
    paddingLeft: 10,
    borderRadius: 999,
    backgroundColor: '#FBF8F2',
    border: `1 solid ${COLORS.border}`,
    fontSize: 9.5,
    color: COLORS.inkSoft,
  },
  contactGrid: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  contactCard: {
    width: '48.6%',
  },
})

function PdfCard({
  children,
  tight = false,
  style,
}: {
  children: React.ReactNode
  tight?: boolean
  style?: object | object[]
}) {
  const baseStyle = tight ? styles.cardTight : styles.card
  const composedStyle = style ? [baseStyle, ...(Array.isArray(style) ? style : [style])] : [baseStyle]
  return <View style={composedStyle as any}>{children}</View>
}

function renderMetaItems(items: SlideMetaItem[]) {
  if (items.length === 0) return null

  return (
    <View style={styles.metaGrid}>
      {items.map((item) => (
        <PdfCard key={item.label} tight style={styles.metaCard}>
          <Text style={styles.eyebrow}>{item.label}</Text>
          {item.values.map((value, index) => {
            const href = item.hrefs?.[index]
            return href ? (
              <Link key={`${item.label}-${value}`} src={href} style={styles.metaLink}>
                {value}
              </Link>
            ) : (
              <Text key={`${item.label}-${value}`} style={styles.metaValue}>
                {value}
              </Text>
            )
          })}
        </PdfCard>
      ))}
    </View>
  )
}

function PdfImageCard({
  image,
  cover = false,
  style,
}: {
  image: SlideImage
  cover?: boolean
  style?: object | object[]
}) {
  const composedStyle = style ? [styles.imageCard, ...(Array.isArray(style) ? style : [style])] : [styles.imageCard]
  return (
    <View style={composedStyle as any}>
      <View style={styles.imageWrap}>
        <Image src={image.src} style={cover ? styles.imageCover : styles.image} />
      </View>
      {image.caption ? <Text style={styles.imageCaption}>{image.caption}</Text> : null}
    </View>
  )
}

function renderImageGrid(images: SlideImage[]) {
  if (images.length === 0) return null
  if (images.length === 1) {
    return <PdfImageCard image={images[0]} />
  }
  if (images.length === 2) {
    return (
      <View style={styles.imageRow}>
        {images.map((image) => (
          <PdfImageCard key={`${image.src}-${image.caption ?? image.alt}`} image={image} style={styles.imageHalf} />
        ))}
      </View>
    )
  }

  return (
    <View style={styles.imageRow}>
      <PdfImageCard image={images[0]} style={[styles.imageHalf, { minHeight: 280 }]} />
      <View style={styles.imageStack}>
        {images.slice(1, 3).map((image) => (
          <PdfImageCard key={`${image.src}-${image.caption ?? image.alt}`} image={image} style={{ minHeight: 134 }} />
        ))}
      </View>
    </View>
  )
}

function renderCover(slide: Extract<HiringDeckSlide, { kind: 'cover' }>) {
  return (
    <View style={styles.row}>
      <View style={[styles.column, styles.grow]}>
        <PdfCard>
          <Text style={styles.titleLarge}>{slide.title}</Text>
        </PdfCard>
        <View style={styles.factsGrid}>
          {slide.factCards.map((fact) => (
            <PdfCard key={fact.label} tight style={styles.factCard}>
              <Text style={styles.eyebrow}>{fact.label}</Text>
              <Text style={[styles.metaValue, { fontSize: 14, marginTop: 8 }]}>{fact.value}</Text>
            </PdfCard>
          ))}
        </View>
        <PdfCard>
          <Text style={styles.paragraph}>{slide.paragraph}</Text>
        </PdfCard>
      </View>
      <View style={[styles.grow, { maxWidth: 360 }]}>
        <PdfImageCard image={slide.images[0]} cover />
      </View>
    </View>
  )
}

function renderUsp(slide: Extract<HiringDeckSlide, { kind: 'usp' }>) {
  return (
    <View style={styles.column}>
      <View style={styles.row}>
        <PdfCard style={styles.grow}>
          <Text style={styles.title}>{slide.title}</Text>
        </PdfCard>
        <PdfCard style={styles.grow}>
          <Text style={styles.paragraph}>{slide.paragraph}</Text>
        </PdfCard>
      </View>
      <View style={styles.pillarGrid}>
        {slide.pillars.map((pillar) => (
          <PdfCard key={pillar.title} style={styles.pillarCard}>
            <Text style={styles.eyebrow}>{pillar.title}</Text>
            <Text style={styles.pillarTitle}>{pillar.description}</Text>
          </PdfCard>
        ))}
      </View>
      <View style={styles.imageRow}>
        {slide.images.slice(0, 3).map((image) => (
          <PdfImageCard key={image.src} image={image} cover style={styles.imageHalf} />
        ))}
      </View>
    </View>
  )
}

function renderCaseIntro(slide: Extract<HiringDeckSlide, { kind: 'caseIntro' }>) {
  return (
    <View style={styles.row}>
      <View style={[styles.column, styles.grow]}>
        <PdfCard>
          <Text style={[styles.eyebrow, { color: slide.theme.label }]}>{slide.accountLine}</Text>
          <Text style={[styles.title, { marginTop: 10 }]}>{slide.title}</Text>
        </PdfCard>
        <PdfCard>
          <Text style={styles.paragraph}>{slide.paragraph}</Text>
        </PdfCard>
        <PdfCard>
          <Text style={styles.eyebrow}>Role summary</Text>
          <Text style={[styles.paragraphSoft, { marginTop: 8, color: COLORS.ink }]}>{slide.roleSummary}</Text>
        </PdfCard>
        {renderMetaItems(slide.meta)}
      </View>
      <View style={[styles.grow, { maxWidth: 360 }]}>
        <PdfImageCard image={slide.images[0]} />
      </View>
    </View>
  )
}

function renderCaseDetail(slide: Extract<HiringDeckSlide, { kind: 'caseDetail' }>) {
  return (
    <View style={styles.column}>
      <View style={styles.row}>
        <PdfCard style={styles.grow}>
          <Text style={[styles.eyebrow, { color: slide.theme.label }]}>{slide.eyebrow}</Text>
          <Text style={[styles.title, { marginTop: 10 }]}>{slide.title}</Text>
        </PdfCard>
        <PdfCard style={styles.grow}>
          <Text style={styles.paragraph}>{slide.paragraph}</Text>
        </PdfCard>
      </View>
      {renderMetaItems(slide.meta)}
      {renderImageGrid(slide.images.slice(0, 3))}
    </View>
  )
}

function renderProfile(slide: Extract<HiringDeckSlide, { kind: 'profile' }>) {
  return (
    <View style={styles.column}>
      <View style={styles.row}>
        <PdfCard style={styles.grow}>
          <Text style={styles.title}>{slide.title}</Text>
        </PdfCard>
        <PdfCard style={styles.grow}>
          <Text style={styles.paragraph}>{slide.paragraph}</Text>
        </PdfCard>
      </View>
      <View style={styles.row}>
        <View style={[styles.column, styles.grow]}>
          <View style={styles.capabilityGrid}>
            {slide.capabilities.map((capability) => (
              <PdfCard key={capability.title} style={styles.capabilityCard}>
                <Text style={[styles.title, { fontSize: 20 }]}>{capability.title}</Text>
                <Text style={[styles.paragraphSoft, { marginTop: 8 }]}>{capability.description}</Text>
              </PdfCard>
            ))}
          </View>
          <PdfCard>
            <Text style={styles.eyebrow}>Selected organisations</Text>
            <View style={[styles.chipRow, { marginTop: 10 }]}>
              {slide.logos.map((logo) => (
                <Text key={logo.id} style={styles.chip}>
                  {logo.name}
                </Text>
              ))}
            </View>
          </PdfCard>
        </View>
        <View style={[styles.column, { width: 280 }]}>
          {slide.images.slice(0, 3).map((image) => (
            <PdfImageCard key={image.src} image={image} cover />
          ))}
        </View>
      </View>
    </View>
  )
}

function renderContact(slide: Extract<HiringDeckSlide, { kind: 'contact' }>) {
  return (
    <View style={styles.row}>
      <View style={[styles.column, styles.grow]}>
        <PdfCard>
          <Text style={styles.title}>{slide.title}</Text>
        </PdfCard>
        <PdfCard>
          <Text style={styles.paragraph}>{slide.paragraph}</Text>
        </PdfCard>
        <View style={styles.contactGrid}>
          {slide.links.map((item) => (
            <PdfCard key={item.label} tight style={styles.contactCard}>
              <Text style={styles.eyebrow}>{item.label}</Text>
              {item.values.map((value, index) => {
                const href = item.hrefs?.[index]
                return href ? (
                  <Link key={`${item.label}-${value}`} src={href} style={styles.metaLink}>
                    {value}
                  </Link>
                ) : (
                  <Text key={`${item.label}-${value}`} style={styles.metaValue}>
                    {value}
                  </Text>
                )
              })}
            </PdfCard>
          ))}
        </View>
      </View>
      <View style={[styles.column, { width: 320 }]}>
        {slide.images.slice(0, 2).map((image, index) => (
          <PdfImageCard key={image.src} image={image} cover style={index === 0 ? { minHeight: 248 } : undefined} />
        ))}
      </View>
    </View>
  )
}

function renderSlide(slide: HiringDeckSlide) {
  switch (slide.kind) {
    case 'cover':
      return renderCover(slide)
    case 'usp':
      return renderUsp(slide)
    case 'caseIntro':
      return renderCaseIntro(slide)
    case 'caseDetail':
      return renderCaseDetail(slide)
    case 'profile':
      return renderProfile(slide)
    case 'contact':
      return renderContact(slide)
  }
}

function getAccent(slide: HiringDeckSlide) {
  switch (slide.kind) {
    case 'caseIntro':
    case 'caseDetail':
      return slide.theme.accent
    case 'cover':
      return '#A1A1FA'
    case 'usp':
      return '#FABBF9'
    case 'profile':
      return '#A1A1FA'
    case 'contact':
      return '#FABBF9'
  }
}

export function SlidesPdf({ slides }: { slides: HiringDeckSlide[] }) {
  return (
    <Document title="Martin Hessmann Hiring Deck" author="Martin Heßmann">
      {slides.map((slide) => {
        const accent = getAccent(slide)
        return (
          <Page key={slide.id} size={PAGE_SIZE} style={styles.page}>
            <View style={[styles.accentOrb, { backgroundColor: accent }]} />
            <View style={[styles.accentBar, { backgroundColor: accent }]} />
            <View style={styles.frame}>
              <Text style={styles.label}>{slide.label}</Text>
              {renderSlide(slide)}
            </View>
          </Page>
        )
      })}
    </Document>
  )
}
