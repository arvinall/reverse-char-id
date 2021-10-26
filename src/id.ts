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

export function getLastCodeRangesChar (codeRanges: CodeRange[]): string {
  return String.fromCodePoint(codeRanges[codeRanges.length - 1][1])
}

export function codeRangeIsReverse (codeRange: CodeRange): boolean {
  return codeRange[1] < codeRange[0]
}

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
