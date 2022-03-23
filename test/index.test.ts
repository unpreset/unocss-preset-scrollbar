import { createGenerator, presetUno } from 'unocss'
import { describe, expect, it } from 'vitest'
import { presetScrollbar } from '../src'

describe('scrollbar', () => {
  const generator = createGenerator({
    presets: [
      presetUno(),
      presetScrollbar(),
    ],
  })

  it('scrollbar', async() => {
    const { css } = await generator.generate([
      'scrollbar',
      'scrollbar-rounded',
      'scrollbar-w-4px',
      'scrollbar-radius-2',
      'scrollbar-radius-track-4',
      'scrollbar-radius-thumb-4',
    ].join(' '))

    expect(css).toMatchInlineSnapshot(`
      "/* layer: default */
      
                .scrollbar {
                  --scrollbar-track: #f5f5f5;
                  --scrollbar-thumb: #ddd;
                  --scrollbar-width: 8px;
                  --scrollbar-height: 8px;
                  --scrollbar-track-raidus: 4px;
                  --scrollbar-thumb-raidus: 4px;
                  overflow: auto;
                  scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
                }
                .scrollbar::-webkit-scrollbar-track {
                  background: var(--scrollbar-track);
                }
                .scrollbar::-webkit-scrollbar-thumb {
                  background: var(--scrollbar-thumb);
                }
                .scrollbar::-webkit-scrollbar {
                  width: var(--scrollbar-width);
                  height: var(--scrollbar-height);
                }
              
      
                .scrollbar-rounded::-webkit-scrollbar-track {
                    border-radius: var(--scrollbar-track-raidus);
                  }
                .scrollbar-rounded::-webkit-scrollbar-thumb {
                  border-radius: var(--scrollbar-thumb-raidus);
                }
              
      .scrollbar-radius-2{--scrollbar-track-raidus:0.5rem;--scrollbar-thumb-raidus:0.5rem;}
      .scrollbar-w-4px{--scrollbar-width:4px;}"
    `)
  })

  it('scrollbar color', async() => {
    const { css } = await generator.generate([
      'scrollbar-track-color-red',
    ].join(' '))
    expect(css).toMatchInlineSnapshot(`
      "/* layer: default */
      .scrollbar-track-color-red{--un-scrollbar-track-opacity:1;--scrollbar-track:rgba(248,113,113,var(--un-scrollbar-track-opacity));}"
    `)
  })

  it('scrollbar custom unit', async() => {
    const { css } = await generator.generate([
      'scrollbar-w-1px',
    ].join(' '))
    expect(css).toMatchInlineSnapshot(`
      "/* layer: default */
      .scrollbar-w-1px{--scrollbar-width:1px;}"
    `)
  })

  it('custom value to unit', async() => {
    const generator = createGenerator({
      presets: [
        presetUno(),
        presetScrollbar({
          numberToUnit: value => `${value * 2}px`,
        }),
      ],
    })
    const { css } = await generator.generate([
      'scrollbar-w-1',
      'scrollbar-thumb-radius-2px',
    ].join(' '))
    expect(css).toMatchInlineSnapshot(`
      "/* layer: default */
      .scrollbar-thumb-radius-2px{--scrollbar-thumb-raidus:2px;}
      .scrollbar-w-1{--scrollbar-width:2px;}"
    `)
  })
})
