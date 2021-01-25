"use strict";
// @ts-nocheck
var _a;
const __SBuildFontIconsActionsStream = require('./SBuildFontIconsActionsStream');
const __deepMerge = require('../../object/deepMerge');
const __SProcess = require('../../process/SProcess');
const __SBuildFontIconsInterface = require('./interface/SBuildFontIconsInterface');
/**
 * @name            SBuildFontIconsProcess
 * @namespace           sugar.node.build.fontIcons
 * @type            Class
 * @extends         SProcess
 *
 * This class represent the process that build the font icons files
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = (_a = class SBuildFontIconsProcess extends __SProcess {
        /**
         * @name          constructor
         * @type          Function
         * @constructor
         *
         * Constructor
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        constructor(settings = {}) {
            super(__deepMerge({
                id: 'SBuildFontIconsProcess',
                name: 'Build Font Icons Process'
            }, settings));
        }
        /**
         * @name              process
         * @type              Function
         *
         * Method that actually execute the process
         *
         * @param       {Object}        params           The arguments object that will be passed to the underlined actions stream instance
         * @param       {Object}        [settings={}]     An object of settings passed to the ```start``` method of the ```SBuildScssActionsStream``` instance
         * @return      {Süromise}                        An SPomise instance representing the build process
         *
         * @since         2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        process(params, settings = {}) {
            const actionStream = new __SBuildFontIconsActionsStream(Object.assign(Object.assign({}, settings), { logs: {
                    success: false,
                    start: false
                } }));
            this._buildFontIconsActionsStream = actionStream.start(params);
            this.bindSPromise(this._buildFontIconsActionsStream);
        }
    },
    _a.interfaces = {
        this: __SBuildFontIconsInterface
    },
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0J1aWxkRm9udEljb25zUHJvY2Vzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNCdWlsZEZvbnRJY29uc1Byb2Nlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7O0FBRWQsTUFBTSw4QkFBOEIsR0FBRyxPQUFPLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztBQUNqRixNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUN0RCxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUNyRCxNQUFNLDBCQUEwQixHQUFHLE9BQU8sQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO0FBRW5GOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLENBQUMsT0FBTyxTQUFHLE1BQU0sc0JBQXVCLFNBQVEsVUFBVTtRQUs5RDs7Ozs7Ozs7V0FRRztRQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7WUFDdkIsS0FBSyxDQUNILFdBQVcsQ0FDVDtnQkFDRSxFQUFFLEVBQUUsd0JBQXdCO2dCQUM1QixJQUFJLEVBQUUsMEJBQTBCO2FBQ2pDLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztRQUNKLENBQUM7UUFFRDs7Ozs7Ozs7Ozs7O1dBWUc7UUFDSCxPQUFPLENBQUMsTUFBTSxFQUFFLFFBQVEsR0FBRyxFQUFFO1lBQzNCLE1BQU0sWUFBWSxHQUFHLElBQUksOEJBQThCLGlDQUNsRCxRQUFRLEtBQ1gsSUFBSSxFQUFFO29CQUNKLE9BQU8sRUFBRSxLQUFLO29CQUNkLEtBQUssRUFBRSxLQUFLO2lCQUNiLElBQ0QsQ0FBQztZQUNILElBQUksQ0FBQyw0QkFBNEIsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQy9ELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUM7UUFDdkQsQ0FBQztLQUNGO0lBakRRLGFBQVUsR0FBRztRQUNsQixJQUFJLEVBQUUsMEJBQTBCO0tBQ2hDO09BK0NILENBQUMifQ==