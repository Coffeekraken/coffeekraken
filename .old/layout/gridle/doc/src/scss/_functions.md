# states-count

<!-- @namespace: gridle.function.states-count -->

Type : **{ [Function](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#functions) }**


Get states count


Return **{ Integer }** The number of states defined

Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)



## Functions


### current-state

<!-- @namespace: gridle.function.current-state -->

Type : **{ [Function](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#functions) }**


Get the current state map


Return **{ [Map](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#maps) }** The current state map

Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)


### current-state-name

<!-- @namespace: gridle.function.current-state-name -->

Type : **{ [Function](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#functions) }**


Get the current state name


Return **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }** The current state name

Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)



### has-state

<!-- @namespace: gridle.function.has-state -->

Type : **{ [Function](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#functions) }**


Check if a state exist :



#### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$name  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The name of the state to check  |  required  |

Return **{ Boolean }** true if exist

Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)


### state-var

<!-- @namespace: gridle.function.state-var -->

Type : **{ [Function](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#functions) }**


Get a state variable



#### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$varName  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The variable name  |  required  |
$stateMap-or-stateName  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The state name or a map state value  |  optional  |  current

Return **{ Mixed }** The finded value

Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)


### states

<!-- @namespace: gridle.function.states -->

Type : **{ [Function](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#functions) }**


get the registered gridle states


Return **{ [Map](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#maps) }** All the registered states

Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)


### states-names

name       states-names

<!-- @namespace: gridle.function.states-names -->

Type : **{ [Function](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#functions) }**

Return **{ [List](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#lists) }** All the registered states names

Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)


### gutters

<!-- @namespace: gridle.function.gutters -->

Type : **{ [Function](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#functions) }**


Return a multiple of the gutter-unit variable



#### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$miltiplicator  |  **{ Number }**  |  The multiplicator to use  |  required  |

Return **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }** The calc representation of the multiplied value

Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)


### columns

<!-- @namespace: gridle.function.columns -->

Type : **{ [Function](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#functions) }**


Return a multiple of the column-unit variable



#### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$miltiplicator  |  **{ Number }**  |  The multiplicator to use  |  required  |

Return **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }** The calc representation of the multiplied value

Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)


### columns-gutters

<!-- @namespace: gridle.function.columns-gutters -->

Type : **{ [Function](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#functions) }**


Return a multiple of the gutter AND column unit variables



#### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$miltiplicator  |  **{ Number }**  |  The multiplicator to use  |  required  |

Return **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }** The calc representation of the multiplied value

Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)


### media-query

<!-- @namespace: gridle.function.media-query -->

Type : **{ [Function](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#functions) }**


Get the media query for a particular state, or width, etc...



#### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$stateName  |  **{ Mixed }**  |  The state name to generate the media query for  |  optional  |  current

Return **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }** The media query string without the @media

Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)


### process-selector

<!-- @namespace: gridle.function.process-selector -->

Type : **{ [Function](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#functions) }**


Process a selector by:
1. replacing @default with ''



#### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$selector  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The selector to process  |  required  |

Return **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }** The processed selector

Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)