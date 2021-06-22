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
import __SFrontstack from '../SFrontstack';
import __SFrontstackListParamsInterface from './interface/SFrontstackListParamsInterface';
export default function action(stringArgs = '') {
    return __awaiter(this, void 0, void 0, function* () {
        const frontstack = new __SFrontstack();
        const pro = __SProcess.from(frontstack.list.bind(frontstack), {
            process: {
                interface: __SFrontstackListParamsInterface
            }
        });
        pro.run(stringArgs);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaXN0LmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLGFBQWEsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLGdDQUFnQyxNQUFNLDRDQUE0QyxDQUFDO0FBRTFGLE1BQU0sQ0FBQyxPQUFPLFVBQWdCLE1BQU0sQ0FBQyxVQUFVLEdBQUcsRUFBRTs7UUFDbEQsTUFBTSxVQUFVLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQztRQUN2QyxNQUFNLEdBQUcsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzVELE9BQU8sRUFBRTtnQkFDUCxTQUFTLEVBQUUsZ0NBQWdDO2FBQzVDO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN0QixDQUFDO0NBQUEifQ==