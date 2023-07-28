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
export function define(props, tagName = 's-code-example', settings = {}) {
    var _a;
    __querySelectorLive(tagName, ($elm, api) => __awaiter(this, void 0, void 0, function* () {
        // api.cancel();§
        const define = yield import('./define');
        define.default(props, tagName, settings);
    }), {
        when: (_a = settings.when) !== null && _a !== void 0 ? _a : 'nearViewport',
        firstOnly: true,
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUVBLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBTTlELE1BQU0sVUFBVSxNQUFNLENBQ2xCLEtBQUssRUFDTCxPQUFPLEdBQUcsZ0JBQWdCLEVBQzFCLFdBQXlDLEVBQUU7O0lBRTNDLG1CQUFtQixDQUNmLE9BQU8sRUFDUCxDQUFPLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUNoQixpQkFBaUI7UUFDakIsTUFBTSxNQUFNLEdBQUcsTUFBTSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDeEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzdDLENBQUMsQ0FBQSxFQUNEO1FBQ0ksSUFBSSxFQUFFLE1BQUEsUUFBUSxDQUFDLElBQUksbUNBQUksY0FBYztRQUNyQyxTQUFTLEVBQUUsSUFBSTtLQUNsQixDQUNKLENBQUM7QUFDTixDQUFDIn0=