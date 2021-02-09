"use strict";
// @ts-nocheck
// @shared
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name                                SConfigAdapter
 * @namespace           sugar.js.config.adapters
 * @type                                Class
 * @status              beta
 *
 * Base class for SCache adapters
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * class SConfigCoolAdapter extends SConfigAdapter {
 *    constructor(settings = {}) {
 *      super(settings);
 *      // settings are accessible through this._settings
 *    }
 *    async load() {
 *      // load the config the way you want and return it in Object format
 *      return {};
 *    }
 *    async save(newConfig) {
 *      // save the newConfig object the way you want and return true when all it ok
 *      return true;
 *    }
 * }
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SConfigAdapter {
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
    constructor(settings = {}) {
        /**
         * @name                              _settings
         * @type                              Object
         * @private
         *
         * Store the default settings of the SConfigAdapter instance
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._settings = {};
        if (settings.name && !/^[a-zA-Z0-9_\-:]+$/.test(settings.name)) {
            throw new Error(`The name of an SConfigAdapter instance can contain only letters like [a-zA-Z0-9_-:]...`);
        }
        // store the settings
        this._settings = settings;
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
    /**
     * @name                  settings
     * @type                  Object
     * @get
     *
     * Access the adapter setted settings
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get settings() {
        return this._settings;
    }
}
exports.default = SConfigAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZ0FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQ29uZmlnQWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLFVBQVU7O0FBSVY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThCRztBQUNILE1BQXFCLGNBQWM7SUFZakM7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1FBdkJ6Qjs7Ozs7Ozs7V0FRRztRQUNILGNBQVMsR0FBRyxFQUFFLENBQUM7UUFlYixJQUFJLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzlELE1BQU0sSUFBSSxLQUFLLENBQ2Isd0ZBQXdGLENBQ3pGLENBQUM7U0FDSDtRQUNELHFCQUFxQjtRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztJQUM1QixDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO0lBQzdCLENBQUM7SUFDRCxJQUFJLElBQUksQ0FBQyxLQUFLO1FBQ1osSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNyQyxNQUFNLElBQUksS0FBSyxDQUNiLHdGQUF3RixDQUN6RixDQUFDO1NBQ0g7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7SUFDOUIsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7Q0FDRjtBQW5FRCxpQ0FtRUMifQ==