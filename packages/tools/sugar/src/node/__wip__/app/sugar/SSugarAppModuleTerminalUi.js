"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blessed_1 = __importDefault(require("blessed"));
const SBlessedComponent_1 = __importDefault(require("../../blessed/SBlessedComponent"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SBlessedOutput_1 = __importDefault(require("../../blessed/SBlessedOutput"));
const parseHtml_1 = __importDefault(require("../../terminal/parseHtml"));
/**
 * @name            SSugarAppModuleTerminalUi
 * @namespace       sugar.node.app.sugar
 * @type            Class
 * @extends         SBlessedComponent
 * @wip
 *
 * This class represent the main one to create some UI that fit in the SSugarAppTerminalUi
 * based terminal interface
 *
 * @param           {Object}        [settings={}]           An object of settings to configure your terminal interface
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import SSugarAppModuleTerminalUi from '@coffeekraken/sugar/node/app/sugar/SSugarAppModuleTerminalUi';
 * class MyUi extends SSugarAppModuleTerminalUi {
 *      constructor(settings = {}) {
 *          super(settings);
 *      }
 * }
 *
 * @since           2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SSugarAppModuleTerminalUi extends SBlessedComponent_1.default {
    /**
     * @name        constructor
     * @type         Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(sources, settings = {}) {
        super(deepMerge_1.default({
            filter: null,
            width: '100%',
            height: '100%',
            style: {
                bg: 'yellow'
            }
        }, settings));
        // init the log component
        this.$log = new SBlessedOutput_1.default(sources, {
            filter: this._settings.filter,
            width: '100%',
            height: '100%'
        });
        this.append(this.$log);
        // shortcuts
        if (settings.shortcuts) {
            let shortcutsArray = [];
            Object.keys(settings.shortcuts).forEach((shortcut) => {
                const shortcutObj = settings.shortcuts[shortcut];
                shortcutsArray.push(` ${shortcutObj.name} <yellow>${shortcut}</yellow> `);
            });
            this.$log.height = '100%-1';
            this.$shortcuts = blessed_1.default.box({
                width: '100%',
                height: 1,
                top: '100%-1',
                style: {
                    bg: 'black',
                    fg: 'white'
                },
                content: parseHtml_1.default(shortcutsArray.join('|'))
            });
            this.append(this.$shortcuts);
        }
    }
    /**
     * @name          log
     * @type          Function
     *
     * This is an alias of the this.$log.log SBlessedOutput method
     *
     * @since       2.0.0
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    log(...args) {
        this.$log.log(...args);
    }
}
exports.default = SSugarAppModuleTerminalUi;
//# sourceMappingURL=SSugarAppModuleTerminalUi.js.map