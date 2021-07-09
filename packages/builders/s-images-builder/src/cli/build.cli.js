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
import ____SImagesBuilderBuildParamsInterface from '../node/interface/SImagesBuilderBuildParamsInterface';
import __SImagesBuilder from '../node/SImagesBuilder';
export default function build(stringArgs = '') {
    return __awaiter(this, void 0, void 0, function* () {
        const builder = new __SImagesBuilder();
        const pro = __SProcess.from(builder.build.bind(builder), {
            process: {
                interface: ____SImagesBuilderBuildParamsInterface
            }
        });
        yield pro.run(stringArgs);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnVpbGQuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sc0NBQXNDLE1BQU0sc0RBQXNELENBQUM7QUFDMUcsT0FBTyxnQkFBZ0IsTUFBTSx3QkFBd0IsQ0FBQztBQUd0RCxNQUFNLENBQUMsT0FBTyxVQUFnQixLQUFLLENBQUMsVUFBVSxHQUFHLEVBQUU7O1FBRS9DLE1BQU0sT0FBTyxHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztRQUV2QyxNQUFNLEdBQUcsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUN2QixPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFDN0I7WUFDRSxPQUFPLEVBQUU7Z0JBQ1AsU0FBUyxFQUFFLHNDQUFzQzthQUNsRDtTQUNKLENBQUMsQ0FBQztRQUNILE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM5QixDQUFDO0NBQUEifQ==