

<!-- @namespace    sugar.js.core -->
<!-- @name    activeSpace -->

# ```js activeSpace ```
### Since: 2.0.0

This object expose some functions that are usefull to manage the "active" space of your application.
An active space is represented by a string formated like so "something.cool.hello". This mean that your app is
in the "something.cool.hello" space and depending on that, you can enable or disable some features like for example
keypress that have to be active only in certain "space" of your application.
The exposed functions are these ones:
- set: This allows you to set the active space
- get: This allows you to get the current active space
- is: This allows you to check if the passed active space string is in the current active space
- previous: This allows you to go back 1 activeSpace in the stack
- on: This allows you to register callbacks attached to an activeSpace
- append: This allows you to append an activeSpace string to the current one


### Example (js)

```js
const activeSpace = require('@coffeekraken/sugar/core/activeSpace');
activeSpace.set('hello.world');
activeSpace.get(); // => hello.world
activeSpace.is('hello'); // => false
activeSpace.is('hello.world.coco'); // => false
activeSpace.is('hello.*'); // => true
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    get -->

# ```js get ```
### Since: 2.0.0

This function allows you to get the current active space




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    set -->

# ```js set ```
### Since: 2.0.0

This function allows you to set the current active space

## Parameters

- **activeSpace**  String: The active space to set

- **history** (true) Boolean: Specify if you want that this action make en new entry in history or not

- **silent**  Boolean: Specify if you want to have errors throwed or not




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    append -->

# ```js append ```
### Since: 2.0.0

This function take the current activeSpace string and add the passed one to set the new activeSpace string

## Parameters

- **activeSpace**  String: The activeSpace to append

- **history** (true) Boolean: Specify if you want that this action make en new entry in history or not




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    remove -->

# ```js remove ```
### Since: 2.0.0

This function simply remove the passed string from the activeSpace stack

## Parameters

- **toRemove**  String: The string to remove

- **history** (true) Boolean: Specify if you want that this action make en new entry in history or not




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    previous -->

# ```js previous ```
### Since: 2.0.0

This function simply go back by 1 in the activeSpace stack




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    is -->

# ```js is ```
### Since: 2.0.0

This function allows you to check if the active space string that you pass match with the current active space or not.
The checking process is done using the "minimatch" package that let you use cool features like "", "**", etc...

## Parameters

- **activeSpaceToCheck**  String: The active space string that you want to check

- **currentActiveSpace** (activeSpaceApi.get()) String: The current active space to check against the passed one




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    on -->

# ```js on ```
### Since: 2.0.0

This function allows you to register a callback linked with an activeSpace string
that will be called once the activeSpace is matched

## Parameters

- **activeSpaceToCheck**  String: The active space to check

- **callback**  Function: The callback function to call when the activeSpace is matched

- **settings** ([object Object]) Object: A settings object to configure your activeSpace callback behavior:
- once (false) {Boolean}: Specify if you want the callback to be called only once. This will just set the "count" setting to 1
- count (-1) {Number}: Specify how many times you want the callback to be called. -1 mean unlimited.




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    _callCallbacks -->

# ```js _callCallbacks ```


Call the callbacks when an activeSpace has been setted




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

