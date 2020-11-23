"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SActionsStreamAction_1 = __importDefault(require("../SActionsStreamAction"));
const json_1 = __importDefault(require("../../package/json"));
const removeSync_1 = __importDefault(require("../../fs/removeSync"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SInterface_1 = __importDefault(require("../../class/SInterface"));
class SExtractDocblocksIntoFilesInterface extends SInterface_1.default {
}
SExtractDocblocksIntoFilesInterface.definitionObj = {
    outputStack: {
        type: 'Object<String>',
        required: true
    },
    outputDir: {
        type: 'String',
        required: true
    }
};
/**
 * @name            SExtractDocblocksIntoFiles
 * @namespace           sugar.node.stream.actions
 * @type            Class
 * @extends         SActionsStreamAction
 *
 * This actions allows you to extract the docblocks into separated files depending on their "namespace" tag
 *
 * @param       {Object}        [settings={}]          A settings object to configure your action
 * - sourceProp ('data') {String}: Specify the source property you want to extract data from
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SExtractDocblocksIntoFiles extends SActionsStreamAction_1.default {
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
            id: 'actionStream.action.extractDocblocksIntoFiles',
            sourceProp: 'data'
        }, settings));
        this.constructor.definitionObj = {
            ...this.constructor.definitionObj,
            [this._settings.sourceProp]: {
                type: 'String',
                required: true
            }
        };
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
        return super.run(streamObj, async (resolve, reject) => {
            const reg = /(<!--|\/\*{2})([\s\S]+?)(\*\/|-->)/g;
            const blocks = streamObj[settings.sourceProp].match(reg);
            streamObj.extractDocblocksIntoFiles = {};
            let currentNamespace = null;
            removeSync_1.default(`${streamObj.outputDir}/doc`);
            const packageJson = json_1.default();
            const packageName = packageJson.name.split('/').slice(-1)[0];
            blocks.forEach((block, i) => {
                const namespaceReg = /\s?@namespace\s{1,9999999}([a-zA-Z0-9_.-]+)\s/gm;
                const namespaceMatches = block.match(namespaceReg);
                const nameReg = /\s?@name\s{1,9999999}([a-zA-Z0-9_.-]+)\s/gm;
                const nameMatches = block.match(nameReg);
                let namespace = namespaceMatches ? namespaceMatches[0] : null;
                let name = nameMatches ? nameMatches[0] : null;
                if (!namespace || !name)
                    return;
                namespace = namespace.replace('@namespace', '').trim();
                name = name.replace('@name', '').trim();
                const fullName = `${namespace}.${name}`.split('.').join('/');
                const packageNameReg = new RegExp(`^${packageName}.`, 'gm');
                if (!fullName.match(packageNameReg))
                    return;
                if (!streamObj.extractDocblocksIntoFiles[fullName])
                    streamObj.extractDocblocksIntoFiles[fullName] = '';
                streamObj.extractDocblocksIntoFiles[fullName] += `\n\n${block}`;
                streamObj.outputStack[`extractDocblocksIntoFiles.${fullName}`] = `${streamObj.outputDir}/doc/${fullName}.css`;
            });
            resolve(streamObj);
        });
    }
}
exports.default = SExtractDocblocksIntoFiles;
/**
 * @name            definitionObj
 * @type             Object
 * @static
 *
 * Store the definition object that specify the streamObj required properties, types, etc...
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SExtractDocblocksIntoFiles.interface = SExtractDocblocksIntoFilesInterface;
