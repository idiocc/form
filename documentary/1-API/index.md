## API

The package is available by importing its default class:

```js
import Form from '@multipart/form'
```

%~%

## `class Form`

The form class maintains an internal buffer with data that can be sent in a `multipart/form-data` request. It can append fields and files, and when a file path is given, it will be read from the file system and its contents will be added to the form data. It has the following methods:

```### constructor => Form
[
  ["opts", "Config"]
]
```

%TYPEDEF types/index.xml Config%

Creates a new instance of the form.

```### addSection
[
  ["key", "string"],
  ["value", "string"]
]
```

Adds a section with field data, separated by boundary.

```### async addFile
[
  ["path", "string"],
  ["field", "string"],
  ["options", "AddFileOptions?"]
]
```

Reads the file from the disk and adds its content to the form. Once a file is read, it will be stored in the cache for further reads, unless the `noCache` option is specified.

%TYPEDEF types/index.xml AddFileOptions%

### `get data`

Concatenates the buffer data with `\r\n` and adds the final `--{boundary}--` to the returned string.

%EXAMPLE: example, ../src => @multipart/form%
%FORK-http example%

%~%