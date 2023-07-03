"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const is_1 = require("@coffeekraken/sugar/is");
function myProcess(params) {
    return new s_promise_1.default(({ resolve }) => {
        setTimeout(() => {
            resolve(Object.assign({ state: 'success', isChildProcess: (0, is_1.__isChildProcess)() }, params));
        }, 100);
    });
}
exports.default = myProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0VBQWlEO0FBQ2pELCtDQUEwRDtBQUUxRCxTQUF3QixTQUFTLENBQUMsTUFBTTtJQUNwQyxPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtRQUNsQyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ1osT0FBTyxpQkFDSCxLQUFLLEVBQUUsU0FBUyxFQUNoQixjQUFjLEVBQUUsSUFBQSxxQkFBZ0IsR0FBRSxJQUMvQixNQUFNLEVBQ1gsQ0FBQztRQUNQLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNaLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQVZELDRCQVVDIn0=