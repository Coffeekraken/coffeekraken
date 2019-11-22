# g-states-count

Get states count

Return **{ Integer }** The number of states defined

Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)

## Functions

### g-current-state

Get the current state map

Return **{ [Map](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#maps) }** The current state map

Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)

### g-current-state-name

Get the current state name

Return **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }** The current state name

Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)

### g-has-state

Check if a state exist :

#### Parameters

| Name   | Type                                                                                                  | Description                    | Status   | Default |
| ------ | ----------------------------------------------------------------------------------------------------- | ------------------------------ | -------- | ------- |
| \$name | **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }** | The name of the state to check | required |

Return **{ Boolean }** true if exist

Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)

### g-state-var

Get a state variable

#### Parameters

| Name                    | Type                                                                                                  | Description                         | Status   | Default |
| ----------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------- | -------- | ------- |
| \$varName               | **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }** | The variable name                   | required |
| \$stateMap-or-stateName | **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }** | The state name or a map state value | optional | current |

Return **{ Mixed }** The finded value

### g-states

get the registered gridle states

Return **{ [Map](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#maps) }** All the registered states

Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)

### g-states-names

get the registered gridle states names

Return **{ [List](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#lists) }** All the registered states names

Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)

### g-gutters

Return a multiple of the gutter-unit variable

#### Parameters

| Name            | Type           | Description              | Status   | Default |
| --------------- | -------------- | ------------------------ | -------- | ------- |
| \$miltiplicator | **{ Number }** | The multiplicator to use | required |

Return **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }** The calc representation of the multiplied value

### g-columns

Return a multiple of the column-unit variable

#### Parameters

| Name            | Type           | Description              | Status   | Default |
| --------------- | -------------- | ------------------------ | -------- | ------- |
| \$miltiplicator | **{ Number }** | The multiplicator to use | required |

Return **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }** The calc representation of the multiplied value

### g-columns-gutters

Return a multiple of the gutter AND column unit variables

#### Parameters

| Name            | Type           | Description              | Status   | Default |
| --------------- | -------------- | ------------------------ | -------- | ------- |
| \$miltiplicator | **{ Number }** | The multiplicator to use | required |

Return **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }** The calc representation of the multiplied value

### g-media-query

Get the media query for a particular state, or width, etc...

#### Parameters

| Name        | Type          | Description                                    | Status   | Default |
| ----------- | ------------- | ---------------------------------------------- | -------- | ------- |
| \$stateName | **{ Mixed }** | The state name to generate the media query for | optional | current |

Return **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }** The media query string without the @media

### g-process-selector

Process a selector by:

1. replacing @default with ''

#### Parameters

| Name       | Type                                                                                                  | Description             | Status   | Default |
| ---------- | ----------------------------------------------------------------------------------------------------- | ----------------------- | -------- | ------- |
| \$selector | **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }** | The selector to process | required |

Return **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }** The processed selector
