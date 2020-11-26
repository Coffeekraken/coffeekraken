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
    constructor(settings = {}) {
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
        // store the settings
        this._settings = settings;
    }
};
