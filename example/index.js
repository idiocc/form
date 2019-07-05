/* alanode example/ */
import form from '../src'

(async () => {
  const res = await form({
    text: 'example',
  })
  console.log(res)
})()