# unocss-preset-scrollbar

[![NPM version](https://img.shields.io/npm/v/unocss-preset-scrollbar?color=a1b858&label=)](https://www.npmjs.com/package/unocss-preset-scrollbar) ![npm](https://img.shields.io/npm/dw/unocss-preset-scrollbar)

a unocss preset for scrollbar, here is a [demo](https://stackblitz.com/edit/vitejs-vite-gyun7j?file=src/components/HelloWorld.vue)

## Installation

```bash
npm i unocss-preset-scrollbar unocss -D
```

## Usage

```ts
// unocss.config.ts
import { defineConfig, presetAttributify, presetUno } from 'unocss'
import { presetScrollbar } from 'unocss-preset-scrollbar'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetScrollbar({
      // config
    }),
  ],
})
```

```html
<div 
  class="scrollbar scrollbar-rounded scrollbar-w-4px scrollbar-radius-2 scrollbar-track-radius-4 scrollbar-thumb-radius-4"
/>
```

it will generate below css:

```css
/* layer: shortcuts */
.scrollbar::-webkit-scrollbar{width:var(--scrollbar-width);height:var(--scrollbar-height);}
.scrollbar{overflow:auto;scrollbar-color:var(--scrollbar-thumb) var(--scrollbar-track);--scrollbar-track:#f5f5f5;--scrollbar-thumb:#ddd;--scrollbar-width:8px;--scrollbar-height:8px;--scrollbar-track-radius:4px;--scrollbar-thumb-radius:4px;}
.scrollbar-rounded::-webkit-scrollbar-thumb{border-radius:var(--scrollbar-thumb-radius);}
.scrollbar-rounded::-webkit-scrollbar-track{border-radius:var(--scrollbar-track-radius);}
.scrollbar::-webkit-scrollbar-thumb{background-color:var(--scrollbar-thumb);}
.scrollbar::-webkit-scrollbar-track{background-color:var(--scrollbar-track);}
/* layer: default */
.scrollbar-radius-2{--scrollbar-track-radius:0.5rem;--scrollbar-thumb-radius:0.5rem;}
.scrollbar-thumb-radius-4{--scrollbar-thumb-radius:1rem;}
.scrollbar-track-radius-4{--scrollbar-track-radius:1rem;}
.scrollbar-w-4px{--scrollbar-width:4px;}
```

you can also use `Attributify Mode`:

```html
<div
  scrollbar="~ rounded"
/>
```

or use `@apply`

```diff
import { defineConfig, presetAttributify, presetUno, transformerDirectives } from 'unocss'

import { presetScrollbar } from '../src'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetScrollbar({
    }),
  ],
+  transformers: [
+    transformerDirectives(),
+  ],
})
```

```css
.my-custom-scrollbar {
  @apply scrollbar scrollbar-rounded
}
```

## Configurations

|Field|Default|Description|
|--|--|--|
|`scrollbarWidth`|`8px`|scrollbar width|
|`scrollbarHeight`|`8px`|scrollbar height|
|`scrollbarTrackRadius`|`4px`|scrollbar track radius|
|`scrollbarThumbRadius`|`4px`|scrollbar thumb radius|
|`scrollbarTrackColor`|`#f5f5f5`| scrollbar track background color|
|`scrollbarThumbColor`|`#ddd`| scrollbar thumb background color|
|`numberToUnit`|``value => `${value / 4}rem` ``| number to unit
|`varPrefix`|`''`|the css variable prefix of this preset 


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

### color

`scrollbar-(track|thumb)-<color>`

set track or thumb background color

### size

`scrollbar-(radius|w|h|track-radius|thumb-radius)-(\d+?)([a-zA-Z]*?)`

|type|description|
|--|--|
|radius|set thumb radius and track radius|
|w|[set scrollbar width](https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-scrollbar)|
|h|[set scrollbar height](https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-scrollbar)|
|track-radius|set track radius|
|thumb-radius|set thumb radius|

**Attention,** if it ends with number, the preset will use numberToUnit to generate length with number as params, Otherwise it will use the captured length information directly

for example:
- `scrollbar-w-4` will be `--scrollbar-width: 1rem`
- `scrollbar-w-4px` will be `--scrollbar-width: 4px`
- `scrollbar-w-4rem` will be `--scrollbar-width: 4rem`

### rounded

`scrollbar-rounded`

Make thumb and track have rounded corners

## other

base [starter-ts](https://github.com/antfu/starter-ts)

## License

[MIT](./LICENSE) License © 2021 [kkopite](https://github.com/action-hong)
