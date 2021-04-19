"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const postcss_1 = __importDefault(require("postcss"));
class postcssSugarPluginMediaMixinInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginMediaMixinInterface;
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
    },
    query8: {
        type: 'String'
    },
    query9: {
        type: 'String'
    },
    query10: {
        type: 'String'
    }
};
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
function default_1(params = {}, atRule) {
    const mediaConfig = s_sugar_config_1.default('media');
    return;
    const mediasArray = [];
    Object.keys(params).forEach((argName) => {
        mediasArray.push(params[argName]);
    });
    const fullQueriesList = [];
    mediasArray.forEach((query) => {
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
        const queryList = [mediaConfig.defaultQuery];
        Object.keys(mediaQueryConfig).forEach((prop) => {
            let value = mediaQueryConfig[prop];
            if (!value)
                return;
            if (typeof value === 'number')
                value = `${value}px`;
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
                        queryList.push(`(${argName}: ${value + 1})`);
                    }
                }
                else if (action === '<') {
                    if (prop === 'min-width' || prop === 'min-device-width') {
                        let argName = 'max-width';
                        if (prop.includes('-device'))
                            argName = 'max-device-width';
                        queryList.push(`(${argName}: ${value})`);
                    }
                }
                else if (action === '=') {
                    queryList.push(`(${prop}: ${value})`);
                }
                else if (action === '>=') {
                    if (prop === 'min-width' || prop === 'min-device-width') {
                        queryList.push(`(${prop}: ${value})`);
                    }
                }
                else if (action === '<=') {
                    if (prop === 'max-width' || prop === 'max-device-width') {
                        queryList.push(`(${prop}: ${value})`);
                    }
                }
                else {
                    queryList.push(`(${prop}: ${value})`);
                }
            }
            else {
                queryList.push(`(${prop}: ${value})`);
            }
        });
        if (lastChar === '-') {
            queryList.push('(orientation: landscape)');
        }
        else if (lastChar === '|') {
            queryList.push('(orientation: portrait)');
        }
        fullQueriesList.push(queryList.join(' and '));
    });
    const AST = postcss_1.default.parse(`@media ${fullQueriesList.join(',')} {}`);
    // @ts-ignore
    AST.nodes[0].nodes = atRule.nodes;
    atRule.replaceWith(AST);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtZWRpYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0RUFBcUQ7QUFDckQsa0ZBQXlEO0FBRXpELHNEQUFnQztBQUdoQyxNQUFNLHFDQUFzQyxTQUFRLHFCQUFZOztBQW1DZCwwREFBUztBQWxDbEQsZ0RBQVUsR0FBRztJQUNsQixNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtLQUNmO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7S0FDZjtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO0tBQ2Y7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtLQUNmO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7S0FDZjtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO0tBQ2Y7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtLQUNmO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7S0FDZjtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxRQUFRO0tBQ2Y7Q0FDRixDQUFDO0FBSUo7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILG1CQUF5QixNQUFNLEdBQUcsRUFBRSxFQUFFLE1BQU07SUFDMUMsTUFBTSxXQUFXLEdBQUcsd0JBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUUzQyxPQUFPO0lBRVAsTUFBTSxXQUFXLEdBQWEsRUFBRSxDQUFDO0lBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDdEMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFD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