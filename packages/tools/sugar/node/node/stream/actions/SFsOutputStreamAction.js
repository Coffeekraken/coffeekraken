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
const writeFile_1 = __importDefault(require("../../fs/writeFile"));
const toString_1 = __importDefault(require("../../string/toString"));
const packageRoot_1 = __importDefault(require("../../path/packageRoot"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const get_1 = __importDefault(require("../../object/get"));
const SInterface_1 = __importDefault(require("../../class/SInterface"));
class SFsOutputStreamActionInterface extends SInterface_1.default {
}
SFsOutputStreamActionInterface.definition = {
    outputStack: {
        type: 'Object',
        required: false
    }
};
/**
 * @name            SFsOutputStreamAction
 * @namespace           sugar.node.stream.actions
 * @type            Class
 * @extends         SActionsStreamAction
 * @status              beta
 *
 * This class is a stream action that allows you to save file(s) to the filesystem
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SFsOutputStreamAction extends SActionsStreamAction_1.default {
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
            id: 'actionStream.action.fs.output'
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
    run(streamObj, settings = this._settings) {
        return super.run(streamObj, ({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            if (!streamObj.outputStack || typeof streamObj.outputStack !== 'object') {
                this.warn(`The streamObj does not contain any "<cyan>outputStack</cyan>" property so no file will be saved at all...`);
                return resolve(streamObj);
            }
            // loop on the files to save
            const outputStackKeys = Object.keys(streamObj.outputStack);
            for (let i = 0; i < outputStackKeys.length; i++) {
                const key = outputStackKeys[i];
                const outputPath = streamObj.outputStack[key];
                const readableOutputPath = outputPath.replace(packageRoot_1.default(process.cwd()), '');
                if (!get_1.default(streamObj, key))
                    continue;
                yield writeFile_1.default(outputPath, toString_1.default(get_1.default(streamObj, key), {
                    beautify: true
                }));
            }
            resolve(streamObj);
        }));
    }
}
exports.default = SFsOutputStreamAction;
/**
 * @name            interface
 * @type             Object
 * @static
 *
 * Store the definition object that specify the streamObj required properties, types, etc...
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SFsOutputStreamAction.interfaces = {
    this: SFsOutputStreamActionInterface
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZzT3V0cHV0U3RyZWFtQWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL25vZGUvc3RyZWFtL2FjdGlvbnMvU0ZzT3V0cHV0U3RyZWFtQWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLG1GQUE2RDtBQUM3RCxtRUFBNkM7QUFDN0MscUVBQStDO0FBQy9DLHlFQUFtRDtBQUNuRCx1RUFBaUQ7QUFDakQsMkRBQXFDO0FBQ3JDLHdFQUFrRDtBQUVsRCxNQUFNLDhCQUErQixTQUFRLG9CQUFZOztBQUNoRCx5Q0FBVSxHQUFHO0lBQ2xCLFdBQVcsRUFBRTtRQUNYLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLEtBQUs7S0FDaEI7Q0FDRixDQUFDO0FBR0o7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBQ0gsTUFBcUIscUJBQXNCLFNBQVEsOEJBQXNCO0lBY3ZFOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxRQUFRLEdBQUcsRUFBRTtRQUN2QixLQUFLLENBQ0gsbUJBQVcsQ0FDVDtZQUNFLEVBQUUsRUFBRSwrQkFBK0I7U0FDcEMsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsR0FBRyxDQUFDLFNBQVMsRUFBRSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVM7UUFDdEMsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQzlELElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxJQUFJLE9BQU8sU0FBUyxDQUFDLFdBQVcsS0FBSyxRQUFRLEVBQUU7Z0JBQ3ZFLElBQUksQ0FBQyxJQUFJLENBQ1AsMkdBQTJHLENBQzVHLENBQUM7Z0JBQ0YsT0FBTyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDM0I7WUFFRCw0QkFBNEI7WUFDNUIsTUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFM0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQy9DLE1BQU0sR0FBRyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0IsTUFBTSxVQUFVLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDOUMsTUFBTSxrQkFBa0IsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUMzQyxxQkFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUM1QixFQUFFLENBQ0gsQ0FBQztnQkFDRixJQUFJLENBQUMsYUFBSyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUM7b0JBQUUsU0FBUztnQkFDckMsTUFBTSxtQkFBVyxDQUNmLFVBQVUsRUFDVixrQkFBVSxDQUFDLGFBQUssQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLEVBQUU7b0JBQ2hDLFFBQVEsRUFBRSxJQUFJO2lCQUNmLENBQUMsQ0FDSCxDQUFDO2FBQ0g7WUFFRCxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNMLENBQUM7O0FBekVILHdDQTBFQztBQXpFQzs7Ozs7Ozs7R0FRRztBQUNJLGdDQUFVLEdBQUc7SUFDbEIsSUFBSSxFQUFFLDhCQUE4QjtDQUNyQyxDQUFDIn0=