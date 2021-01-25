"use strict";
// @ts-nocheck
// @shared
module.exports = class SCacheAdapter {
    /**
     * @name                              constructor
     * @type                              Function
     *
     * Construct the SCacheAdapter instance with the settings passed in object format. See description bellow.
     *
     * @param         {Object}          [settings={}]             An object to configure the SCacheAdapter instance. This is specific to each adapters.settings.settings...
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(cache, settings = {}) {
        /**
         * @name                              _settings
         * @type                              Object
         * @private
         *
         * Store the default settings of the SCacheAdapter instance
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._settings = {};
        /**
         * @name            cache
         * @type            SCache
         *
         * Store the cache instance which if used
         *
         * @since         2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this.cache = null;
        // store the settings
        this._settings = settings;
        this.cache = cache;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NhY2hlQWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNDYWNoZUFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFDZCxVQUFVO0FBc0NWLGlCQUFTLE1BQU0sYUFBYTtJQXVCMUI7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxLQUFLLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFoQ2hDOzs7Ozs7OztXQVFHO1FBQ0gsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUVmOzs7Ozs7OztXQVFHO1FBQ0gsVUFBSyxHQUFHLElBQUksQ0FBQztRQWFYLHFCQUFxQjtRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNyQixDQUFDO0NBQ0YsQ0FBQyJ9