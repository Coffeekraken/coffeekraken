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
const SProcess_1 = __importDefault(require("../process/SProcess"));
const SDocMapSettingsInterface_1 = __importDefault(require("./interface/SDocMapSettingsInterface"));
const SDocMap_1 = __importDefault(require("./SDocMap"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
/**
 * @name            SBuildDocMapProcess
 * @namespace           sugar.node.build.docMap
 * @type            Class
 * @extends         SProcess
 *
 * This class represent the process that build the docMap.json file
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SBuildDocMapProcess extends SProcess_1.default {
    /**
     * @name          constructor
     * @type          Function
     * @constructor
     *
     * Constructor
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(initialParams = {}, settings = {}) {
        super(initialParams, Object.assign({ id: 'SBuildDocMapProcess', name: 'Build docMap.json Process' }, settings));
    }
    /**
     * @name              process
     * @type              Function
     *
     * Method that execute the actual process code
     *
     * @param       {Object}        params           The arguments object that will be passed to the underlined actions stream instance
     * @param       {Object}        [settings={}]     An object of settings passed to the ```start``` method of the ```SBuildScssActionsStream``` instance
     * @return      {Süromise}                        An SPomise instance representing the build process
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    process(params, settings = {}) {
        return new s_promise_1.default(({ resolve, pipe }) => __awaiter(this, void 0, void 0, function* () {
            const docMap = new SDocMap_1.default({
                docMap: params
            });
            yield pipe(docMap.build());
            resolve(yield pipe(docMap.save()));
        }));
    }
}
SBuildDocMapProcess.interfaces = {
    params: {
        class: SDocMapSettingsInterface_1.default
    }
};
exports.default = SBuildDocMapProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0J1aWxkRG9jTWFwUHJvY2Vzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ub2RlL2RvY01hcC9TQnVpbGREb2NNYXBQcm9jZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUdkLG1FQUE2QztBQUM3QyxvR0FBOEU7QUFDOUUsd0RBQWtDO0FBQ2xDLHdFQUFpRDtBQUVqRDs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBTSxtQkFBb0IsU0FBUSxrQkFBVTtJQU8xQzs7Ozs7Ozs7T0FRRztJQUNILFlBQVksYUFBYSxHQUFHLEVBQUUsRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUMzQyxLQUFLLENBQUMsYUFBYSxrQkFDakIsRUFBRSxFQUFFLHFCQUFxQixFQUN6QixJQUFJLEVBQUUsMkJBQTJCLElBQzlCLFFBQVEsRUFDWCxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE9BQU8sQ0FBQyxNQUFNLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDM0IsT0FBTyxJQUFJLG1CQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQ2hELE1BQU0sTUFBTSxHQUFHLElBQUksaUJBQVMsQ0FBQztnQkFDM0IsTUFBTSxFQUFFLE1BQU07YUFDZixDQUFDLENBQUM7WUFDSCxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUMzQixPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7QUE1Q00sOEJBQVUsR0FBRztJQUNsQixNQUFNLEVBQUU7UUFDTixLQUFLLEVBQUUsa0NBQTBCO0tBQ2xDO0NBQ0YsQ0FBQztBQTJDSixrQkFBZSxtQkFBbUIsQ0FBQyJ9