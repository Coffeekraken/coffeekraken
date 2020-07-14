


<!-- @namespace    sugar.js.dom -->
<!-- @name    querySelectorAllWithStyle -->

# ```js querySelectorAllWithStyle ```


Select all node that match the style object passed as parameter

## Parameters

- **selector**  String: The css selector to use as base filter

- **style**  Object: The style that has to match

- **settings** ([object Object]) Object: A setting object



## Example (js)

```js
import querySelectorAllWithStyle from '@coffeekraken/sugar/js/dom/querySelectorAllWithStyle'
querySelectorAllWithStyle('', {
	backgroundImage: true
})

// style object can contains either:
const style = {
	 backgroundImage: true, // has to have the background-image style
  backgroundPosition: false, // has to not have the background-position style
  backgroundSize: /cover|contain/, // has to have the background-size set to cover or contain
  background: 'none' // has to have to background set to "none"
}
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    settings.rootNode -->

# ```js settings.rootNode ```






### Author
- 

