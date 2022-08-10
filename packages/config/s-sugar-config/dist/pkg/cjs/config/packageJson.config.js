"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonSync_1 = __importDefault(require("@coffeekraken/sugar/node/package/jsonSync"));
function default_1(api) {
    if (api.env.platform !== 'node')
        return;
    return (0, jsonSync_1.default)();
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEseUZBQXNFO0FBRXRFLG1CQUF5QixHQUFHO0lBQ3hCLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFDeEMsT0FBTyxJQUFBLGtCQUFhLEdBQUUsQ0FBQztBQUMzQixDQUFDO0FBSEQsNEJBR0MifQ==