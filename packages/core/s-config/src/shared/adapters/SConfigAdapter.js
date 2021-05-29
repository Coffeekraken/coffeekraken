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
        /**
         * @name        update
         * @type        Function
         *
         * Function that you have to call with the new config when it has been updated
         *
         * @param      {String}         identifier        A string identifier for the update. Can be a file path, an object hash, etc...
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._updatesTimeoutsStack = {};
        this._settings = __deepMerge(settings || {});
        if (settings.name && !/^[a-zA-Z0-9_\-:]+$/.test(settings.name)) {
            throw new Error(`The name of an SConfigAdapter instance can contain only letters like [a-zA-Z0-9_-:]...`);
        }
    }
    get configAdapterSettings() {
        return this._settings.configAdapter;
    }
    update(identifier) {
        // calling the "onUpdate" setting callback if exists
        clearTimeout(this._updatesTimeoutsStack[identifier]);
        this._updatesTimeoutsStack[identifier] = setTimeout(() => {
            if (!this._settings.onUpdate)
                return;
            this._settings.onUpdate();
        }, 50);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZ0FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQ29uZmlnQWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUF1Q3RFLE1BQU0sQ0FBQyxPQUFPLE9BQU8sY0FBYztJQWdCakM7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxZQUFZLFFBQThDO1FBUzFEOzs7Ozs7Ozs7O1dBVUc7UUFDSCwwQkFBcUIsR0FBRyxFQUFFLENBQUM7UUFuQnpCLElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUM3QyxJQUFJLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzlELE1BQU0sSUFBSSxLQUFLLENBQ2Isd0ZBQXdGLENBQ3pGLENBQUM7U0FDSDtJQUNILENBQUM7SUF2QkQsSUFBSSxxQkFBcUI7UUFDdkIsT0FBYSxJQUFLLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQztJQUM3QyxDQUFDO0lBbUNELE1BQU0sQ0FBQyxVQUFrQjtRQUN2QixvREFBb0Q7UUFDcEQsWUFBWSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ3ZELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVE7Z0JBQUUsT0FBTztZQUNyQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzVCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNULENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7SUFDN0IsQ0FBQztJQUNELElBQUksSUFBSSxDQUFDLEtBQUs7UUFDWixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3JDLE1BQU0sSUFBSSxLQUFLLENBQ2Isd0ZBQXdGLENBQ3pGLENBQUM7U0FDSDtRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztJQUM5QixDQUFDO0NBQ0YifQ==