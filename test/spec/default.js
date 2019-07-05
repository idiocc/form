import { equal, ok } from '@zoroaster/assert'
import Context from '../context'
import form from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof form, 'function')
  },
  async 'calls package without error'() {
    await form()
  },
  async 'gets a link to the fixture'({ fixture }) {
    const text = fixture`text.txt`
    const res = await form({
      text,
    })
    ok(res, text)
  },
}

export default T