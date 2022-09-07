"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekraken/sugar/dom");
function inputAdditionalAttributes(settings = {}) {
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
exports.default = inputAdditionalAttributes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLGlEQUE4RDtBQXdDOUQsU0FBUyx5QkFBeUIsQ0FDOUIsV0FBd0QsRUFBRTtJQUUxRCxRQUFRLG1CQUNKLEtBQUssRUFBRSxJQUFJLEVBQ1gsUUFBUSxFQUFFLElBQUksRUFDZCxLQUFLLEVBQUUsSUFBSSxJQUNSLFFBQVEsQ0FDZCxDQUFDO0lBRUYsU0FBUyxxQkFBcUIsQ0FBQyxNQUFNO1FBQ2pDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUNyRCxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU87WUFBRSxPQUFPO1FBQ3JDLFFBQVEsS0FBSyxDQUFDLE9BQU8sRUFBRTtZQUNuQixLQUFLLE9BQU8sQ0FBQztZQUNiLEtBQUssVUFBVSxDQUFDO1lBQ2hCLEtBQUssUUFBUTtnQkFDVCxJQUNJLEtBQUssQ0FBQyxJQUFJO29CQUNWLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxVQUFVLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxPQUFPLENBQUM7b0JBRXJELE9BQU87Z0JBQ1gsSUFBSSxLQUFLLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsRUFBRTtvQkFDakQsSUFBSSxRQUFRLENBQUMsUUFBUSxFQUFFO3dCQUNuQixLQUFLLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztxQkFDekM7b0JBQ0QsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFO3dCQUNoQixLQUFLLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO3FCQUNsQztpQkFDSjtxQkFBTSxJQUNILEtBQUssQ0FBQyxLQUFLLEtBQUssU0FBUztvQkFDekIsS0FBSyxDQUFDLEtBQUssS0FBSyxJQUFJO29CQUNwQixLQUFLLENBQUMsS0FBSyxLQUFLLEVBQUUsRUFDcEI7b0JBQ0UsSUFBSSxRQUFRLENBQUMsUUFBUSxFQUFFO3dCQUNuQixLQUFLLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3FCQUN0QztvQkFDRCxLQUFLLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUMvQixJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUU7d0JBQ2hCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFOzRCQUM5QixLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQzt5QkFDckM7cUJBQ0o7aUJBQ0o7Z0JBQ0QsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFO29CQUNoQixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFO3dCQUM3QyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztxQkFDckM7aUJBQ0o7Z0JBQ0QsTUFBTTtTQUNiO0lBQ0wsQ0FBQztJQUVELFNBQVMsdUJBQXVCLENBQUMsQ0FBQztRQUM5Qiw2QkFBNkI7UUFDN0IsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUN6Qyw2QkFBNkI7WUFDN0IscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDN0IsMkJBQTJCO1lBQzNCLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxRQUFRO2dCQUFFLE9BQU87WUFDaEMseUJBQXlCO1lBQ3pCLEtBQUssQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsSUFBQSx5QkFBbUIsRUFDZiw4Q0FBOEMsRUFDOUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUNKLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FDSixDQUFDO0lBRUYsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO0lBQzNELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUscUJBQXFCLENBQUMsQ0FBQztJQUMxRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLHVCQUF1QixDQUFDLENBQUM7SUFDNUQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO0FBQ2pFLENBQUM7QUFDRCxrQkFBZSx5QkFBeUIsQ0FBQyJ9