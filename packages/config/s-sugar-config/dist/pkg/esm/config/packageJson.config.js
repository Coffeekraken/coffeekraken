var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __packageJson from '@coffeekraken/sugar/node/package/json';
export function prepare() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield __packageJson();
    });
}
export default function (api) {
    if (api.env.platform !== 'node')
        return;
    return {};
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sYUFBYSxNQUFNLHVDQUF1QyxDQUFDO0FBRWxFLE1BQU0sVUFBZ0IsT0FBTzs7UUFDekIsT0FBTyxNQUFNLGFBQWEsRUFBRSxDQUFDO0lBQ2pDLENBQUM7Q0FBQTtBQUVELE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBQ3hDLE9BQU8sRUFBRSxDQUFDO0FBQ2QsQ0FBQyJ9