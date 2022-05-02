import { defineConfig, presetAttributify, presetUno, transformerDirectives } from 'unocss'

import { presetScrollbar } from '../src'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetScrollbar({
      varPrefix: 'un',
    }),
  ],
  transformers: [
    transformerDirectives(),
  ],
})
