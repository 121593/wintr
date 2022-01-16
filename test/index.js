import test from 'ava'
import { Wintr } from '../src/wintr'
import { PARAMETERS } from '../src/constants'

test('Missing options on construction should trigger an error', t => {
  const error = t.throws(() => {
    // eslint-disable-next-line no-unused-vars
    const wintr = new Wintr()
  }, { instanceOf: Error })

  t.is(error.message, 'Options parameter should be supplied')
})

test('Missing API_KEY option on construction should trigger an error', t => {
  const error = t.throws(() => {
    // eslint-disable-next-line no-unused-vars
    const wintr = new Wintr({ [PARAMETERS.URL]: 'xxx' })
  }, { instanceOf: Error })

  t.is(error.message, 'Api key should be supplied')
})

test('Wrong options should trigger errors', t => {
  const wrongOptions = { xxx: 'yyy', [PARAMETERS.API_KEY]: 'xxx' }
  const error = t.throws(() => {
    // eslint-disable-next-line no-unused-vars
    const wintr = new Wintr(wrongOptions)
  }, { instanceOf: Error })

  t.is(error.message, `Option ${Object.keys(wrongOptions)[0]} is not allowed`)
})

test('_getMergedOption behave as expected', t => {
  const initialOptions = { [PARAMETERS.API_KEY]: 'xxx' }
  const callOptions = { [PARAMETERS.URL]: 'yyy', [PARAMETERS.API_KEY]: 'yyy' }
  const expectedResult = { [PARAMETERS.API_KEY]: 'yyy', [PARAMETERS.URL]: 'yyy' }

  const wintr = new Wintr(initialOptions)
  t.deepEqual(wintr._getMergedOptions(callOptions), expectedResult)
})
