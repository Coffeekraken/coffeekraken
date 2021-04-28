"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_process_1 = __importDefault(require("@coffeekraken/s-process"));
const SDocMap_1 = __importDefault(require("./SDocMap"));
const SDocMapGenerateParamsInterface_1 = __importDefault(require("./interface/SDocMapGenerateParamsInterface"));
exports.default = (stringArgs = '') => {
    const docmap = new SDocMap_1.default();
    const pro = s_process_1.default.from(docmap.generate.bind(docmap), {
        process: {
            interface: SDocMapGenerateParamsInterface_1.default
        }
    });
    pro.run(stringArgs);
    // const pro = new __SBuildDocMapProcess(
    //   {},
    //   {
    //     process: {
    //       stdio: 'inherit'
    //     }
    //   }
    // );
    // pro.run(stringArgs);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGUuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2VuZXJhdGUuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdFQUFpRDtBQUNqRCx3REFBa0M7QUFDbEMsZ0hBQTBGO0FBRTFGLGtCQUFlLENBQUMsVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQ2pDLE1BQU0sTUFBTSxHQUFHLElBQUksaUJBQVMsRUFBRSxDQUFDO0lBQy9CLE1BQU0sR0FBRyxHQUFHLG1CQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3hELE9BQU8sRUFBRTtZQUNQLFNBQVMsRUFBRSx3Q0FBZ0M7U0FDNUM7S0FDRixDQUFDLENBQUM7SUFDSCxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRXBCLHlDQUF5QztJQUN6QyxRQUFRO0lBQ1IsTUFBTTtJQUNOLGlCQUFpQjtJQUNqQix5QkFBeUI7SUFDekIsUUFBUTtJQUNSLE1BQU07SUFDTixLQUFLO0lBQ0wsdUJBQXVCO0FBQ3pCLENBQUMsQ0FBQyJ9