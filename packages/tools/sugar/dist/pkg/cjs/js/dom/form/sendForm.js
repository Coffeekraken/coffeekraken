"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const form_serialize_1 = __importDefault(require("form-serialize"));
const SAjax_1 = __importDefault(require("../http/SAjax"));
/**
 * @name      sendForm
 * @namespace            js.dom.form
 * @type      Function
 * @platform          js
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function sendForm(form) {
    // protect
    if (!form.tagName || form.tagName.toLowerCase() !== 'form') {
        console.error('passed arguments', form);
        throw `The "form" parameter passed to the "sendForm" function is not a form`;
    }
    // get the enctype
    const enctype = form.getAttribute('enctype') || 'application/x-www-form-urlencoded';
    // encode form datas
    let data = null;
    if (enctype === 'application/x-www-form-urlencoded') {
        // serialize the form values
        data = (0, form_serialize_1.default)(form);
    }
    else {
        data = new FormData(form);
    }
    // create ajax instance
    const ajx = new SAjax_1.default({
        url: form.getAttribute('action'),
        method: form.getAttribute('method') || 'POST',
        data: data,
        contentType: enctype,
    });
    // set the loading attribute on the form
    form.setAttribute('loading', true);
    // send and return the promise
    const promise = ajx.send();
    // listen for the end of loading
    promise.then((success) => {
        form.removeAttribute('loading');
    }, (error) => {
        form.removeAttribute('loading');
    });
    // return the promise
    return promise;
}
exports.default = sendForm;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9FQUE2QztBQUM3QywwREFBa0M7QUFFbEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSCxTQUFTLFFBQVEsQ0FBQyxJQUFxQjtJQUNuQyxVQUFVO0lBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsS0FBSyxNQUFNLEVBQUU7UUFDeEQsT0FBTyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4QyxNQUFNLHNFQUFzRSxDQUFDO0tBQ2hGO0lBRUQsa0JBQWtCO0lBQ2xCLE1BQU0sT0FBTyxHQUNULElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLElBQUksbUNBQW1DLENBQUM7SUFFeEUsb0JBQW9CO0lBQ3BCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztJQUNoQixJQUFJLE9BQU8sS0FBSyxtQ0FBbUMsRUFBRTtRQUNqRCw0QkFBNEI7UUFDNUIsSUFBSSxHQUFHLElBQUEsd0JBQWUsRUFBQyxJQUFJLENBQUMsQ0FBQztLQUNoQztTQUFNO1FBQ0gsSUFBSSxHQUFHLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzdCO0lBRUQsdUJBQXVCO0lBQ3ZCLE1BQU0sR0FBRyxHQUFHLElBQUksZUFBSyxDQUFDO1FBQ2xCLEdBQUcsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxNQUFNO1FBQzdDLElBQUksRUFBRSxJQUFJO1FBQ1YsV0FBVyxFQUFFLE9BQU87S0FDdkIsQ0FBQyxDQUFDO0lBRUgsd0NBQXdDO0lBQ3hDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBRW5DLDhCQUE4QjtJQUM5QixNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFM0IsZ0NBQWdDO0lBQ2hDLE9BQU8sQ0FBQyxJQUFJLENBQ1IsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUNSLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDcEMsQ0FBQyxFQUNELENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDTixJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3BDLENBQUMsQ0FDSixDQUFDO0lBRUYscUJBQXFCO0lBQ3JCLE9BQU8sT0FBTyxDQUFDO0FBQ25CLENBQUM7QUFDRCxrQkFBZSxRQUFRLENBQUMifQ==