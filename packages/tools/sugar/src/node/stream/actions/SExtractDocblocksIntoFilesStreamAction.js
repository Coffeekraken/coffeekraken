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
    _a.interfaces = {
        this: SExtractDocblocksIntoFilesInterface
    },
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0V4dHJhY3REb2NibG9ja3NJbnRvRmlsZXNTdHJlYW1BY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRXh0cmFjdERvY2Jsb2Nrc0ludG9GaWxlc1N0cmVhbUFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFFZCxtRkFBNkQ7QUFFN0QsOERBQStDO0FBRS9DLHFFQUErQztBQUUvQyx1RUFBaUQ7QUFHakQsd0VBQWtEO0FBRWxELE1BQU0sbUNBQW9DLFNBQVEsb0JBQVk7O0FBQ3JELDhDQUFVLEdBQUc7SUFDbEIsV0FBVyxFQUFFO1FBQ1gsSUFBSSxFQUFFLGdCQUFnQjtRQUN0QixRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtLQUNmO0NBQ0YsQ0FBQztBQXVCSix1QkFBUyxNQUFNLDBCQUEyQixTQUFRLDhCQUFzQjtRQWN0RTs7Ozs7Ozs7V0FRRztRQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7WUFDdkIsS0FBSyxDQUNILG1CQUFXLENBQ1Q7Z0JBQ0UsRUFBRSxFQUFFLCtDQUErQztnQkFDbkQsVUFBVSxFQUFFLE1BQU07YUFDbkIsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1lBQ0YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLG1DQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsS0FDOUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFO29CQUMzQixJQUFJLEVBQUUsUUFBUTtvQkFDZCxRQUFRLEVBQUUsSUFBSTtpQkFDZixHQUNGLENBQUM7UUFDSixDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDSCxHQUFHLENBQUMsU0FBUyxFQUFFLFFBQVE7WUFDckIsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0s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