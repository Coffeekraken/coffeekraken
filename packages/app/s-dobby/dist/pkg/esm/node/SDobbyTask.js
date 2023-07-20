import __SClass from '@coffeekraken/s-class';
import { __uniqid } from '@coffeekraken/sugar/string';
import __SDuration from '@coffeekraken/s-duration';
/**
 * @name                SDobbyTask
 * @namespace           node
 * @type                Class
 * @extends             SClass
 * @platform            node
 * @status              beta
 *
 * This class represent a base task
 *
 * @param           {ISDobbyTaskSettings}          [settings={}]           Some settings to configure your dobby task instance
 *
 * @example         js
 * import { __SDobbyTask } from '@coffeekraken/s-dobby';
 * export default class MyCoolDobbyAdapter extends __SDobbyTask {
 *   // ...
 * }
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SDobbyTask extends __SClass {
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(taskMetas) {
        super();
        this.metas = taskMetas;
    }
    start() {
        console.log(`<yellow>[SDobby]</yellow> Starting <magenta>${this.metas.name} (${this.metas.type})</magenta> task...`);
        this._time = Date.now();
        this._duration = new __SDuration();
    }
    end() {
        const durationObj = this._duration.end();
        console.log(`<green>[SDobby]</green> Task <magenta>${this.metas.name} (${this.metas.type})</magenta> finished <green>successfully</green> in <cyan>${durationObj.formatedDuration}</cyan>`);
        return {
            uid: __uniqid(),
            time: this._time,
            duration: durationObj,
            task: this.metas,
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV0RCxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUluRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxNQUFNLENBQUMsT0FBTyxPQUFPLFVBQVcsU0FBUSxRQUFRO0lBWTVDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksU0FBNEI7UUFDcEMsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztJQUMzQixDQUFDO0lBS0QsS0FBSztRQUNELE9BQU8sQ0FBQyxHQUFHLENBQ1AsK0NBQStDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxxQkFBcUIsQ0FDMUcsQ0FBQztRQUNGLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQsR0FBRztRQUNDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDekMsT0FBTyxDQUFDLEdBQUcsQ0FDUCx5Q0FBeUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLDZEQUE2RCxXQUFXLENBQUMsZ0JBQWdCLFNBQVMsQ0FDakwsQ0FBQztRQUNGLE9BQU87WUFDSCxHQUFHLEVBQUUsUUFBUSxFQUFFO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2hCLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSztTQUNuQixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=