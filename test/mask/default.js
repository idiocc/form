import makeTestSuite from '@zoroaster/mask'
import Context from '../context'
import form from '../../src'

// export default
makeTestSuite('test/result', {
  async getResults() {
    const res = await form({
      text: this.input,
    })
    return res
  },
  context: Context,
})