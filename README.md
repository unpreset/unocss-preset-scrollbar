# unocss-preset-scrollbar

[![NPM version](https://img.shields.io/npm/v/unocss-preset-scrollbar?color=a1b858&label=)](https://www.npmjs.com/package/unocss-preset-scrollbar) ![npm](https://img.shields.io/npm/dw/unocss-preset-scrollbar)

a unocss preset for scrollbar, here is a [demo](https://stackblitz.com/edit/vitejs-vite-gyun7j?file=src/components/HelloWorld.vue)

## Installation

```bash
npm i unocss-preset-scrollbar unocss --save-dev # with npm
yarn add unocss-preset-scrollbar unocss -D # with yarn
pnpm add unocss-preset-scrollbar unocss -D # with pnpm
```

## Usage

```ts
// unocss.config.ts
import { defineConfig, presetUno } from 'unocss'
import { presetScrollbar } from 'unocss-preset-scrollbar'

export default defineConfig({
  presets: [
    presetUno(),
    presetScrollbar({
      // config
    }),
  ],
})
```

```html
<div 
  class="scrollbar scrollbar-rounded scrollbar-w-4px scrollbar-radius-2 scrollbar-radius-track-4 scrollbar-radius-thumb-4"
/>
```

it will generate below css:

```css
/* layer: default */      
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
.scrollbar-radius-thumb-4{--scrollbar-thumb-raidus:1rem;}
.scrollbar-radius-track-4{--scrollbar-track-raidus:1rem;}
.scrollbar-w-4px{--scrollbar-width:4px;}"
```

## Configurations

```ts
// this is preset default value
const defaultConfig = {
  // scrollbar width and height
  // https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-scrollbar
  scrollbarWidth: '8px',
  scrollbarHeight: '8px',
  // scrollbar thumb and track raidus
  scrollbarTrackRadius: '4px',
  scrollbarThumbRadius: '4px',
  // thumb, track background color
  scrollbarTrackColor: '#f5f5f5',
  scrollbarThumbColor: '#ddd',
  // number to length
  numberToUnit: value => `${value / 4}rem`,
}
```

for example

```html
<div class="scrollbar scrollbar-w-4">
```

if we use default options, `scrollbar-w-4` will generate `--scrollbar-width: 1rem`

if we set custom `numberToUnit`:

```ts
export default defineConfig({
  presets: [
    presetUno(),
    presetScrollbar({
      numberToUnit: value => `${value}px`,
    }),
  ],
})
```

will generate `--scrollbar-width: 4px`

## Utilities

- color

`scrollbar-(track|thumb)-<color>`

set track or thumb background color

- size

`scrollbar-(radius|w|h|track-radius|thumb-radius)-(\d+?)([a-zA-Z]*?)`

|type|description|
|--|--|
|radius|set thumb raidus and track radius|
|w|[set scrollbar width](https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-scrollbar)|
|h|[set scrollbar height](https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-scrollbar)|
|track-radius|set track raidus|
|thumb-radius|set thumb radius|

**Attention,** if it ends with number, the preset will use numberToUnit to generate length with number as params, Otherwise it will use the captured length information directly

for example:

- `scrollbar-w-4` will be `--scrollbar-width: 1rem`
- `scrollbar-w-4px` will be `--scrollbar-width: 4px`
- `scrollbar-w-4rem` will be `--scrollbar-width: 4rem`

- rounded

`scrollbar-rounded`

Make thumb and track have rounded corners

## License

[MIT](./LICENSE) License © 2021 [kkopite](https://github.com/action-hong)
