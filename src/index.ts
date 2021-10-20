import { generateNextID } from './id'

const {
  String,
  Number,
  Array
} = globalThis

/**
 * Character range
 *
 * @example
 * ```typescript
 * const a_to_z: CharRange = ['a', 'z']
 * const Z_to_A: CharRange = ['Z', 'A']
 * ```
 */
export type CharRange = [string, string]
/**
 * CodePoint range
 *
 * @example
 * ```typescript
 * const a_to_z: CodeRange = [97, 122]
 * const Z_to_A: CodeRange = [
 *   Number(String.prototype.codePointAt.call('Z', 0)),
 *   Number(String.prototype.codePointAt.call('A', 0))
 * ]
 * ```
 */
export type CodeRange = [number, number]
/**
 * Character or codePoint range
 *
 * @example
 * ```typescript
 * const a_to_z: Range = [97, 122]
 * const Z_to_A: Range = ['Z', 'A']
 * ```
 */
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

/**
 * Some useful predefined ranges
 *
 * @example
 * ```typescript
 * const zero_to_z: Range[] = [
 *   PREDEFINED_RANGES['0 to 9'],
 *   PREDEFINED_RANGES['a to z']
 * ]
 * ```
 */
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

/**
 * Completely reversed version of {@link PREDEFINED_RANGES}
 *
 * @example
 * ```typescript
 * const z_to_zero: Range[] = [
 *   REVERSED_PREDEFINED_RANGES['z to a'],
 *   REVERSED_PREDEFINED_RANGES['9 to 0']
 * ]
 * ```
 */
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

  [globalThis.Symbol.toPrimitive]: () => string = this.toValue

  toString: () => string = this.toValue
}
