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
const STemplate_1 = __importDefault(require("../STemplate"));
function page404(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const template = new STemplate_1.default('pages.404', {
            template: {
                engine: 'blade'
            }
        });
        const result = yield template.render(data);
        if (result.content)
            return result.content;
        return undefined;
    });
}
exports.default = page404;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNDA0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiNDA0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkRBQXVDO0FBNkJ2QyxTQUE4QixPQUFPLENBQ25DLElBQWM7O1FBRWQsTUFBTSxRQUFRLEdBQUcsSUFBSSxtQkFBVyxDQUFDLFdBQVcsRUFBRTtZQUM1QyxRQUFRLEVBQUU7Z0JBQ1IsTUFBTSxFQUFFLE9BQU87YUFDaEI7U0FDRixDQUFDLENBQUM7UUFDSCxNQUFNLE1BQU0sR0FBRyxNQUFNLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0MsSUFBSSxNQUFNLENBQUMsT0FBTztZQUFFLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUMxQyxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0NBQUE7QUFYRCwwQkFXQyJ9