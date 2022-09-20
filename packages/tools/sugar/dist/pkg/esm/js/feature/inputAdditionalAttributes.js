// @ts-nocheck
import { __querySelectorLive } from '@coffeekraken/sugar/dom';
import __fastdom from 'fastdom';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLFNBQVMsTUFBTSxTQUFTLENBQUM7QUF3Q2hDLE1BQU0sQ0FBQyxPQUFPLFVBQVUsMkJBQTJCLENBQy9DLFdBQXdELEVBQUU7SUFFMUQsUUFBUSxtQkFDSixLQUFLLEVBQUUsSUFBSSxFQUNYLFFBQVEsRUFBRSxJQUFJLEVBQ2QsS0FBSyxFQUFFLElBQUksSUFDUixRQUFRLENBQ2QsQ0FBQztJQUVGLFNBQVMscUJBQXFCLENBQUMsTUFBTTtRQUNqQyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDckQsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPO1lBQUUsT0FBTztRQUNyQyxRQUFRLEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDbkIsS0FBSyxPQUFPLENBQUM7WUFDYixLQUFLLFVBQVUsQ0FBQztZQUNoQixLQUFLLFFBQVE7Z0JBQ1QsSUFDSSxLQUFLLENBQUMsSUFBSTtvQkFDVixDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssVUFBVSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLEVBQ3ZEO29CQUNFLE9BQU87aUJBQ1Y7Z0JBRUQsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7b0JBQ2xCLElBQUksS0FBSyxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLEVBQUU7d0JBQ2pELElBQUksUUFBUSxDQUFDLFFBQVEsRUFBRTs0QkFDbkIsS0FBSyxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7eUJBQ3pDO3dCQUNELElBQUksUUFBUSxDQUFDLEtBQUssRUFBRTs0QkFDaEIsS0FBSyxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQzt5QkFDbEM7cUJBQ0o7eUJBQU0sSUFDSCxLQUFLLENBQUMsS0FBSyxLQUFLLFNBQVM7d0JBQ3pCLEtBQUssQ0FBQyxLQUFLLEtBQUssSUFBSTt3QkFDcEIsS0FBSyxDQUFDLEtBQUssS0FBSyxFQUFFLEVBQ3BCO3dCQUNFLElBQUksUUFBUSxDQUFDLFFBQVEsRUFBRTs0QkFDbkIsS0FBSyxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQzt5QkFDdEM7d0JBQ0QsS0FBSyxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDL0IsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFOzRCQUNoQixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRTtnQ0FDOUIsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7NkJBQ3JDO3lCQUNKO3FCQUNKO29CQUNELElBQUksUUFBUSxDQUFDLEtBQUssRUFBRTt3QkFDaEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRTs0QkFDN0MsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7eUJBQ3JDO3FCQUNKO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUNILE1BQU07U0FDYjtJQUNMLENBQUM7SUFFRCxTQUFTLHVCQUF1QixDQUFDLENBQUM7UUFDOUIsNkJBQTZCO1FBQzdCLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDekMsNkJBQTZCO1lBQzdCLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzdCLDJCQUEyQjtZQUMzQixJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssUUFBUTtnQkFBRSxPQUFPO1lBQ2hDLHlCQUF5QjtZQUN6QixLQUFLLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELG1CQUFtQixDQUNmLDhDQUE4QyxFQUM5QyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ0oscUJBQXFCLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUNKLENBQUM7SUFFRixRQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLHFCQUFxQixDQUFDLENBQUM7SUFDM0QsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO0lBQzFELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztJQUM1RCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLHVCQUF1QixDQUFDLENBQUM7QUFDakUsQ0FBQyJ9