# is

<!-- @namespace: sugar.scss.meta.is -->

Type : **{ function }**

Check if the passed value is of a certain type

Here's the available types that you can check

- mixed => mean anything
- null
- url
- px
- pt
- rem
- em
- percent | %
- vw
- vh
- ex
- ch
- cm
- mm
- in
- pc
- s | second
- boolean | bool
- function
- number
- int | integer
- string
- color
- list
- map
- deg | degree
- list-{type} => check if is a list of the specified type
- map-{type} => check if is a map of the specified type

### Parameters

| Name   | Type                                                                                                  | Description        | Status   | Default |
| ------ | ----------------------------------------------------------------------------------------------------- | ------------------ | -------- | ------- |
| $value | **{ Mixed }**                                                                                         | The value to check | required |
| $type  | **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }** | The type to check  | required |

Return **{ Boolean }** true if match the type, false if not

### Example

```scss
	sugar.is(hello, string) // => true
sugar.is('hello', string) // => true
sugar.is(#fff, color) // => true
sugar.is(hello #fff, list-color) // => false
sugar.is(#fff #ddd, list-color) // => true
// etc...
```

Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)
