import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
class postcssSugarPluginMediaMixinInterface extends __SInterface {
    static get _definition() {
        return {
            query1: {
                type: 'String',
                required: true,
            },
            query2: {
                type: 'String',
            },
            query3: {
                type: 'String',
            },
            query4: {
                type: 'String',
            },
            query5: {
                type: 'String',
            },
            query6: {
                type: 'String',
            },
            query7: {
                type: 'String',
            },
        };
    }
}
export { postcssSugarPluginMediaMixinInterface as interface };
/**
 * @name           media
 * @namespace      node.mixins.media
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to apply any media queries that are defined
 * in the config.theme.media.queries configuration stack like "tablet", "mobile", etc...
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 * @return      {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.media >=desktop {
 *      // ...
 * }
 * \@sugar.media tablet {
 *      // ...
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({ params, atRule, postcssApi, }) {
    var _a;
    const mediaConfig = __STheme.config('media');
    const queries = [];
    Object.keys(params).forEach((queryId) => {
        const query = params[queryId].trim();
        query.split(',').forEach((q) => {
            queries.push(q.trim());
        });
    });
    const fullQueriesList = [];
    queries.forEach((query) => {
        const currentQueryList = [mediaConfig.defaultQuery, 'and'];
        if (query === 'and' || query === 'or') {
            currentQueryList.push(query);
            return;
        }
        const firstChar = query.slice(0, 1);
        const firstTwoChar = query.slice(0, 2);
        const lastChar = query.slice(-1);
        let action = mediaConfig.defaultAction;
        let mediaName = query;
        if (lastChar === '-' || lastChar === '|')
            mediaName = mediaName.slice(0, -1);
        if (firstTwoChar === '>=' ||
            firstTwoChar === '<=' ||
            firstTwoChar === '==') {
            mediaName = mediaName.slice(2);
            action = firstTwoChar;
        }
        else if (firstChar === '<' ||
            firstChar === '>' ||
            firstChar === '=') {
            mediaName = mediaName.slice(1);
            action = firstChar;
        }
        const mediaQueryConfig = mediaConfig.queries[mediaName];
        if (!mediaQueryConfig)
            throw new Error(`<red>[postcssSugarPlugin.media]</red> Sorry but the requested media "<yellow>${mediaName}</yellow>" does not exists in the config. Here's the available medias: ${Object.keys(mediaConfig.queries)
                .map((l) => `<green>${l}</green>`)
                .join(',')}`);
        const queryList = [];
        Object.keys(mediaQueryConfig).forEach((prop) => {
            const value = mediaQueryConfig[prop];
            if (!value)
                return;
            if ([
                'min-width',
                'max-width',
                'min-device-width',
                'max-device-width',
            ].indexOf(prop) !== -1) {
                if (action === '>') {
                    if (prop === 'max-width' || prop === 'max-device-width') {
                        let argName = 'min-width';
                        if (prop.includes('-device'))
                            argName = 'min-device-width';
                        queryList.push(`(${argName}: ${value + 1}px)`);
                    }
                }
                else if (action === '<') {
                    if (prop === 'min-width' || prop === 'min-device-width') {
                        let argName = 'max-width';
                        if (prop.includes('-device'))
                            argName = 'max-device-width';
                        queryList.push(`(${argName}: ${value}px)`);
                    }
                }
                else if (action === '=') {
                    queryList.push(`(${prop}: ${value}px)`);
                }
                else if (action === '>=') {
                    if (prop === 'min-width' || prop === 'min-device-width') {
                        queryList.push(`(${prop}: ${value}px)`);
                    }
                }
                else if (action === '<=') {
                    if (prop === 'max-width' || prop === 'max-device-width') {
                        queryList.push(`(${prop}: ${value}px)`);
                    }
                }
                else {
                    queryList.push(`(${prop}: ${value}px)`);
                }
            }
            else {
                queryList.push(`(${prop}: ${value}px)`);
            }
        });
        if (lastChar === '-') {
            queryList.push('(orientation: landscape)');
        }
        else if (lastChar === '|') {
            queryList.push('(orientation: portrait)');
        }
        currentQueryList.push(queryList.join(' and '));
        fullQueriesList.push(currentQueryList.join(' '));
    });
    const mediaRule = new postcssApi.AtRule({
        name: 'media',
        params: fullQueriesList.join(' '),
    });
    (_a = atRule.nodes) === null || _a === void 0 ? void 0 : _a.forEach((node) => {
        mediaRule.append(node);
    });
    atRule.replaceWith(mediaRule);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtZWRpYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUU3QyxNQUFNLHFDQUFzQyxTQUFRLFlBQVk7SUFDNUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsUUFBUTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDRCxPQUFPLEVBQUUscUNBQXFDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFOUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFVBQVUsR0FLYjs7SUFDRyxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTdDLE1BQU0sT0FBTyxHQUFhLEVBQUUsQ0FBQztJQUU3QixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBQ3BDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJ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