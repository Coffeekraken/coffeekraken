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
import __SMarkdownBuilderBuildParamsInterface from '../node/interface/SMarkdownBuilderBuildParamsInterface';
import __SMarkdownBuilder from '../node/SMarkdownBuilder';
export default function build(stringArgs = '') {
    return __awaiter(this, void 0, void 0, function* () {
        const builder = new __SMarkdownBuilder();
        const pro = yield __SProcess.from(builder.build.bind(builder), {
            process: {
                interface: __SMarkdownBuilderBuildParamsInterface
            }
        });
        pro.run(stringArgs);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnVpbGQuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sc0NBQXNDLE1BQU0sd0RBQXdELENBQUM7QUFDNUcsT0FBTyxrQkFBa0IsTUFBTSwwQkFBMEIsQ0FBQztBQUcxRCxNQUFNLENBQUMsT0FBTyxVQUFnQixLQUFLLENBQUMsVUFBVSxHQUFHLEVBQUU7O1FBRS9DLE1BQU0sT0FBTyxHQUFHLElBQUksa0JBQWtCLEVBQUUsQ0FBQztRQUV6QyxNQUFNLEdBQUcsR0FBRyxNQUFNLFVBQVUsQ0FBQyxJQUFJLENBQzdCLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUM3QjtZQUNFLE9BQU8sRUFBRTtnQkFDUCxTQUFTLEVBQUUsc0NBQXNDO2FBQ2xEO1NBQ0osQ0FBQyxDQUFDO1FBQ0gsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN4QixDQUFDO0NBQUEifQ==