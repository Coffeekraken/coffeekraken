// @ts-nocheck
import __scrollToLocationHash from '../dom/scroll/scrollToLocationHash.js';
import __deepMerge from '../../shared/object/deepMerge.js';
export default function __smoothScrollOnHashChange(settings = {}) {
    settings = __deepMerge({
        scroll: {},
    }, settings);
    window.addEventListener('hashchange', (e) => {
        __scrollToLocationHash(settings);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLHNCQUFzQixNQUFNLHVDQUF1QyxDQUFDO0FBRTNFLE9BQU8sV0FBVyxNQUFNLGtDQUFrQyxDQUFDO0FBa0MzRCxNQUFNLENBQUMsT0FBTyxVQUFVLDBCQUEwQixDQUM5QyxXQUF1RCxFQUFFO0lBRXpELFFBQVEsR0FBRyxXQUFXLENBQ2xCO1FBQ0ksTUFBTSxFQUFFLEVBQUU7S0FDYixFQUNELFFBQVEsQ0FDWCxDQUFDO0lBRUYsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ3hDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3JDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9