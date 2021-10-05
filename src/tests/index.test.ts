import {
  test,
  expect,
  describe,
  jest
} from '@jest/globals'

import {
  CodeRange,
  CharRange,
  Range,

  IREVERSED_PREDEFINED_RANGES,
  IPREDEFINED_RANGES,

  ReverseCharID,

  REVERSED_PREDEFINED_RANGES,
  PREDEFINED_RANGES,

  rangeToCodeRange
} from '..'
import { generateNextID } from '../id'

const {
  Object,
  Number,
  Symbol,

  Math
} = globalThis

jest.mock('../id')

const mockGenerateNextID: jest.MockedFunction<
  typeof generateNextID
> = generateNextID as jest.MockedFunction<typeof generateNextID>

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

describe('Class', () => {
  describe('ReverseCharID', () => {
    test('constructor must map ranges argument to rangeToCodeRange method', () => {
      const ranges: Range[] = []

      ranges.map = jest.fn()

      ;(() => new ReverseCharID({ ranges }))()

      expect(ranges.map).toHaveBeenCalledWith(rangeToCodeRange)
    })

    test('toValue, [Symbol.toPrimitive] and toString methods must be same', () => {
      const reverseCharID: ReverseCharID = new ReverseCharID()

      expect(typeof reverseCharID.toValue).toBe('function')
      expect(reverseCharID[Symbol.toPrimitive]).toBe(reverseCharID.toValue)
      expect(reverseCharID.toString).toBe(reverseCharID.toValue)
    })

    describe('Method', () => {
      describe('toValue', () => {
        test('Must return generateNextID returned value', () => {
          const reverseCharID: ReverseCharID = new ReverseCharID()

          const mockReturnedValue: string = 'MOCKUP'

          mockGenerateNextID.mockReturnValueOnce(mockReturnedValue)

          expect(reverseCharID.toValue()).toBe(mockReturnedValue)
        })

        test(
          'Must call generateNextID with empty lastID' +
          ' and 0 to 9 ranges parameters by default',
          () => {
            const reverseCharID: ReverseCharID = new ReverseCharID()

            reverseCharID.toValue()

            expect(mockGenerateNextID.mock.calls[0][0]).toEqual({
              codeRanges: [rangeToCodeRange(PREDEFINED_RANGES['0 to 9'])],
              lastID: ''
            })
          }
        )

        test('Must call generateNextID with constructor lastID and ranges parameters', () => {
          const lastID: string = 'a'
          const ranges: Range[] = [PREDEFINED_RANGES['a to z']]

          const reverseCharID: ReverseCharID = new ReverseCharID({ ranges, lastID })

          reverseCharID.toValue()

          expect(mockGenerateNextID.mock.calls[0][0]).toEqual({
            codeRanges: ranges.map(rangeToCodeRange),
            lastID
          })
        })

        test(
          'Must call generateNextID with last generateNextID returned value' +
          ' as lastID parameter',
          () => {
            const reverseCharID: ReverseCharID = new ReverseCharID()

            ;(['', '0', '1', '2']).forEach((
              lastID: string,
              index: number,
              lastIDsList: string[]
            ) => {
              mockGenerateNextID.mockReturnValueOnce(lastIDsList[index + 1])

              expect(reverseCharID.toValue()).toBe(lastIDsList[index + 1])

              expect(mockGenerateNextID.mock.calls[index][0].lastID).toBe(lastID)
            })
          }
        )
      })
    })
  })
})
