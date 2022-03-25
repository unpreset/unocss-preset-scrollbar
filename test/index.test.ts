import { createGenerator, presetAttributify, presetUno } from 'unocss'
import { describe, expect, it } from 'vitest'
import { presetScrollbar } from '../src'

describe('scrollbar', () => {
  const generator = createGenerator({
    presets: [
      presetUno(),
      presetAttributify(),
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

    expect(css).toMatchSnapshot()
  })

  it('scrollbar color', async() => {
    const { css } = await generator.generate([
      'scrollbar-track-color-red',
    ].join(' '))
    expect(css).toMatchSnapshot()
  })

  it('scrollbar custom unit', async() => {
    const { css } = await generator.generate([
      'scrollbar-w-1px',
    ].join(' '))
    expect(css).toMatchSnapshot()
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
    expect(css).toMatchSnapshot()
  })

  it('should work in atributify mode', async() => {
    const { css } = await generator.generate(`
<div 
  scrollbar="~ rounded w-4px radius-2 radius-track-4 radius-thumb-4">
</div>
`)
    // FIXME: 这里会出现.w-4px{width:4px;}, .rounded{border-radius:0.25rem;} 也很奇怪
    expect(css).toMatchSnapshot()
  })
})
