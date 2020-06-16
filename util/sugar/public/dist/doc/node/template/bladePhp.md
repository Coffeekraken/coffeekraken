


<!-- @namespace    sugar.node.template -->
<!-- @name    bladePhp -->

# ```js bladePhp ```


Compile a blade php view and return a promise with the
resulting template

## Parameters

- **view**  String: relative path to the view to render

- **data** ([object Object]) Object: The data to pass to the view

- **settings** ([object Object]) Object: A settings object to configure your blade compilation
- rootDir (__sugarConfig('views.rootDir')) {String}: Specify the root views folder
- cacheDir (__sugarConfig('views.cacheDir')) {String}: Specify the root views cache folder


## Example (js)

```js
const bladePhp = require('@coffeekraken/sugar/template/bladePhp');
bladePhp('my-cool-view', {
  hello: 'World'
}).then((result) => {
  // do something with the result
});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



