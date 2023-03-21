import __SClass from '@coffeekraken/s-class';
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
        var _a;
        super(__deepMerge({}, settings !== null && settings !== void 0 ? settings : {}));
        const front = new __SFront({
            id: 'carpenter',
            lod: {
                defaultLevel: 5,
            },
        });
        front.setLod(5);
        // features
        // __sActivateFeature();
        // components
        _sCarpenterAppComponentDefine({
            window: (_a = window.top) !== null && _a !== void 0 ? _a : window,
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsTUFBTSxJQUFJLDZCQUE2QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFbkYsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFJN0MsTUFBTSxDQUFDLE9BQU8sT0FBTyxVQUFXLFNBQVEsUUFBUTtJQUM1Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQXVDOztRQUMvQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXZDLE1BQU0sS0FBSyxHQUFHLElBQUksUUFBUSxDQUFDO1lBQ3ZCLEVBQUUsRUFBRSxXQUFXO1lBQ2YsR0FBRyxFQUFFO2dCQUNELFlBQVksRUFBRSxDQUFDO2FBQ2xCO1NBQ0osQ0FBQyxDQUFDO1FBQ0gsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVoQixXQUFXO1FBQ1gsd0JBQXdCO1FBRXhCLGFBQWE7UUFDYiw2QkFBNkIsQ0FBQztZQUMxQixNQUFNLEVBQUUsTUFBQSxNQUFNLENBQUMsR0FBRyxtQ0FBSSxNQUFNO1NBQy9CLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSiJ9