var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SMarkdownBuilderBuildParamsInterface from '../node/interface/SMarkdownBuilderBuildParamsInterface';
import __SMarkdownBuilder from '../node/SMarkdownBuilder';
import __SPromise from '@coffeekraken/s-promise';
export default function build(stringArgs = '') {
    return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        const builder = new __SMarkdownBuilder({
            interface: __SMarkdownBuilderBuildParamsInterface,
        });
        const promise = builder.build(stringArgs);
        pipe(promise);
        resolve(yield promise);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sc0NBQXNDLE1BQU0sd0RBQXdELENBQUM7QUFDNUcsT0FBTyxrQkFBa0IsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUVqRCxNQUFNLENBQUMsT0FBTyxVQUFVLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRTtJQUN6QyxPQUFPLElBQUksVUFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQzVELE1BQU0sT0FBTyxHQUFHLElBQUksa0JBQWtCLENBQUM7WUFDbkMsU0FBUyxFQUFFLHNDQUFzQztTQUNwRCxDQUFDLENBQUM7UUFFSCxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNkLE9BQU8sQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDO0lBQzNCLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDIn0=