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
    var SAjax_1 = __importDefault(require("../http/SAjax"));
    var form_serialize_1 = __importDefault(require("form-serialize"));
    /**
     * @name      sendForm
     * @namespace           sugar.js.dom
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
    exports.default = sendForm;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZEZvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZW5kRm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCx3REFBa0M7SUFDbEMsa0VBQTZDO0lBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F3Qkc7SUFDSCxTQUFTLFFBQVEsQ0FBQyxJQUFJO1FBQ3BCLFVBQVU7UUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxLQUFLLE1BQU0sRUFBRTtZQUMxRCxPQUFPLENBQUMsS0FBSyxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3hDLE1BQU0sMEVBQXNFLENBQUM7U0FDOUU7UUFFRCxrQkFBa0I7UUFDbEIsSUFBTSxPQUFPLEdBQ1gsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxtQ0FBbUMsQ0FBQztRQUV0RSxvQkFBb0I7UUFDcEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLElBQUksT0FBTyxLQUFLLG1DQUFtQyxFQUFFO1lBQ25ELDRCQUE0QjtZQUM1QixJQUFJLEdBQUcsd0JBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM5QjthQUFNO1lBQ0wsSUFBSSxHQUFHLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzNCO1FBRUQsdUJBQXVCO1FBQ3ZCLElBQU0sR0FBRyxHQUFHLElBQUksZUFBSyxDQUFDO1lBQ3BCLEdBQUcsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQztZQUNoQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxNQUFNO1lBQzdDLElBQUksRUFBRSxJQUFJO1lBQ1YsV0FBVyxFQUFFLE9BQU87U0FDckIsQ0FBQyxDQUFDO1FBRUgsd0NBQXdDO1FBQ3hDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRW5DLDhCQUE4QjtRQUM5QixJQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFM0IsZ0NBQWdDO1FBQ2hDLE9BQU8sQ0FBQyxJQUFJLENBQ1YsVUFBQyxPQUFPO1lBQ04sSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsQyxDQUFDLEVBQ0QsVUFBQyxLQUFLO1lBQ0osSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQ0YsQ0FBQztRQUVGLHFCQUFxQjtRQUNyQixPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBQ0Qsa0JBQWUsUUFBUSxDQUFDIn0=