"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_process_1 = __importDefault(require("@coffeekraken/s-process"));
const SFrontstack_1 = __importDefault(require("../SFrontstack"));
const SFrontstackViteInterface_1 = __importDefault(require("./interface/SFrontstackViteInterface"));
function start(stringArgs = '') {
    const frontstack = new SFrontstack_1.default();
    const pro = s_process_1.default.from(frontstack.vite.bind(frontstack), {
        process: {
            interface: SFrontstackViteInterface_1.default
        }
    });
    pro.run(stringArgs);
}
exports.default = start;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidml0ZS5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2aXRlLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdFQUFpRDtBQUNqRCxpRUFBMkM7QUFDM0Msb0dBQThFO0FBRTlFLFNBQXdCLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRTtJQUMzQyxNQUFNLFVBQVUsR0FBRyxJQUFJLHFCQUFhLEVBQUUsQ0FBQztJQUN2QyxNQUFNLEdBQUcsR0FBRyxtQkFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUM1RCxPQUFPLEVBQUU7WUFDUCxTQUFTLEVBQUUsa0NBQTBCO1NBQ3RDO0tBQ0YsQ0FBQyxDQUFDO0lBQ0gsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN0QixDQUFDO0FBUkQsd0JBUUMifQ==