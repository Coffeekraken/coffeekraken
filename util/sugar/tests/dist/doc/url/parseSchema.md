
# Function


## ```js parseSchema ```


This function take two arguments. The first one is the url to parse and the second is a schema to scan the url with.
The schema describe the pathname of an url and tell's how to analyze it.
Here's a little description with some example of schemas:
- "{param1}/{param2}/{param3}": This schema describe that your Url must have 3 "values" named param1, param2 and param3
- If my Url is "something.com/hello/world/plop", my schema is respected and I can have access to the values through the "schema.params.param1", "schema.params.param2", etc...
- "{hello:string}/{world:number}/{?idx:number}": This schema describe that the Url can have 3 "values" but the last one is optional
- If my Url is "something.com/plop/3/1", my schema is respected
- If my Url is "something.com/plop/2", my schema is respected
- If my Url is "something.com/plop/hello/2", my schema is not respected due to the fact that the param named "world" has to be a number

## Parameters

- **url**  String: The url to parse

- **schema**  String: The schema with the one we will analyze the url



## Example (js)

```js
import parseSchema from '@coffeekraken/sugar/js/url/parseSchema';
parseSchema('https://github.com/myApp/master/3', '{project:string}/{?branch:string}/{?idx:number}');
// {
//   url: 'https://github.com/myApp/master/3',
//   schema: '{project:string}/{?branch:string}/{?idx:number}',
//   match: true,
//   errors: null,
//   params: {
//     project: {
//       optional: false,
//       raw: '{project:string}',
//       type: 'string',
//       value: 'myApp'
//     },
//     branch: {
//       optional: true,
//       raw: '{?branch:string},
//       type: 'string',
//       value: 'master'
//     },
//     idx: {
//       optional: true,
//       raw: '{?idx:number}',
//       type: 'number',
//       value: 3
//     }
//   }
// }
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



