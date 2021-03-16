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
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SInterface_1 = __importDefault(require("../../class/SInterface"));
const STestJestProcessManager_1 = __importDefault(require("../../test/jest/STestJestProcessManager"));
class SJestStreamActionInterface extends SInterface_1.default {
}
SJestStreamActionInterface.definition = {};
/**
 * @name            SJestStreamAction
 * @namespace           sugar.node.stream.actions
 * @type            Class
 * @extends         SActionsStreamAction
 * @status              wip
 *
 * This class is a stream action that allows you execute attached jest tests ([filename.test.js|__tests__/[filename].test.js])
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
class SJestStreamAction extends SActionsStreamAction_1.default {
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
            id: 'SJestStreamAction'
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
            // if (!streamObj.pack) return resolve(streamObj);
            const input = streamObj.updatedFilePath || streamObj.input;
            const jestProcess = new STestJestProcessManager_1.default({}, {
                deamon: null
            });
            const promise = jestProcess.run({
                input
            });
            //   promise.catch((e) => {
            //     reject(e);
            //   });
            const result = yield promise;
            // const cli = new __STestJestCli({
            // })
        }));
    }
}
exports.default = SJestStreamAction;
/**
 * @name            interface
 * @type             Object
 * @static
 *
 * Store the definition object that specify the streamObj required properties, types, etc...
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SJestStreamAction.interfaces = {
    this: SJestStreamActionInterface
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0plc3RTdHJlYW1BY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbm9kZS9zdHJlYW0vYWN0aW9ucy9TSmVzdFN0cmVhbUFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFFZCxtRkFBNkQ7QUFLN0QsdUVBQWlEO0FBQ2pELHdFQUFrRDtBQUVsRCxzR0FBeUU7QUFFekUsTUFBTSwwQkFBMkIsU0FBUSxvQkFBWTs7QUFDNUMscUNBQVUsR0FBRyxFQUFFLENBQUM7QUFHekI7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILE1BQXFCLGlCQUFrQixTQUFRLDhCQUFzQjtJQWNuRTs7Ozs7Ozs7T0FRRztJQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7UUFDdkIsS0FBSyxDQUNILG1CQUFXLENBQ1Q7WUFDRSxFQUFFLEVBQUUsbUJBQW1CO1NBQ3hCLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILEdBQUcsQ0FBQyxTQUFTLEVBQUUsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTO1FBQ3RDLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1lBQ3hELGtEQUFrRDtZQUVsRCxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsZUFBZSxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUM7WUFFM0QsTUFBTSxXQUFXLEdBQUcsSUFBSSxpQ0FBa0IsQ0FDeEMsRUFBRSxFQUNGO2dCQUNFLE1BQU0sRUFBRSxJQUFJO2FBQ2IsQ0FDRixDQUFDO1lBRUYsTUFBTSxPQUFPLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQztnQkFDOUIsS0FBSzthQUNOLENBQUMsQ0FBQztZQUNILDJCQUEyQjtZQUMzQixpQkFBaUI7WUFDakIsUUFBUTtZQUNSLE1BQU0sTUFBTSxHQUFHLE1BQU0sT0FBTyxDQUFDO1lBRTdCLG1DQUFtQztZQUVuQyxLQUFLO1FBQ1AsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNMLENBQUM7O0FBcEVILG9DQXFFQztBQXBFQzs7Ozs7Ozs7R0FRRztBQUNJLDRCQUFVLEdBQUc7SUFDbEIsSUFBSSxFQUFFLDBCQUEwQjtDQUNqQyxDQUFDIn0=