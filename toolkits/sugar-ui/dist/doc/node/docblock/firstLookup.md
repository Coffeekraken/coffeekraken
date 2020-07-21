


<!-- @namespace    sugar.node.nav -->
<!-- @name    firstLookup -->

# ```js firstLookup ```
### Since: 2.0.0

This function search in the passed folder for files containing a "@namespace" tag (and an "@name" optional one)
and generate a SNav instance with all these founded files as sources...

## Parameters

- **directory**  String: The directory in which to search for files with the namespace tag

- **settings** ([object Object]) Object: A settings object to configure your navigation generation:
- exclude (null) {String}: Specify a glob pattern representing the files to exclude from the generation


## Example (js)

```js
const firstLookup = require('@coffeekraken/sugar/node/nav/firstLookup);
firstLookup('my/cool/folder');
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



