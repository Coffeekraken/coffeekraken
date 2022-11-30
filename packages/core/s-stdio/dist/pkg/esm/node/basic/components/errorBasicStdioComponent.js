import { __parseHtml } from '@coffeekraken/sugar/console';
import { __toString } from '@coffeekraken/sugar/string';
/**
 * @name        errorBasicStdioComponent
 * @namespace   shared.basic.components
 * @type        ISStdioComponent
 *
 * Basic stdio error component
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default {
    id: 'error',
    render(logObj, settings = {}) {
        var _a;
        const value = logObj.value !== undefined ? logObj.value : logObj;
        return `⚠️  ${__parseHtml(__toString((_a = value.error) !== null && _a !== void 0 ? _a : value))}`;
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFeEQ7Ozs7Ozs7OztHQVNHO0FBQ0gsZUFBZTtJQUNYLEVBQUUsRUFBRSxPQUFPO0lBQ1gsTUFBTSxDQUFDLE1BQU0sRUFBRSxRQUFRLEdBQUcsRUFBRTs7UUFDeEIsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUNqRSxPQUFPLE9BQU8sV0FBVyxDQUFDLFVBQVUsQ0FBQyxNQUFBLEtBQUssQ0FBQyxLQUFLLG1DQUFJLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNsRSxDQUFDO0NBQ0osQ0FBQyJ9