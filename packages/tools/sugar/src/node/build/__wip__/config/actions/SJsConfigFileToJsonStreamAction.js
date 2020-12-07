"use strict";
// @ts-nocheck
var _a;
const __webpack = require('webpack');
const __getFilename = require('../../../fs/filename');
const __packageRoot = require('../../../path/packageRoot');
const __deepMerge = require('../../../object/deepMerge');
const __fs = require('fs');
const __path = require('path');
const __SActionsStreamAction = require('../../../stream/SActionsStreamAction');
const __SBuildJsCli = require('../../SBuildJsCli');
const { stream } = require('globby');
/**
 * @name                SJsConfigFileToJsonStreamAction
 * @namespace           sugar.node.build.config.actions
 * @type                Class
 * @extends             SActionsStreamAction
 *
 * This function is responsible of converting a javascript config file to a simple json
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = (_a = class SJsConfigFileToJsonStreamAction extends __SActionsStreamAction {
        /**
         * @name            constructor
         * @type            Function
         * @constructor
         *
         * Constructor
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        constructor(settings = {}) {
            super(__deepMerge({
                id: 'actionStream.action.config.configFileToJson'
            }, settings));
        }
        /**
         * @name          run
         * @type          Function
         * @async
         *
         * Override the base class run method
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        run(streamObj, settings) {
            return super.run(streamObj, (resolve, reject) => {
                // get the config object from input file
                const config = require(streamObj.input);
                // transform the config to JSON
                streamObj.data = JSON.stringify(config, null, 4);
                // resolve the action
                resolve(streamObj);
            });
        }
    },
    /**
     * @name            definition
     * @type             Object
     * @static
     *
     * Store the definition object that specify the streamObj required properties, types, etc...
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _a.definition = {
        input: {
            type: 'String',
            required: true
        }
    },
    _a);
//# sourceMappingURL=SJsConfigFileToJsonStreamAction.js.map