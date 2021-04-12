"use strict";
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
const SView_1 = __importDefault(require("../SView"));
function page404(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const engine = new SView_1.default('pages.404', {
            view: {
                engine: 'blade'
            }
        });
        const result = yield engine.render(data);
        if (result.value)
            return result.value;
        return undefined;
    });
}
exports.default = page404;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNDA0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiNDA0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEscURBQStCO0FBNkIvQixTQUE4QixPQUFPLENBQ25DLElBQWM7O1FBRWQsTUFBTSxNQUFNLEdBQUcsSUFBSSxlQUFPLENBQUMsV0FBVyxFQUFFO1lBQ3RDLElBQUksRUFBRTtnQkFDSixNQUFNLEVBQUUsT0FBTzthQUNoQjtTQUNGLENBQUMsQ0FBQztRQUNILE1BQU0sTUFBTSxHQUFHLE1BQU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxJQUFJLE1BQU0sQ0FBQyxLQUFLO1lBQUUsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ3RDLE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7Q0FBQTtBQVhELDBCQVdDIn0=