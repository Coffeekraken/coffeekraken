"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const sugar_1 = __importDefault(require("@coffeekraken/sugar/shared/config/sugar"));
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
    const mediaConfig = sugar_1.default('media');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtZWRpYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0RUFBcUQ7QUFDckQsb0ZBQW9FO0FBRXBFLHNEQUFnQztBQUdoQyxNQUFNLHFDQUFzQyxTQUFRLHFCQUFZOztBQW1DZCwwREFBUztBQWxDbEQsZ0RBQVUsR0FBRztJQUNsQixNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtLQUNmO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7S0FDZjtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO0tBQ2Y7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtLQUNmO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7S0FDZjtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO0tBQ2Y7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtLQUNmO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7S0FDZjtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxRQUFRO0tBQ2Y7Q0FDRixDQUFDO0FBSUo7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILG1CQUF5QixNQUFNLEdBQUcsRUFBRSxFQUFFLE1BQU07SUFDMUMsTUFBTSxXQUFXLEdBQUcsZUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTNDLE9BQU87SUFFUCxNQUFNLFdBQVcsR0FBYSxFQUFFLENBQUM7SUFDakMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUN0QyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxlQUFlLEdBQWEsRUFBRSxDQUFDO0lBRXJDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUM1QixNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNwQyxNQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakMsSUFBSSxNQUFNLEdBQUcsV0FBVyxDQUFDLGFBQWEsQ0FBQztRQUN2QyxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFFdEIsSUFBSSxRQUFRLEtBQUssR0FBRyxJQUFJLFFBQVEsS0FBSyxHQUFHO1lBQ3RDLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXJDLElBQ0UsWUFBWSxLQUFLLElBQUk7WUFDckIsWUFBWSxLQUFLLElBQUk7WUFDckIsWUFBWSxLQUFLLElBQUksRUFDckI7WUFDQSxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQixNQUFNLEdBQUcsWUFBWSxDQUFDO1NBQ3ZCO2FBQU0sSUFBSSxTQUFTLEtBQUssR0FBRyxJQUFJLFNBQVMsS0FBSyxHQUFHLElBQUksU0FBUyxLQUFLLEdBQUcsRUFBRTtZQUN0RSxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQixNQUFNLEdBQUcsU0FBUyxDQUFDO1NBQ3BCO1FBRUQsTUFBTSxnQkFBZ0IsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxnQkFBZ0I7WUFDbkIsTUFBTSxJQUFJLEtBQUssQ0FDYixnRkFBZ0YsU0FBUywwRUFBMEUsTUFBTSxDQUFDLElBQUksQ0FDNUssV0FBVyxDQUFDLE9BQU8sQ0FDcEI7aUJBQ0UsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDO2lCQUNqQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FDZixDQUFDO1FBRUosTUFBTSxTQUFTLEdBQWEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFdkQsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzdDLElBQUksS0FBSyxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxLQUFLO2dCQUFFLE9BQU87WUFFbkIsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRO2dCQUFFLEtBQUssR0FBRyxHQUFHLEtBQUssSUFBSSxDQUFDO1lBRXBELElBQ0U7Z0JBQ0UsV0FBVztnQkFDWCxXQUFXO2dCQUNYLGtCQUFrQjtnQkFDbEIsa0JBQWtCO2FBQ25CLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUN0QjtnQkFDQSxJQUFJLE1BQU0sS0FBSyxHQUFHLEVBQUU7b0JBQ2xCLElBQUksSUFBSSxLQUFLLFdBQVcsSUFBSSxJQUFJLEtBQUssa0JBQWtCLEVBQUU7d0JBQ3ZELElBQUksT0FBTyxHQUFHLFdBQVcsQ0FBQzt3QkFDMUIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQzs0QkFBRSxPQUFPLEdBQUcsa0JBQWtCLENBQUM7d0JBQzNELFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxPQUFPLEtBQUssS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQzlDO2lCQUNGO3FCQUFNLElBQUksTUFBTSxLQUFLLEdBQUcsRUFBRTtvQkFDekIsSUFBSSxJQUFJLEtBQUssV0FBVyxJQUFJLElBQUksS0FBSyxrQkFBa0IsRUFBRTt3QkFDdkQsSUFBSSxPQUFPLEdBQUcsV0FBVyxDQUFDO3dCQUMxQixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDOzRCQUFFLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQzt3QkFDM0QsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLE9BQU8sS0FBSyxLQUFLLEdBQUcsQ0FBQyxDQUFDO3FCQUMxQztpQkFDRjtxQkFBTSxJQUFJLE1BQU0sS0FBSyxHQUFHLEVBQUU7b0JBQ3pCLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEtBQUssS0FBSyxHQUFHLENBQUMsQ0FBQztpQkFDdkM7cUJBQU0sSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO29CQUMxQixJQUFJLElBQUksS0FBSyxXQUFXLElBQUksSUFBSSxLQUFLLGtCQUFrQixFQUFFO3dCQUN2RCxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxLQUFLLEtBQUssR0FBRyxDQUFDLENBQUM7cUJBQ3ZDO2lCQUNGO3FCQUFNLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtvQkFDMUIsSUFBSSxJQUFJLEtBQUssV0FBVyxJQUFJLElBQUksS0FBSyxrQkFBa0IsRUFBRTt3QkFDdkQsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksS0FBSyxLQUFLLEdBQUcsQ0FBQyxDQUFDO3FCQUN2QztpQkFDRjtxQkFBTTtvQkFDTCxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxLQUFLLEtBQUssR0FBRyxDQUFDLENBQUM7aUJBQ3ZDO2FBQ0Y7aUJBQU07Z0JBQ0wsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksS0FBSyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2FBQ3ZDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLFFBQVEsS0FBSyxHQUFHLEVBQUU7WUFDcEIsU0FBUyxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1NBQzVDO2FBQU0sSUFBSSxRQUFRLEtBQUssR0FBRyxFQUFFO1lBQzNCLFNBQVMsQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQztTQUMzQztRQUVELGVBQWUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ2hELENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxHQUFHLEdBQUcsaUJBQVMsQ0FBQyxLQUFLLENBQUMsVUFBVSxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUV0RSxhQUFhO0lBQ2IsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUVsQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLENBQUM7QUF6R0QsNEJBeUdDIn0=