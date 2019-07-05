import Form from '../src'

(async () => {
  const form = new Form()
  await form.addFile(`test/fixture/test.txt`, 'file')
  form.addSection('hello', 'world')
  console.log(form.data)
})()