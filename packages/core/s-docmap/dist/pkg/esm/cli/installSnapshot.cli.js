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
import __SPromise from '@coffeekraken/s-promise';
import __SDocMap from '../node/SDocMap';
export default (stringArgs = '') => __awaiter(void 0, void 0, void 0, function* () {
    return new __SPromise(({ resolve, pipe }) => __awaiter(void 0, void 0, void 0, function* () {
        const docmap = new __SDocMap();
        const promise = docmap.installSnapshot(stringArgs);
        pipe(promise);
        resolve(yield promise);
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFNBQVMsTUFBTSxpQkFBaUIsQ0FBQztBQUV4QyxlQUFlLENBQU8sVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQ3JDLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQzlDLE1BQU0sTUFBTSxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7UUFDL0IsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDZCxPQUFPLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQztJQUMzQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFBLENBQUMifQ==