


<!-- @namespace    sugar.node.doc -->
<!-- @name    docMap -->

# ```js docMap ```
### Since: 2.0.0

This function search for "@namespace     something..." inside the files of the specified folder and generate
a JSON file that list all the founded files with their relative path from the specified folder.

## Parameters

- **rootDir**  String: The root directory where to search for documentation files

- **settings** ([object Object]) Object: An object of settings to configure your docMap generation:
- tag (namespace) {String}: The tag to search for inside the files
- exclude (*\/ +(__tests__ | __wip__);\) {String}: A regex string to specify which files to exclude from the research



## Example (js)

```js
const docMap = require('@coffeekraken/sugar/node/doc/docMap');
docMap('my/cool/folder');
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



