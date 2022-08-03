var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __scrapeUrl from '@coffeekraken/sugar/node/og/scrapeUrl';
export default function (data) {
    return __awaiter(this, void 0, void 0, function* () {
        const og = yield __scrapeUrl(data[1]);
        return og !== null && og !== void 0 ? og : {};
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sV0FBVyxNQUFNLHVDQUF1QyxDQUFDO0FBRWhFLE1BQU0sQ0FBQyxPQUFPLFdBQWlCLElBQUk7O1FBQy9CLE1BQU0sRUFBRSxHQUFHLE1BQU0sV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLE9BQU8sRUFBRSxhQUFGLEVBQUUsY0FBRixFQUFFLEdBQUksRUFBRSxDQUFDO0lBQ3BCLENBQUM7Q0FBQSJ9