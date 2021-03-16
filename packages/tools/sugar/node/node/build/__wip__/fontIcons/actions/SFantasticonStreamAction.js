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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZhbnRhc3RpY29uU3RyZWFtQWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL25vZGUvYnVpbGQvX193aXBfXy9mb250SWNvbnMvYWN0aW9ucy9TRmFudGFzdGljb25TdHJlYW1BY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7Ozs7Ozs7O0FBRWQsTUFBTSxzQkFBc0IsR0FBRyxPQUFPLENBQUMsc0NBQXNDLENBQUMsQ0FBQztBQUMvRSxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsMkJBQTJCLENBQUMsQ0FBQztBQUN6RCxNQUFNLDBCQUEwQixHQUFHLE9BQU8sQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO0FBQ3BGLE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUNoRCxNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsMkJBQTJCLENBQUMsQ0FBQztBQUM3RCxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUN2RCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQztBQUNsRCxNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsYUFBYSxDQUFDO0FBQzdELE1BQU0sbUJBQW1CLEdBQUcsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7QUFFN0Q7Ozs7Ozs7Ozs7OztHQVlHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sU0FBRyxNQUFNLHdCQUF5QixTQUFRLHNCQUFzQjtRQWM1RTs7Ozs7Ozs7V0FRRztRQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7WUFDdkIsS0FBSyxDQUNILFdBQVcsQ0FDVDtnQkFDRSxJQUFJLEVBQUUsc0JBQXNCO2dCQUM1QixFQUFFLEVBQUUsMEJBQTBCO2FBQy9CLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztRQUNKLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNILEdBQUcsQ0FBQyxTQUFTLEVBQUUsUUFBUTtZQUNyQixPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7Z0JBQzlELFlBQVksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ2xDLGVBQWUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBRXJDLGtCQUFrQjtnQkFDbEIsZUFBZSxDQUNiLFdBQVcsQ0FDVDtvQkFDRSxJQUFJLEVBQUUsYUFBYTtvQkFDbkIsUUFBUSxFQUFFLFNBQVMsQ0FBQyxRQUFRO29CQUM1QixTQUFTLEVBQUUsU0FBUyxDQUFDLFNBQVM7b0JBQzlCLFNBQVMsRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDO29CQUNuQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztvQkFDbkMsYUFBYSxFQUFFLEVBQUU7b0JBQ2pCLFdBQVcsRUFBRSxFQUFFO29CQUNmLFVBQVUsRUFBRSxFQUFFO29CQUNkLFVBQVUsRUFBRSxHQUFHO29CQUNmLEtBQUssRUFBRSxTQUFTO29CQUNoQixPQUFPLEVBQUUsU0FBUztvQkFDbEIsU0FBUyxFQUFFLFNBQVM7b0JBQ3BCLFFBQVEsRUFBRSxJQUFJO29CQUNkLEdBQUcsRUFBRSxHQUFHO29CQUNSLE1BQU0sRUFBRSxNQUFNO29CQUNkLFFBQVEsRUFBRSxJQUFJO2lCQUNmLEVBQ0QsbUJBQW1CLENBQ3BCLENBQ0YsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtvQkFDakIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNyQixDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQSxDQUFDLENBQUM7UUFDTCxDQUFDO0tBQ0Y7SUE1RUM7Ozs7Ozs7O09BUUc7SUFDSSxhQUFVLEdBQUc7UUFDbEIsSUFBSSxFQUFFLDBCQUEwQjtLQUNoQztPQWlFSCxDQUFDIn0=