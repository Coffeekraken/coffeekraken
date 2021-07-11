var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SProcess from '@coffeekraken/s-process';
import __SVite from '../SVite';
import __SViteStartInterface from './interface/SViteStartInterface';
export default function start(stringArgs = '') {
    return __awaiter(this, void 0, void 0, function* () {
        const vite = new __SVite();
        const pro = yield __SProcess.from(vite.start.bind(vite), {
            process: {
                interface: __SViteStartInterface
            }
        });
        pro.run(stringArgs);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhcnQuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RhcnQuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sT0FBTyxNQUFNLFVBQVUsQ0FBQztBQUMvQixPQUFPLHFCQUFxQixNQUFNLGlDQUFpQyxDQUFDO0FBRXBFLE1BQU0sQ0FBQyxPQUFPLFVBQWdCLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRTs7UUFDakQsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUMzQixNQUFNLEdBQUcsR0FBRyxNQUFNLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdkQsT0FBTyxFQUFFO2dCQUNQLFNBQVMsRUFBRSxxQkFBcUI7YUFDakM7U0FDRixDQUFDLENBQUM7UUFDSCxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3RCLENBQUM7Q0FBQSJ9