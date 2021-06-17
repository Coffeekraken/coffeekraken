import __scrollToLocationHash from '../dom/scroll/scrollToLocationHash';
import __deepMerge from '../../shared/object/deepMerge';
function smoothScrollOnHashChange(settings = {}) {
    settings = __deepMerge({
        scroll: {}
    }, settings);
    window.addEventListener('hashchange', (e) => {
        __scrollToLocationHash(settings);
    });
}
export default smoothScrollOnHashChange;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21vb3RoU2Nyb2xsT25IYXNoQ2hhbmdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic21vb3RoU2Nyb2xsT25IYXNoQ2hhbmdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sc0JBQXNCLE1BQU0sb0NBQW9DLENBQUM7QUFDeEUsT0FBTyxXQUFXLE1BQU0sK0JBQStCLENBQUM7QUErQnhELFNBQVMsd0JBQXdCLENBQy9CLFdBQXVELEVBQUU7SUFHekQsUUFBUSxHQUFHLFdBQVcsQ0FBQztRQUNyQixNQUFNLEVBQUUsRUFBRTtLQUNYLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFFYixNQUFNLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDMUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDLENBQUM7QUFFTCxDQUFDO0FBQ0QsZUFBZSx3QkFBd0IsQ0FBQyJ9