import {
  test,
  expect,
  describe
} from '@jest/globals'

import { CodeRange } from '..'
import { getFirstCodeRangesChar } from '../id'

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
})
