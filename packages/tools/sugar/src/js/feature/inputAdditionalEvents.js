// @ts-nocheck
import fastdom from 'fastdom';
import __dispatchEvent from '../dom/event/dispatchEvent';
/**
 * @name 		handleInputAttributes
 * @namespace            js.feature
 * @type      Feature
 * @stable
 *
 * Add some events on some DOM Elements. Here's the list:
 * - enter (onenter): Triggered when user tap ```enter``` on his keyboard from a **input*** or **textarea** element
 * - escape (onescape): Triggered when user tap ```escape``` on his keyboard from a **input*** or **textarea** element
 *
 * @param       {Object}        [settings={}]         An object of settings to configure your feature
 *
 * @setting       {Boolean}       [enter=true]        Specify if you want to "enter" keyboard event
 * @setting       {Boolean}       [escape=true]        Specify if you want to "escape" keyboard event
 *
 * @todo        interface
 * @todo        doc
 * @todo        tests
 * @todo        add setting to specify on which elements you want to enable the feature
 *
 * @example 	js
 * import inputAdditionalEvents from '@coffeekraken/sugar/js/feature/inputAdditionalEvents';
 * inputAdditionalEvents();
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function inputAdditionalEvents(settings = {}) {
    settings = Object.assign({ enter: true, escape: true }, settings);
    function handleInputAttributes(e) {
        const field = e.target ? e.target : e;
        if (!field || !field.tagName)
            return;
        switch (field.tagName) {
            case 'INPUT':
            case 'TEXTAREA':
                fastdom.mutate(() => {
                    if (e.keyCode) {
                        switch (e.keyCode) {
                            case 13: // enter
                                if (settings.enter && field.hasAttribute('onenter')) {
                                    eval(field.getAttribute('onenter'));
                                    __dispatchEvent(field, 'enter');
                                }
                                break;
                            case 27: // escape
                                if (settings.escape && field.hasAttribute('onescape')) {
                                    eval(field.getAttribute('onescape'));
                                    __dispatchEvent(field, 'escape');
                                }
                                break;
                        }
                    }
                });
                break;
        }
    }
    document.addEventListener('change', handleInputAttributes);
    document.addEventListener('keyup', handleInputAttributes);
}
export default inputAdditionalEvents;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXRBZGRpdGlvbmFsRXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW5wdXRBZGRpdGlvbmFsRXZlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFDOUIsT0FBTyxlQUFlLE1BQU0sNEJBQTRCLENBQUM7QUFFekQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsU0FBUyxxQkFBcUIsQ0FBQyxRQUFRLEdBQUcsRUFBRTtJQUMxQyxRQUFRLG1CQUNOLEtBQUssRUFBRSxJQUFJLEVBQ1gsTUFBTSxFQUFFLElBQUksSUFDVCxRQUFRLENBQ1osQ0FBQztJQUVGLFNBQVMscUJBQXFCLENBQUMsQ0FBQztRQUM5QixNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPO1lBQUUsT0FBTztRQUNyQyxRQUFRLEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDckIsS0FBSyxPQUFPLENBQUM7WUFDYixLQUFLLFVBQVU7Z0JBQ2IsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7b0JBQ2xCLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRTt3QkFDYixRQUFRLENBQUMsQ0FBQyxPQUFPLEVBQUU7NEJBQ2pCLEtBQUssRUFBRSxFQUFFLFFBQVE7Z0NBQ2YsSUFBSSxRQUFRLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEVBQUU7b0NBQ25ELElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0NBQ3BDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7aUNBQ2pDO2dDQUNELE1BQU07NEJBQ1IsS0FBSyxFQUFFLEVBQUUsU0FBUztnQ0FDaEIsSUFBSSxRQUFRLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEVBQUU7b0NBQ3JELElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0NBQ3JDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7aUNBQ2xDO2dDQUNELE1BQU07eUJBQ1Q7cUJBQ0Y7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsTUFBTTtTQUNUO0lBQ0gsQ0FBQztJQUVELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUscUJBQXFCLENBQUMsQ0FBQztJQUMzRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLHFCQUFxQixDQUFDLENBQUM7QUFDNUQsQ0FBQztBQUNELGVBQWUscUJBQXFCLENBQUMifQ==