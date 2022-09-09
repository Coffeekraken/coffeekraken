import { __scrollToLocationHash } from '@coffeekraken/sugar/dom';
import __deepMerge from '../../shared/object/deepMerge';
export default function __smoothScrollOnPageLoad(settings = {}) {
    settings = __deepMerge({
        scroll: {},
    }, settings);
    __scrollToLocationHash(settings);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pFLE9BQU8sV0FBVyxNQUFNLCtCQUErQixDQUFDO0FBK0J4RCxNQUFNLENBQUMsT0FBTyxVQUFVLHdCQUF3QixDQUM1QyxXQUFxRCxFQUFFO0lBRXZELFFBQVEsR0FBRyxXQUFXLENBQ2xCO1FBQ0ksTUFBTSxFQUFFLEVBQUU7S0FDYixFQUNELFFBQVEsQ0FDWCxDQUFDO0lBRUYsc0JBQXNCLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDckMsQ0FBQyJ9