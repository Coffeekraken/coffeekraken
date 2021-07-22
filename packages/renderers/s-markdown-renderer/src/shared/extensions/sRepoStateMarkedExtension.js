import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name            sRepoStateMarkedExtension
 * @namespace       shared.extensions
 * @type            Function
 * @platform        js
 * @platform        node
 * @platform        ts
 * @status          beta
 *
 * This marked extension allows you to transform block code like:
 * ```js
 * const hello = 'world';
 * ```
 * into an s-code-example component
 *
 * @example         js
 * import marked from 'marked';
 * import { sRepoStateMarkedExtension } from '@coffeekraken/s-markdown-renderer';
 * marked.use({
 *  extensions: [sRepoStateMarkedExtension]
 * });
 * marked('...');
 *
 * @since           2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export class SRepoStateMarkedExtensionInterface extends __SInterface {
}
SRepoStateMarkedExtensionInterface.definition = {
    package: {
        type: 'String',
        alias: 'p'
    },
    style: {
        type: 'String',
        values: ['plastic', 'flat', 'flat-square', 'for-the-badge', 'social'],
        default: __SSugarConfig.get('shieldsio.style')
    },
    shields: {
        type: 'Array<String>',
        alias: 's',
        default: __SSugarConfig.get('shieldsio.shields')
    }
};
export default function sRepoStateMarkedExtension(settings) {
    settings = Object.assign({ target: 'html' }, settings);
    return {
        name: 'repoState',
        level: 'block',
        start(src) { var _a; return (_a = src.match(/<!--\s%repoState\s.*?-->/)) === null || _a === void 0 ? void 0 : _a.index; },
        tokenizer(src, tokens) {
            const rule = /^<!--\s%repoState\s(.*?)-->/;
            const match = rule.exec(src);
            if (match && match.input.match(/^<!--\s%repoState\s/)) {
                return {
                    type: 'repoState',
                    raw: match[0],
                    args: match[1],
                    tokens: this.inlineTokens('')
                };
            }
        },
        renderer(token) {
            var _a;
            const params = SRepoStateMarkedExtensionInterface.apply((_a = token.args) !== null && _a !== void 0 ? _a : {});
            const shieldsUrls = __SSugarConfig.get('shieldsio.urls');
            params.shields.forEach(shield => {
                const url = shieldsUrls[shield];
            });
            console.log(token, params);
            return `
            Yop
            `;
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic1JlcG9TdGF0ZU1hcmtlZEV4dGVuc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNSZXBvU3RhdGVNYXJrZWRFeHRlbnNpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFFMUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFFSCxNQUFNLE9BQU8sa0NBQW1DLFNBQVEsWUFBWTs7QUFDekQsNkNBQVUsR0FBRztJQUNoQixPQUFPLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLEtBQUssRUFBRSxHQUFHO0tBQ2I7SUFDRCxLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsYUFBYSxFQUFDLGVBQWUsRUFBQyxRQUFRLENBQUM7UUFDakUsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUM7S0FDakQ7SUFDRCxPQUFPLEVBQUU7UUFDTCxJQUFJLEVBQUUsZUFBZTtRQUNyQixLQUFLLEVBQUUsR0FBRztRQUNWLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDO0tBQ25EO0NBQ0osQ0FBQztBQU9OLE1BQU0sQ0FBQyxPQUFPLFVBQVUseUJBQXlCLENBQUMsUUFBd0Q7SUFFdEcsUUFBUSxtQkFDSixNQUFNLEVBQUUsTUFBTSxJQUNYLFFBQVEsQ0FDZCxDQUFDO0lBRUYsT0FBTztRQUNILElBQUksRUFBRSxXQUFXO1FBQ2pCLEtBQUssRUFBRSxPQUFPO1FBQ2QsS0FBSyxDQUFDLEdBQUcsWUFBSSxPQUFPLE1BQUEsR0FBRyxDQUFDLEtBQUssQ0FBQywwQkFBMEIsQ0FBQywwQ0FBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ25FLFNBQVMsQ0FBQyxHQUFHLEVBQUUsTUFBTTtZQUNqQixNQUFNLElBQUksR0FBRyw2QkFBNkIsQ0FBQztZQUMzQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzdCLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLEVBQUU7Z0JBQ25ELE9BQU87b0JBQ1AsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNiLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNkLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQztpQkFDNUIsQ0FBQzthQUNMO1FBQ0wsQ0FBQztRQUNELFFBQVEsQ0FBQyxLQUFLOztZQUVWLE1BQU0sTUFBTSxHQUFHLGtDQUFrQyxDQUFDLEtBQUssQ0FBQyxNQUFBLEtBQUssQ0FBQyxJQUFJLG1DQUFJLEVBQUUsQ0FBQyxDQUFDO1lBRTFFLE1BQU0sV0FBVyxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUV6RCxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDNUIsTUFBTSxHQUFHLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXBDLENBQUMsQ0FBQyxDQUFDO1lBR0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFM0IsT0FBTzs7YUFFTixDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDIn0=