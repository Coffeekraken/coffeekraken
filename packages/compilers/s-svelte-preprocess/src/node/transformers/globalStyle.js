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
import postcss from 'postcss';
import { globalifySelector } from '../modules/globalifySelector';
const selectorPattern = /:global(?!\()/;
const globalifyRulePlugin = (root) => {
    root.walkRules(selectorPattern, (rule) => {
        const modifiedSelectors = rule.selectors
            .filter((selector) => selector !== ':global')
            .map((selector) => {
            const [beginning, ...rest] = selector.split(selectorPattern);
            if (rest.length === 0)
                return beginning;
            return [beginning, ...rest.map(globalifySelector)]
                .map((str) => str.trim())
                .join(' ')
                .trim();
        });
        if (modifiedSelectors.length === 0) {
            rule.remove();
            return;
        }
        rule.replaceWith(rule.clone({
            selectors: modifiedSelectors
        }));
    });
};
const globalAttrPlugin = (root) => {
    root.walkAtRules(/keyframes$/, (atrule) => {
        if (!atrule.params.startsWith('-global-')) {
            atrule.replaceWith(atrule.clone({
                params: `-global-${atrule.params}`
            }));
        }
    });
    root.walkRules((rule) => {
        var _a, _b;
        // we use endsWith for checking @keyframes and prefixed @-{prefix}-keyframes
        if ((_b = (_a = rule === null || rule === void 0 ? void 0 : rule.parent) === null || _a === void 0 ? void 0 : _a.name) === null || _b === void 0 ? void 0 : _b.endsWith('keyframes')) {
            return;
        }
        rule.replaceWith(rule.clone({
            selectors: rule.selectors.map(globalifySelector)
        }));
    });
};
const transformer = ({ content, filename, options, map, attributes }) => __awaiter(void 0, void 0, void 0, function* () {
    const plugins = [
        globalifyRulePlugin,
        (attributes === null || attributes === void 0 ? void 0 : attributes.global) && globalAttrPlugin
    ].filter(Boolean);
    const { css, map: newMap } = yield postcss(plugins).process(content, {
        from: filename,
        map: (options === null || options === void 0 ? void 0 : options.sourceMap) ? { prev: map } : false
    });
    return { code: css, map: newMap };
});
export { transformer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsU3R5bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnbG9iYWxTdHlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBRWQsT0FBTyxPQUFPLE1BQU0sU0FBUyxDQUFDO0FBSTlCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRWpFLE1BQU0sZUFBZSxHQUFHLGVBQWUsQ0FBQztBQUV4QyxNQUFNLG1CQUFtQixHQUFHLENBQUMsSUFBZSxFQUFFLEVBQUU7SUFDOUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUN2QyxNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxTQUFTO2FBQ3JDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQzthQUM1QyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNoQixNQUFNLENBQUMsU0FBUyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUU3RCxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQztnQkFBRSxPQUFPLFNBQVMsQ0FBQztZQUV4QyxPQUFPLENBQUMsU0FBUyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2lCQUMvQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztpQkFDeEIsSUFBSSxDQUFDLEdBQUcsQ0FBQztpQkFDVCxJQUFJLEVBQUUsQ0FBQztRQUNaLENBQUMsQ0FBQyxDQUFDO1FBRUwsSUFBSSxpQkFBaUIsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ2xDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUVkLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxXQUFXLENBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNULFNBQVMsRUFBRSxpQkFBaUI7U0FDN0IsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUVGLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxJQUFlLEVBQUUsRUFBRTtJQUMzQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN6QyxNQUFNLENBQUMsV0FBVyxDQUNoQixNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUNYLE1BQU0sRUFBRSxXQUFXLE1BQU0sQ0FBQyxNQUFNLEVBQUU7YUFDbkMsQ0FBQyxDQUNILENBQUM7U0FDSDtJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFOztRQUN0Qiw0RUFBNEU7UUFDNUUsSUFBSSxNQUFBLE1BQUMsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLE1BQXNCLDBDQUFFLElBQUksMENBQUUsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQzlELE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxXQUFXLENBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNULFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQztTQUNqRCxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBRUYsTUFBTSxXQUFXLEdBQXFDLENBQU8sRUFDM0QsT0FBTyxFQUNQLFFBQVEsRUFDUixPQUFPLEVBQ1AsR0FBRyxFQUNILFVBQVUsRUFDWCxFQUFFLEVBQUU7SUFDSCxNQUFNLE9BQU8sR0FBRztRQUNkLG1CQUFtQjtRQUNuQixDQUFBLFVBQVUsYUFBVixVQUFVLHVCQUFWLFVBQVUsQ0FBRSxNQUFNLEtBQUksZ0JBQWdCO0tBQ3ZDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRWxCLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLE1BQU0sT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7UUFDbkUsSUFBSSxFQUFFLFFBQVE7UUFDZCxHQUFHLEVBQUUsQ0FBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsU0FBUyxFQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSztLQUNoRCxDQUFDLENBQUM7SUFFSCxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUM7QUFDcEMsQ0FBQyxDQUFBLENBQUM7QUFFRixPQUFPLEVBQUUsV0FBVyxFQUFFLENBQUMifQ==