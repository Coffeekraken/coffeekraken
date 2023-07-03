var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { __querySelectorLive } from '@coffeekraken/sugar/dom';
export function __define(props, tagName = 's-hotkeys-list', settings = {}) {
    var _a;
    __querySelectorLive(tagName, ($elm) => __awaiter(this, void 0, void 0, function* () {
        const define = yield import('./define');
        define.default(props, tagName);
    }), {
        when: (_a = settings.when) !== null && _a !== void 0 ? _a : 'direct',
        firstOnly: true,
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBTTlELE1BQU0sVUFBVSxRQUFRLENBQ3BCLEtBQUssRUFDTCxPQUFPLEdBQUcsZ0JBQWdCLEVBQzFCLFdBQXlDLEVBQUU7O0lBRTNDLG1CQUFtQixDQUNmLE9BQU8sRUFDUCxDQUFPLElBQUksRUFBRSxFQUFFO1FBQ1gsTUFBTSxNQUFNLEdBQUcsTUFBTSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDeEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFBLEVBQ0Q7UUFDSSxJQUFJLEVBQUUsTUFBQSxRQUFRLENBQUMsSUFBSSxtQ0FBSSxRQUFRO1FBQy9CLFNBQVMsRUFBRSxJQUFJO0tBQ2xCLENBQ0osQ0FBQztBQUNOLENBQUMifQ==