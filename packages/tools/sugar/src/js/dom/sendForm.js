// @ts-nocheck
import SAjax from '../http/SAjax';
import __formSerialize from 'form-serialize';
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
        throw `The "form" parameter passed to the "sendForm" function is not a form`;
    }
    // get the enctype
    const enctype = form.getAttribute('enctype') || 'application/x-www-form-urlencoded';
    // encode form datas
    let data = null;
    if (enctype === 'application/x-www-form-urlencoded') {
        // serialize the form values
        data = __formSerialize(form);
    }
    else {
        data = new FormData(form);
    }
    // create ajax instance
    const ajx = new SAjax({
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
export default sendForm;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZEZvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZW5kRm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxLQUFLLE1BQU0sZUFBZSxDQUFDO0FBQ2xDLE9BQU8sZUFBZSxNQUFNLGdCQUFnQixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxTQUFTLFFBQVEsQ0FBQyxJQUFJO0lBQ3BCLFVBQVU7SUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxLQUFLLE1BQU0sRUFBRTtRQUMxRCxPQUFPLENBQUMsS0FBSyxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sc0VBQXNFLENBQUM7S0FDOUU7SUFFRCxrQkFBa0I7SUFDbEIsTUFBTSxPQUFPLEdBQ1gsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxtQ0FBbUMsQ0FBQztJQUV0RSxvQkFBb0I7SUFDcEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ2hCLElBQUksT0FBTyxLQUFLLG1DQUFtQyxFQUFFO1FBQ25ELDRCQUE0QjtRQUM1QixJQUFJLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzlCO1NBQU07UUFDTCxJQUFJLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDM0I7SUFFRCx1QkFBdUI7SUFDdkIsTUFBTSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUM7UUFDcEIsR0FBRyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDO1FBQ2hDLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLE1BQU07UUFDN0MsSUFBSSxFQUFFLElBQUk7UUFDVixXQUFXLEVBQUUsT0FBTztLQUNyQixDQUFDLENBQUM7SUFFSCx3Q0FBd0M7SUFDeEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFFbkMsOEJBQThCO0lBQzlCLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUUzQixnQ0FBZ0M7SUFDaEMsT0FBTyxDQUFDLElBQUksQ0FDVixDQUFDLE9BQU8sRUFBRSxFQUFFO1FBQ1YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNsQyxDQUFDLEVBQ0QsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNSLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbEMsQ0FBQyxDQUNGLENBQUM7SUFFRixxQkFBcUI7SUFDckIsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQztBQUNELGVBQWUsUUFBUSxDQUFDIn0=