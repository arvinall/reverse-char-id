import {
  test,
  expect,
  describe
} from '@jest/globals'

import {
  CodeRange,
  CharRange,

  IREVERSED_PREDEFINED_RANGES,
  IPREDEFINED_RANGES,

  REVERSED_PREDEFINED_RANGES,
  PREDEFINED_RANGES,

  rangeToCodeRange
} from '..'

const {
  Object,
  Number,

  Math
} = globalThis

test(
  'REVERSED_PREDEFINED_RANGES object' +
  ' must be completely reversed version of PREDEFINED_RANGES object' +
  ', both as key and value',
  () => {
    for (const key of Object.keys(REVERSED_PREDEFINED_RANGES)) {
      ;((rangeTitle: keyof IREVERSED_PREDEFINED_RANGES) => {
        expect(
          REVERSED_PREDEFINED_RANGES[rangeTitle]
        ).toEqual(
          PREDEFINED_RANGES[
            rangeTitle.split(' ').reverse().join(' ') as keyof IPREDEFINED_RANGES
          ].reverse()
        )
      })(key as keyof IREVERSED_PREDEFINED_RANGES)
    }
  }
)

describe('Method', () => {
  describe('rangeToCodeRange', () => {
    test(
      'Must return new Array instance' +
      ' with range parameter elements if elements are numbers',
      () => {
        const codeRange: CodeRange = [
          Math.round(Math.random() * 100),
          Math.round(Math.random() * 100)
        ]

        expect(rangeToCodeRange(codeRange)).not.toBe(codeRange)
        expect(rangeToCodeRange(codeRange)).toEqual(codeRange)
      }
    )

    test(
      'Must return new Array instance' +
      ' with range parameter elements code point if elements are strings',
      () => {
        const charRange: CharRange = ['d', 'g']
        const codeRange: CodeRange = [
          Number(charRange[0].codePointAt(0)),
          Number(charRange[1].codePointAt(0))
        ]

        expect(rangeToCodeRange(charRange)).toEqual(codeRange)
      }
    )
  })
})
