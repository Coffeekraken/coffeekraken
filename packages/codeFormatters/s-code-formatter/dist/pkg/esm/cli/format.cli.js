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
import __SCodeFormatter from '../node/SCodeFormatter';
export default function format(stringArgs = '') {
    return new __SPromise(({ resolve, pipe }) => __awaiter(this, void 0, void 0, function* () {
        const formatter = new __SCodeFormatter();
        const formatPromise = formatter.format(stringArgs);
        pipe(formatPromise);
        resolve(yield formatPromise);
        process.exit();
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sZ0JBQWdCLE1BQU0sd0JBQXdCLENBQUM7QUFFdEQsTUFBTSxDQUFDLE9BQU8sVUFBVSxNQUFNLENBQUMsVUFBVSxHQUFHLEVBQUU7SUFDMUMsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDOUMsTUFBTSxTQUFTLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3pDLE1BQU0sYUFBYSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3BCLE9BQU8sQ0FBQyxNQUFNLGFBQWEsQ0FBQyxDQUFDO1FBQzdCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNuQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9