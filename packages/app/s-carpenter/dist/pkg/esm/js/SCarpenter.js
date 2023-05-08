import __SClass from '@coffeekraken/s-class';
import __SComponentUtils from '@coffeekraken/s-component-utils';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { define as _sCarpenterAppComponentDefine } from './SCarpenterAppComponent';
import __SFront from '@coffeekraken/s-front';
export default class SCarpenter extends __SClass {
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings) {
        var _a, _b;
        super(__deepMerge({}, settings !== null && settings !== void 0 ? settings : {}));
        const front = new __SFront({
            id: 'carpenter',
            lod: {
                defaultLevel: 5,
            },
        });
        front.setLod(5);
        // components
        _sCarpenterAppComponentDefine(Object.assign(Object.assign({}, ((_a = __SComponentUtils.getDefaultProps('s-carpenter')) !== null && _a !== void 0 ? _a : {})), { window: (_b = window.top) !== null && _b !== void 0 ? _b : window }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8saUJBQWlCLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxNQUFNLElBQUksNkJBQTZCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVuRixPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUk3QyxNQUFNLENBQUMsT0FBTyxPQUFPLFVBQVcsU0FBUSxRQUFRO0lBQzVDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBdUM7O1FBQy9DLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFdkMsTUFBTSxLQUFLLEdBQUcsSUFBSSxRQUFRLENBQUM7WUFDdkIsRUFBRSxFQUFFLFdBQVc7WUFDZixHQUFHLEVBQUU7Z0JBQ0QsWUFBWSxFQUFFLENBQUM7YUFDbEI7U0FDSixDQUFDLENBQUM7UUFDSCxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWhCLGFBQWE7UUFDYiw2QkFBNkIsaUNBQ3RCLENBQUMsTUFBQSxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLG1DQUFJLEVBQUUsQ0FBQyxLQUMzRCxNQUFNLEVBQUUsTUFBQSxNQUFNLENBQUMsR0FBRyxtQ0FBSSxNQUFNLElBQzlCLENBQUM7SUFDUCxDQUFDO0NBQ0oifQ==