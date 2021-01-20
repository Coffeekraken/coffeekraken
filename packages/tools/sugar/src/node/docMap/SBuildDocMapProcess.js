"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const SProcess_1 = __importDefault(require("../process/SProcess"));
const SBuildDocMapInterface_1 = __importDefault(require("./interface/SBuildDocMapInterface"));
const SDocMap_1 = __importDefault(require("./SDocMap"));
/**
 * @name            SBuildDocMapProcess
 * @namespace           sugar.node.build.docMap
 * @type            Class
 * @extends         SProcess
 *
 * This class represent the process that build the docMap.json file
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = (_a = class SBuildDocMapProcess extends SProcess_1.default {
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
            super(Object.assign({ id: 'SBuildDocMapProcess', name: 'Build docMap.json Process' }, settings));
        }
        /**
         * @name              process
         * @type              Function
         *
         * Method that execute the actual process code
         *
         * @param       {Object}        params           The arguments object that will be passed to the underlined actions stream instance
         * @param       {Object}        [settings={}]     An object of settings passed to the ```start``` method of the ```SBuildScssActionsStream``` instance
         * @return      {Süromise}                        An SPomise instance representing the build process
         *
         * @since         2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        process(params, settings = {}) {
            const docMap = new SDocMap_1.default(Object.assign({}, params));
            const promise = docMap.save();
            return promise;
        }
    },
    _a.interfaces = {
        this: SBuildDocMapInterface_1.default
    },
    _a);
//# sourceMappingURL=SBuildDocMapProcess.js.map