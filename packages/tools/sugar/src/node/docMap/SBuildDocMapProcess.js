"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SProcess_1 = __importDefault(require("../process/SProcess"));
const SDocMapSettingsInterface_1 = __importDefault(require("./interface/SDocMapSettingsInterface"));
const SDocMap_1 = __importDefault(require("./SDocMap"));
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
        const docMap = new SDocMap_1.default(Object.assign({}, params));
        const promise = docMap.save();
        return promise;
    }
}
SBuildDocMapProcess.interfaces = {
    params: {
        class: SDocMapSettingsInterface_1.default
    }
};
exports.default = SBuildDocMapProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0J1aWxkRG9jTWFwUHJvY2Vzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNCdWlsZERvY01hcFByb2Nlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBR2QsbUVBQTZDO0FBQzdDLG9HQUE4RTtBQUM5RSx3REFBa0M7QUFFbEM7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sbUJBQW9CLFNBQVEsa0JBQVU7SUFPMUM7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLGFBQWEsR0FBRyxFQUFFLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDM0MsS0FBSyxDQUFDLGFBQWEsa0JBQ2pCLEVBQUUsRUFBRSxxQkFBcUIsRUFDekIsSUFBSSxFQUFFLDJCQUEyQixJQUM5QixRQUFRLEVBQ1gsQ0FBQztJQUNMLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxPQUFPLENBQUMsTUFBTSxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQzNCLE1BQU0sTUFBTSxHQUFHLElBQUksaUJBQVMsbUJBQ3ZCLE1BQU0sRUFDVCxDQUFDO1FBQ0gsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzlCLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7O0FBMUNNLDhCQUFVLEdBQUc7SUFDbEIsTUFBTSxFQUFFO1FBQ04sS0FBSyxFQUFFLGtDQUEwQjtLQUNsQztDQUNGLENBQUM7QUF5Q0osa0JBQWUsbUJBQW1CLENBQUMifQ==