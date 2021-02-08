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
    var SAjax_1 = __importDefault(require("../http/SAjax"));
    var form_serialize_1 = __importDefault(require("form-serialize"));
    /**
     * @name      sendForm
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
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
            throw "The \"form\" parameter passed to the \"sendForm\" function is not a form";
        }
        // get the enctype
        var enctype = form.getAttribute('enctype') || 'application/x-www-form-urlencoded';
        // encode form datas
        var data = null;
        if (enctype === 'application/x-www-form-urlencoded') {
            // serialize the form values
            data = form_serialize_1.default(form);
        }
        else {
            data = new FormData(form);
        }
        // create ajax instance
        var ajx = new SAjax_1.default({
            url: form.getAttribute('action'),
            method: form.getAttribute('method') || 'POST',
            data: data,
            contentType: enctype
        });
        // set the loading attribute on the form
        form.setAttribute('loading', true);
        // send and return the promise
        var promise = ajx.send();
        // listen for the end of loading
        promise.then(function (success) {
            form.removeAttribute('loading');
        }, function (error) {
            form.removeAttribute('loading');
        });
        // return the promise
        return promise;
    }
    return sendForm;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZEZvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZW5kRm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztJQUVkLHdEQUFrQztJQUNsQyxrRUFBNkM7SUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXdCRztJQUNILFNBQVMsUUFBUSxDQUFDLElBQUk7UUFDcEIsVUFBVTtRQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEtBQUssTUFBTSxFQUFFO1lBQzFELE9BQU8sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDeEMsTUFBTSwwRUFBc0UsQ0FBQztTQUM5RTtRQUVELGtCQUFrQjtRQUNsQixJQUFNLE9BQU8sR0FDWCxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLG1DQUFtQyxDQUFDO1FBRXRFLG9CQUFvQjtRQUNwQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxPQUFPLEtBQUssbUNBQW1DLEVBQUU7WUFDbkQsNEJBQTRCO1lBQzVCLElBQUksR0FBRyx3QkFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzlCO2FBQU07WUFDTCxJQUFJLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDM0I7UUFFRCx1QkFBdUI7UUFDdkIsSUFBTSxHQUFHLEdBQUcsSUFBSSxlQUFLLENBQUM7WUFDcEIsR0FBRyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDO1lBQ2hDLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLE1BQU07WUFDN0MsSUFBSSxFQUFFLElBQUk7WUFDVixXQUFXLEVBQUUsT0FBTztTQUNyQixDQUFDLENBQUM7UUFFSCx3Q0FBd0M7UUFDeEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFbkMsOEJBQThCO1FBQzlCLElBQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUUzQixnQ0FBZ0M7UUFDaEMsT0FBTyxDQUFDLElBQUksQ0FDVixVQUFDLE9BQU87WUFDTixJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xDLENBQUMsRUFDRCxVQUFDLEtBQUs7WUFDSixJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FDRixDQUFDO1FBRUYscUJBQXFCO1FBQ3JCLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFDRCxPQUFTLFFBQVEsQ0FBQyJ9