
# Function


## ```js header ```


Log a header message containing infos like passed title, passed description and passed infos {Object}.

## Parameters

- **title**  String: The title to display

- **description**  String: The description to display

- **infos** ([object Object]) Object: An object of infos to display in {key}: {value} format



## Example (js)

```js
const header = require('@coffeekraken/sugar/node/log/presets/header');
console.log(header('Hello World', 'Something cool to say about the application...', { version: '1.0.0' }));
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



