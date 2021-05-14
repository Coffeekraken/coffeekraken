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
export default (options) => ({
    script(svelteFile) {
        return __awaiter(this, void 0, void 0, function* () {
            const { transformer } = yield import('../transformers/typescript');
            let { content, filename, attributes, lang, dependencies } = yield getTagInfo(svelteFile);
            content = prepareContent({ options, content });
            if (lang !== 'typescript') {
                return { code: content };
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXNjcmlwdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInR5cGVzY3JpcHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7OztBQUdkLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDMUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRTNELGVBQWUsQ0FBQyxPQUE0QixFQUFxQixFQUFFLENBQUMsQ0FBQztJQUM3RCxNQUFNLENBQUMsVUFBVTs7WUFDckIsTUFBTSxFQUFFLFdBQVcsRUFBRSxHQUFHLE1BQU0sTUFBTSxDQUFDLDRCQUE0QixDQUFDLENBQUM7WUFDbkUsSUFBSSxFQUNGLE9BQU8sRUFDUCxRQUFRLEVBQ1IsVUFBVSxFQUNWLElBQUksRUFDSixZQUFZLEVBQ2IsR0FBRyxNQUFNLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUVqQyxPQUFPLEdBQUcsY0FBYyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFFL0MsSUFBSSxJQUFJLEtBQUssWUFBWSxFQUFFO2dCQUN6QixPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQzFCO1lBRUQsTUFBTSxXQUFXLEdBQUcsTUFBTSxXQUFXLENBQUM7Z0JBQ3BDLE9BQU87Z0JBQ1AsUUFBUTtnQkFDUixVQUFVO2dCQUNWLE9BQU87YUFDUixDQUFDLENBQUM7WUFFSCx1Q0FDSyxXQUFXLEtBQ2QsWUFBWSxFQUFFLE1BQU0sQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDLFlBQVksQ0FBQyxJQUM1RDtRQUNKLENBQUM7S0FBQTtDQUNGLENBQUMsQ0FBQyJ9