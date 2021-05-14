// @ts-nocheck
import stripIndent from 'strip-indent';
// todo: could use magig-string and generate some sourcemaps 🗺
export function prepareContent({ options, content }) {
    if (typeof options !== 'object') {
        return content;
    }
    if (options.stripIndent) {
        content = stripIndent(content);
    }
    if (options.prependData) {
        content = `${options.prependData}\n${content}`;
    }
    return content;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlcGFyZUNvbnRlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcmVwYXJlQ29udGVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxXQUFXLE1BQU0sY0FBYyxDQUFDO0FBRXZDLCtEQUErRDtBQUMvRCxNQUFNLFVBQVUsY0FBYyxDQUFDLEVBQzdCLE9BQU8sRUFDUCxPQUFPLEVBSVI7SUFDQyxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTtRQUMvQixPQUFPLE9BQU8sQ0FBQztLQUNoQjtJQUVELElBQUksT0FBTyxDQUFDLFdBQVcsRUFBRTtRQUN2QixPQUFPLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ2hDO0lBRUQsSUFBSSxPQUFPLENBQUMsV0FBVyxFQUFFO1FBQ3ZCLE9BQU8sR0FBRyxHQUFHLE9BQU8sQ0FBQyxXQUFXLEtBQUssT0FBTyxFQUFFLENBQUM7S0FDaEQ7SUFFRCxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDIn0=