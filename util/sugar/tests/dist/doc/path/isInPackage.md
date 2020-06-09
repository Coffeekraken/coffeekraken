
# Function


## ```js isInPackage ```


Return the path to either the first finded package root going up the folders, or the highest package root finded

## Parameters

- **name**  String,Array: The package name to check or a string comma separated like "myPackage,another"

- **from** (/Users/olivierbossel/data/web/coffeekraken/coffeekraken/util/sugar) String: Specify from where the research has to be done

- **highest**  Boolean: Specify if you want the highest package root or the first finded



## Example (js)

```js
const isInPackage = require('@coffeekraken/sugar/node/path/isInPackage');
const root = isInPackage();
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



