# sendForm

<!-- @namespace: sugar.js.dom.sendForm -->

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**


Send a form through an ajax call and return back a promise resolved with the server response



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
form  |  **{ HTMLFormElement }**  |  The form to send  |  required  |

Return **{ [Promise](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Promise) }** A promise resolved when the forn has been sent

### Example
```js
	import sendForm from '@coffeekraken/sugar/js/dom/sendForm'
const myCoolForm = document.querySelector('.my-cool-form')
sentForm(myCoolForm).then((response) => {
	// do something with the response
})
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)