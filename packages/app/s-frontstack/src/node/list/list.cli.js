var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SPromise from '@coffeekraken/s-promise';
import __SFrontstack from '../SFrontstack';
export default function action(stringArgs = '') {
    return new __SPromise(({ resolve, pipe }) => __awaiter(this, void 0, void 0, function* () {
        const frontstack = new __SFrontstack();
        const promise = frontstack.list(stringArgs);
        pipe(promise);
        resolve(yield promise);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaXN0LmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLGFBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxNQUFNLENBQUMsT0FBTyxVQUFVLE1BQU0sQ0FBQyxVQUFVLEdBQUcsRUFBRTtJQUMxQyxPQUFPLElBQUksVUFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUM5QyxNQUFNLFVBQVUsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2QsT0FBTyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUM7SUFDM0IsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMifQ==