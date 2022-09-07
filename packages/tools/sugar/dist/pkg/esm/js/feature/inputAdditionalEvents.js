// @ts-nocheck
import { __dispatchEvent } from '@coffeekraken/sugar/dom';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFvQzFELFNBQVMscUJBQXFCLENBQzFCLFdBQW9ELEVBQUU7SUFFdEQsUUFBUSxtQkFDSixLQUFLLEVBQUUsSUFBSSxFQUNYLE1BQU0sRUFBRSxJQUFJLElBQ1QsUUFBUSxDQUNkLENBQUM7SUFFRixTQUFTLHFCQUFxQixDQUFDLENBQUM7UUFDNUIsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTztZQUFFLE9BQU87UUFDckMsUUFBUSxLQUFLLENBQUMsT0FBTyxFQUFFO1lBQ25CLEtBQUssT0FBTyxDQUFDO1lBQ2IsS0FBSyxVQUFVO2dCQUNYLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRTtvQkFDWCxRQUFRLENBQUMsQ0FBQyxPQUFPLEVBQUU7d0JBQ2YsS0FBSyxFQUFFLEVBQUUsUUFBUTs0QkFDYixJQUNJLFFBQVEsQ0FBQyxLQUFLO2dDQUNkLEtBQUssQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEVBQy9CO2dDQUNFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0NBQ3BDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7NkJBQ25DOzRCQUNELE1BQU07d0JBQ1YsS0FBSyxFQUFFLEVBQUUsU0FBUzs0QkFDZCxJQUNJLFFBQVEsQ0FBQyxNQUFNO2dDQUNmLEtBQUssQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEVBQ2hDO2dDQUNFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0NBQ3JDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7NkJBQ3BDOzRCQUNELE1BQU07cUJBQ2I7aUJBQ0o7Z0JBQ0QsTUFBTTtTQUNiO0lBQ0wsQ0FBQztJQUVELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUscUJBQXFCLENBQUMsQ0FBQztJQUMzRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLHFCQUFxQixDQUFDLENBQUM7QUFDOUQsQ0FBQztBQUNELGVBQWUscUJBQXFCLENBQUMifQ==