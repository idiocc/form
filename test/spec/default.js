import { equal } from '@zoroaster/assert'
import Context from '../context'
import Form from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof Form, 'function')
  },
  async 'calls package without error'({ fixture }) {
    const form = new Form()
    await form.addFile(fixture`test.txt`, 'file')
    form.addSection('hello', 'world')
    return form.data
  },
}

export default T