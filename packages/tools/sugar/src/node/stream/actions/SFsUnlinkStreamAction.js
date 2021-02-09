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
/**
 * @name            SFsUnlinkStreamAction
 * @namespace           sugar.node.stream.actions
 * @type            Class
 * @extends         SActionsStreamAction
 * @status              beta
 *
 * This class is an action that allows you to delete some files / folders depending on the "unlink" property of the streamObj.
 * You can specify some glob patterns if you want
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @see       https://www.npmjs.com/package/rimraf
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SFsUnlinkStreamAction extends SActionsStreamAction_1.default {
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
}
exports.default = SFsUnlinkStreamAction;
/**
 * @name            interface
 * @type             Object
 * @static
 *
 * Store the definition object that specify the streamObj required properties, types, etc...
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SFsUnlinkStreamAction.interfaces = {
    this: SFsUnlinkStreamActionInterface
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZzVW5saW5rU3RyZWFtQWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0ZzVW5saW5rU3RyZWFtQWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLG1GQUE2RDtBQUM3RCxvREFBOEI7QUFDOUIsdUVBQWlEO0FBQ2pELHdFQUFrRDtBQUVsRCxNQUFNLDhCQUErQixTQUFRLG9CQUFZOztBQUNoRCx5Q0FBVSxHQUFHO0lBQ2xCLE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDZjtDQUNGLENBQUM7QUFHSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFDSCxNQUFxQixxQkFBc0IsU0FBUSw4QkFBc0I7SUFjdkU7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1FBQ3ZCLEtBQUssQ0FDSCxtQkFBVyxDQUNUO1lBQ0UsRUFBRSxFQUFFLCtCQUErQjtTQUNwQyxFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxHQUFHLENBQUMsU0FBUyxFQUFFLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUztRQUN0QyxPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtZQUN4RCxnQkFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDaEMsT0FBTyxTQUFTLENBQUMsTUFBTSxDQUFDO1lBQ3hCLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyQixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7QUFqREgsd0NBa0RDO0FBakRDOzs7Ozs7OztHQVFHO0FBQ0ksZ0NBQVUsR0FBRztJQUNsQixJQUFJLEVBQUUsOEJBQThCO0NBQ3JDLENBQUMifQ==