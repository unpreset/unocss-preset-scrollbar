import { defineConfig } from 'vite'
import unocss from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'
import { presetScrollbar } from '../src'

export default defineConfig({
  plugins: [
    unocss({
      presets: [
        presetUno(),
        presetAttributify(),
        presetScrollbar({
          varPrefix: 'un',
        }),
      ],
    }),
  ],
})
