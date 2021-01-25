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
const rimraf_1 = __importDefault(require("rimraf"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SInterface_1 = __importDefault(require("../../class/SInterface"));
class SFsUnlinkStreamActionInterface extends SInterface_1.default {
}
SFsUnlinkStreamActionInterface.definition = {
    unlink: {
        type: 'String',
        required: true
    }
};
module.exports = (_a = class SFsUnlinkStreamAction extends SActionsStreamAction_1.default {
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
                id: 'actionStream.action.fs.unlink'
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
                rimraf_1.default.sync(streamObj.unlink);
                delete streamObj.unlink;
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
        this: SFsUnlinkStreamActionInterface
    },
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZzVW5saW5rU3RyZWFtQWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0ZzVW5saW5rU3RyZWFtQWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLG1GQUE2RDtBQUM3RCxvREFBOEI7QUFDOUIsdUVBQWlEO0FBQ2pELHdFQUFrRDtBQUVsRCxNQUFNLDhCQUErQixTQUFRLG9CQUFZOztBQUNoRCx5Q0FBVSxHQUFHO0lBQ2xCLE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDZjtDQUNGLENBQUM7QUF3QkosdUJBQVMsTUFBTSxxQkFBc0IsU0FBUSw4QkFBc0I7UUFjakU7Ozs7Ozs7O1dBUUc7UUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1lBQ3ZCLEtBQUssQ0FDSCxtQkFBVyxDQUNUO2dCQUNFLEVBQUUsRUFBRSwrQkFBK0I7YUFDcEMsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1FBQ0osQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0gsR0FBRyxDQUFDLFNBQVMsRUFBRSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVM7WUFDdEMsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7Z0JBQ3hELGdCQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDaEMsT0FBTyxTQUFTLENBQUMsTUFBTSxDQUFDO2dCQUN4QixPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDckIsQ0FBQyxDQUFBLENBQUMsQ0FBQztRQUNMLENBQUM7S0FDRjtJQWpEQzs7Ozs7Ozs7T0FRRztJQUNJLGFBQVUsR0FBRztRQUNsQixJQUFJLEVBQUUsOEJBQThCO0tBQ3BDO1FBc0NGIn0=