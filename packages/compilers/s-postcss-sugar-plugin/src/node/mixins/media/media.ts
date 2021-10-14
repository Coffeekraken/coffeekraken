import __SInterface from '@coffeekraken/s-interface';
import __SugarConfig from '@coffeekraken/s-sugar-config';
import __flatten from '@coffeekraken/sugar/shared/object/flatten';
import __postCss from 'postcss';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __postcss from 'postcss';
import __theme from '../../utils/theme';

class postcssSugarPluginMediaMixinInterface extends __SInterface {
    static definition = {
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
export { postcssSugarPluginMediaMixinInterface as interface };

/**
 * @name           media
 * @namespace      mixins
 * @type           Mixin
 * @platform      css
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
export default function ({
    params,
    atRule,
    postcssApi,
}: {
    params: any;
    atRule: any;
    postcssApi: any;
}) {
    const mediaConfig = __theme().config('media');

    const queries: string[] = [];

    Object.keys(params).forEach((queryId) => {
        const query = params[queryId].trim();
        query.split(',').forEach((q) => {
            queries.push(q.trim());
        });
    });

    const fullQueriesList: string[] = [];

    queries.forEach((query) => {
        const currentQueryList: string[] = [mediaConfig.defaultQuery, 'and'];

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

        if (
            firstTwoChar === '>=' ||
            firstTwoChar === '<=' ||
            firstTwoChar === '=='
        ) {
            mediaName = mediaName.slice(2);
            action = firstTwoChar;
        } else if (
            firstChar === '<' ||
            firstChar === '>' ||
            firstChar === '='
        ) {
            mediaName = mediaName.slice(1);
            action = firstChar;
        }

        const mediaQueryConfig = mediaConfig.queries[mediaName];
        if (!mediaQueryConfig)
            throw new Error(
                `<red>[postcssSugarPlugin.media]</red> Sorry but the requested media "<yellow>${mediaName}</yellow>" does not exists in the config. Here's the available medias: ${Object.keys(
                    mediaConfig.queries,
                )
                    .map((l) => `<green>${l}</green>`)
                    .join(',')}`,
            );

        const queryList: string[] = [];

        Object.keys(mediaQueryConfig).forEach((prop) => {
            const value = mediaQueryConfig[prop];
            if (!value) return;

            if (
                [
                    'min-width',
                    'max-width',
                    'min-device-width',
                    'max-device-width',
                ].indexOf(prop) !== -1
            ) {
                if (action === '>') {
                    if (prop === 'max-width' || prop === 'max-device-width') {
                        let argName = 'min-width';
                        if (prop.includes('-device'))
                            argName = 'min-device-width';
                        queryList.push(`(${argName}: ${value + 1}px)`);
                    }
                } else if (action === '<') {
                    if (prop === 'min-width' || prop === 'min-device-width') {
                        let argName = 'max-width';
                        if (prop.includes('-device'))
                            argName = 'max-device-width';
                        queryList.push(`(${argName}: ${value}px)`);
                    }
                } else if (action === '=') {
                    queryList.push(`(${prop}: ${value}px)`);
                } else if (action === '>=') {
                    if (prop === 'min-width' || prop === 'min-device-width') {
                        queryList.push(`(${prop}: ${value}px)`);
                    }
                } else if (action === '<=') {
                    if (prop === 'max-width' || prop === 'max-device-width') {
                        queryList.push(`(${prop}: ${value}px)`);
                    }
                } else {
                    queryList.push(`(${prop}: ${value}px)`);
                }
            } else {
                queryList.push(`(${prop}: ${value}px)`);
            }
        });

        if (lastChar === '-') {
            queryList.push('(orientation: landscape)');
        } else if (lastChar === '|') {
            queryList.push('(orientation: portrait)');
        }

        currentQueryList.push(queryList.join(' and '));

        fullQueriesList.push(currentQueryList.join(' '));
    });

    const mediaRule = new postcssApi.AtRule({
        name: 'media',
        params: fullQueriesList.join(' '),
    });

    atRule.nodes?.forEach((node) => {
        mediaRule.append(node);
    });

    atRule.replaceWith(mediaRule);
}
