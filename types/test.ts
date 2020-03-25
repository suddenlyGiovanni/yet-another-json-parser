import { add } from '../src/index' // f is(n: number) => void

// $ExpectType (b: number) => number
add(1)

// $ExpectType n umber
add(1)(2)
