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
const fs_1 = __importDefault(require("fs"));
const directory_1 = __importDefault(require("../../is/directory"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SInterface_1 = __importDefault(require("../../class/SInterface"));
class SFsReadFileStreamActionInterface extends SInterface_1.default {
}
SFsReadFileStreamActionInterface.definition = {
    input: {
        type: 'String',
        required: true
    },
    dataProperty: {
        type: 'String',
        required: false,
        default: 'data'
    }
};
/**
 * @name            SFsReadFileStreamAction
 * @namespace           sugar.node.stream.actions
 * @type            Class
 * @extends         SActionsStreamAction
 * @status              beta
 *
 * This class is a stream action that allows you to read file(s) to the filesystem
 *
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
class SFsReadFileStreamAction extends SActionsStreamAction_1.default {
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
            id: 'actionStream.action.fs.readFile'
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
        return super.run(streamObj, ({ resolve, reject }) => __awaiter(this, void 0, void 0, function* () {
            if (!fs_1.default.existsSync(streamObj.input))
                throw new Error(`The given "<yellow>input</yellow>" streamObj file path property "<red>${streamObj}</red>" does not exists...`);
            if (directory_1.default(streamObj.input))
                return resolve(streamObj);
            streamObj[streamObj.dataProperty ||
                SFsReadFileStreamAction.definition.dataProperty.default] = fs_1.default.readFileSync(streamObj.input, 'utf8');
            resolve(streamObj);
        }));
    }
}
exports.default = SFsReadFileStreamAction;
/**
 * @name            interface
 * @type             Object
 * @static
 *
 * Store the definition object that specify the streamObj required properties, types, etc...
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SFsReadFileStreamAction.interfaces = {
    this: SFsReadFileStreamActionInterface
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZzUmVhZEZpbGVTdHJlYW1BY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbm9kZS9zdHJlYW0vYWN0aW9ucy9TRnNSZWFkRmlsZVN0cmVhbUFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFFZCxtRkFBNkQ7QUFDN0QsNENBQXNCO0FBQ3RCLG1FQUErQztBQUMvQyx1RUFBaUQ7QUFDakQsd0VBQWtEO0FBRWxELE1BQU0sZ0NBQWlDLFNBQVEsb0JBQVk7O0FBQ2xELDJDQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsWUFBWSxFQUFFO1FBQ1osSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsS0FBSztRQUNmLE9BQU8sRUFBRSxNQUFNO0tBQ2hCO0NBQ0YsQ0FBQztBQUdKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxNQUFxQix1QkFBd0IsU0FBUSw4QkFBc0I7SUFjekU7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1FBQ3ZCLEtBQUssQ0FDSCxtQkFBVyxDQUNUO1lBQ0UsRUFBRSxFQUFFLGlDQUFpQztTQUN0QyxFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxHQUFHLENBQUMsU0FBUyxFQUFFLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUztRQUN0QyxPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtZQUN4RCxJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO2dCQUNuQyxNQUFNLElBQUksS0FBSyxDQUNiLHlFQUF5RSxTQUFTLDRCQUE0QixDQUMvRyxDQUFDO1lBRUosSUFBSSxtQkFBYSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7Z0JBQUUsT0FBTyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFOUQsU0FBUyxDQUNQLFNBQVMsQ0FBQyxZQUFZO2dCQUNwQix1QkFBdUIsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FDMUQsR0FBRyxZQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFL0MsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDTCxDQUFDOztBQTNESCwwQ0E0REM7QUEzREM7Ozs7Ozs7O0dBUUc7QUFDSSxrQ0FBVSxHQUFHO0lBQ2xCLElBQUksRUFBRSxnQ0FBZ0M7Q0FDdkMsQ0FBQyJ9