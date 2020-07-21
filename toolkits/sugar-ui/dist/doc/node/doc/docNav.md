


<!-- @namespace    sugar.node.doc -->
<!-- @name    docNav -->

# ```js docNav ```
### Since: 2.0.0

This function take as parameter a docMap JSON data structure and convert it to an
SNav instance that you can convert then into markdown, html, etc...

## Parameters

- **docMap** (`${__sugarConfig('doc.rootDir')}/docMap.json`) Object: Either directly a docMap JSON or a docMap.json path

- **settings** ([object Object]) Object: A settings object that will be passed to the SNav constructor
- url ([path]) {String}: Specify the url you want in each SNavItem. The token "[path]" will be replaced by the actual doc file path


## Example (js)

```js
const docNav = require('@coffeekraken/sugar/node/doc/docNav');
docNav('something/docMap.json');
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



