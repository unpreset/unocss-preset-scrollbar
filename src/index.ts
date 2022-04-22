import type { Preset } from 'unocss'
import { colorResolver } from '@unocss/preset-mini/utils'
import { toEscapedSelector as e } from 'unocss'
const defaultOption: Required<PresetScrollbarDefaultOption> = {
  scrollbarWidth: '8px',
  scrollbarHeight: '8px',
  scrollbarTrackRadius: '4px',
  scrollbarThumbRadius: '4px',
  scrollbarTrackColor: '#f5f5f5',
  scrollbarThumbColor: '#ddd',
  varPrefix: '',
  numberToUnit: value => `${value / 4}rem`,
}

export interface PresetScrollbarDefaultOption {
  /**
   * scrollbar width
   * @default '8px'
   */
  scrollbarWidth?: string
  /**
   * scrollbar height
   * @default '8px'
   */
  scrollbarHeight?: string
  /**
   * scrollbar track radius
   * @default '4px'
   */
  scrollbarTrackRadius?: string
  /**
   * scrollbar thumb radius
   * @default '4px'
   */
  scrollbarThumbRadius?: string
  /**
   * scrollbar track background color
   * @default '#f5f5f5'
   */
  scrollbarTrackColor?: string
  /**
   * scrollbar thumb background color
   * @default '#ddd'
   */
  scrollbarThumbColor?: string
  /**
   * css variable prefix
   * @default ''
   */
  varPrefix?: string
  /**
   * convert number to unit
   * @default value => `${value / 4}rem`
   * @example
   * numberToUnit: value => `${value / 4}rem`
   * p-4 => padding: 1rem
   * p-4px => padding: 4px
   *
   * @example
   * numberToUnit: value => `${value}rpx`
   * p-4 => padding: 4rpx
   */
  numberToUnit?: (value: number) => string
}

const customRules = {
  'radius': ['track-radius', 'thumb-radius'],
  'w': ['width'],
  'h': ['height'],
  'track-radius': ['track-radius'],
  'thumb-radius': ['thumb-radius'],
}

const numberVarRegex = new RegExp(`^scrollbar-(${Object.keys(customRules).join('|')})-(\\d+?)([a-zA-Z]*?)$`)

export function presetScrollbar(option?: PresetScrollbarDefaultOption): Preset {
  const config = {
    ...defaultOption,
    ...option,
  }

  function resolveVar(name: string) {
    const prefix = config.varPrefix
    return `--${prefix ? `${prefix}-` : ''}scrollbar-${name}`
  }

  return {
    name: 'unocss-preset-scrollbar',
    rules: [
      [/^scrollbar$/, ([_], { rawSelector }) => {
        return `
  ${e(rawSelector)} {
    ${resolveVar('track')}: ${config.scrollbarTrackColor};
    ${resolveVar('thumb')}: ${config.scrollbarThumbColor};
    ${resolveVar('width')}: ${config.scrollbarWidth};
    ${resolveVar('height')}: ${config.scrollbarHeight};
    ${resolveVar('track-radius')}: ${config.scrollbarTrackRadius};
    ${resolveVar('thumb-radius')}: ${config.scrollbarThumbRadius};
    overflow: auto;
    scrollbar-color: var(${resolveVar('thumb')}) var(${resolveVar('track')});
  }
  ${e(rawSelector)}::-webkit-scrollbar-track {
    background: var(${resolveVar('track')});
  }
  ${e(rawSelector)}::-webkit-scrollbar-thumb {
    background: var(${resolveVar('thumb')});
  }
  ${e(rawSelector)}::-webkit-scrollbar {
    width: var(${resolveVar('width')});
    height: var(${resolveVar('height')});
  }
`
      },
      ],
      [/^scrollbar-rounded$/, ([_], { rawSelector }) => {
        return `
  ${e(rawSelector)}::-webkit-scrollbar-track {
    border-radius: var(${resolveVar('track-radius')});
  }
  ${e(rawSelector)}::-webkit-scrollbar-thumb {
    border-radius: var(${resolveVar('thumb-radius')});
  }
`
      }],
      [/^scrollbar-thumb-color-(.+)$/, colorResolver(resolveVar('thumb'), 'scrollbar-thumb')],
      [/^scrollbar-track-color-(.+)$/, colorResolver(resolveVar('track'), 'scrollbar-track')],
      [numberVarRegex, ([_, type, value, unit]) => {
        const val = unit ? value + unit : config.numberToUnit(parseInt(value))
        const vars = customRules[type as keyof typeof customRules]
          .map(v => resolveVar(v))
        return vars.reduce((acc: any, v) => {
          acc[v] = val
          return acc
        }, {})
      }],
    ],
  }
}
