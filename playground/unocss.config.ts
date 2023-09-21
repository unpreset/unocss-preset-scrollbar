import { defineConfig, presetAttributify, presetUno, transformerDirectives } from 'unocss'

import { presetScrollbar } from '../src'

export default defineConfig({
  presets: [
    presetUno({
      prefix: 'tw-',
    }),
    presetAttributify(),
    presetScrollbar({
      varPrefix: 'un',
      prefix: ['un', ''],
    }),
  ],
  transformers: [
    transformerDirectives(),
  ],
})
