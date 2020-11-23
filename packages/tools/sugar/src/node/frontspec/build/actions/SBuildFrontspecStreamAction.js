"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SActionsStreamAction_1 = __importDefault(require("../../../stream/SActionsStreamAction"));
const deepMerge_1 = __importDefault(require("../../../object/deepMerge"));
const SBuildFrontspecInterface_1 = __importDefault(require("../interface/SBuildFrontspecInterface"));
const SFrontspec_1 = __importDefault(require("../../SFrontspec"));
const packageRoot_1 = __importDefault(require("../../../path/packageRoot"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * @name                SBuildFrontspecStreamAction
 * @namespace           sugar.node.build.scss.actions
 * @type                Class
 * @extends             SActionsStreamAction
 *
 * This function is responsible of rendering the sass string in the "data" property
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SBuildFrontspecStreamAction extends SActionsStreamAction_1.default {
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
        super(deepMerge_1.default({
            name: 'Build Frontspec',
            id: 'SBuildFrontspecStreamAction'
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
        return super.run(streamObj, async (resolve, reject, trigger, cancel) => {
            // compile using the SScssCompiler class
            if (!streamObj.outputStack)
                streamObj.outputStack = {};
            const frontspec = new SFrontspec_1.default({
                filename: streamObj.filename,
                outputDir: streamObj.outputDir,
                dirDepth: streamObj.dirDepth,
                cache: streamObj.cache
            });
            const promise = frontspec.json();
            promise.catch((e) => {
                reject(e);
            });
            const json = await promise;
            // set in the package.json the "frontspec" property
            const packageJsonPath = `${packageRoot_1.default()}/package.json`;
            if (fs_1.default.existsSync(packageJsonPath)) {
                const json = JSON.parse(fs_1.default.readFileSync(packageJsonPath, 'utf8'));
                json.frontspec = path_1.default.relative(packageRoot_1.default(), `${streamObj.outputDir}/${streamObj.filename}`);
                fs_1.default.writeFileSync(packageJsonPath, JSON.stringify(json, null, 4));
            }
            // set in output stack
            streamObj.data = json;
            streamObj.outputStack.data = `${streamObj.outputDir}/${streamObj.filename}`;
            resolve(streamObj);
        });
    }
}
exports.default = SBuildFrontspecStreamAction;
/**
 * @name            interface
 * @type             Object
 * @static
 *
 * Store the definition object that specify the streamObj required properties, types, etc...
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SBuildFrontspecStreamAction.interface = SBuildFrontspecInterface_1.default;
