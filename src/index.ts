import { generateNextID } from './id'

const {
  String,
  Number,
  Array,
  Symbol
} = globalThis

export type CharRange = [string, string]
export type CodeRange = [number, number]
export type Range = CharRange | CodeRange

export interface IPREDEFINED_RANGES {
  '0 to 9': CharRange
  'a to z': CharRange
  'A to Z': CharRange
  '! to /': CharRange
  ': to @': CharRange
  '[ to `': CharRange
  '{ to ~': CharRange
}

export const PREDEFINED_RANGES: IPREDEFINED_RANGES = {
  '0 to 9': ['0', '9'],
  'a to z': ['a', 'z'],
  'A to Z': ['A', 'Z'],
  '! to /': ['!', '/'],
  ': to @': [':', '@'],
  '[ to `': ['[', '`'],
  '{ to ~': ['{', '~']
}

export interface IREVERSED_PREDEFINED_RANGES {
  '9 to 0': CharRange
  'z to a': CharRange
  'Z to A': CharRange
  '/ to !': CharRange
  '@ to :': CharRange
  '` to [': CharRange
  '~ to {': CharRange
}

export const REVERSED_PREDEFINED_RANGES: IREVERSED_PREDEFINED_RANGES = (
  globalThis.Object.fromEntries(
    globalThis.Object
      .entries(PREDEFINED_RANGES)
      .map(
        ([rangeTitle, charRange]: [string, CharRange]): [string, CharRange] => [
          rangeTitle.split(' ').reverse().join(' '),
          [...charRange].reverse() as CharRange
        ]
      )
  ) as unknown as IREVERSED_PREDEFINED_RANGES
)

export function rangeToCodeRange (range: Range): CodeRange {
  const codeRange: number[] = []

  if (typeof range[0] !== 'string') {
    codeRange.push(...(range as CodeRange))
  } else {
    codeRange.push(
      Number(
        String.prototype.codePointAt.call(range[0], 0)
      ),
      Number(
        String.prototype.codePointAt.call(range[1], 0)
      )
    )
  }

  return codeRange as CodeRange
}

export interface ReverseCharIDOptions {
  ranges?: Range[]
  lastID?: string
}

export class ReverseCharID {
  #codeRanges: CodeRange[] = [PREDEFINED_RANGES['0 to 9']].map(rangeToCodeRange)
  #lastID: string = ''

  constructor ({ ranges, lastID }: ReverseCharIDOptions = {}) {
    if (ranges instanceof Array) this.#codeRanges = ranges.map(rangeToCodeRange)
    if (typeof lastID === 'string') this.#lastID = lastID
  }

  toValue (): string {
    this.#lastID = generateNextID({
      codeRanges: this.#codeRanges,
      lastID: this.#lastID
    })

    return this.#lastID
  }

  [Symbol.toPrimitive]: () => string = this.toValue

  toString: () => string = this.toValue
}
