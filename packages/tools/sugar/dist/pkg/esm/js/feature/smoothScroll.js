// @ts-nocheck
import __deepMerge from '../../shared/object/deepMerge';
import __smoothScrollOnAnchorLinks from './smoothScrollOnAnchorLinks';
import __smoothScrollOnHashChange from './smoothScrollOnHashChange';
import __smoothScrollOnPageLoad from './smoothScrollOnPageLoad';
export default function __smoothScroll(settings = {}) {
    settings = __deepMerge({
        scroll: {},
    }, settings);
    __smoothScrollOnPageLoad(settings);
    __smoothScrollOnAnchorLinks(settings);
    __smoothScrollOnHashChange(settings);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLFdBQVcsTUFBTSwrQkFBK0IsQ0FBQztBQUd4RCxPQUFPLDJCQUEyQixNQUFNLDZCQUE2QixDQUFDO0FBQ3RFLE9BQU8sMEJBQTBCLE1BQU0sNEJBQTRCLENBQUM7QUFDcEUsT0FBTyx3QkFBd0IsTUFBTSwwQkFBMEIsQ0FBQztBQXFDaEUsTUFBTSxDQUFDLE9BQU8sVUFBVSxjQUFjLENBQ2xDLFdBQTJDLEVBQUU7SUFFN0MsUUFBUSxHQUFHLFdBQVcsQ0FDbEI7UUFDSSxNQUFNLEVBQUUsRUFBRTtLQUNiLEVBQ0QsUUFBUSxDQUNYLENBQUM7SUFFRix3QkFBd0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNuQywyQkFBMkIsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0QywwQkFBMEIsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN6QyxDQUFDIn0=