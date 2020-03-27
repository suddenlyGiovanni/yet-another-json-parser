/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AssertEqual } from '../types'

import { add } from '.'

describe('add', () => {
  it('should take a number as the first addenda and return a fn that takes the second addenda and return the calculation', () => {
    expect.hasAssertions()
    const a = 1
    const b = 2

    expect(add(a)(b)).toBe(a + b)
  })
})

// @ts-ignore
const condFirstArgument: AssertEqual<typeof add, (x: number) => unknown> = true

// @ts-ignore
const condRetunrCurry: AssertEqual<
  ReturnType<typeof add>,
  (y: number) => unknown
> = true

// @ts-ignore
const condReturn: AssertEqual<ReturnType<ReturnType<typeof add>>, number> = true
