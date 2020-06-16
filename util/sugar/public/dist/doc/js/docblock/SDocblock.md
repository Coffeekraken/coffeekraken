


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



<!-- @name    constructor -->

# ```js constructor ```


Constructor




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    parse -->

# ```js parse ```


This method is the principal one. Use it to parse a string
and get back the object version of it

## Parameters

- **string** (this._source) String: The string to parse




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    toMarkdown -->

# ```js toMarkdown ```


This method convert the parsed docblocks to a markdown string




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    to -->

# ```js to ```


This method allows you to convert the parsed docblocks to a format like "markdown" and more to come...

## Parameters

- **format**  String: The format in which you want to convert your docblocks.




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Variables



<!-- @name    _settings -->

# ```js _settings ```


Store this instance settings



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    _source -->

# ```js _source ```


Store the passed source



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    _blocks -->

# ```js _blocks ```


Store the parsed array of docblock objects



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    _to -->

# ```js _to ```


Store the format in which the docblocks have to be converted



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    blocks -->

# ```js blocks ```


Access the parsed blocks array



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

