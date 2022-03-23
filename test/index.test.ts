import { createGenerator, presetUno } from 'unocss'
import { describe, expect, it } from 'vitest'
import presetScrollbar from '../src'

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
      'scrollbar-thumb-red',
      'scrollbar-track-green',
    ].join(' '))

    expect(css).toMatchInlineSnapshot(`
      "/* layer: default */
      
                .scrollbar {
                  --scrollbar-track: #f5f5f5;
                  --scrollbar-thumb: #ddd;
                  --scrollbar-width: 8px;
                  --scrollbar-height: 8px;
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
                  border-radius: 4px;
                }
                .scrollbar-rounded::-webkit-scrollbar-thumb {
                  border-radius: 4px;
                }
              
      .scrollbar-thumb-red{--un-scrollbar-thumb-opacity:1;--scrollbar-thumb:rgba(248,113,113,var(--un-scrollbar-thumb-opacity));}
      .scrollbar-track-green{--un-scrollbar-track-opacity:1;--scrollbar-track:rgba(74,222,128,var(--un-scrollbar-track-opacity));}"
    `)
  })

  it('scrollbar-size', async() => {
    const { css } = await generator.generate([
      'scrollbar',
      'scrollbar-rounded-4',
      'scrollbar-w-6',
      'scrollbar-h-8',
    ].join(' '))
    expect(css).toMatchInlineSnapshot(`
      "/* layer: default */
      
                .scrollbar {
                  --scrollbar-track: #f5f5f5;
                  --scrollbar-thumb: #ddd;
                  --scrollbar-width: 8px;
                  --scrollbar-height: 8px;
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
              
      
                .scrollbar-rounded-4::-webkit-scrollbar-track {
                  border-radius: 1rem;
                }
                .scrollbar-rounded-4::-webkit-scrollbar-thumb {
                  border-radius: 1rem;
                }
              
      .scrollbar-h-8{--scrollbar-height:2rem;}
      .scrollbar-w-6{--scrollbar-width:1.5rem;}"
    `)
  })

  it('config', async() => {
    const generator = createGenerator({
      presets: [
        presetUno(),
        presetScrollbar({
          scrollbarThumbColor: '#f00',
          scrollbarTrackColor: '#0f0',
          scrollbarWidth: '10px',
          scrollbarHeight: '10px',
          scrollbarRadius: '5px',
        }),
      ],
    })
    const { css } = await generator.generate([
      'scrollbar',
      'scrollbar-rounded',
    ].join(' '))
    expect(css).toMatchInlineSnapshot(`
      "/* layer: default */
      
                .scrollbar {
                  --scrollbar-track: #0f0;
                  --scrollbar-thumb: #f00;
                  --scrollbar-width: 10px;
                  --scrollbar-height: 10px;
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
                  border-radius: 5px;
                }
                .scrollbar-rounded::-webkit-scrollbar-thumb {
                  border-radius: 5px;
                }
              "
    `)
  })
})
