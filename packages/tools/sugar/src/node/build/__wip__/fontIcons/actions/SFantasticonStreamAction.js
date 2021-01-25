"use strict";
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
const __SActionsStreamAction = require('../../../stream/SActionsStreamAction');
const __deepMerge = require('../../../object/deepMerge');
const __BBuildFontIconsInterface = require('../interface/SBuildFontIconsInterface');
const __childProcess = require('child_process');
const __ensureDirSync = require('../../../fs/ensureDirSync');
const __removeSync = require('../../../fs/removeSync');
const __copy = require('../../../clipboard/copy');
const __generateFonts = require('fantasticon').generateFonts;
const __fantasticonConfig = require('../fantasticon.config');
/**
 * @name                SFantasticonStreamAction
 * @namespace           sugar.node.build.fonticons.actions
 * @type                Class
 * @extends             SActionsStreamAction
 *
 * This function is responsible of generating the icon font from the passed source directory
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = (_a = class SFantasticonStreamAction extends __SActionsStreamAction {
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
                name: 'Font icons generator',
                id: 'SFantasticonStreamAction'
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
            return super.run(streamObj, ({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
                __removeSync(streamObj.outputDir);
                __ensureDirSync(streamObj.outputDir);
                // Default options
                __generateFonts(__deepMerge({
                    name: 'sugar-icons',
                    inputDir: streamObj.inputDir,
                    outputDir: streamObj.outputDir,
                    fontTypes: ['eot', 'woff2', 'woff'],
                    assetTypes: ['css', 'html', 'json'],
                    formatOptions: {},
                    pathOptions: {},
                    codepoints: {},
                    fontHeight: 300,
                    round: undefined,
                    descent: undefined,
                    normalize: undefined,
                    selector: null,
                    tag: 'i',
                    prefix: 'icon',
                    fontsUrl: './'
                }, __fantasticonConfig)).then((results) => {
                    resolve(streamObj);
                });
            }));
        }
    },
    /**
     * @name            interface
     * @type             Object
     * @static
     *
     * Store the definition object that specify the streamObj required properties, types, etc...
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _a.interfaces = {
        this: __BBuildFontIconsInterface
    },
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZhbnRhc3RpY29uU3RyZWFtQWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0ZhbnRhc3RpY29uU3RyZWFtQWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7OztBQUVkLE1BQU0sc0JBQXNCLEdBQUcsT0FBTyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7QUFDL0UsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLDJCQUEyQixDQUFDLENBQUM7QUFDekQsTUFBTSwwQkFBMEIsR0FBRyxPQUFPLENBQUMsdUNBQXVDLENBQUMsQ0FBQztBQUNwRixNQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDaEQsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLDJCQUEyQixDQUFDLENBQUM7QUFDN0QsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUM7QUFDdkQsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUM7QUFDbEQsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLGFBQWEsQ0FBQztBQUM3RCxNQUFNLG1CQUFtQixHQUFHLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0FBRTdEOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFNBQUcsTUFBTSx3QkFBeUIsU0FBUSxzQkFBc0I7UUFjNUU7Ozs7Ozs7O1dBUUc7UUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1lBQ3ZCLEtBQUssQ0FDSCxXQUFXLENBQ1Q7Z0JBQ0UsSUFBSSxFQUFFLHNCQUFzQjtnQkFDNUIsRUFBRSxFQUFFLDBCQUEwQjthQUMvQixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUFDSixDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDSCxHQUFHLENBQUMsU0FBUyxFQUFFLFFBQVE7WUFDckIsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO2dCQUM5RCxZQUFZLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNsQyxlQUFlLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUVyQyxrQkFBa0I7Z0JBQ2xCLGVBQWUsQ0FDYixXQUFXLENBQ1Q7b0JBQ0UsSUFBSSxFQUFFLGFBQWE7b0JBQ25CLFFBQVEsRUFBRSxTQUFTLENBQUMsUUFBUTtvQkFDNUIsU0FBUyxFQUFFLFNBQVMsQ0FBQyxTQUFTO29CQUM5QixTQUFTLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQztvQkFDbkMsVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7b0JBQ25DLGFBQWEsRUFBRSxFQUFFO29CQUNqQixXQUFXLEVBQUUsRUFBRTtvQkFDZixVQUFVLEVBQUUsRUFBRTtvQkFDZCxVQUFVLEVBQUUsR0FBRztvQkFDZixLQUFLLEVBQUUsU0FBUztvQkFDaEIsT0FBTyxFQUFFLFNBQVM7b0JBQ2xCLFNBQVMsRUFBRSxTQUFTO29CQUNwQixRQUFRLEVBQUUsSUFBSTtvQkFDZCxHQUFHLEVBQUUsR0FBRztvQkFDUixNQUFNLEVBQUUsTUFBTTtvQkFDZCxRQUFRLEVBQUUsSUFBSTtpQkFDZixFQUNELG1CQUFtQixDQUNwQixDQUNGLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7b0JBQ2pCLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDckIsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUEsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztLQUNGO0lBNUVDOzs7Ozs7OztPQVFHO0lBQ0ksYUFBVSxHQUFHO1FBQ2xCLElBQUksRUFBRSwwQkFBMEI7S0FDaEM7T0FpRUgsQ0FBQyJ9