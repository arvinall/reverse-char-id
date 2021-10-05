import {
  test,
  expect,
  describe
} from '@jest/globals'

import { CodeRange } from '..'
import {
  getFirstCodeRangesChar,
  getLastCodeRangesChar,
  codeRangeIsReverse
} from '../id'

const {
  Number,
  String
} = globalThis

describe('Method', () => {
  test('getFirstCodeRangesChar must return first character of codeRanges', () => {
    const codeRanges: CodeRange[] = [
      [Number('A'.codePointAt(0)), Number('Z'.codePointAt(0))],
      [Number('0'.codePointAt(0)), Number('9'.codePointAt(0))],
      [Number('a'.codePointAt(0)), Number('z'.codePointAt(0))]
    ]

    expect(
      getFirstCodeRangesChar(codeRanges)
    ).toBe(
      String.fromCodePoint(codeRanges[0][0])
    )
  })

  test('getLastCodeRangesChar must return last character of codeRanges', () => {
    const codeRanges: CodeRange[] = [
      [Number('A'.codePointAt(0)), Number('Z'.codePointAt(0))],
      [Number('0'.codePointAt(0)), Number('9'.codePointAt(0))],
      [Number('a'.codePointAt(0)), Number('z'.codePointAt(0))]
    ]

    expect(
      getLastCodeRangesChar(codeRanges)
    ).toBe(
      String.fromCodePoint(codeRanges[codeRanges.length - 1][1])
    )
  })

  describe('codeRangeIsReverse', () => {
    test('Must return false when codeRange is not in reverse order', () => {
      expect(codeRangeIsReverse([0, 5])).toBe(false)
    })

    test('Must return true when codeRange is in reverse order', () => {
      expect(codeRangeIsReverse([5, 0])).toBe(true)
    })
  })
})
