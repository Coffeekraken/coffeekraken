"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_process_1 = __importDefault(require("@coffeekraken/s-process"));
const SFrontendServer_1 = __importDefault(require("./SFrontendServer"));
const SFrontendServerInterface_1 = __importDefault(require("./interface/SFrontendServerInterface"));
function start(stringArgs = '') {
    const server = new SFrontendServer_1.default();
    const pro = s_process_1.default.from(server.start.bind(server), {
        process: {
            interface: SFrontendServerInterface_1.default
        }
    });
    pro.run(stringArgs);
}
exports.default = start;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhcnQuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RhcnQuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0VBQWlEO0FBQ2pELHdFQUFrRDtBQUNsRCxvR0FBOEU7QUFFOUUsU0FBd0IsS0FBSyxDQUFDLFVBQVUsR0FBRyxFQUFFO0lBQzNDLE1BQU0sTUFBTSxHQUFHLElBQUkseUJBQWlCLEVBQUUsQ0FBQztJQUN2QyxNQUFNLEdBQUcsR0FBRyxtQkFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNyRCxPQUFPLEVBQUU7WUFDUCxTQUFTLEVBQUUsa0NBQTBCO1NBQ3RDO0tBQ0YsQ0FBQyxDQUFDO0lBQ0gsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN0QixDQUFDO0FBUkQsd0JBUUMifQ==