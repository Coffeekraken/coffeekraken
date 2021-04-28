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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xvZ0FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTTG9nQWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFrQzdDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sV0FBWSxTQUFRLFFBQVE7SUFDL0M7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxrQkFBa0I7UUFDcEIsT0FBYSxJQUFLLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILFlBQVksUUFBNEM7UUFDdEQsa0JBQWtCO1FBQ2xCLEtBQUssQ0FDSCxXQUFXLENBQ1Q7WUFDRSxVQUFVLEVBQUUsRUFBRTtTQUNmLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztRQUVGLHFEQUFxRDtRQUNyRCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxPQUFPLElBQUksQ0FBQyxHQUFHLEtBQUssVUFBVTtZQUM3QyxNQUFNLElBQUksS0FBSyxDQUNiLFNBQVMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLDZGQUE2RixDQUM1SCxDQUFDO0lBQ04sQ0FBQztDQUNGIn0=