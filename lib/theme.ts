export const theme = {
  font: {
    family: {
      mono: 'Commit Mono',
      system: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    size: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem' // 30px
    },
    lineHeight: {
      tight: '1.25',
      base: '1.5',
      relaxed: '1.75'
    }
  },
  spacing: {
    0: '0',
    px: '1px',
    0.5: '0.125rem',  // 2px
    1: '0.25rem',     // 4px
    2: '0.5rem',      // 8px
    3: '0.75rem',     // 12px
    4: '1rem',        // 16px
    5: '1.25rem',     // 20px
    6: '1.5rem'       // 24px
  },
  radius: {
    sm: 'var(--radius)',
    DEFAULT: 'calc(var(--radius) * 1.5)',
    lg: 'calc(var(--radius) * 2)'
  },
  transition: {
    DEFAULT: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)'
  },
  window: {
    minWidth: '320px',
    minHeight: '200px',
    headerHeight: '2.5rem',
    padding: {
      header: '0.5rem 0.75rem',
      content: '1rem'
    }
  },
  grid: {
    gap: {
      sm: '0.5rem',
      DEFAULT: '1rem',
      lg: '1.5rem'
    },
    columns: {
      sm: 1,
      md: 2,
      lg: 3,
      xl: 4
    }
  }
} as const

export type Theme = typeof theme