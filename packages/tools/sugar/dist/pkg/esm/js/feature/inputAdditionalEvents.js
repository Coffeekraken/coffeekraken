// @ts-nocheck
import __dispatchEvent from '../dom/event/dispatchEvent';
function inputAdditionalEvents(settings = {}) {
    settings = Object.assign({ enter: true, escape: true }, settings);
    function handleInputAttributes(e) {
        const field = e.target ? e.target : e;
        if (!field || !field.tagName)
            return;
        switch (field.tagName) {
            case 'INPUT':
            case 'TEXTAREA':
                if (e.keyCode) {
                    switch (e.keyCode) {
                        case 13: // enter
                            if (settings.enter &&
                                field.hasAttribute('onenter')) {
                                eval(field.getAttribute('onenter'));
                                __dispatchEvent(field, 'enter');
                            }
                            break;
                        case 27: // escape
                            if (settings.escape &&
                                field.hasAttribute('onescape')) {
                                eval(field.getAttribute('onescape'));
                                __dispatchEvent(field, 'escape');
                            }
                            break;
                    }
                }
                break;
        }
    }
    document.addEventListener('change', handleInputAttributes);
    document.addEventListener('keyup', handleInputAttributes);
}
export default inputAdditionalEvents;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGVBQWUsTUFBTSw0QkFBNEIsQ0FBQztBQW9DekQsU0FBUyxxQkFBcUIsQ0FDMUIsV0FBb0QsRUFBRTtJQUV0RCxRQUFRLG1CQUNKLEtBQUssRUFBRSxJQUFJLEVBQ1gsTUFBTSxFQUFFLElBQUksSUFDVCxRQUFRLENBQ2QsQ0FBQztJQUVGLFNBQVMscUJBQXFCLENBQUMsQ0FBQztRQUM1QixNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPO1lBQUUsT0FBTztRQUNyQyxRQUFRLEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDbkIsS0FBSyxPQUFPLENBQUM7WUFDYixLQUFLLFVBQVU7Z0JBQ1gsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFO29CQUNYLFFBQVEsQ0FBQyxDQUFDLE9BQU8sRUFBRTt3QkFDZixLQUFLLEVBQUUsRUFBRSxRQUFROzRCQUNiLElBQ0ksUUFBUSxDQUFDLEtBQUs7Z0NBQ2QsS0FBSyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsRUFDL0I7Z0NBQ0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQ0FDcEMsZUFBZSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQzs2QkFDbkM7NEJBQ0QsTUFBTTt3QkFDVixLQUFLLEVBQUUsRUFBRSxTQUFTOzRCQUNkLElBQ0ksUUFBUSxDQUFDLE1BQU07Z0NBQ2YsS0FBSyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsRUFDaEM7Z0NBQ0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQ0FDckMsZUFBZSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQzs2QkFDcEM7NEJBQ0QsTUFBTTtxQkFDYjtpQkFDSjtnQkFDRCxNQUFNO1NBQ2I7SUFDTCxDQUFDO0lBRUQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO0lBQzNELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUscUJBQXFCLENBQUMsQ0FBQztBQUM5RCxDQUFDO0FBQ0QsZUFBZSxxQkFBcUIsQ0FBQyJ9