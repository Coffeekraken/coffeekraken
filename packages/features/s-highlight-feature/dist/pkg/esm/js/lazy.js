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
export function __define(props, name = 's-highlight', settings = {}) {
    var _a;
    __querySelectorLive(`[${name}]`, ($elm) => __awaiter(this, void 0, void 0, function* () {
        const define = yield import('./define');
        define.default(props, name);
    }), {
        when: (_a = settings.when) !== null && _a !== void 0 ? _a : 'nearViewport',
        firstOnly: true,
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBTTlELE1BQU0sVUFBVSxRQUFRLENBQ3BCLEtBQUssRUFDTCxJQUFJLEdBQUcsYUFBYSxFQUNwQixXQUF5QyxFQUFFOztJQUUzQyxtQkFBbUIsQ0FDZixJQUFJLElBQUksR0FBRyxFQUNYLENBQU8sSUFBSSxFQUFFLEVBQUU7UUFDWCxNQUFNLE1BQU0sR0FBRyxNQUFNLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN4QyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUEsRUFDRDtRQUNJLElBQUksRUFBRSxNQUFBLFFBQVEsQ0FBQyxJQUFJLG1DQUFJLGNBQWM7UUFDckMsU0FBUyxFQUFFLElBQUk7S0FDbEIsQ0FDSixDQUFDO0FBQ04sQ0FBQyJ9