// @ts-nocheck
import __deepMerge from '../../shared/object/deepMerge.js';
import __smoothScrollOnAnchorLinks from './smoothScrollOnAnchorLinks.js';
import __smoothScrollOnHashChange from './smoothScrollOnHashChange.js';
import __smoothScrollOnPageLoad from './smoothScrollOnPageLoad.js';
export default function __smoothScroll(settings = {}) {
    settings = __deepMerge({
        scroll: {},
    }, settings);
    __smoothScrollOnPageLoad(settings);
    __smoothScrollOnAnchorLinks(settings);
    __smoothScrollOnHashChange(settings);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLFdBQVcsTUFBTSxrQ0FBa0MsQ0FBQztBQUczRCxPQUFPLDJCQUEyQixNQUFNLGdDQUFnQyxDQUFDO0FBQ3pFLE9BQU8sMEJBQTBCLE1BQU0sK0JBQStCLENBQUM7QUFDdkUsT0FBTyx3QkFBd0IsTUFBTSw2QkFBNkIsQ0FBQztBQXFDbkUsTUFBTSxDQUFDLE9BQU8sVUFBVSxjQUFjLENBQ2xDLFdBQTJDLEVBQUU7SUFFN0MsUUFBUSxHQUFHLFdBQVcsQ0FDbEI7UUFDSSxNQUFNLEVBQUUsRUFBRTtLQUNiLEVBQ0QsUUFBUSxDQUNYLENBQUM7SUFFRix3QkFBd0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNuQywyQkFBMkIsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0QywwQkFBMEIsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN6QyxDQUFDIn0=