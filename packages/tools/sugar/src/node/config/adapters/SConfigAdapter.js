// @ts-nocheck
// @shared
import __deepMerge from '../../object/deepMerge';
import __SEventEmitter from '../../event/SEventEmitter';
export default class SConfigAdapter extends __SEventEmitter {
    /**
     * @name        configAdapterSettings
     * @type        ISConfigAdapterSettings
     * @get
     *
     * Access the config adapter settings
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get configAdapterSettings() {
        return this._settings.configAdapter;
    }
    /**
     * @name                              constructor
     * @type                              Function
     *
     * Construct the SConfigAdapter instance with the settings passed in object format. See description bellow.
     *
     * @param         {Object}          [settings={}]             An object to configure the SConfigAdapter instance. This is specific to each adapters.settings.settings...
     * - name (null) {String}: Specify a simple name for this adapter instance. This name will be used to save the configs, etc...
     * - ...others: All the settings you need for your specific adapter
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings) {
        super(__deepMerge({
            configAdapter: {}
        }, settings || {}));
        if (settings.name && !/^[a-zA-Z0-9_\-:]+$/.test(settings.name)) {
            throw new Error(`The name of an SConfigAdapter instance can contain only letters like [a-zA-Z0-9_-:]...`);
        }
    }
    /**
     * @name                  name
     * @type                  String
     * @get
     *
     * Access the adapter setted name
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get name() {
        return this.configAdapterSettings.name;
    }
    set name(value) {
        if (!/^[a-zA-Z0-9_\-:]+$/.test(value)) {
            throw new Error(`The name of an SConfigAdapter instance can contain only letters like [a-zA-Z0-9_-:]...`);
        }
        this._settings.configAdapter.name = value;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZ0FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQ29uZmlnQWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTtBQUVWLE9BQU8sV0FBVyxNQUFNLHdCQUF3QixDQUFDO0FBRWpELE9BQU8sZUFBZSxNQUFNLDJCQUEyQixDQUFDO0FBd0N4RCxNQUFNLENBQUMsT0FBTyxPQUFPLGNBQWUsU0FBUSxlQUFlO0lBQ3pEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUkscUJBQXFCO1FBQ3ZCLE9BQWEsSUFBSSxDQUFDLFNBQVUsQ0FBQyxhQUFhLENBQUM7SUFDN0MsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsWUFBWSxRQUFxQztRQUMvQyxLQUFLLENBQ0gsV0FBVyxDQUNUO1lBQ0UsYUFBYSxFQUFFLEVBQUU7U0FDbEIsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztRQUVGLElBQUksUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDOUQsTUFBTSxJQUFJLEtBQUssQ0FDYix3RkFBd0YsQ0FDekYsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDO0lBQ3pDLENBQUM7SUFDRCxJQUFJLElBQUksQ0FBQyxLQUFLO1FBQ1osSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNyQyxNQUFNLElBQUksS0FBSyxDQUNiLHdGQUF3RixDQUN6RixDQUFDO1NBQ0g7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO0lBQzVDLENBQUM7Q0FDRiJ9