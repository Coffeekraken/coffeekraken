


<!-- @namespace    sugar.js.docblock -->
<!-- @name    SDocblockBlock -->

# ```js SDocblockBlock ```
### Since: 2.0.0

This class represent a docblock object that contains all the "tags" values and some features like:
- Converting the block to markdown
- More to come...

## Parameters

- **source**  String: The docblock source.

- **settings** ([object Object]) Object: A settings object to configure your instance



## Example (js)

```js
import SDocblockBlock from '@coffeekraken/sugar/js/docblock/SDocblockBlock';
const myBlock = new SDocblockBlock(myDocblockString);
const myBlock.toMarkdown();
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods



<!-- @name    constructor -->

# ```js constructor ```


Constructor




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    toString -->

# ```js toString ```


This method return the passed source string




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    toObject -->

# ```js toObject ```


This method return the parsed docblock object




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    toMarkdown -->

# ```js toMarkdown ```


This method can be used to convert the docblock object to a markdown string




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    to -->

# ```js to ```


This method can be used to convert the docblock to one of the supported output
format like "markdown" and more to come...

## Parameters

- **format**  String: The format wanted as output. Can be actually "markdown" and more to come...




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    parse -->

# ```js parse ```


This method take a docblick string and parse it to a javascript object




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Variables



<!-- @name    tagsMap -->

# Static ```js tagsMap ```


Store the default tags mapping to their parsing functions



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    templates -->

# Static ```js templates ```


Store the available templates like "js", "node", "scss", etc...



### Author
- 




<!-- @name    _source -->

# ```js _source ```


Store the passed source



### Author
- 




<!-- @name    _settings -->

# ```js _settings ```


Store this instance settings



### Author
- 




<!-- @name    _blockObj -->

# ```js _blockObj ```


Store the parsed docblock object



### Author
- 




<!-- @name    object -->

# get ```js object ```


Access the parsed block object



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    string -->

# get ```js string ```


Access docblock string version



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

