# @multipart/form

[![npm version](https://badge.fury.io/js/%40multipart%2Fform.svg)](https://npmjs.org/package/@multipart/form)

`@multipart/form` is A Node.JS Class To Create Multipart/Form-Data Requests With Files and Fields.

```sh
yarn add @multipart/form
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [`class Form`](#class-form)
  * [`constructor(opts: Config): Form`](#constructoropts-config-form)
    * [`Config`](#type-config)
  * [`addSection(key: string, value: string)`](#addsectionkey-stringvalue-string-void)
  * [`async addFile(path: string, field: string, options: AddFileOptions?)`](#async-addfilepath-stringfield-stringoptions-addfileoptions-void)
    * [`AddFileOptions`](#type-addfileoptions)
  * [`get data`](#get-data)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/0.svg?sanitize=true"></a></p>

## API

The package is available by importing its default class:

```js
import Form from '@multipart/form'
```

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/1.svg?sanitize=true"></a></p>

## `class Form`

The form class maintains an internal buffer with data that can be sent in a `multipart/form-data` request. It can append fields and files, and when a file path is given, it will be read from the file system and its contents will be added to the form data. It has the following methods:

### `constructor(`<br/>&nbsp;&nbsp;`opts: Config,`<br/>`): Form`

__<a name="type-config">`Config`</a>__: Options for the constructor.

|   Name   |      Type       |                Description                |                      Default                       |
| -------- | --------------- | ----------------------------------------- | -------------------------------------------------- |
| boundary | <em>string</em> | The hard-coded boundary for the requests. | `u2KxIV5yF1y+xUspOQCCZopaVgeV6Jxihv35XQJmuTx8X3sh` |

Creates a new instance of the form.

### `addSection(`<br/>&nbsp;&nbsp;`key: string,`<br/>&nbsp;&nbsp;`value: string,`<br/>`): void`

Adds a section with field data, separated by boundary.

### `async addFile(`<br/>&nbsp;&nbsp;`path: string,`<br/>&nbsp;&nbsp;`field: string,`<br/>&nbsp;&nbsp;`options: AddFileOptions?,`<br/>`): void`

Reads the file from the disk and adds its content to the form. Once a file is read, it will be stored in the cache for further reads, unless the `noCache` option is specified.

__<a name="type-addfileoptions">`AddFileOptions`</a>__: Options for adding files.

|   Name   |       Type       |                                                   Description                                                   |          Default           |
| -------- | ---------------- | --------------------------------------------------------------------------------------------------------------- | -------------------------- |
| type     | <em>string</em>  | The _Content-Type_ description.                                                                                 | `application/octet-stream` |
| noCache  | <em>boolean</em> | Whether to not cache read files.                                                                                | `false`                    |
| filename | <em>string</em>  | The `filename` property for _Content-Disposition_ description. By default, will be same as the `path` argument. | -                          |

### `get data`

Concatenates the buffer data with `\r\n` and adds the final `--{boundary}--` to the returned string.

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

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/2.svg?sanitize=true"></a></p>

## Copyright

<table>
  <tr>
    <th>
      <a href="https://artd.eco">
        <img src="https://raw.githubusercontent.com/wrote/wrote/master/images/artdeco.png" alt="Art Deco">
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
        <img src="https://raw.githubusercontent.com/artdecoweb/www.technation.sucks/master/anim.gif"
          alt="Tech Nation Visa">
      </a>
    </th>
    <th><a href="https://www.technation.sucks">Tech Nation Visa Sucks</a></th>
  </tr>
</table>

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/-1.svg?sanitize=true"></a></p>