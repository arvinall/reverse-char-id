import {
  test,
  expect,
  describe,
  jest
} from '@jest/globals'

import { CodeRange } from '..'
import {
  getFirstCodeRangesChar,
  getLastCodeRangesChar,
  codeRangeIsReverse,
  getCharCodeRange,
  getNextCodeRangesChar,
  generateNextID
} from '../id'

const {
  Number,
  String,
  Array
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

  describe('getNextCodeRangesChar', () => {
    test(
      'Must return first character of next range' +
      ' if char parameter is equal to last character in its range',
      () => {
        const codeRanges: CodeRange[] = [
          [Number('Z'.codePointAt(0)), Number('A'.codePointAt(0))],
          [Number('0'.codePointAt(0)), Number('9'.codePointAt(0))],
          [Number('z'.codePointAt(0)), Number('a'.codePointAt(0))],
          [Number('!'.codePointAt(0)), Number('/'.codePointAt(0))]
        ]

        expect(getNextCodeRangesChar('A', codeRanges)).toBe('0')
        expect(getNextCodeRangesChar('9', codeRanges)).toBe('z')
        expect(getNextCodeRangesChar('a', codeRanges)).toBe('!')
      }
    )

    test('Must return next character of char parameter range with increase char code point by 1', () => {
      const codeRanges: CodeRange[] = [
        [Number('Z'.codePointAt(0)), Number('A'.codePointAt(0))],
        [Number('0'.codePointAt(0)), Number('9'.codePointAt(0))],
        [Number('z'.codePointAt(0)), Number('a'.codePointAt(0))],
        [Number('!'.codePointAt(0)), Number('/'.codePointAt(0))]
      ]

      expect(getNextCodeRangesChar('4', codeRanges)).toBe('5')
      expect(getNextCodeRangesChar('(', codeRanges)).toBe(')')
    })

    test(
      'Must return next character of char parameter range with decrease char code point by 1',
      () => {
        const codeRanges: CodeRange[] = [
          [Number('Z'.codePointAt(0)), Number('A'.codePointAt(0))],
          [Number('0'.codePointAt(0)), Number('9'.codePointAt(0))],
          [Number('z'.codePointAt(0)), Number('a'.codePointAt(0))],
          [Number('!'.codePointAt(0)), Number('/'.codePointAt(0))]
        ]

        expect(getNextCodeRangesChar('M', codeRanges)).toBe('L')
        expect(getNextCodeRangesChar('m', codeRanges)).toBe('l')
      }
    )
  })

  describe('generateNextID', () => {
    function localGenerateNextIDWrapper (
      scope: {
        getFirstCodeRangesChar?: unknown
        getLastCodeRangesChar?: unknown
        codeRangeIsReverse?: unknown
        getCharCodeRange?: unknown
        getNextCodeRangesChar?: unknown
      } = {}
    ): typeof generateNextID {
      return (new Function( // eslint-disable-line @typescript-eslint/no-implied-eval, no-new-func
        'scope',
        `const {
          getFirstCodeRangesChar,
          getLastCodeRangesChar,
          codeRangeIsReverse,
          getCharCodeRange,
          getNextCodeRangesChar
        } = scope
        
        return ${generateNextID.toString()}`
      ))({
        getFirstCodeRangesChar,
        getLastCodeRangesChar,
        codeRangeIsReverse,
        getCharCodeRange,
        getNextCodeRangesChar,

        ...scope
      })
    }

    test(
      'Must return new ID with first character in ranges' +
      ' if lastID property is an empty string',
      () => {
        const codeRanges: CodeRange[] = [
          [Number('Z'.codePointAt(0)), Number('A'.codePointAt(0))],
          [Number('0'.codePointAt(0)), Number('9'.codePointAt(0))],
          [Number('z'.codePointAt(0)), Number('a'.codePointAt(0))],
          [Number('!'.codePointAt(0)), Number('/'.codePointAt(0))]
        ]

        const mockGetFirstCodeRangesChar = jest.fn()

        const localGenerateNextID: typeof generateNextID = localGenerateNextIDWrapper({
          getFirstCodeRangesChar: mockGetFirstCodeRangesChar
        })

        mockGetFirstCodeRangesChar.mockReturnValueOnce('MOCKUP')

        expect(localGenerateNextID({ codeRanges, lastID: '' })).toBe('MOCKUP')

        expect(mockGetFirstCodeRangesChar.mock.calls[0][0]).toEqual(codeRanges)
      }
    )

    test(
      'Must return new ID that resets lastID to first character in ranges' +
      ' and add new first character in ranges' +
      ' if lastID property is equal to last character in ranges',
      () => {
        const codeRanges: CodeRange[] = [
          [Number('Z'.codePointAt(0)), Number('A'.codePointAt(0))],
          [Number('0'.codePointAt(0)), Number('9'.codePointAt(0))],
          [Number('z'.codePointAt(0)), Number('a'.codePointAt(0))],
          [Number('!'.codePointAt(0)), Number('/'.codePointAt(0))]
        ]

        ;(['/', '//', '///', '////', '/////']).forEach((
          lastID: string
        ): void => {
          const mockGetFirstCodeRangesChar = jest.fn()
          const mockGetLastCodeRangesChar = jest.fn()

          const localGenerateNextID: typeof generateNextID = localGenerateNextIDWrapper({
            getFirstCodeRangesChar: mockGetFirstCodeRangesChar,
            getLastCodeRangesChar: mockGetLastCodeRangesChar
          })

          let returnedValue: string = ''

          lastID.split('').forEach((
            lastIDChar: string,
            lastIDCharIndex: number
          ): void => {
            returnedValue = `MOCKUP${lastIDCharIndex + 1}` + returnedValue

            mockGetFirstCodeRangesChar.mockReturnValueOnce(`MOCKUP${lastIDCharIndex + 1}`)

            mockGetLastCodeRangesChar.mockReturnValueOnce('/')
          })

          returnedValue += `MOCKUP${lastID.length + 1}`

          mockGetFirstCodeRangesChar.mockReturnValueOnce(`MOCKUP${lastID.length + 1}`)

          expect(localGenerateNextID({
            codeRanges,
            lastID
          })).toBe(returnedValue)

          expect(mockGetLastCodeRangesChar.mock.calls.length).toBe(lastID.length)
          expect(mockGetLastCodeRangesChar.mock.calls).toEqual(
            (new Array(lastID.length)).fill([codeRanges])
          )

          expect(mockGetFirstCodeRangesChar.mock.calls.length).toBe(lastID.length + 1)
          expect(mockGetFirstCodeRangesChar.mock.calls).toEqual(
            (new Array(lastID.length + 1)).fill([codeRanges])
          )
        })
      }
    )

    test('Must return next ID if lastID is not empty or last character in ranges', () => {
      const codeRanges: CodeRange[] = [
        [Number('Z'.codePointAt(0)), Number('A'.codePointAt(0))],
        [Number('0'.codePointAt(0)), Number('9'.codePointAt(0))],
        [Number('z'.codePointAt(0)), Number('a'.codePointAt(0))],
        [Number('!'.codePointAt(0)), Number('/'.codePointAt(0))]
      ]

      ;(['M', 'MM', 'MMM', 'MMMM', 'MMMMM']).forEach((
        lastID: string
      ): void => {
        const getLastCodeRangesChar = jest.fn()
        const getNextCodeRangesChar = jest.fn()

        const localGenerateNextID: typeof generateNextID = localGenerateNextIDWrapper({
          getLastCodeRangesChar,
          getNextCodeRangesChar
        })

        getLastCodeRangesChar.mockReturnValueOnce('/')

        getNextCodeRangesChar.mockReturnValueOnce('MOCKUP')

        expect(localGenerateNextID({
          codeRanges,
          lastID
        })).toBe(lastID.slice(0, -1) + 'MOCKUP')

        expect(getLastCodeRangesChar.mock.calls[0][0]).toEqual(codeRanges)

        expect(getNextCodeRangesChar.mock.calls[0][0]).toEqual('M')
        expect(getNextCodeRangesChar.mock.calls[0][1]).toEqual(codeRanges)
      })
    })

    test(
      'Must return correct next ID' +
      ' when lastID characters are both in ranges and last character in ranges ',
      () => {
        const codeRanges: CodeRange[] = [
          [Number('Z'.codePointAt(0)), Number('A'.codePointAt(0))],
          [Number('0'.codePointAt(0)), Number('9'.codePointAt(0))],
          [Number('z'.codePointAt(0)), Number('a'.codePointAt(0))],
          [Number('!'.codePointAt(0)), Number('/'.codePointAt(0))]
        ]

        ;([
          'M/', 'M//', 'M///',
          'MM/', 'MM//', 'MM///',
          'MMM/', 'MMM//', 'MMM///'
        ]).forEach((lastID: string): void => {
          const numberOfLastCharsInRanges: number = lastID
            .split('/')
            .filter((char: string): boolean => char === '')
            .length

          const getFirstCodeRangesChar = jest.fn()
          const getLastCodeRangesChar = jest.fn()
          const getNextCodeRangesChar = jest.fn()

          const localGenerateNextID: typeof generateNextID = localGenerateNextIDWrapper({
            getFirstCodeRangesChar,
            getLastCodeRangesChar,
            getNextCodeRangesChar
          })

          let returnedValue: string = ''

          for (
            let step = 1;
            step <= numberOfLastCharsInRanges;
            step++
          ) {
            getLastCodeRangesChar.mockReturnValueOnce('/')

            getFirstCodeRangesChar.mockReturnValueOnce(`FIRST_MOCKUP${step}`)

            returnedValue = `FIRST_MOCKUP${step}` + returnedValue
          }

          getLastCodeRangesChar.mockReturnValueOnce('/')

          getNextCodeRangesChar.mockReturnValueOnce('NEXT_MOCKUP1')

          returnedValue = lastID.split('/')[0].slice(0, -1) + 'NEXT_MOCKUP1' + returnedValue

          expect(localGenerateNextID({
            codeRanges,
            lastID
          })).toBe(returnedValue)

          expect(getFirstCodeRangesChar.mock.calls.length).toBe(numberOfLastCharsInRanges)
          expect(getFirstCodeRangesChar.mock.calls).toEqual(
            (new Array(numberOfLastCharsInRanges)).fill([codeRanges])
          )

          expect(getLastCodeRangesChar.mock.calls.length).toBe(numberOfLastCharsInRanges + 1)
          expect(getLastCodeRangesChar.mock.calls).toEqual(
            (new Array(numberOfLastCharsInRanges + 1)).fill([codeRanges])
          )

          expect(getNextCodeRangesChar.mock.calls.length).toBe(1)
          expect(getNextCodeRangesChar.mock.calls[0]).toEqual(['M', codeRanges])
        })
      }
    )
  })
})
