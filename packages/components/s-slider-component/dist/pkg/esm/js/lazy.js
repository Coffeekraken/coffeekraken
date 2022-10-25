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
export function define(props, tagName = 's-slider', settings = {}) {
    var _a;
    __querySelectorLive(tagName, ($elm) => __awaiter(this, void 0, void 0, function* () {
        const define = yield import('./define');
        define.default(props, tagName);
    }), {
        when: (_a = settings.when) !== null && _a !== void 0 ? _a : 'nearViewport',
        firstOnly: true,
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBTzlELE1BQU0sVUFBVSxNQUFNLENBQ2xCLEtBQUssRUFDTCxPQUFPLEdBQUcsVUFBVSxFQUNwQixXQUF5QyxFQUFFOztJQUUzQyxtQkFBbUIsQ0FDZixPQUFPLEVBQ1AsQ0FBTyxJQUFJLEVBQUUsRUFBRTtRQUNYLE1BQU0sTUFBTSxHQUFHLE1BQU0sTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQSxFQUNEO1FBQ0ksSUFBSSxFQUFFLE1BQUEsUUFBUSxDQUFDLElBQUksbUNBQUksY0FBYztRQUNyQyxTQUFTLEVBQUUsSUFBSTtLQUNsQixDQUNKLENBQUM7QUFDTixDQUFDIn0=