


<!-- @namespace    sugar.js.docblock -->

# ```js DockblockParser ```
### Since: 2.0.0

This is the main class that expose the methods like "parse", etc...
You have to instanciate it by passing a settings object. Here's the available options:



## Example (js)

```js
import SDocblockParser from '@coffeekraken/sugar/js/docblock/SSDocblockParser';
new SDocblockParser({
   // override some settings here...
}).parse(myString);
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods




# ```js constructor ```


Constructor

## Parameters

- **settings** ([object Object]) Object: An object of settings to configure the SDocblockParser instance:
- tags ({}) {Object}: An object representing the functions used to parse each tags. The object format is ```{ tagName: parseFn }```




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js parse ```


This method is the principal one. Use it to parse a string
and get back the object version of it

## Parameters

- **string**  String: The string to parse

- **settings** ([object Object]) Object: Override some settings if wanted for this particular parse process. See the settings of the constructor for more info...




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Variables




# ```js _settings ```


Store this instance settings



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# Static ```js tagsMap ```


Store the default tags mapping to their parsing functions



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

