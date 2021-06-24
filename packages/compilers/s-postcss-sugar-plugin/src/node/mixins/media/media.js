import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
class postcssSugarPluginMediaMixinInterface extends __SInterface {
}
postcssSugarPluginMediaMixinInterface.definition = {
    query1: {
        type: 'String',
        required: true
    },
    query2: {
        type: 'String'
    },
    query3: {
        type: 'String'
    },
    query4: {
        type: 'String'
    },
    query5: {
        type: 'String'
    },
    query6: {
        type: 'String'
    },
    query7: {
        type: 'String'
    }
};
export { postcssSugarPluginMediaMixinInterface as interface };
/**
 * @name           media
 * @namespace      mixins
 * @type           Mixin
 * @status        beta
 *
 * This mixin allows you to apply media queries depending on the ```media.config.js``` config
 * file with ease.
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
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
export default function ({ params, atRule, replaceWith, postcssApi }) {
    const mediaConfig = __theme().config('media');
    const queries = [];
    Object.keys(params).forEach(queryId => {
        const query = params[queryId].trim();
        query.split(',').forEach(q => {
            queries.push(q.trim());
        });
    });
    // const queries = params.query.split(',').map(l => l.trim());
    const fullQueriesList = [];
    queries.forEach(query => {
        // const mediasArray: string[] = [];
        // let currentQuery = '';
        // query.replace(/\sand\s/gm, ' , ').replace(/\sor\s/gm, ' _ ').split('').forEach(char => {
        //   if (char === '_') {
        //     mediasArray.push(currentQuery.trim());
        //     mediasArray.push('or');
        //     currentQuery = '';
        //   } else if (char === ',') {
        //     mediasArray.push(currentQuery.trim());
        //     mediasArray.push('and');
        //     currentQuery = '';
        //   } else {
        //     currentQuery += char;
        //   }
        // });
        // mediasArray.push(currentQuery.trim());
        const currentQueryList = [mediaConfig.defaultQuery, 'and'];
        // mediasArray.forEach((query) => {
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
        else if (firstChar === '<' || firstChar === '>' || firstChar === '=') {
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
                'max-device-width'
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
        // });
        fullQueriesList.push(currentQueryList.join(' '));
    });
    const mediaRule = new postcssApi.AtRule({
        name: 'media',
        params: fullQueriesList.join(' ')
    });
    // const AST = __postcss.parse(`@media ${fullQueriesList.join(' ')} {}`);
    // @ts-ignore
    atRule.nodes.forEach(node => {
        mediaRule.append(node);
    });
    atRule.replaceWith(mediaRule);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtZWRpYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQU1yRCxPQUFPLE9BQU8sTUFBTSxtQkFBbUIsQ0FBQztBQUV4QyxNQUFNLHFDQUFzQyxTQUFRLFlBQVk7O0FBQ3ZELGdEQUFVLEdBQUc7SUFDbEIsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7S0FDZjtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO0tBQ2Y7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtLQUNmO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7S0FDZjtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO0tBQ2Y7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtLQUNmO0NBQ0YsQ0FBQztBQUVKLE9BQU8sRUFBRSxxQ0FBcUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUU5RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFDWCxVQUFVLEVBTVg7SUFDQyxNQUFNLFdBQVcsR0FBRyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFOUMsTUFBTSxPQUFPLEdBQWEsRUFBRSxDQUFDO0lBRTdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3BDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQyxLQUFLLENBQUMsS0FBSyxD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