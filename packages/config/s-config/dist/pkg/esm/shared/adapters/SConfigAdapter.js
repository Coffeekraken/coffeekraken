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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._updatesTimeoutsStack = {};
        this.settings = __deepMerge(settings || {});
        if (settings.name && !/^[a-zA-Z0-9_\-:]+$/.test(settings.name)) {
            throw new Error(`The name of an SConfigAdapter instance can contain only letters like [a-zA-Z0-9_-:]...`);
        }
    }
    get configAdapterSettings() {
        return this.settings.configAdapter;
    }
    update(identifier) {
        // calling the "onUpdate" setting callback if exists
        clearTimeout(this._updatesTimeoutsStack[identifier]);
        this._updatesTimeoutsStack[identifier] = setTimeout(() => {
            if (!this.settings.onUpdate)
                return;
            this.settings.onUpdate();
        }, 50);
    }
    /**
     * @name                  name
     * @type                  String
     * @get
     *
     * Access the adapter setted name
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get name() {
        return this.settings.name;
    }
    set name(value) {
        if (!/^[a-zA-Z0-9_\-:]+$/.test(value)) {
            throw new Error(`The name of an SConfigAdapter instance can contain only letters like [a-zA-Z0-9_-:]...`);
        }
        this.settings.name = value;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQXVDdEUsTUFBTSxDQUFDLE9BQU8sT0FBTyxjQUFjO0lBZ0IvQjs7Ozs7Ozs7Ozs7T0FXRztJQUNILFlBQVksUUFBOEM7UUFTMUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILDBCQUFxQixHQUFHLEVBQUUsQ0FBQztRQW5CdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLElBQUksUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDNUQsTUFBTSxJQUFJLEtBQUssQ0FDWCx3RkFBd0YsQ0FDM0YsQ0FBQztTQUNMO0lBQ0wsQ0FBQztJQXZCRCxJQUFJLHFCQUFxQjtRQUNyQixPQUFhLElBQUssQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDO0lBQzlDLENBQUM7SUFtQ0QsTUFBTSxDQUFDLFVBQWtCO1FBQ3JCLG9EQUFvRDtRQUNwRCxZQUFZLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDckQsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUTtnQkFBRSxPQUFPO1lBQ3BDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDN0IsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsSUFBSSxJQUFJO1FBQ0osT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztJQUM5QixDQUFDO0lBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSztRQUNWLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDbkMsTUFBTSxJQUFJLEtBQUssQ0FDWCx3RkFBd0YsQ0FDM0YsQ0FBQztTQUNMO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO0lBQy9CLENBQUM7Q0FDSiJ9