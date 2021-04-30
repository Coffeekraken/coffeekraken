"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_process_1 = __importDefault(require("@coffeekraken/s-process"));
const SFrontstack_1 = __importDefault(require("../SFrontstack"));
const SFrontstackStartInterface_1 = __importDefault(require("./interface/SFrontstackStartInterface"));
function start(stringArgs = '') {
    const frontstack = new SFrontstack_1.default();
    const pro = s_process_1.default.from(frontstack.start.bind(frontstack), {
        process: {
            interface: SFrontstackStartInterface_1.default
        }
    });
    pro.run(stringArgs);
}
exports.default = start;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0VBQWlEO0FBQ2pELGlFQUEyQztBQUMzQyxzR0FBZ0Y7QUFFaEYsU0FBd0IsS0FBSyxDQUFDLFVBQVUsR0FBRyxFQUFFO0lBQzNDLE1BQU0sVUFBVSxHQUFHLElBQUkscUJBQWEsRUFBRSxDQUFDO0lBQ3ZDLE1BQU0sR0FBRyxHQUFHLG1CQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQzdELE9BQU8sRUFBRTtZQUNQLFNBQVMsRUFBRSxtQ0FBMkI7U0FDdkM7S0FDRixDQUFDLENBQUM7SUFDSCxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3RCLENBQUM7QUFSRCx3QkFRQyJ9