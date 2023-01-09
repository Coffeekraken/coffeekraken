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
exports.loadDocmap = void 0;
const s_request_1 = __importDefault(require("@coffeekraken/s-request"));
const s_state_1 = require("@coffeekraken/s-state");
const state = new s_state_1.SStateManager({
    id: "ck-state",
    save: true,
});
exports.default = state;
let _docmap, _docmapPromise;
function loadDocmap() {
    return __awaiter(this, void 0, void 0, function* () {
        if (_docmap)
            return _docmap;
        if (_docmapPromise)
            return (yield _docmapPromise).data;
        const request = new s_request_1.default({
            url: `/docmap.json`,
            method: "GET",
        });
        const promise = request.send();
        _docmapPromise = promise;
        _docmap = (yield promise).data;
        return _docmap;
    });
}
exports.loadDocmap = loadDocmap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7QUFFZCx3RUFBaUQ7QUFDakQsbURBQXNEO0FBRXRELE1BQU0sS0FBSyxHQUFHLElBQUksdUJBQWEsQ0FBQztJQUM5QixFQUFFLEVBQUUsVUFBVTtJQUNkLElBQUksRUFBRSxJQUFJO0NBQ1gsQ0FBQyxDQUFDO0FBRUgsa0JBQWUsS0FBSyxDQUFDO0FBRXJCLElBQUksT0FBTyxFQUFFLGNBQWMsQ0FBQztBQUM1QixTQUFzQixVQUFVOztRQUM5QixJQUFJLE9BQU87WUFBRSxPQUFPLE9BQU8sQ0FBQztRQUM1QixJQUFJLGNBQWM7WUFBRSxPQUFPLENBQUMsTUFBTSxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFFdkQsTUFBTSxPQUFPLEdBQUcsSUFBSSxtQkFBVSxDQUFDO1lBQzdCLEdBQUcsRUFBRSxjQUFjO1lBQ25CLE1BQU0sRUFBRSxLQUFLO1NBQ2QsQ0FBQyxDQUFDO1FBRUgsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQy9CLGNBQWMsR0FBRyxPQUFPLENBQUM7UUFDekIsT0FBTyxHQUFHLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFFL0IsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztDQUFBO0FBZEQsZ0NBY0MifQ==