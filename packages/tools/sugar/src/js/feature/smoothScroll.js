import __smoothScrollOnAnchorLinks from './smoothScrollOnAnchorLinks';
import __smoothScrollOnPageLoad from './smoothScrollOnPageLoad';
import __smoothScrollOnHashChange from './smoothScrollOnHashChange';
import __deepMerge from '../../shared/object/deepMerge';
function smoothScroll(settings = {}) {
    settings = __deepMerge({
        scroll: {}
    }, settings);
    __smoothScrollOnPageLoad(settings);
    __smoothScrollOnAnchorLinks(settings);
    __smoothScrollOnHashChange(settings);
}
export default smoothScroll;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21vb3RoU2Nyb2xsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic21vb3RoU2Nyb2xsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sMkJBQTJCLE1BQU0sNkJBQTZCLENBQUM7QUFDdEUsT0FBTyx3QkFBd0IsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLDBCQUEwQixNQUFNLDRCQUE0QixDQUFDO0FBQ3BFLE9BQU8sV0FBVyxNQUFNLCtCQUErQixDQUFDO0FBb0N4RCxTQUFTLFlBQVksQ0FDbkIsV0FBMkMsRUFBRTtJQUc3QyxRQUFRLEdBQUcsV0FBVyxDQUFDO1FBQ3JCLE1BQU0sRUFBRSxFQUFFO0tBQ1gsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUViLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25DLDJCQUEyQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RDLDBCQUEwQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBR3ZDLENBQUM7QUFDRCxlQUFlLFlBQVksQ0FBQyJ9