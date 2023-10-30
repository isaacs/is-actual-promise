import t from 'tap'
import { isPromise } from '../dist/esm/index.js'

t.equal(isPromise(Promise.resolve(true)), true)
t.equal(isPromise(Promise.resolve(true).then(() => {})), true)
t.equal(isPromise({ then() {} }), false)
t.equal(isPromise({ then() {}, catch() {} }), false)
t.equal(isPromise({ then() {}, finally() {} }), false)
t.equal(isPromise({ then() {}, catch() {}, finally() {} }), true)
t.equal(
  isPromise(
    Object.assign(function () {}, {
      then() {},
      catch() {},
      finally() {},
    })
  ),
  true
)

t.test('type assertion checking', async t => {
  // verify type assertion checking
  const foo = async (p: Promise<any> | number): Promise<number> => {
    if (isPromise(p)) {
      p.then(() => {})
      // not allowed on promises
      //@ts-expect-error
      return p + 2
    } else {
      //@ts-expect-error
      p.catch(() => {}).finally(() => {})
      return p - 1
    }
  }
  // verify that it actually goes through our erroneous code path
  t.equal(await foo(Promise.resolve(true)), '[object Promise]2')
})
