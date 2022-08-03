// @ts-nocheck
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
    __querySelectorLive('select, textarea, input:not([type="submit"])', (elm) => {
        handleInputAttributes(elm);
    });
    document.addEventListener('change', handleInputAttributes);
    document.addEventListener('keyup', handleInputAttributes);
    document.addEventListener('reset', handleFormSubmitOrReset);
    document.addEventListener('submit', handleFormSubmitOrReset);
}
export default inputAdditionalAttributes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLG1CQUFtQixNQUFNLGdDQUFnQyxDQUFDO0FBd0NqRSxTQUFTLHlCQUF5QixDQUM5QixXQUF3RCxFQUFFO0lBRTFELFFBQVEsbUJBQ0osS0FBSyxFQUFFLElBQUksRUFDWCxRQUFRLEVBQUUsSUFBSSxFQUNkLEtBQUssRUFBRSxJQUFJLElBQ1IsUUFBUSxDQUNkLENBQUM7SUFFRixTQUFTLHFCQUFxQixDQUFDLE1BQU07UUFDakMsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ3JELElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTztZQUFFLE9BQU87UUFDckMsUUFBUSxLQUFLLENBQUMsT0FBTyxFQUFFO1lBQ25CLEtBQUssT0FBTyxDQUFDO1lBQ2IsS0FBSyxVQUFVLENBQUM7WUFDaEIsS0FBSyxRQUFRO2dCQUNULElBQ0ksS0FBSyxDQUFDLElBQUk7b0JBQ1YsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLFVBQVUsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQztvQkFFckQsT0FBTztnQkFDWCxJQUFJLEtBQUssQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxFQUFFO29CQUNqRCxJQUFJLFFBQVEsQ0FBQyxRQUFRLEVBQUU7d0JBQ25CLEtBQUssQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO3FCQUN6QztvQkFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUU7d0JBQ2hCLEtBQUssQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7cUJBQ2xDO2lCQUNKO3FCQUFNLElBQ0gsS0FBSyxDQUFDLEtBQUssS0FBSyxTQUFTO29CQUN6QixLQUFLLENBQUMsS0FBSyxLQUFLLElBQUk7b0JBQ3BCLEtBQUssQ0FBQyxLQUFLLEtBQUssRUFBRSxFQUNwQjtvQkFDRSxJQUFJLFFBQVEsQ0FBQyxRQUFRLEVBQUU7d0JBQ25CLEtBQUssQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUM7cUJBQ3RDO29CQUNELEtBQUssQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQy9CLElBQUksUUFBUSxDQUFDLEtBQUssRUFBRTt3QkFDaEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEVBQUU7NEJBQzlCLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO3lCQUNyQztxQkFDSjtpQkFDSjtnQkFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUU7b0JBQ2hCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUU7d0JBQzdDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO3FCQUNyQztpQkFDSjtnQkFDRCxNQUFNO1NBQ2I7SUFDTCxDQUFDO0lBRUQsU0FBUyx1QkFBdUIsQ0FBQyxDQUFDO1FBQzlCLDZCQUE2QjtRQUM3QixFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3pDLDZCQUE2QjtZQUM3QixxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM3QiwyQkFBMkI7WUFDM0IsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLFFBQVE7Z0JBQUUsT0FBTztZQUNoQyx5QkFBeUI7WUFDekIsS0FBSyxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxtQkFBbUIsQ0FDZiw4Q0FBOEMsRUFDOUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUNKLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FDSixDQUFDO0lBRUYsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO0lBQzNELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUscUJBQXFCLENBQUMsQ0FBQztJQUMxRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLHVCQUF1QixDQUFDLENBQUM7SUFDNUQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO0FBQ2pFLENBQUM7QUFDRCxlQUFlLHlCQUF5QixDQUFDIn0=