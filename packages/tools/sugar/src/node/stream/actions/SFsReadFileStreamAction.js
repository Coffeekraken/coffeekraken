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
module.exports = (_a = class SFsReadFileStreamAction extends SActionsStreamAction_1.default {
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
    _a.interfaces = {
        this: SFsReadFileStreamActionInterface
    },
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZzUmVhZEZpbGVTdHJlYW1BY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRnNSZWFkRmlsZVN0cmVhbUFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFFZCxtRkFBNkQ7QUFDN0QsNENBQXNCO0FBQ3RCLG1FQUErQztBQUMvQyx1RUFBaUQ7QUFDakQsd0VBQWtEO0FBRWxELE1BQU0sZ0NBQWlDLFNBQVEsb0JBQVk7O0FBQ2xELDJDQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsWUFBWSxFQUFFO1FBQ1osSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsS0FBSztRQUNmLE9BQU8sRUFBRSxNQUFNO0tBQ2hCO0NBQ0YsQ0FBQztBQXNCSix1QkFBUyxNQUFNLHVCQUF3QixTQUFRLDhCQUFzQjtRQWNuRTs7Ozs7Ozs7V0FRRztRQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7WUFDdkIsS0FBSyxDQUNILG1CQUFXLENBQ1Q7Z0JBQ0UsRUFBRSxFQUFFLGlDQUFpQzthQUN0QyxFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUFDSixDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDSCxHQUFHLENBQUMsU0FBUyxFQUFFLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUztZQUN0QyxPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtnQkFDeEQsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztvQkFDbkMsTUFBTSxJQUFJLEtBQUssQ0FDYix5RUFBeUUsU0FBUyw0QkFBNEIsQ0FDL0csQ0FBQztnQkFFSixJQUFJLG1CQUFhLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztvQkFBRSxPQUFPLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFFOUQsU0FBUyxDQUNQLFNBQVMsQ0FBQyxZQUFZO29CQUNwQix1QkFBdUIsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FDMUQsR0FBRyxZQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBRS9DLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNyQixDQUFDLENBQUEsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztLQUNGO0lBM0RDOzs7Ozs7OztPQVFHO0lBQ0ksYUFBVSxHQUFHO1FBQ2xCLElBQUksRUFBRSxnQ0FBZ0M7S0FDdEM7UUFnREYifQ==