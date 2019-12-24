## API

The package is available by importing its default class:

```js
import Form from '@multipart/form'
```

%~%

## `class Form`

The form class maintains an internal buffer with data that can be sent in a `multipart/form-data` request. It can append fields and files, and when a file path is given, it will be read from the file system and its contents will be added to the form data.

<typedef slimFunctions narrow>types/form.xml</typedef>

<typedef>types/index.xml</typedef>

%EXAMPLE: example, ../src => @multipart/form%
%FORK-http example%

%~%