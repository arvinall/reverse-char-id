import {
  test,
  expect,
  describe
} from '@jest/globals'

import { CodeRange } from '..'
import {
  getFirstCodeRangesChar,
  getLastCodeRangesChar,
  codeRangeIsReverse,
  getCharCodeRange
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

  describe('getCharCodeRange', () => {
    test('Must return correct codeRange based on character', () => {
      const codeRanges: CodeRange[] = [
        [Number('A'.codePointAt(0)), Number('Z'.codePointAt(0))],
        [Number('0'.codePointAt(0)), Number('9'.codePointAt(0))],
        [Number('a'.codePointAt(0)), Number('z'.codePointAt(0))]
      ]

      expect(getCharCodeRange('M', codeRanges)).toBe(codeRanges[0])
      expect(getCharCodeRange('4', codeRanges)).toBe(codeRanges[1])
      expect(getCharCodeRange('m', codeRanges)).toBe(codeRanges[2])
    })

    test('Must return correct reversed codeRange based on character', () => {
      const codeRanges: CodeRange[] = [
        [Number('Z'.codePointAt(0)), Number('A'.codePointAt(0))],
        [Number('9'.codePointAt(0)), Number('0'.codePointAt(0))],
        [Number('z'.codePointAt(0)), Number('a'.codePointAt(0))]
      ]

      expect(getCharCodeRange('M', codeRanges)).toBe(codeRanges[0])
      expect(getCharCodeRange('4', codeRanges)).toBe(codeRanges[1])
      expect(getCharCodeRange('m', codeRanges)).toBe(codeRanges[2])
    })

    test('Must return both correct codeRange and reversed codeRange based on character', () => {
      const codeRanges: CodeRange[] = [
        [Number('Z'.codePointAt(0)), Number('A'.codePointAt(0))],
        [Number('0'.codePointAt(0)), Number('9'.codePointAt(0))],
        [Number('z'.codePointAt(0)), Number('a'.codePointAt(0))],
        [Number('!'.codePointAt(0)), Number('/'.codePointAt(0))]
      ]

      expect(getCharCodeRange('M', codeRanges)).toBe(codeRanges[0])
      expect(getCharCodeRange('4', codeRanges)).toBe(codeRanges[1])
      expect(getCharCodeRange('m', codeRanges)).toBe(codeRanges[2])
      expect(getCharCodeRange('(', codeRanges)).toBe(codeRanges[3])
    })

    test('Must return undefined when character is not in any range', () => {
      const codeRanges: CodeRange[] = [
        [Number('Z'.codePointAt(0)), Number('A'.codePointAt(0))],
        [Number('0'.codePointAt(0)), Number('9'.codePointAt(0))]
      ]

      expect(getCharCodeRange('m', codeRanges)).toBeUndefined()
    })
  })
})
