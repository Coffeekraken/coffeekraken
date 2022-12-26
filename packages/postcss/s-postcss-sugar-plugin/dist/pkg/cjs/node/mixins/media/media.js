"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const string_1 = require("@coffeekraken/sugar/string");
class postcssSugarPluginMediaMixinInterface extends s_interface_1.default {
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
exports.interface = postcssSugarPluginMediaMixinInterface;
/**
 * @name           media
 * @namespace      node.mixin.media
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
 * @example        css
 * @sugar.media >=desktop {
 *      // ...
 * }
 * @sugar.media tablet {
 *      // ...
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1({ params, atRule, postcssApi, registerPostProcessor, }) {
    var _a;
    const mediaConfig = s_theme_1.default.get('media');
    const queries = [];
    Object.keys(params).forEach((queryId) => {
        const query = params[queryId].trim();
        query.split(',').forEach((q) => {
            queries.push(q.trim());
        });
    });
    let fullQueriesList = [];
    queries.forEach((query) => {
        const currentQueryList = [];
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
            prop = (0, string_1.__dashCase)(prop);
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
    fullQueriesList = fullQueriesList.filter((l) => l.trim() !== '');
    if (fullQueriesList.length) {
        fullQueriesList.unshift('and');
    }
    fullQueriesList.unshift(mediaConfig.defaultQuery);
    const mediaRule = new postcssApi.AtRule({
        name: 'media',
        params: fullQueriesList.join(' '),
    });
    (_a = atRule.nodes) === null || _a === void 0 ? void 0 : _a.forEach((node) => {
        mediaRule.append(node);
    });
    atRule.replaceWith(mediaRule);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0MsdURBQXdEO0FBRXhELE1BQU0scUNBQXNDLFNBQVEscUJBQVk7SUFDNUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsUUFBUTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDaUQsMERBQVM7QUFFM0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sVUFBVSxFQUNWLHFCQUFxQixHQU14Qjs7SUFDRyxNQUFNLFdBQVcsR0FBRyxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUUxQyxNQUFNLE9BQU8sR0FBYSxFQUFFLENBQUM7SUFFN0IsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUNwQyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDckMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENB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