const fs = require('fs')
const path = require('path')

const icons = [
  { name: 'Calendar', var: 'CALENDAR' },
  { name: 'MapPin', var: 'MAP_PIN' },
  { name: 'Envelope', var: 'ENVELOPE' },
  { name: 'Phone', var: 'PHONE' },
  { name: 'Globe', var: 'GLOBE' },
  { name: 'Code', var: 'CODE' },
  { name: 'Star', var: 'STAR' },
  { name: 'Trophy', var: 'TROPHY' },
  { name: 'Rocket', var: 'ROCKET' },
  { name: 'Users', var: 'USERS' },
  { name: 'Cpu', var: 'CPU' },
  { name: 'ChartBar', var: 'CHART_BAR' },
  { name: 'Target', var: 'TARGET' },
  { name: 'GitBranch', var: 'GIT' },
  { name: 'Shield', var: 'SHIELD' },
  { name: 'Stack', var: 'LAYERS' },
]

const nodeModulesPath = path.join(__dirname, '..', 'node_modules/@phosphor-icons/react/dist')

const paths = {}

icons.forEach(({ name, var: varName }) => {
  const defsFile = path.join(nodeModulesPath, 'defs', `${name}.es.js`)

  if (fs.existsSync(defsFile)) {
    const content = fs.readFileSync(defsFile, 'utf-8')
    // Match all path d attributes in the fill variant
    const pathMatches = content.matchAll(/"fill"[^]*?d:\s*"([^"]+)"/g)
    const allPaths = Array.from(pathMatches).map(m => m[1])
    if (allPaths.length > 0) {
      // For icons with multiple paths, combine them (Stack has 3 paths)
      paths[varName] = allPaths.join(' ')
    } else {
      console.warn(`⚠️  Could not extract fill path for ${name}`)
      paths[varName] = '' // fallback empty path
    }
  } else {
    console.warn(`⚠️  Icon file not found: ${defsFile}`)
    paths[varName] = '' // fallback empty path
  }
})

const output = `// Auto-generated Phosphor icon fill paths
// Run: node scripts/generate-phosphor-paths.js

export const PHOSPHOR_FILL_PATHS = {
${Object.entries(paths)
  .map(([key, value]) => `  ${key}: "${value}",`)
  .join('\n')}
} as const

export type PhosphorIconName = keyof typeof PHOSPHOR_FILL_PATHS
`

fs.writeFileSync(
  path.join(__dirname, '..', 'components/phosphor-paths.ts'),
  output
)

console.log(`✅ Generated fill paths for ${Object.keys(paths).length} icons`)

