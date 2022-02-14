// @ts-nocheck
import fastdom from 'fastdom';
import __querySelectorLive from '../dom/query/querySelectorLive';
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
                fastdom.mutate(() => {
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
            fastdom.mutate(() => {
                field.removeAttribute('dirty');
            });
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
export default inputAdditionalAttributes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXRBZGRpdGlvbmFsQXR0cmlidXRlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImlucHV0QWRkaXRpb25hbEF0dHJpYnV0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sT0FBTyxNQUFNLFNBQVMsQ0FBQztBQUM5QixPQUFPLG1CQUFtQixNQUFNLGdDQUFnQyxDQUFDO0FBd0NqRSxTQUFTLHlCQUF5QixDQUM5QixXQUF3RCxFQUFFO0lBRTFELFFBQVEsbUJBQ0osS0FBSyxFQUFFLElBQUksRUFDWCxRQUFRLEVBQUUsSUFBSSxFQUNkLEtBQUssRUFBRSxJQUFJLElBQ1IsUUFBUSxDQUNkLENBQUM7SUFFRixTQUFTLHFCQUFxQixDQUFDLE1BQU07UUFDakMsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ3JELElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTztZQUFFLE9BQU87UUFDckMsUUFBUSxLQUFLLENBQUMsT0FBTyxFQUFFO1lBQ25CLEtBQUssT0FBTyxDQUFDO1lBQ2IsS0FBSyxVQUFVLENBQUM7WUFDaEIsS0FBSyxRQUFRO2dCQUNULE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO29CQUNoQixJQUNJLEtBQUssQ0FBQyxJQUFJO3dCQUNWLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxVQUFVLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxPQUFPLENBQUM7d0JBRXJELE9BQU87b0JBQ1gsSUFBSSxLQUFLLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsRUFBRTt3QkFDakQsSUFBSSxRQUFRLENBQUMsUUFBUSxFQUFFOzRCQUNuQixLQUFLLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQzt5QkFDekM7d0JBQ0QsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFOzRCQUNoQixLQUFLLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO3lCQUNsQztxQkFDSjt5QkFBTSxJQUNILEtBQUssQ0FBQyxLQUFLLEtBQUssU0FBUzt3QkFDekIsS0FBSyxDQUFDLEtBQUssS0FBSyxJQUFJO3dCQUNwQixLQUFLLENBQUMsS0FBSyxLQUFLLEVBQUUsRUFDcEI7d0JBQ0UsSUFBSSxRQUFRLENBQUMsUUFBUSxFQUFFOzRCQUNuQixLQUFLLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3lCQUN0Qzt3QkFDRCxLQUFLLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUMvQixJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUU7NEJBQ2hCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dDQUM5QixLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQzs2QkFDckM7eUJBQ0o7cUJBQ0o7b0JBQ0QsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFO3dCQUNoQixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFOzRCQUM3QyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQzt5QkFDckM7cUJBQ0o7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsTUFBTTtTQUNiO0lBQ0wsQ0FBQztJQUVELFNBQVMsdUJBQXVCLENBQUMsQ0FBQztRQUM5Qiw2QkFBNkI7UUFDN0IsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUN6Qyw2QkFBNkI7WUFDN0IscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDN0IsMkJBQTJCO1lBQzNCLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxRQUFRO2dCQUFFLE9BQU87WUFDaEMseUJBQXlCO1lBQ3pCLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO2dCQUNoQixLQUFLLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ25DLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsbUJBQW1CLENBQ2YsOENBQThDLEVBQzlDLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDSixxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQ0osQ0FBQztJQUVGLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUscUJBQXFCLENBQUMsQ0FBQztJQUMzRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLHFCQUFxQixDQUFDLENBQUM7SUFDMUQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO0lBQzVELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztBQUNqRSxDQUFDO0FBQ0QsZUFBZSx5QkFBeUIsQ0FBQyJ9