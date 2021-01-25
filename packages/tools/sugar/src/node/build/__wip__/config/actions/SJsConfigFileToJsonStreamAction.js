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
module.exports = (_a = class SJsConfigFileToJsonStreamAction extends (__SActionsStreamAction) {
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
            return super.run(streamObj, ({ resolve, reject }) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0pzQ29uZmlnRmlsZVRvSnNvblN0cmVhbUFjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNKc0NvbmZpZ0ZpbGVUb0pzb25TdHJlYW1BY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7O0FBRWQsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3JDLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBQ3RELE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0FBQzNELE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0FBQ3pELE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMzQixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDL0IsTUFBTSxzQkFBc0IsR0FBRyxPQUFPLENBQUMsc0NBQXNDLENBQUMsQ0FBQztBQUMvRSxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUNuRCxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRXJDOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFNBQUcsTUFBTSwrQkFBZ0MsU0FBUSxDQUM3RCxzQkFBc0IsQ0FDdkI7UUFpQkM7Ozs7Ozs7O1dBUUc7UUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1lBQ3ZCLEtBQUssQ0FDSCxXQUFXLENBQ1Q7Z0JBQ0UsRUFBRSxFQUFFLDZDQUE2QzthQUNsRCxFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUFDSixDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDSCxHQUFHLENBQUMsU0FBUyxFQUFFLFFBQVE7WUFDckIsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7Z0JBQ2xELHdDQUF3QztnQkFDeEMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFeEMsK0JBQStCO2dCQUMvQixTQUFTLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFFakQscUJBQXFCO2dCQUNyQixPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDckIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0tBQ0Y7SUF6REM7Ozs7Ozs7O09BUUc7SUFDSSxhQUFVLEdBQUc7UUFDbEIsS0FBSyxFQUFFO1lBQ0wsSUFBSSxFQUFFLFFBQVE7WUFDZCxRQUFRLEVBQUUsSUFBSTtTQUNmO0tBQ0Q7T0EyQ0gsQ0FBQyJ9