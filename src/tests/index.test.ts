import { test } from '@jest/globals'

import {
  IREVERSED_PREDEFINED_RANGES,
  IPREDEFINED_RANGES,

  REVERSED_PREDEFINED_RANGES,
  PREDEFINED_RANGES
} from '..'

const { Object } = globalThis

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
