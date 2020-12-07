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
            return super.run(streamObj, (resolve, reject, trigger, cancel) => __awaiter(this, void 0, void 0, function* () {
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
    _a.interface = __BBuildFontIconsInterface,
    _a);
//# sourceMappingURL=SFantasticonStreamAction.js.map