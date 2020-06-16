


<!-- @namespace    sugar.js.docblock -->
<!-- @name    Dockblock -->

# ```js Dockblock ```
### Since: 2.0.0

This is the main class that expose the methods like "parse", etc...
You have to instanciate it by passing a settings object. Here's the available options:

## Parameters

- **source**  String,Object: The docblock source. Can be either a string, a filepath or an array of docblock objects

- **settings** ([object Object]) Object: An object of settings to configure the SDocblock instance:
- tags ({}) {Object}: An object representing the functions used to parse each tags. The object format is ```{ tagName: parseFn }```



## Example (js)

```js
import SDocblock from '@coffeekraken/sugar/js/docblock/SSDocblock';
new SDocblock(source, {
   // override some settings here...
});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods



## Variables


