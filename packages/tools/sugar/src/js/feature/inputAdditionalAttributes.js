// @ts-nocheck
import fastdom from 'fastdom';
import __querySelectorLive from '../dom/querySelectorLive';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXRBZGRpdGlvbmFsQXR0cmlidXRlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImlucHV0QWRkaXRpb25hbEF0dHJpYnV0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sT0FBTyxNQUFNLFNBQVMsQ0FBQztBQUM5QixPQUFPLG1CQUFtQixNQUFNLDBCQUEwQixDQUFDO0FBd0MzRCxTQUFTLHlCQUF5QixDQUFDLFdBQXdELEVBQUU7SUFDM0YsUUFBUSxtQkFDTixLQUFLLEVBQUUsSUFBSSxFQUNYLFFBQVEsRUFBRSxJQUFJLEVBQ2QsS0FBSyxFQUFFLElBQUksSUFDUixRQUFRLENBQ1osQ0FBQztJQUVGLFNBQVMscUJBQXFCLENBQUMsTUFBTTtRQUNuQyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDckQsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPO1lBQUUsT0FBTztRQUNyQyxRQUFRLEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDckIsS0FBSyxPQUFPLENBQUM7WUFDYixLQUFLLFVBQVUsQ0FBQztZQUNoQixLQUFLLFFBQVE7Z0JBQ1gsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7b0JBQ2xCLElBQ0UsS0FBSyxDQUFDLElBQUk7d0JBQ1YsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLFVBQVUsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQzt3QkFFckQsT0FBTztvQkFDVCxJQUFJLEtBQUssQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxFQUFFO3dCQUNuRCxJQUFJLFFBQVEsQ0FBQyxRQUFRLEVBQUU7NEJBQ3JCLEtBQUssQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO3lCQUN2Qzt3QkFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUU7NEJBQ2xCLEtBQUssQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7eUJBQ2hDO3FCQUNGO3lCQUFNLElBQ0wsS0FBSyxDQUFDLEtBQUssS0FBSyxTQUFTO3dCQUN6QixLQUFLLENBQUMsS0FBSyxLQUFLLElBQUk7d0JBQ3BCLEtBQUssQ0FBQyxLQUFLLEtBQUssRUFBRSxFQUNsQjt3QkFDQSxJQUFJLFFBQVEsQ0FBQyxRQUFRLEVBQUU7NEJBQ3JCLEtBQUssQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUM7eUJBQ3BDO3dCQUNELEtBQUssQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQy9CLElBQUksUUFBUSxDQUFDLEtBQUssRUFBRTs0QkFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0NBQ2hDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDOzZCQUNuQzt5QkFDRjtxQkFDRjtvQkFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUU7d0JBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUU7NEJBQy9DLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO3lCQUNuQztxQkFDRjtnQkFDSCxDQUFDLENBQUMsQ0FBQztnQkFDSCxNQUFNO1NBQ1Q7SUFDSCxDQUFDO0lBRUQsU0FBUyx1QkFBdUIsQ0FBQyxDQUFDO1FBQ2hDLDZCQUE2QjtRQUM3QixFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQzNDLDZCQUE2QjtZQUM3QixxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM3QiwyQkFBMkI7WUFDM0IsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLFFBQVE7Z0JBQUUsT0FBTztZQUNoQyx5QkFBeUI7WUFDekIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7Z0JBQ2xCLEtBQUssQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDakMsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyw4Q0FBOEMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQzFFLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO0lBQzNELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUscUJBQXFCLENBQUMsQ0FBQztJQUMxRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLHVCQUF1QixDQUFDLENBQUM7SUFDNUQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO0FBQy9ELENBQUM7QUFDRCxlQUFlLHlCQUF5QixDQUFDIn0=