import __deepMerge from '../../shared/object/deepMerge';
import { __smoothScrollOnAnchorLinks, __smoothScrollOnPageLoad, __smoothScrollOnHashChange, } from '@coffeekraken/sugar/feature';
export default function __smoothScroll(settings = {}) {
    settings = __deepMerge({
        scroll: {},
    }, settings);
    __smoothScrollOnPageLoad(settings);
    __smoothScrollOnAnchorLinks(settings);
    __smoothScrollOnHashChange(settings);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sV0FBVyxNQUFNLCtCQUErQixDQUFDO0FBRXhELE9BQU8sRUFDSCwyQkFBMkIsRUFDM0Isd0JBQXdCLEVBQ3hCLDBCQUEwQixHQUM3QixNQUFNLDZCQUE2QixDQUFDO0FBbUNyQyxNQUFNLENBQUMsT0FBTyxVQUFVLGNBQWMsQ0FDbEMsV0FBMkMsRUFBRTtJQUU3QyxRQUFRLEdBQUcsV0FBVyxDQUNsQjtRQUNJLE1BQU0sRUFBRSxFQUFFO0tBQ2IsRUFDRCxRQUFRLENBQ1gsQ0FBQztJQUVGLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25DLDJCQUEyQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RDLDBCQUEwQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3pDLENBQUMifQ==