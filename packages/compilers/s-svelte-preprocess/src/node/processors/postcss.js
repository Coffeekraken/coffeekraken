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
import { getTagInfo } from '../modules/tagInfo';
import { concat } from '../modules/utils';
import { prepareContent } from '../modules/prepareContent';
/** Adapted from https://github.com/TehShrike/svelte-preprocess-postcss */
export default (options) => ({
    style(svelteFile) {
        return __awaiter(this, void 0, void 0, function* () {
            const { transformer } = yield import('../transformers/postcss');
            let { content, filename, attributes, dependencies } = yield getTagInfo(svelteFile);
            content = prepareContent({ options, content });
            /** If manually passed a plugins array, use it as the postcss config */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdGNzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBvc3Rjc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7OztBQUdkLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDMUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRTNELDBFQUEwRTtBQUMxRSxlQUFlLENBQUMsT0FBeUIsRUFBcUIsRUFBRSxDQUFDLENBQUM7SUFDMUQsS0FBSyxDQUFDLFVBQVU7O1lBQ3BCLE1BQU0sRUFBRSxXQUFXLEVBQUUsR0FBRyxNQUFNLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1lBQ2hFLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsR0FBRyxNQUFNLFVBQVUsQ0FDcEUsVUFBVSxDQUNYLENBQUM7WUFFRixPQUFPLEdBQUcsY0FBYyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFFL0MsdUVBQXVFO1lBQ3ZFLE1BQU0sV0FBVyxHQUFHLE1BQU0sV0FBVyxDQUFDO2dCQUNwQyxPQUFPO2dCQUNQLFFBQVE7Z0JBQ1IsVUFBVTtnQkFDVixPQUFPO2FBQ1IsQ0FBQyxDQUFDO1lBRUgsdUNBQ0ssV0FBVyxLQUNkLFlBQVksRUFBRSxNQUFNLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQyxZQUFZLENBQUMsSUFDNUQ7UUFDSixDQUFDO0tBQUE7Q0FDRixDQUFDLENBQUMifQ==