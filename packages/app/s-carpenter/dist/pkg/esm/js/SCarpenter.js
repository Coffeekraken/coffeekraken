import __SClass from '@coffeekraken/s-class';
import __SComponentUtils from '@coffeekraken/s-component-utils';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __sCarpenterAppComponentDefine from './defineApp.js';
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
        __sCarpenterAppComponentDefine(Object.assign(Object.assign({}, ((_a = __SComponentUtils.getDefaultProps('s-carpenter')) !== null && _a !== void 0 ? _a : {})), { window: (_b = window.top) !== null && _b !== void 0 ? _b : window }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8saUJBQWlCLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sOEJBQThCLE1BQU0sZ0JBQWdCLENBQUM7QUFFNUQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFJN0MsTUFBTSxDQUFDLE9BQU8sT0FBTyxVQUFXLFNBQVEsUUFBUTtJQUM1Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQXVDOztRQUMvQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXZDLE1BQU0sS0FBSyxHQUFHLElBQUksUUFBUSxDQUFDO1lBQ3ZCLEVBQUUsRUFBRSxXQUFXO1lBQ2YsR0FBRyxFQUFFO2dCQUNELFlBQVksRUFBRSxDQUFDO2FBQ2xCO1NBQ0osQ0FBQyxDQUFDO1FBQ0gsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVoQixhQUFhO1FBQ2IsOEJBQThCLGlDQUN2QixDQUFDLE1BQUEsaUJBQWlCLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxtQ0FBSSxFQUFFLENBQUMsS0FDM0QsTUFBTSxFQUFFLE1BQUEsTUFBTSxDQUFDLEdBQUcsbUNBQUksTUFBTSxJQUM5QixDQUFDO0lBQ1AsQ0FBQztDQUNKIn0=