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
Object.defineProperty(exports, "__esModule", { value: true });
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
/**
 * @name            SExtractDocblocksIntoFiles
 * @namespace           sugar.node.stream.actions
 * @type            Class
 * @extends         SActionsStreamAction
 * @status              wip
 *
 * This actions allows you to extract the docblocks into separated files depending on their "namespace" tag
 *
 * @param       {Object}        [settings={}]          A settings object to configure your action
 * - sourceProp ('data') {String}: Specify the source property you want to extract data from
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since     2.0.0
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
        return super.run(streamObj, ({ resolve, reject }) => __awaiter(this, void 0, void 0, function* () {
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
}
exports.default = SExtractDocblocksIntoFiles;
/**
 * @name            definition
 * @type             Object
 * @static
 *
 * Store the definition object that specify the streamObj required properties, types, etc...
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SExtractDocblocksIntoFiles.interfaces = {
    this: SExtractDocblocksIntoFilesInterface
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0V4dHJhY3REb2NibG9ja3NJbnRvRmlsZXNTdHJlYW1BY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbm9kZS9zdHJlYW0vYWN0aW9ucy9TRXh0cmFjdERvY2Jsb2Nrc0ludG9GaWxlc1N0cmVhbUFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFFZCxtRkFBNkQ7QUFFN0QsOERBQStDO0FBRS9DLHFFQUErQztBQUUvQyx1RUFBaUQ7QUFHakQsd0VBQWtEO0FBRWxELE1BQU0sbUNBQW9DLFNBQVEsb0JBQVk7O0FBQ3JELDhDQUFVLEdBQUc7SUFDbEIsV0FBVyxFQUFFO1FBQ1gsSUFBSSxFQUFFLGdCQUFnQjtRQUN0QixRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtLQUNmO0NBQ0YsQ0FBQztBQUdKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBQ0gsTUFBcUIsMEJBQTJCLFNBQVEsOEJBQXNCO0lBYzVFOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxRQUFRLEdBQUcsRUFBRTtRQUN2QixLQUFLLENBQ0gsbUJBQVcsQ0FDVDtZQUNFLEVBQUUsRUFBRSwrQ0FBK0M7WUFDbkQsVUFBVSxFQUFFLE1BQU07U0FDbkIsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1FBQ0YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLG1DQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsS0FDOUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUMzQixJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNmLEdBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILEdBQUcsQ0FBQyxTQUFTLEVBQUUsUUFBUTtRQUNyQixPQUFP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