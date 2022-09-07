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
 * import { __sendForm } from '@coffeekraken/sugar/dom'
 * const myCoolForm = document.querySelector('.my-cool-form')
 * __sendForm(myCoolForm).then((response) => {
 * 	// do something with the response
 * })
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __sendForm(form) {
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
exports.default = __sendForm;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9FQUE2QztBQUM3QywwREFBa0M7QUFFbEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSCxTQUF3QixVQUFVLENBQUMsSUFBcUI7SUFDcEQsVUFBVTtJQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEtBQUssTUFBTSxFQUFFO1FBQ3hELE9BQU8sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEMsTUFBTSxzRUFBc0UsQ0FBQztLQUNoRjtJQUVELGtCQUFrQjtJQUNsQixNQUFNLE9BQU8sR0FDVCxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLG1DQUFtQyxDQUFDO0lBRXhFLG9CQUFvQjtJQUNwQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7SUFDaEIsSUFBSSxPQUFPLEtBQUssbUNBQW1DLEVBQUU7UUFDakQsNEJBQTRCO1FBQzVCLElBQUksR0FBRyxJQUFBLHdCQUFlLEVBQUMsSUFBSSxDQUFDLENBQUM7S0FDaEM7U0FBTTtRQUNILElBQUksR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM3QjtJQUVELHVCQUF1QjtJQUN2QixNQUFNLEdBQUcsR0FBRyxJQUFJLGVBQUssQ0FBQztRQUNsQixHQUFHLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUM7UUFDaEMsTUFBTSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksTUFBTTtRQUM3QyxJQUFJLEVBQUUsSUFBSTtRQUNWLFdBQVcsRUFBRSxPQUFPO0tBQ3ZCLENBQUMsQ0FBQztJQUVILHdDQUF3QztJQUN4QyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUVuQyw4QkFBOEI7SUFDOUIsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0lBRTNCLGdDQUFnQztJQUNoQyxPQUFPLENBQUMsSUFBSSxDQUNSLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDUixJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3BDLENBQUMsRUFDRCxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ04sSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNwQyxDQUFDLENBQ0osQ0FBQztJQUVGLHFCQUFxQjtJQUNyQixPQUFPLE9BQU8sQ0FBQztBQUNuQixDQUFDO0FBOUNELDZCQThDQyJ9