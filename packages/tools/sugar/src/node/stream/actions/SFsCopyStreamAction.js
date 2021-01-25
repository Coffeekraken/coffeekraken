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
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SInterface_1 = __importDefault(require("../../class/SInterface"));
const ncp_1 = require("ncp");
class SFsCopyStreamActionInterface extends SInterface_1.default {
}
SFsCopyStreamActionInterface.definition = {
    input: {
        type: 'String',
        required: true
    },
    outputDir: {
        type: 'String',
        required: true
    }
};
module.exports = (_a = class SFsCopyStreamAction extends SActionsStreamAction_1.default {
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
                id: 'actionStream.action.fs.copy'
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
                ncp_1.ncp(streamObj.input, streamObj.outputDir, (e) => {
                    if (e)
                        return reject(e);
                    resolve(streamObj);
                });
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
        this: SFsCopyStreamActionInterface
    },
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZzQ29weVN0cmVhbUFjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNGc0NvcHlTdHJlYW1BY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7O0FBRWQsbUZBQTZEO0FBQzdELHVFQUFpRDtBQUNqRCx3RUFBa0Q7QUFDbEQsNkJBQW1DO0FBRW5DLE1BQU0sNEJBQTZCLFNBQVEsb0JBQVk7O0FBQzlDLHVDQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtLQUNmO0NBQ0YsQ0FBQztBQXNCSix1QkFBUyxNQUFNLG1CQUFvQixTQUFRLDhCQUFzQjtRQWMvRDs7Ozs7Ozs7V0FRRztRQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7WUFDdkIsS0FBSyxDQUNILG1CQUFXLENBQ1Q7Z0JBQ0UsRUFBRSxFQUFFLDZCQUE2QjthQUNsQyxFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUFDSixDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDSCxHQUFHLENBQUMsU0FBUyxFQUFFLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUztZQUN0QyxPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtnQkFDeEQsU0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO29CQUNoRCxJQUFJLENBQUM7d0JBQUUsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hCLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDckIsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUEsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztLQUNGO0lBbERDOzs7Ozs7OztPQVFHO0lBQ0ksYUFBVSxHQUFHO1FBQ2xCLElBQUksRUFBRSw0QkFBNEI7S0FDbEM7UUF1Q0YifQ==