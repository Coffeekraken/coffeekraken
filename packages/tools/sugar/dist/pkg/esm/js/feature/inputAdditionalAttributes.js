// @ts-nocheck
import __fastdom from 'fastdom';
import __querySelectorLive from '../dom/query/querySelectorLive.js';
export default function __inputAdditionalAttributes(settings = {}) {
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
                    (field.type === 'checkbox' || field.type === 'radio')) {
                    return;
                }
                __fastdom.mutate(() => {
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
                });
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
    __querySelectorLive('select, textarea, input:not([type="submit"])', (elm) => {
        handleInputAttributes(elm);
    });
    document.addEventListener('change', handleInputAttributes);
    document.addEventListener('keyup', handleInputAttributes);
    document.addEventListener('reset', handleFormSubmitOrReset);
    document.addEventListener('submit', handleFormSubmitOrReset);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFNBQVMsTUFBTSxTQUFTLENBQUM7QUFDaEMsT0FBTyxtQkFBbUIsTUFBTSxtQ0FBbUMsQ0FBQztBQTBDcEUsTUFBTSxDQUFDLE9BQU8sVUFBVSwyQkFBMkIsQ0FDL0MsV0FBd0QsRUFBRTtJQUUxRCxRQUFRLG1CQUNKLEtBQUssRUFBRSxJQUFJLEVBQ1gsUUFBUSxFQUFFLElBQUksRUFDZCxLQUFLLEVBQUUsSUFBSSxJQUNSLFFBQVEsQ0FDZCxDQUFDO0lBRUYsU0FBUyxxQkFBcUIsQ0FBQyxNQUFNO1FBQ2pDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUNyRCxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU87WUFBRSxPQUFPO1FBQ3JDLFFBQVEsS0FBSyxDQUFDLE9BQU8sRUFBRTtZQUNuQixLQUFLLE9BQU8sQ0FBQztZQUNiLEtBQUssVUFBVSxDQUFDO1lBQ2hCLEtBQUssUUFBUTtnQkFDVCxJQUNJLEtBQUssQ0FBQyxJQUFJO29CQUNWLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxVQUFVLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsRUFDdkQ7b0JBQ0UsT0FBTztpQkFDVjtnQkFFRCxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtvQkFDbEIsSUFBSSxLQUFLLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsRUFBRTt3QkFDakQsSUFBSSxRQUFRLENBQUMsUUFBUSxFQUFFOzRCQUNuQixLQUFLLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQzt5QkFDekM7d0JBQ0QsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFOzRCQUNoQixLQUFLLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO3lCQUNsQztxQkFDSjt5QkFBTSxJQUNILEtBQUssQ0FBQyxLQUFLLEtBQUssU0FBUzt3QkFDekIsS0FBSyxDQUFDLEtBQUssS0FBSyxJQUFJO3dCQUNwQixLQUFLLENBQUMsS0FBSyxLQUFLLEVBQUUsRUFDcEI7d0JBQ0UsSUFBSSxRQUFRLENBQUMsUUFBUSxFQUFFOzRCQUNuQixLQUFLLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3lCQUN0Qzt3QkFDRCxLQUFLLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUMvQixJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUU7NEJBQ2hCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dDQUM5QixLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQzs2QkFDckM7eUJBQ0o7cUJBQ0o7b0JBQ0QsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFO3dCQUNoQixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFOzRCQUM3QyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQzt5QkFDckM7cUJBQ0o7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsTUFBTTtTQUNiO0lBQ0wsQ0FBQztJQUVELFNBQVMsdUJBQXVCLENBQUMsQ0FBQztRQUM5Qiw2QkFBNkI7UUFDN0IsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUN6Qyw2QkFBNkI7WUFDN0IscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDN0IsMkJBQTJCO1lBQzNCLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxRQUFRO2dCQUFFLE9BQU87WUFDaEMseUJBQXlCO1lBQ3pCLEtBQUssQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsbUJBQW1CLENBQ2YsOENBQThDLEVBQzlDLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDSixxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQ0osQ0FBQztJQUVGLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUscUJBQXFCLENBQUMsQ0FBQztJQUMzRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLHFCQUFxQixDQUFDLENBQUM7SUFDMUQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO0lBQzVELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztBQUNqRSxDQUFDIn0=