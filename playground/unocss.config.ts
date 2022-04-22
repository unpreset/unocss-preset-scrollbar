import { defineConfig, presetAttributify, presetUno } from 'unocss'

import { presetScrollbar } from '../src'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetScrollbar({
      varPrefix: 'un',
    }),
  ],
})
