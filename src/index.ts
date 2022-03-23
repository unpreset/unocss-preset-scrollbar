import type { Preset } from 'unocss'
import {
  escapeSelector as e,
} from 'unocss'
import { colorResolver } from '@unocss/preset-mini/utils'
const defaultOption: Required<DefaultOption> = {
  scrollbarWidth: '8px',
  scrollbarHeight: '8px',
  scrollbarRadius: '4px',
  scrollbarTrackColor: '#f5f5f5',
  scrollbarThumbColor: '#ddd',
}

interface DefaultOption {
  scrollbarWidth?: string
  scrollbarHeight?: string
  scrollbarRadius?: string
  scrollbarTrackColor?: string
  scrollbarThumbColor?: string
}

export default function presetScrollbar(option?: DefaultOption): Preset {
  const config = {
    ...defaultOption,
    ...option,
  }
  return {
    name: 'unocss-preset-scrollbar',
    rules: [
      [/^scrollbar$/, ([_], { rawSelector }) => {
        // return ''
        return `
          .${e(rawSelector)} {
            --scrollbar-track: ${config.scrollbarTrackColor};
            --scrollbar-thumb: ${config.scrollbarThumbColor};
            --scrollbar-width: ${config.scrollbarWidth};
            --scrollbar-height: ${config.scrollbarHeight};
            overflow: auto;
            scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
          }
          .${e(rawSelector)}::-webkit-scrollbar-track {
            background: var(--scrollbar-track);
          }
          .${e(rawSelector)}::-webkit-scrollbar-thumb {
            background: var(--scrollbar-thumb);
          }
          .${e(rawSelector)}::-webkit-scrollbar {
            width: var(--scrollbar-width);
            height: var(--scrollbar-height);
          }
        `
      },
      ],
      [/^scrollbar-rounded(-(\d+))?$/, ([_, __, value], { rawSelector }) => {
        let radius = config.scrollbarRadius
        if (value)
          radius = `${parseInt(value) / 4}rem`

        return `
          .${e(rawSelector)}::-webkit-scrollbar-track {
            border-radius: ${radius};
          }
          .${e(rawSelector)}::-webkit-scrollbar-thumb {
            border-radius: ${radius};
          }
        `
      }],
      [/^scrollbar-thumb-(.+)$/, colorResolver('--scrollbar-thumb', 'scrollbar-thumb')],
      [/^scrollbar-track-(.+)$/, colorResolver('--scrollbar-track', 'scrollbar-track')],
      [/^scrollbar-(w|h)-(\d+)$/, ([_, type, value]) => {
        const name = type === 'w' ? '--scrollbar-width' : '--scrollbar-height'
        return {
          [name]: `${parseInt(value) / 4}rem`,
        }
      }],
    ],
  }
}
