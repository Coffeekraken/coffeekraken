// @ts-nocheck
import __dispatchEvent from '../dom/event/dispatchEvent.js';
export default function __inputAdditionalEvents(settings = {}) {
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
                            if (settings.enter) {
                                __dispatchEvent(field, 'enter');
                            }
                            break;
                        case 27: // escape
                            if (settings.escape) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQXlDNUQsTUFBTSxDQUFDLE9BQU8sVUFBVSx1QkFBdUIsQ0FDM0MsV0FBb0QsRUFBRTtJQUV0RCxRQUFRLG1CQUNKLEtBQUssRUFBRSxJQUFJLEVBQ1gsTUFBTSxFQUFFLElBQUksSUFDVCxRQUFRLENBQ2QsQ0FBQztJQUVGLFNBQVMscUJBQXFCLENBQUMsQ0FBQztRQUM1QixNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPO1lBQUUsT0FBTztRQUNyQyxRQUFRLEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDbkIsS0FBSyxPQUFPLENBQUM7WUFDYixLQUFLLFVBQVU7Z0JBQ1gsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFO29CQUNYLFFBQVEsQ0FBQyxDQUFDLE9BQU8sRUFBRTt3QkFDZixLQUFLLEVBQUUsRUFBRSxRQUFROzRCQUNiLElBQUksUUFBUSxDQUFDLEtBQUssRUFBRTtnQ0FDaEIsZUFBZSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQzs2QkFDbkM7NEJBQ0QsTUFBTTt3QkFDVixLQUFLLEVBQUUsRUFBRSxTQUFTOzRCQUNkLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRTtnQ0FDakIsZUFBZSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQzs2QkFDcEM7NEJBQ0QsTUFBTTtxQkFDYjtpQkFDSjtnQkFDRCxNQUFNO1NBQ2I7SUFDTCxDQUFDO0lBRUQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO0lBQzNELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUscUJBQXFCLENBQUMsQ0FBQztBQUM5RCxDQUFDIn0=