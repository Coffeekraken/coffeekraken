"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
class SConfigAdapter {
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
        this.settings = (0, deepMerge_1.default)(settings || {});
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
exports.default = SConfigAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRGQUFzRTtBQXVDdEUsTUFBcUIsY0FBYztJQWdCL0I7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxZQUFZLFFBQThDO1FBUzFEOzs7Ozs7Ozs7O1dBVUc7UUFDSCwwQkFBcUIsR0FBRyxFQUFFLENBQUM7UUFuQnZCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBQSxtQkFBVyxFQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUM1QyxJQUFJLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzVELE1BQU0sSUFBSSxLQUFLLENBQ1gsd0ZBQXdGLENBQzNGLENBQUM7U0FDTDtJQUNMLENBQUM7SUF2QkQsSUFBSSxxQkFBcUI7UUFDckIsT0FBYSxJQUFLLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQztJQUM5QyxDQUFDO0lBbUNELE1BQU0sQ0FBQyxVQUFrQjtRQUNyQixvREFBb0Q7UUFDcEQsWUFBWSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ3JELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVE7Z0JBQUUsT0FBTztZQUNwQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzdCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILElBQUksSUFBSTtRQUNKLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7SUFDOUIsQ0FBQztJQUNELElBQUksSUFBSSxDQUFDLEtBQUs7UUFDVixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ25DLE1BQU0sSUFBSSxLQUFLLENBQ1gsd0ZBQXdGLENBQzNGLENBQUM7U0FDTDtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztJQUMvQixDQUFDO0NBQ0o7QUE5RUQsaUNBOEVDIn0=