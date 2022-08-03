import __smoothScrollOnAnchorLinks from './smoothScrollOnAnchorLinks';
import __smoothScrollOnPageLoad from './smoothScrollOnPageLoad';
import __smoothScrollOnHashChange from './smoothScrollOnHashChange';
import __deepMerge from '../../shared/object/deepMerge';
function smoothScroll(settings = {}) {
    settings = __deepMerge({
        scroll: {},
    }, settings);
    __smoothScrollOnPageLoad(settings);
    __smoothScrollOnAnchorLinks(settings);
    __smoothScrollOnHashChange(settings);
}
export default smoothScroll;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sMkJBQTJCLE1BQU0sNkJBQTZCLENBQUM7QUFDdEUsT0FBTyx3QkFBd0IsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLDBCQUEwQixNQUFNLDRCQUE0QixDQUFDO0FBQ3BFLE9BQU8sV0FBVyxNQUFNLCtCQUErQixDQUFDO0FBbUN4RCxTQUFTLFlBQVksQ0FBQyxXQUEyQyxFQUFFO0lBQy9ELFFBQVEsR0FBRyxXQUFXLENBQ2xCO1FBQ0ksTUFBTSxFQUFFLEVBQUU7S0FDYixFQUNELFFBQVEsQ0FDWCxDQUFDO0lBRUYsd0JBQXdCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbkMsMkJBQTJCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdEMsMEJBQTBCLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDekMsQ0FBQztBQUNELGVBQWUsWUFBWSxDQUFDIn0=