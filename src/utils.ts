import {
  escapeSelector as e,
} from 'unocss'

const attributifyRe = /^\[(.+?)(~?=)"(.*)"\]$/

export function toEscapedSelector(raw: string) {
  if (attributifyRe.test(raw))
    return raw.replace(attributifyRe, (_, n, s, i) => `[${e(n)}${s}"${e(i)}"]`)
  return `.${e(raw)}`
}
