


<!-- @namespace    sugar.js.cli -->

# ```js parseArgs ```


Parse a string to find the provided arguments into the list and return a corresponding object.

## Parameters

- **string**  String: The string to parse

- **definitionObj**  Object: The arguments object description

- **settings** ([object Object]) Object: A settings object that configure how the string will be parsed. Here's the settings options:



## Example (js)

```js
import parseArgs from '@coffeekraken/sugar/js/string/parseArgs';
parseArgs('hello -w 10 yop "hello world" -b --hello.world Nelson --help "coco yep" #blop', {
   param1: { type: 'String', alias: 'p' },
   world: { type: 'Array', alias: 'w', validator: value => {
     return Array.isArray(value);
   }},
   bool: { type: 'Boolean', alias: 'b', default: false, required: true },
   'hello.world': { type: 'String' },
   help: { type: 'String', alias: 'h' },
   id: { type: 'String', alias: 'i', regexp: /^#([\S]+)$/ }
}, {
   treatDotsAsObject: true,
   handleOrphanOptions: true
});
{
   param1: 'hello',
   world: [10, 'yop', 'hello world'],
   bool: true,
   hello: {
     world: 'Nelson'
   },
   help: 'coco yep',
   id: '#blop'
}
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



