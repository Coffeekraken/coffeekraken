"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekraken/sugar/dom");
function __inputAdditionalAttributes(settings = {}) {
    settings = Object.assign({ empty: true, hasValue: true, dirty: true }, settings);
    function handleInputAttributes(eOrElm) {
        const field = eOrElm.target ? eOrElm.target : eOrElm;
        if (!field || !field.tagName)
            return;
        switch (field.tagName) {
            case 'INPUT':
            case 'TEXTAREA':
            case 'SELECT':
                if (field.type &&
                    (field.type === 'checkbox' || field.type === 'radio'))
                    return;
                if (field.value && !field.hasAttribute('has-value')) {
                    if (settings.hasValue) {
                        field.setAttribute('has-value', true);
                    }
                    if (settings.empty) {
                        field.removeAttribute('empty');
                    }
                }
                else if (field.value === undefined ||
                    field.value === null ||
                    field.value === '') {
                    if (settings.hasValue) {
                        field.removeAttribute('has-value');
                    }
                    field.removeAttribute('value');
                    if (settings.empty) {
                        if (!field.hasAttribute('empty')) {
                            field.setAttribute('empty', true);
                        }
                    }
                }
                if (settings.dirty) {
                    if (!field.hasAttribute('dirty') && field.value) {
                        field.setAttribute('dirty', true);
                    }
                }
                break;
        }
    }
    function handleFormSubmitOrReset(e) {
        // loop on each form elements
        [].forEach.call(e.target.elements, (field) => {
            // reset the field attributes
            handleInputAttributes(field);
            // stop here if is a submit
            if (e.type === 'submit')
                return;
            // remove dirty attribute
            field.removeAttribute('dirty');
        });
    }
    (0, dom_1.__querySelectorLive)('select, textarea, input:not([type="submit"])', (elm) => {
        handleInputAttributes(elm);
    });
    document.addEventListener('change', handleInputAttributes);
    document.addEventListener('keyup', handleInputAttributes);
    document.addEventListener('reset', handleFormSubmitOrReset);
    document.addEventListener('submit', handleFormSubmitOrReset);
}
exports.default = __inputAdditionalAttributes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLGlEQUE4RDtBQXdDOUQsU0FBd0IsMkJBQTJCLENBQy9DLFdBQXdELEVBQUU7SUFFMUQsUUFBUSxtQkFDSixLQUFLLEVBQUUsSUFBSSxFQUNYLFFBQVEsRUFBRSxJQUFJLEVBQ2QsS0FBSyxFQUFFLElBQUksSUFDUixRQUFRLENBQ2QsQ0FBQztJQUVGLFNBQVMscUJBQXFCLENBQUMsTUFBTTtRQUNqQyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDckQsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPO1lBQUUsT0FBTztRQUNyQyxRQUFRLEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDbkIsS0FBSyxPQUFPLENBQUM7WUFDYixLQUFLLFVBQVUsQ0FBQztZQUNoQixLQUFLLFFBQVE7Z0JBQ1QsSUFDSSxLQUFLLENBQUMsSUFBSTtvQkFDVixDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssVUFBVSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDO29CQUVyRCxPQUFPO2dCQUNYLElBQUksS0FBSyxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLEVBQUU7b0JBQ2pELElBQUksUUFBUSxDQUFDLFFBQVEsRUFBRTt3QkFDbkIsS0FBSyxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7cUJBQ3pDO29CQUNELElBQUksUUFBUSxDQUFDLEtBQUssRUFBRTt3QkFDaEIsS0FBSyxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztxQkFDbEM7aUJBQ0o7cUJBQU0sSUFDSCxLQUFLLENBQUMsS0FBSyxLQUFLLFNBQVM7b0JBQ3pCLEtBQUssQ0FBQyxLQUFLLEtBQUssSUFBSTtvQkFDcEIsS0FBSyxDQUFDLEtBQUssS0FBSyxFQUFFLEVBQ3BCO29CQUNFLElBQUksUUFBUSxDQUFDLFFBQVEsRUFBRTt3QkFDbkIsS0FBSyxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQztxQkFDdEM7b0JBQ0QsS0FBSyxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDL0IsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFO3dCQUNoQixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRTs0QkFDOUIsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7eUJBQ3JDO3FCQUNKO2lCQUNKO2dCQUNELElBQUksUUFBUSxDQUFDLEtBQUssRUFBRTtvQkFDaEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRTt3QkFDN0MsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7cUJBQ3JDO2lCQUNKO2dCQUNELE1BQU07U0FDYjtJQUNMLENBQUM7SUFFRCxTQUFTLHVCQUF1QixDQUFDLENBQUM7UUFDOUIsNkJBQTZCO1FBQzdCLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDekMsNkJBQTZCO1lBQzdCLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzdCLDJCQUEyQjtZQUMzQixJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssUUFBUTtnQkFBRSxPQUFPO1lBQ2hDLHlCQUF5QjtZQUN6QixLQUFLLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELElBQUEseUJBQW1CLEVBQ2YsOENBQThDLEVBQzlDLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDSixxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQ0osQ0FBQztJQUVGLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUscUJBQXFCLENBQUMsQ0FBQztJQUMzRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLHFCQUFxQixDQUFDLENBQUM7SUFDMUQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO0lBQzVELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztBQUNqRSxDQUFDO0FBNUVELDhDQTRFQyJ9