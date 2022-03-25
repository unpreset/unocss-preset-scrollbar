import type { Preset } from 'unocss'
import { colorResolver } from '@unocss/preset-mini/utils'
import { toEscapedSelector as e } from './utils'
const defaultOption: Required<PresetScrollbarDefaultOption> = {
  scrollbarWidth: '8px',
  scrollbarHeight: '8px',
  scrollbarTrackRadius: '4px',
  scrollbarThumbRadius: '4px',
  scrollbarTrackColor: '#f5f5f5',
  scrollbarThumbColor: '#ddd',
  numberToUnit: value => `${value / 4}rem`,
}

export interface PresetScrollbarDefaultOption {
  scrollbarWidth?: string
  scrollbarHeight?: string
  scrollbarTrackRadius?: string
  scrollbarThumbRadius?: string
  scrollbarTrackColor?: string
  scrollbarThumbColor?: string
  numberToUnit?: (value: number) => string
}

const customRules = {
  'radius': ['--scrollbar-track-raidus', '--scrollbar-thumb-raidus'],
  'w': ['--scrollbar-width'],
  'h': ['--scrollbar-height'],
  'track-radius': ['--scrollbar-track-raidus'],
  'thumb-radius': ['--scrollbar-thumb-raidus'],
}

const numberVarRegex = new RegExp(`^scrollbar-(${Object.keys(customRules).join('|')})-(\\d+?)([a-zA-Z]*?)$`)

export function presetScrollbar(option?: PresetScrollbarDefaultOption): Preset {
  const config = {
    ...defaultOption,
    ...option,
  }
  return {
    name: 'unocss-preset-scrollbar',
    rules: [
      [/^scrollbar$/, ([_], { rawSelector }) => {
        return `
  ${e(rawSelector)} {
    --scrollbar-track: ${config.scrollbarTrackColor};
    --scrollbar-thumb: ${config.scrollbarThumbColor};
    --scrollbar-width: ${config.scrollbarWidth};
    --scrollbar-height: ${config.scrollbarHeight};
    --scrollbar-track-raidus: ${config.scrollbarTrackRadius};
    --scrollbar-thumb-raidus: ${config.scrollbarThumbRadius};
    overflow: auto;
    scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
  }
  ${e(rawSelector)}::-webkit-scrollbar-track {
    background: var(--scrollbar-track);
  }
  ${e(rawSelector)}::-webkit-scrollbar-thumb {
    background: var(--scrollbar-thumb);
  }
  ${e(rawSelector)}::-webkit-scrollbar {
    width: var(--scrollbar-width);
    height: var(--scrollbar-height);
  }
`
      },
      ],
      [/^scrollbar-rounded$/, ([_], { rawSelector }) => {
        return `
  ${e(rawSelector)}::-webkit-scrollbar-track {
      border-radius: var(--scrollbar-track-raidus);
    }
  ${e(rawSelector)}::-webkit-scrollbar-thumb {
    border-radius: var(--scrollbar-thumb-raidus);
  }
`
      }],
      [/^scrollbar-thumb-color-(.+)$/, colorResolver('--scrollbar-thumb', 'scrollbar-thumb')],
      [/^scrollbar-track-color-(.+)$/, colorResolver('--scrollbar-track', 'scrollbar-track')],
      [numberVarRegex, ([_, type, value, unit]) => {
        const val = unit ? value + unit : config.numberToUnit(parseInt(value))
        const vars = customRules[type as keyof typeof customRules]
        return vars.reduce((acc: any, v) => {
          acc[v] = val
          return acc
        }, {})
      }],
    ],
  }
}
