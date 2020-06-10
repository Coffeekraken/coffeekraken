


<!-- @namespace    sugar.js.html -->

# ```js replaceTags ```


Replace all the html tags that you specify by something else that you can fully choose

## Parameters

- **text**  String: The text in which replace all the tags

- **tags**  Object: An object of tags to replace which have as value the replacement function that take the tag name, the tag content and must return the replacement content



## Example (js)

```js
import replaceTags from '@coffeekraken/sugar/js/html/replaceTags';
replaceTags('<span>Hello</span> world', {
   span: (tag, content) => `<div>${content}</div>`; // => <div>Hello</div> world
});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



