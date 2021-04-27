// @ts-nocheck
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
export default class SConfigAdapter {
    /**
     * @name                              constructor
     * @type                              Function
     *
     * Construct the SConfigAdapter instance with the settings passed in object format. See description bellow.
     *
     * @param         {Object}          [settings={}]             An object to configure the SConfigAdapter instance. This is specific to each adapters.settings.settings...
     * - name (null) {String}: Specify a simple name for this adapter instance. This name will be used to save the configs, etc...
     * - ...others: All the settings you need for your specific adapter
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings) {
        this._settings = __deepMerge(settings || {});
        if (settings.name && !/^[a-zA-Z0-9_\-:]+$/.test(settings.name)) {
            throw new Error(`The name of an SConfigAdapter instance can contain only letters like [a-zA-Z0-9_-:]...`);
        }
    }
    get configAdapterSettings() {
        return this._settings.configAdapter;
    }
    /**
     * @name        update
     * @type        Function
     *
     * Function that you have to call with the new config when it has been updated
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    update() {
        // calling the "onUpdate" setting callback if exists
        if (!this._settings.onUpdate)
            return;
        this._settings.onUpdate();
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
        return this._settings.name;
    }
    set name(value) {
        if (!/^[a-zA-Z0-9_\-:]+$/.test(value)) {
            throw new Error(`The name of an SConfigAdapter instance can contain only letters like [a-zA-Z0-9_-:]...`);
        }
        this._settings.name = value;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZ0FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3MtY29uZmlnL3NyYy9zaGFyZWQvYWRhcHRlcnMvU0NvbmZpZ0FkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBdUN0RSxNQUFNLENBQUMsT0FBTyxPQUFPLGNBQWM7SUFnQmpDOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsWUFBWSxRQUE4QztRQUN4RCxJQUFJLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLENBQUM7UUFDN0MsSUFBSSxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM5RCxNQUFNLElBQUksS0FBSyxDQUNiLHdGQUF3RixDQUN6RixDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBdkJELElBQUkscUJBQXFCO1FBQ3ZCLE9BQWEsSUFBSyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUM7SUFDN0MsQ0FBQztJQXVCRDs7Ozs7Ozs7T0FRRztJQUNILE1BQU07UUFDSixvREFBb0Q7UUFDcEQsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUTtZQUFFLE9BQU87UUFDckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO0lBQzdCLENBQUM7SUFDRCxJQUFJLElBQUksQ0FBQyxLQUFLO1FBQ1osSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNyQyxNQUFNLElBQUksS0FBSyxDQUNiLHdGQUF3RixDQUN6RixDQUFDO1NBQ0g7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7SUFDOUIsQ0FBQztDQUNGIn0=