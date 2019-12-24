# @multipart/form

[![npm version](https://badge.fury.io/js/%40multipart%2Fform.svg)](https://www.npmjs.com/package/@multipart/form)

`@multipart/form` is A _Node.JS_ Class To Create Multipart/Form-Data Requests With Files and Fields.

```sh
yarn add @multipart/form
npm install @multipart/form
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [`class Form`](#class-form)
  * [`Form`](#type-form)
  * [`FormConfig`](#type-formconfig)
  * [`AddFileOptions`](#type-addfileoptions)
- [Copyright & License](#copyright--license)

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/0.svg?sanitize=true">
</a></p>

## API

The package is available by importing its default class:

```js
import Form from '@multipart/form'
```

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/1.svg?sanitize=true">
</a></p>

## `class Form`

The form class maintains an internal buffer with data that can be sent in a `multipart/form-data` request. It can append fields and files, and when a file path is given, it will be read from the file system and its contents will be added to the form data.

__<a name="type-form">`Form`</a>__: Accumulates data in fields and returns the complete body.
<table>
 <thead><tr>
  <th>Name</th>
  <th>Type &amp; Description</th>
 </tr></thead>
 <tr>
  <td rowSpan="3" align="center"><ins>constructor</ins></td>
  <td><em>new (config: <a href="#type-formconfig" title="Options for the constructor.">!FormConfig</a>) => <a href="#type-form" title="Accumulates data in fields and returns the complete body.">Form</a></em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   Creates a new form instance that maintains a buffer of key-value pairs and files separated by a boundary.
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center"><ins>buffer</ins></td>
  <td><em>!Buffer</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   The data to send.
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center"><ins>data</ins></td>
  <td><em>string</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   The data to send as utf-8 string. Concatenates the buffer data with <code>\r\n</code> and adds the final <code>--{boundary}--</code> to the returned string.
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center"><ins>addFile</ins></td>
  <td><em>(path: string, name: string, options?: <a href="#type-addfileoptions" title="Options for adding files.">!AddFileOptions</a>) => void</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   Reads and adds the file to the request buffer.
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center"><ins>addSection</ins></td>
  <td><em>(key: string, value: (!Buffer | string)) => void</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   Adds a key-value pair to the form.
  </td>
 </tr>
</table>

__<a name="type-formconfig">`FormConfig`</a>__: Options for the constructor.


|   Name   |      Type       |                Description                |                      Default                       |
| -------- | --------------- | ----------------------------------------- | -------------------------------------------------- |
| boundary | <em>string</em> | The hard-coded boundary for the requests. | `u2KxIV5yF1y+xUspOQCCZopaVgeV6Jxihv35XQJmuTx8X3sh` |


__<a name="type-addfileoptions">`AddFileOptions`</a>__: Options for adding files.


|   Name   |       Type       |                                                   Description                                                   |          Default           |
| -------- | ---------------- | --------------------------------------------------------------------------------------------------------------- | -------------------------- |
| type     | <em>string</em>  | The _Content-Type_ description.                                                                                 | `application/octet-stream` |
| noCache  | <em>boolean</em> | Whether to not cache read files.                                                                                | `false`                    |
| filename | <em>string</em>  | The `filename` property for _Content-Disposition_ description. By default, will be same as the `path` argument. | -                          |

```js
import Form from '@multipart/form'

(async () => {
  const form = new Form()
  await form.addFile(`test/fixture/test.txt`, 'file')
  form.addSection('hello', 'world')
  console.log(form.data)
})()
```
```http
--u2KxIV5yF1y+xUspOQCCZopaVgeV6Jxihv35XQJmuTx8X3sh
Content-Disposition: form-data; name="file"; filename="test/fixture/test.txt"
Content-Type: application/octet-stream

a test file

--u2KxIV5yF1y+xUspOQCCZopaVgeV6Jxihv35XQJmuTx8X3sh
Content-Disposition: form-data; name="hello"

world
--u2KxIV5yF1y+xUspOQCCZopaVgeV6Jxihv35XQJmuTx8X3sh--
```

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/2.svg?sanitize=true">
</a></p>

## Copyright & License

GNU Affero General Public License v3.0

<table>
  <tr>
    <th>
      <a href="https://artd.eco">
        <img width="100" src="https://raw.githubusercontent.com/wrote/wrote/master/images/artdeco.png"
          alt="Art Deco">
      </a>
    </th>
    <th>© <a href="https://artd.eco">Art Deco</a> for <a href="https://idio.cc">Idio</a> 2019</th>
    <th>
      <a href="https://idio.cc">
        <img src="https://avatars3.githubusercontent.com/u/40834161?s=100" width="100" alt="Idio">
      </a>
    </th>
    <th>
      <a href="https://www.technation.sucks" title="Tech Nation Visa">
        <img width="100" src="https://raw.githubusercontent.com/idiocc/cookies/master/wiki/arch4.jpg"
          alt="Tech Nation Visa">
      </a>
    </th>
    <th><a href="https://www.technation.sucks">Tech Nation Visa Sucks</a></th>
  </tr>
</table>

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/-1.svg?sanitize=true">
</a></p>