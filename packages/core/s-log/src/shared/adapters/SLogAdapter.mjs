// @ts-nocheck
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SClass from '@coffeekraken/s-class';
export default class SLogAdapter extends __SClass {
    /**
     * @name          logAdapterSettings
     * @type          ISLogAdapterSettings
     * @get
     *
     * Access the logAdapter settings
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get logAdapterSettings() {
        return this._settings.logAdapter;
    }
    /**
     * @name          constructor
     * @type          Function
     *
     * Constructor
     *
     * @param         {Object}        [settings={}]           The settings object to configure your SLogAdapter instance. Here's the settings available:
     * - logMethods ({}) {Object}: Store all the console methods like "log", "info", "warn", "debug" and "error". You can override each methods with your own method if you want. The Object format is { methodName: overrideFunction }
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings) {
        // extend settings
        super(__deepMerge({
            logAdapter: {}
        }, settings !== null && settings !== void 0 ? settings : {}));
        // make sure the adapter implement a ```log``` method
        if (!this.log || typeof this.log !== 'function')
            throw new Error(`<red>[${this.constructor.name}]</red> Sorry but your SLog adapter MUST implement a "<yellow>log(lobObj)</yellow>" method.`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xvZ0FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3MtbG9nL3NyYy9zaGFyZWQvYWRhcHRlcnMvU0xvZ0FkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBa0M3QyxNQUFNLENBQUMsT0FBTyxPQUFPLFdBQVksU0FBUSxRQUFRO0lBQy9DOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksa0JBQWtCO1FBQ3BCLE9BQWEsSUFBSyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7SUFDMUMsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxZQUFZLFFBQTRDO1FBQ3RELGtCQUFrQjtRQUNsQixLQUFLLENBQ0gsV0FBVyxDQUNUO1lBQ0UsVUFBVSxFQUFFLEVBQUU7U0FDZixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7UUFFRixxREFBcUQ7UUFDckQsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksT0FBTyxJQUFJLENBQUMsR0FBRyxLQUFLLFVBQVU7WUFDN0MsTUFBTSxJQUFJLEtBQUssQ0FDYixTQUFTLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSw2RkFBNkYsQ0FDNUgsQ0FBQztJQUNOLENBQUM7Q0FDRiJ9