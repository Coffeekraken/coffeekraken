// @ts-nocheck
import { __scrollToLocationHash } from '@coffeekraken/sugar/dom';
import __deepMerge from '../../shared/object/deepMerge';
export default function __smoothScrollOnHashChange(settings = {}) {
    settings = __deepMerge({
        scroll: {},
    }, settings);
    window.addEventListener('hashchange', (e) => {
        __scrollToLocationHash(settings);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRSxPQUFPLFdBQVcsTUFBTSwrQkFBK0IsQ0FBQztBQWtDeEQsTUFBTSxDQUFDLE9BQU8sVUFBVSwwQkFBMEIsQ0FDOUMsV0FBdUQsRUFBRTtJQUV6RCxRQUFRLEdBQUcsV0FBVyxDQUNsQjtRQUNJLE1BQU0sRUFBRSxFQUFFO0tBQ2IsRUFDRCxRQUFRLENBQ1gsQ0FBQztJQUVGLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUN4QyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNyQyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMifQ==