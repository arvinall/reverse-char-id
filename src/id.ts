import { CodeRange } from '.'

const { String } = globalThis

/**
 * @returns Character of first codePoint in first codeRange
 *
 * @example
 * ```typescript
 * const a_to_z: CodeRange = [97, 122]
 *
 * console.log(getFirstCodeRangesChar([a_to_z])) // a
 * ```
 */
export function getFirstCodeRangesChar (codeRanges: CodeRange[]): string {
  return String.fromCodePoint(codeRanges[0][0])
}

/**
 * @returns Character of last codePoint in last codeRange
 *
 * @example
 * ```typescript
 * const a_to_z: CodeRange = [97, 122]
 *
 * console.log(getLastCodeRangesChar([a_to_z])) // z
 * ```
 */
export function getLastCodeRangesChar (codeRanges: CodeRange[]): string {
  return String.fromCodePoint(codeRanges[codeRanges.length - 1][1])
}

/**
 * Check codeRange is in reverse order or not
 *
 * @example
 * ```typescript
 * const a_to_z: CodeRange = [97, 122]
 * const z_to_a: CodeRange = [...a_to_z].reverse()
 *
 * console.log(codeRangeIsReverse(a_to_z)) // false
 * console.log(codeRangeIsReverse(z_to_a)) // true
 * ```
 */
export function codeRangeIsReverse (codeRange: CodeRange): boolean {
  return codeRange[1] < codeRange[0]
}

/**
 * @returns codeRange that contain target character
 *
 * @example
 * ```typescript
 * const zero_to_nine: CodeRange = [48, 57]
 * const z_to_a: CodeRange = [122, 97]
 *
 * const codeRanges: CodeRange[] = [zero_to_nine, z_to_a]
 *
 * console.log(getCharCodeRange('4', codeRanges) === zero_to_nine) // true
 * console.log(getCharCodeRange('m', codeRanges) === z_to_a) // true
 * ```
 */
export function getCharCodeRange (
  char: string,
  codeRanges: CodeRange[]
): CodeRange | undefined {
  const charCode: number = char.codePointAt(0) as number

  for (const codeRange of codeRanges) {
    if ((
      !codeRangeIsReverse(codeRange) &&
      charCode >= codeRange[0] &&
      charCode <= codeRange[1]
    ) || (
      codeRangeIsReverse(codeRange) &&
      charCode >= codeRange[1] &&
      charCode <= codeRange[0]
    )) return codeRange
  }
}

/**
 * @returns Next character based on codeRanges
 *
 * @example
 * ```typescript
 * const codeRanges: CodeRange = [
 *   [48, 57], // 0 to 9
 *   [122, 97] // z to a
 * ]
 *
 * console.log(getNextCodeRangesChar('4', codeRanges)) // 5
 * console.log(getNextCodeRangesChar('9', codeRanges)) // z
 * console.log(getNextCodeRangesChar('m', codeRanges)) // l
 * ```
 */
export function getNextCodeRangesChar (
  char: string,
  codeRanges: CodeRange[]
): string {
  const charCode: number = char.codePointAt(0) as number
  const codeRange: CodeRange = getCharCodeRange(char, codeRanges) as CodeRange

  let nextCode: number = charCode

  if (charCode === codeRange[1]) {
    nextCode = codeRanges[codeRanges.indexOf(codeRange) + 1][0]
  } else {
    if (!codeRangeIsReverse(codeRange)) nextCode++
    else nextCode--
  }

  return String.fromCodePoint(nextCode)
}

// istanbul ignore next
/**
 * @returns Next ID based on codeRanges and lastID
 *
 * @param options
 *
 * @example
 * ```typescript
 * const codeRanges: CodeRange = [
 *   [48, 57], // 0 to 9
 *   [122, 97] // z to a
 * ]
 *
 * console.log(generateNextID({ codeRanges, lastID: '' })) // 0
 *
 * console.log(generateNextID({ codeRanges, lastID: '9' })) // z
 * console.log(generateNextID({ codeRanges, lastID: '0z' })) // 0y
 *
 * console.log(generateNextID({ codeRanges, lastID: 'a' })) // 00
 * console.log(generateNextID({ codeRanges, lastID: 'aa' })) // 000
 * ```
 */
export function generateNextID ({
  codeRanges,
  lastID
}: {
  codeRanges: CodeRange[]
  lastID: string
}): string {
  let newID: string = ''

  if (lastID.length === 0) {
    newID = getFirstCodeRangesChar(codeRanges)
  } else {
    let mustAddNewChar: boolean = true
    let newIDIsReady: boolean = false

    for (const char of lastID.split('').reverse()) {
      let newChar: string = char

      if (!newIDIsReady) {
        if (char === getLastCodeRangesChar(codeRanges)) {
          newChar = getFirstCodeRangesChar(codeRanges)
        } else {
          newChar = getNextCodeRangesChar(char, codeRanges)

          mustAddNewChar = false
          newIDIsReady = true
        }
      }

      newID = newChar + newID
    }

    if (mustAddNewChar) newID += getFirstCodeRangesChar(codeRanges)
  }

  return newID
}
