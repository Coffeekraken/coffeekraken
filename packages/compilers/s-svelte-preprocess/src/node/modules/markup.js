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
export function transformMarkup({ content, filename }, transformer, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        let { markupTagName = 'template' } = options;
        markupTagName = markupTagName.toLocaleLowerCase();
        const markupPattern = new RegExp(`/<!--[^]*?-->|<${markupTagName}(\\s[^]*?)?(?:>([^]*?)<\\/${markupTagName}>|\\/>)`);
        const templateMatch = content.match(markupPattern);
        /** If no <template> was found, run the transformer over the whole thing */
        if (!templateMatch) {
            return transformer({ content, attributes: {}, filename, options });
        }
        const [fullMatch, attributesStr = '', templateCode] = templateMatch;
        /** Transform an attribute string into a key-value object */
        const attributes = attributesStr
            .split(/\s+/)
            .filter(Boolean)
            .reduce((acc, attr) => {
            const [name, value] = attr.split('=');
            // istanbul ignore next
            acc[name] = value ? value.replace(/['"]/g, '') : true;
            return acc;
        }, {});
        /** Transform the found template code */
        let { code, map, dependencies } = yield transformer({
            content: templateCode,
            attributes,
            filename,
            options
        });
        code =
            content.slice(0, templateMatch.index) +
                code +
                content.slice(templateMatch.index + fullMatch.length);
        return { code, map, dependencies };
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya3VwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFya3VwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFJZCxNQUFNLFVBQWdCLGVBQWUsQ0FDbkMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUF5QyxFQUM1RCxXQUFnRCxFQUNoRCxVQUErQixFQUFFOztRQUVqQyxJQUFJLEVBQUUsYUFBYSxHQUFHLFVBQVUsRUFBRSxHQUFHLE9BQU8sQ0FBQztRQUU3QyxhQUFhLEdBQUcsYUFBYSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFFbEQsTUFBTSxhQUFhLEdBQUcsSUFBSSxNQUFNLENBQzlCLGtCQUFrQixhQUFhLDZCQUE2QixhQUFhLFNBQVMsQ0FDbkYsQ0FBQztRQUVGLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFbkQsMkVBQTJFO1FBQzNFLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDbEIsT0FBTyxXQUFXLENBQUMsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztTQUNwRTtRQUVELE1BQU0sQ0FBQyxTQUFTLEVBQUUsYUFBYSxHQUFHLEVBQUUsRUFBRSxZQUFZLENBQUMsR0FBRyxhQUFhLENBQUM7UUFFcEUsNERBQTREO1FBQzVELE1BQU0sVUFBVSxHQUFHLGFBQWE7YUFDN0IsS0FBSyxDQUFDLEtBQUssQ0FBQzthQUNaLE1BQU0sQ0FBQyxPQUFPLENBQUM7YUFDZixNQUFNLENBQUMsQ0FBQyxHQUFxQyxFQUFFLElBQUksRUFBRSxFQUFFO1lBQ3RELE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUV0Qyx1QkFBdUI7WUFDdkIsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUV0RCxPQUFPLEdBQUcsQ0FBQztRQUNiLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVULHdDQUF3QztRQUN4QyxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsR0FBRyxNQUFNLFdBQVcsQ0FBQztZQUNsRCxPQUFPLEVBQUUsWUFBWTtZQUNyQixVQUFVO1lBQ1YsUUFBUTtZQUNSLE9BQU87U0FDUixDQUFDLENBQUM7UUFFSCxJQUFJO1lBQ0YsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQztnQkFDckMsSUFBSTtnQkFDSixPQUFPLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXhELE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBRSxDQUFDO0lBQ3JDLENBQUM7Q0FBQSJ9