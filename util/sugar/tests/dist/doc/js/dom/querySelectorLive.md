


<!-- @namespace    sugar.js.dom -->
<!-- @name    querySelectorLive -->

# ```js querySelectorLive ```


Observe the dom to get all the elements that matches a passed css selector at any point in time.
Be warned that this use the mutation observer API and will monitor all the document for new nodes. Make sure to use it
when you don't have the chance to use the custom elements API instead

## Parameters

- **selector**  String: The css selector that we are interested in

- **cb**  Function: The function to call with the newly added node

- **settings** ([object Object]) Object: An optional settings object to specify things like the rootNode to monitor, etc...



## Example (js)

```js
import querySelectorLive from '@coffeekraken/sugar/js/dom/querySelectorLive'
querySelectorLive('.my-cool-item', (node, clearFn) => {
	// do something here with the detected node
 // call clearFn if you want to stop listening for this selector
 clearFn();
});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    settings.rootNode -->

# ```js settings.rootNode ```






### Author
- 




<!-- @name    settings.once -->

# ```js settings.once ```






### Author
- 

