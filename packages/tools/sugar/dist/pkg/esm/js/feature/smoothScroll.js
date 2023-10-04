// @ts-nocheck
import __deepMerge from '../../shared/object/deepMerge.js';
import __smoothScrollOnAnchorLinks from './smoothScrollOnAnchorLinks.js';
import __smoothScrollOnPageLoad from './smoothScrollOnPageLoad.js';
export default function __smoothScroll(settings = {}) {
    settings = __deepMerge({
        scroll: {},
    }, settings);
    __smoothScrollOnPageLoad(settings);
    __smoothScrollOnAnchorLinks(settings);
    // __smoothScrollOnHashChange(settings);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLFdBQVcsTUFBTSxrQ0FBa0MsQ0FBQztBQUczRCxPQUFPLDJCQUEyQixNQUFNLGdDQUFnQyxDQUFDO0FBQ3pFLE9BQU8sd0JBQXdCLE1BQU0sNkJBQTZCLENBQUM7QUFxQ25FLE1BQU0sQ0FBQyxPQUFPLFVBQVUsY0FBYyxDQUNsQyxXQUEyQyxFQUFFO0lBRTdDLFFBQVEsR0FBRyxXQUFXLENBQ2xCO1FBQ0ksTUFBTSxFQUFFLEVBQUU7S0FDYixFQUNELFFBQVEsQ0FDWCxDQUFDO0lBRUYsd0JBQXdCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbkMsMkJBQTJCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdEMsd0NBQXdDO0FBQzVDLENBQUMifQ==