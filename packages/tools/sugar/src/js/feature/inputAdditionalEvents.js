// @ts-nocheck
import fastdom from 'fastdom';
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
                fastdom.mutate(() => {
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
                });
                break;
        }
    }
    document.addEventListener('change', handleInputAttributes);
    document.addEventListener('keyup', handleInputAttributes);
}
export default inputAdditionalEvents;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXRBZGRpdGlvbmFsRXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW5wdXRBZGRpdGlvbmFsRXZlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFDOUIsT0FBTyxlQUFlLE1BQU0sNEJBQTRCLENBQUM7QUFvQ3pELFNBQVMscUJBQXFCLENBQzFCLFdBQW9ELEVBQUU7SUFFdEQsUUFBUSxtQkFDSixLQUFLLEVBQUUsSUFBSSxFQUNYLE1BQU0sRUFBRSxJQUFJLElBQ1QsUUFBUSxDQUNkLENBQUM7SUFFRixTQUFTLHFCQUFxQixDQUFDLENBQUM7UUFDNUIsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTztZQUFFLE9BQU87UUFDckMsUUFBUSxLQUFLLENBQUMsT0FBTyxFQUFFO1lBQ25CLEtBQUssT0FBTyxDQUFDO1lBQ2IsS0FBSyxVQUFVO2dCQUNYLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO29CQUNoQixJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUU7d0JBQ1gsUUFBUSxDQUFDLENBQUMsT0FBTyxFQUFFOzRCQUNmLEtBQUssRUFBRSxFQUFFLFFBQVE7Z0NBQ2IsSUFDSSxRQUFRLENBQUMsS0FBSztvQ0FDZCxLQUFLLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxFQUMvQjtvQ0FDRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO29DQUNwQyxlQUFlLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2lDQUNuQztnQ0FDRCxNQUFNOzRCQUNWLEtBQUssRUFBRSxFQUFFLFNBQVM7Z0NBQ2QsSUFDSSxRQUFRLENBQUMsTUFBTTtvQ0FDZixLQUFLLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxFQUNoQztvQ0FDRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO29DQUNyQyxlQUFlLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2lDQUNwQztnQ0FDRCxNQUFNO3lCQUNiO3FCQUNKO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUNILE1BQU07U0FDYjtJQUNMLENBQUM7SUFFRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLHFCQUFxQixDQUFDLENBQUM7SUFDM0QsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO0FBQzlELENBQUM7QUFDRCxlQUFlLHFCQUFxQixDQUFDIn0=