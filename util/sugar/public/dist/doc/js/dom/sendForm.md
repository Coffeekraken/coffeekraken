


<!-- @namespace    sugar.js.dom -->
<!-- @name    sendForm -->

# ```js sendForm ```


Send a form through an ajax call and return back a promise resolved with the server response

## Parameters

- **form**  HTMLFormElement: The form to send



## Example (js)

```js
import sendForm from '@coffeekraken/sugar/js/dom/sendForm'
const myCoolForm = document.querySelector('.my-cool-form')
sentForm(myCoolForm).then((response) => {
	// do something with the response
})
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



