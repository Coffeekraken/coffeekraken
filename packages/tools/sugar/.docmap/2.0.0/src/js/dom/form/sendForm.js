/**
*
* @name      sendForm
* @namespace            js.dom.form
* @type      Function
* @platform          js
* @platform          ts
* @status        wip
*
* Send a form through an ajax call and return back a promise resolved with the server response
*
* @param 		{HTMLFormElement} 		form 		The form to send
* @return     {Promise}                    A promise resolved when the forn has been sent
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example 	js
* import sendForm from '@coffeekraken/sugar/js/dom/sendForm'
* const myCoolForm = document.querySelector('.my-cool-form')
* sentForm(myCoolForm).then((response) => {
* 	// do something with the response
* })
*
* @since         1.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/