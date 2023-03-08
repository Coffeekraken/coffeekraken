import { define as __sActivateFeature } from '@coffeekraken/s-activate-feature';
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
        __sActivateFeature();
        // components
        _sCarpenterAppComponentDefine({
            window: (_a = window.top) !== null && _a !== void 0 ? _a : window,
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLElBQUksa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRixPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLE1BQU0sSUFBSSw2QkFBNkIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRW5GLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBSTdDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sVUFBVyxTQUFRLFFBQVE7SUFDNUM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUF1Qzs7UUFDL0MsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUV2QyxNQUFNLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQztZQUN2QixFQUFFLEVBQUUsV0FBVztZQUNmLEdBQUcsRUFBRTtnQkFDRCxZQUFZLEVBQUUsQ0FBQzthQUNsQjtTQUNKLENBQUMsQ0FBQztRQUNILEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFaEIsV0FBVztRQUNYLGtCQUFrQixFQUFFLENBQUM7UUFFckIsYUFBYTtRQUNiLDZCQUE2QixDQUFDO1lBQzFCLE1BQU0sRUFBRSxNQUFBLE1BQU0sQ0FBQyxHQUFHLG1DQUFJLE1BQU07U0FDL0IsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKIn0=