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
import __SStaticBuilder from '../node/SStaticBuilder';
import __SStaticBuilderBuildParamsInterface from '../node/interface/SStaticBuilderBuildParamsInterface';
export default function build(stringArgs = '') {
    return new __SPromise(({ resolve, reject, pipe }) => __awaiter(this, void 0, void 0, function* () {
        const builder = new __SStaticBuilder({
            builder: {
                interface: __SStaticBuilderBuildParamsInterface,
            },
        });
        yield pipe(builder.build(stringArgs));
        process.exit();
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnVpbGQuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sZ0JBQWdCLE1BQU0sd0JBQXdCLENBQUM7QUFDdEQsT0FBTyxvQ0FBb0MsTUFBTSxzREFBc0QsQ0FBQztBQUV4RyxNQUFNLENBQUMsT0FBTyxVQUFVLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRTtJQUN6QyxPQUFPLElBQUksVUFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDdEQsTUFBTSxPQUFPLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQztZQUNqQyxPQUFPLEVBQUU7Z0JBQ0wsU0FBUyxFQUFFLG9DQUFvQzthQUNsRDtTQUNKLENBQUMsQ0FBQztRQUNILE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUN0QyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbkIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMifQ==