import __scrollToLocationHash from '../dom/scroll/scrollToLocationHash';
import __deepMerge from '../../shared/object/deepMerge';
function smoothScrollOnPageLoad(settings = {}) {
    settings = __deepMerge({
        scroll: {},
    }, settings);
    __scrollToLocationHash(settings);
}
export default smoothScrollOnPageLoad;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sc0JBQXNCLE1BQU0sb0NBQW9DLENBQUM7QUFDeEUsT0FBTyxXQUFXLE1BQU0sK0JBQStCLENBQUM7QUErQnhELFNBQVMsc0JBQXNCLENBQzNCLFdBQXFELEVBQUU7SUFFdkQsUUFBUSxHQUFHLFdBQVcsQ0FDbEI7UUFDSSxNQUFNLEVBQUUsRUFBRTtLQUNiLEVBQ0QsUUFBUSxDQUNYLENBQUM7SUFFRixzQkFBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNyQyxDQUFDO0FBQ0QsZUFBZSxzQkFBc0IsQ0FBQyJ9