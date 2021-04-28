// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../http/SAjax", "form-serialize"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const SAjax_1 = __importDefault(require("../http/SAjax"));
    const form_serialize_1 = __importDefault(require("form-serialize"));
    /**
     * @name      sendForm
     * @namespace            js.dom
     * @type      Function
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
            data = form_serialize_1.default(form);
        }
        else {
            data = new FormData(form);
        }
        // create ajax instance
        const ajx = new SAjax_1.default({
            url: form.getAttribute('action'),
            method: form.getAttribute('method') || 'POST',
            data: data,
            contentType: enctype
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZEZvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zdWdhci9zcmMvanMvZG9tL3NlbmRGb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLDBEQUFrQztJQUNsQyxvRUFBNkM7SUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXdCRztJQUNILFNBQVMsUUFBUSxDQUFDLElBQUk7UUFDcEIsVUFBVTtRQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEtBQUssTUFBTSxFQUFFO1lBQzFELE9BQU8sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDeEMsTUFBTSxzRUFBc0UsQ0FBQztTQUM5RTtRQUVELGtCQUFrQjtRQUNsQixNQUFNLE9BQU8sR0FDWCxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLG1DQUFtQyxDQUFDO1FBRXRFLG9CQUFvQjtRQUNwQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxPQUFPLEtBQUssbUNBQW1DLEVBQUU7WUFDbkQsNEJBQTRCO1lBQzVCLElBQUksR0FBRyx3QkFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzlCO2FBQU07WUFDTCxJQUFJLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDM0I7UUFFRCx1QkFBdUI7UUFDdkIsTUFBTSxHQUFHLEdBQUcsSUFBSSxlQUFLLENBQUM7WUFDcEIsR0FBRyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDO1lBQ2hDLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLE1BQU07WUFDN0MsSUFBSSxFQUFFLElBQUk7WUFDVixXQUFXLEVBQUUsT0FBTztTQUNyQixDQUFDLENBQUM7UUFFSCx3Q0FBd0M7UUFDeEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFbkMsOEJBQThCO1FBQzlCLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUUzQixnQ0FBZ0M7UUFDaEMsT0FBTyxDQUFDLElBQUksQ0FDVixDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ1YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsQyxDQUFDLEVBQ0QsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNSLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbEMsQ0FBQyxDQUNGLENBQUM7UUFFRixxQkFBcUI7UUFDckIsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUNELGtCQUFlLFFBQVEsQ0FBQyJ9