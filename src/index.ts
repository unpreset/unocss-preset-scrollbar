import type { Preset } from 'unocss'
import { colorResolver, handler } from '@unocss/preset-mini/utils'

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
   * default scrollbar width
   * @default '8px'
   */
  scrollbarWidth?: string
  /**
   * default scrollbar height
   * @default '8px'
   */
  scrollbarHeight?: string
  /**
   * default scrollbar track radius
   * @default '4px'
   */
  scrollbarTrackRadius?: string
  /**
   * default scrollbar thumb radius
   * @default '4px'
   */
  scrollbarThumbRadius?: string
  /**
   * default scrollbar track background color
   * @default '#f5f5f5'
   */
  scrollbarTrackColor?: string
  /**
   * default scrollbar thumb background color
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

  const variantsRE = /^(scrollbar(-track|-thumb)?):.+$/

  return {
    name: 'unocss-preset-scrollbar',
    shortcuts: [
      [
        'scrollbar', `
          scrollbar-custom-property
          overflow-auto
          scrollbar-color-[var(${resolveVar('thumb')})_var(${resolveVar('track')})]
          scrollbar-track:bg-[var(${resolveVar('track')})]
          scrollbar-thumb:bg-[var(${resolveVar('thumb')})]
          scrollbar:w-[var(${resolveVar('width')})]
          scrollbar:h-[var(${resolveVar('height')})]
        `,
      ],
      [
        'scrollbar-rounded', `
          scrollbar-track:rounded-[var(${resolveVar('track-radius')})]
          scrollbar-thumb:rounded-[var(${resolveVar('thumb-radius')})]
        `,
      ],
    ],
    variants: [
      // ::-webkit-scrollbar-track
      // ::-webkit-scrollbar-thumb
      // ::-webkit-scrollbar
      (matcher) => {
        if (!variantsRE.test(matcher))
          return

        const variant = matcher.replace(variantsRE, '$1')

        return {
          matcher: matcher.slice(variant.length + 1),
          selector: (s) => {
            return `${s}::-webkit-${variant}`
          },
        }
      },
    ],
    rules: [
      [
        /^scrollbar-color-(.+)$/,
        ([_, prop]) => ({
          'scrollbar-color': handler.bracket.cssvar.auto.fraction.rem(prop),
        }),
      ],
      [
        /^scrollbar-custom-property$/,
        ([_]) => ({
          [resolveVar('track')]: config.scrollbarTrackColor,
          [resolveVar('thumb')]: config.scrollbarThumbColor,
          [resolveVar('width')]: config.scrollbarWidth,
          [resolveVar('height')]: config.scrollbarHeight,
          [resolveVar('track-radius')]: config.scrollbarTrackRadius,
          [resolveVar('thumb-radius')]: config.scrollbarThumbRadius,
        }),
      ],
      [
        /^scrollbar-thumb-color-(.+)$/,
        colorResolver(resolveVar('thumb'), 'scrollbar-thumb'),
        { autocomplete: 'scrollbar-thumb-color-$colors' },
      ],
      [
        /^scrollbar-track-color-(.+)$/,
        colorResolver(resolveVar('track'), 'scrollbar-track'),
        { autocomplete: 'scrollbar-track-color-$colors' },
      ],
      [
        numberVarRegex,
        ([_, type, value, unit]) => {
          const val = unit ? value + unit : config.numberToUnit(parseInt(value))
          const vars = customRules[type as keyof typeof customRules]
            .map(v => resolveVar(v))
          return vars.reduce((acc: any, v) => {
            acc[v] = val
            return acc
          }, {})
        },
        { autocomplete: `scrollbar-(${Object.keys(customRules).join('|')})-<num>` },
      ],
    ],
  }
}
