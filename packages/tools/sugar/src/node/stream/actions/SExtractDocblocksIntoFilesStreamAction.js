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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SActionsStreamAction_1 = __importDefault(require("../SActionsStreamAction"));
const json_1 = __importDefault(require("../../package/json"));
const removeSync_1 = __importDefault(require("../../fs/removeSync"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SInterface_1 = __importDefault(require("../../class/SInterface"));
class SExtractDocblocksIntoFilesInterface extends SInterface_1.default {
}
SExtractDocblocksIntoFilesInterface.definition = {
    outputStack: {
        type: 'Object<String>',
        required: true
    },
    outputDir: {
        type: 'String',
        required: true
    }
};
module.exports = (_a = class SExtractDocblocksIntoFiles extends SActionsStreamAction_1.default {
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
            this.constructor.definition = Object.assign(Object.assign({}, this.constructor.definition), { [this._settings.sourceProp]: {
                    type: 'String',
                    required: true
                } });
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
            return super.run(streamObj, (resolve, reject) => __awaiter(this, void 0, void 0, function* () {
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
            }));
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
    _a.interface = SExtractDocblocksIntoFilesInterface,
    _a);
