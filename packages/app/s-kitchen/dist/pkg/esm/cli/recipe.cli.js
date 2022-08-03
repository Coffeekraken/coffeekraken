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
import __SStdio from '@coffeekraken/s-stdio';
import __SKitchen from '../node/SKitchen';
export const sugarCliSettings = {
    stdio: __SStdio.UI_TERMINAL,
};
export default function recipe(stringArgs = '') {
    return new __SPromise(({ resolve, pipe }) => __awaiter(this, void 0, void 0, function* () {
        const kitchen = new __SKitchen();
        const promise = kitchen.recipe(stringArgs);
        pipe(promise);
        yield promise;
        resolve(promise);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sVUFBVSxNQUFNLGtCQUFrQixDQUFDO0FBRTFDLE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFHO0lBQzVCLEtBQUssRUFBRSxRQUFRLENBQUMsV0FBVztDQUM5QixDQUFDO0FBRUYsTUFBTSxDQUFDLE9BQU8sVUFBVSxNQUFNLENBQUMsVUFBVSxHQUFHLEVBQUU7SUFDMUMsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDOUMsTUFBTSxPQUFPLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztRQUNqQyxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNkLE1BQU0sT0FBTyxDQUFDO1FBQ2QsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JCLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDIn0=