
# Function


## ```js uid ```


This function allows you to generate a uniqid based on the objects you pass as parameters.
The uid is hashed into a SHA256 32bits string but you can specify it using the "format" parameter described above

## Parameters

- **objects...**  Object: The objects you want use to generate the uniqid

- **format** (sha256) String: The uid format that you want. Here's the available values:
- sha256: return a SHA256 64 characters formated string
- full: return the full length uid. The length can vary depending on the objects passed
- **key** (sugar.js.object.uid) String: The key used to encrypt the object



## Example (js)

```js
const uid = require('@coffeekraken/sugar/node/object/uid');
uid({ hello: 'world' }, { plop: 'coco' }); // => ijfw89uf98jhw9ef8whef87hw7e8q87wegfh78wgf87gw8fgw8e7fzghwz8efgw8fwzuheihgbweuzf
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



