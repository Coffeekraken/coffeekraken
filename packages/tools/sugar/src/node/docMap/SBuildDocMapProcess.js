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
const SPromise_1 = __importDefault(require("../promise/SPromise"));
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
        return new SPromise_1.default(({ resolve, pipe }) => __awaiter(this, void 0, void 0, function* () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0J1aWxkRG9jTWFwUHJvY2Vzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNCdWlsZERvY01hcFByb2Nlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7O0FBR2QsbUVBQTZDO0FBQzdDLG9HQUE4RTtBQUM5RSx3REFBa0M7QUFDbEMsbUVBQTZDO0FBRTdDOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLG1CQUFvQixTQUFRLGtCQUFVO0lBTzFDOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxhQUFhLEdBQUcsRUFBRSxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQzNDLEtBQUssQ0FBQyxhQUFhLGtCQUNqQixFQUFFLEVBQUUscUJBQXFCLEVBQ3pCLElBQUksRUFBRSwyQkFBMkIsSUFDOUIsUUFBUSxFQUNYLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsT0FBTyxDQUFDLE1BQU0sRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUMzQixPQUFPLElBQUksa0JBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDaEQsTUFBTSxNQUFNLEdBQUcsSUFBSSxpQkFBUyxDQUFDO2dCQUMzQixNQUFNLEVBQUUsTUFBTTthQUNmLENBQUMsQ0FBQztZQUNILE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQzNCLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDTCxDQUFDOztBQTVDTSw4QkFBVSxHQUFHO0lBQ2xCLE1BQU0sRUFBRTtRQUNOLEtBQUssRUFBRSxrQ0FBMEI7S0FDbEM7Q0FDRixDQUFDO0FBMkNKLGtCQUFlLG1CQUFtQixDQUFDIn0=