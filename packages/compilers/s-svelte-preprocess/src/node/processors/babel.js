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
import { concat } from '../modules/utils';
import { getTagInfo } from '../modules/tagInfo';
import { prepareContent } from '../modules/prepareContent';
export default (options) => ({
    script(svelteFile) {
        return __awaiter(this, void 0, void 0, function* () {
            const { transformer } = yield import('../transformers/babel');
            let { content, filename, dependencies, attributes } = yield getTagInfo(svelteFile);
            content = prepareContent({ options, content });
            const transformed = yield transformer({
                content,
                filename,
                attributes,
                options
            });
            return Object.assign(Object.assign({}, transformed), { dependencies: concat(dependencies, transformed.dependencies) });
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFiZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJiYWJlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBR2QsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFM0QsZUFBZSxDQUFDLE9BQXVCLEVBQXFCLEVBQUUsQ0FBQyxDQUFDO0lBQ3hELE1BQU0sQ0FBQyxVQUFVOztZQUNyQixNQUFNLEVBQUUsV0FBVyxFQUFFLEdBQUcsTUFBTSxNQUFNLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUU5RCxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLEdBQUcsTUFBTSxVQUFVLENBQ3BFLFVBQVUsQ0FDWCxDQUFDO1lBRUYsT0FBTyxHQUFHLGNBQWMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBRS9DLE1BQU0sV0FBVyxHQUFHLE1BQU0sV0FBVyxDQUFDO2dCQUNwQyxPQUFPO2dCQUNQLFFBQVE7Z0JBQ1IsVUFBVTtnQkFDVixPQUFPO2FBQ1IsQ0FBQyxDQUFDO1lBRUgsdUNBQ0ssV0FBVyxLQUNkLFlBQVksRUFBRSxNQUFNLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQyxZQUFZLENBQUMsSUFDNUQ7UUFDSixDQUFDO0tBQUE7Q0FDRixDQUFDLENBQUMifQ==