"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import __micromatch from 'micromatch';
const s_frontspec_1 = __importDefault(require("@coffeekraken/s-frontspec"));
const dashCase_1 = __importDefault(require("@coffeekraken/sugar/shared/string/dashCase"));
const string_1 = require("@coffeekraken/sugar/string");
function buildMediaQuery(queryString, settings) {
    var _a, _b;
    let currentQueryList = [];
    const finalSettings = {
        media: undefined,
        method: settings === null || settings === void 0 ? void 0 : settings.method,
        containerName: settings === null || settings === void 0 ? void 0 : settings.containerName,
    };
    if (!finalSettings.media) {
        finalSettings.media = s_frontspec_1.default.get('media');
    }
    if (!finalSettings.media) {
        throw new Error(`<red>[buildMediaQuery]</red> To build your media queries, you MUST specify at least the settings.media or having a frontspec.json file specifies in your document.env.FRONTSPEC`);
    }
    const mediaConfig = this.sortMedia(Object.assign({}, finalSettings.media)), sortedMedia = Object.keys(mediaConfig.queries);
    if (!finalSettings.method) {
        finalSettings.method = (_a = mediaConfig.method) !== null && _a !== void 0 ? _a : 'media';
        finalSettings.containerName = (_b = mediaConfig.containerName) !== null && _b !== void 0 ? _b : '';
    }
    const queryAr = queryString
        .split(' ')
        .map((l) => l.trim())
        .filter((l) => l !== '');
    queryAr.forEach((query, i) => {
        if (query === 'and' || query === 'or') {
            currentQueryList.push(query);
            return;
        }
        const firstChar = query.slice(0, 1);
        const firstTwoChar = query.slice(0, 2);
        const lastChar = query.slice(-1);
        let action = this.get('media.defaultAction');
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
        let mediaQueryConfig;
        // parse the mediaName to check if it's a number
        if (typeof (0, string_1.__parse)(mediaName) === 'number') {
            switch (action) {
                case '>':
                case '>=':
                    mediaQueryConfig = {
                        minWidth: mediaName,
                        maxWidth: null,
                    };
                    break;
                case '<':
                case '<=':
                    mediaQueryConfig = {
                        minWidth: null,
                        maxWidth: mediaName,
                    };
                    break;
                case '=':
                    mediaQueryConfig = {
                        minWidth: mediaName,
                        maxWidth: mediaName,
                    };
                    break;
            }
        }
        else {
            mediaQueryConfig = this.get('media.queries')[mediaName];
            if (!mediaQueryConfig)
                throw new Error(`<red>[postcssSugarPlugin.media]</red> Sorry but the requested media "<yellow>${mediaName}</yellow>" does not exists in the config. Here's the available medias: ${Object.keys(this.get('media.queries'))
                    .map((l) => `<green>${l}</green>`)
                    .join(',')}`);
        }
        const queryList = [];
        Object.keys(mediaQueryConfig).forEach((prop) => {
            // dash case
            const dashProp = (0, dashCase_1.default)(prop);
            let value = mediaQueryConfig[prop];
            if (!value) {
                if (prop === 'minWidth') {
                    value = 0;
                }
                else if (prop === 'maxWidth') {
                    value = 99999;
                }
            }
            if (['min-width', 'max-width'].indexOf(dashProp) !== -1) {
                if (action === '>') {
                    if (dashProp === 'max-width') {
                        let argName = 'min-width';
                        queryList.push(`(${argName}: ${value + 1}px)`);
                    }
                }
                else if (action === '<') {
                    if (dashProp === 'min-width') {
                        let argName = 'max-width';
                        queryList.push(`(${argName}: ${value}px)`);
                    }
                }
                else if (action === '=') {
                    queryList.push(`(${dashProp}: ${value}px)`);
                }
                else if (action === '>=') {
                    if (sortedMedia.at(-1) === mediaName) {
                        return;
                    }
                    if (dashProp === 'min-width') {
                        queryList.push(`(${dashProp}: ${value}px)`);
                    }
                }
                else if (action === '<=') {
                    if (sortedMedia[0] === mediaName) {
                        return;
                    }
                    if (dashProp === 'max-width') {
                        queryList.push(`(${dashProp}: ${value}px)`);
                    }
                }
                else {
                    queryList.push(`(${dashProp}: ${value}px)`);
                }
            }
            else {
                queryList.push(`(${dashProp}: ${value}px)`);
            }
        });
        if (lastChar === '-') {
            queryList.push('(orientation: landscape)');
        }
        else if (lastChar === '|') {
            queryList.push('(orientation: portrait)');
        }
        currentQueryList.push(queryList.join(' and '));
    });
    currentQueryList = currentQueryList.filter((l) => l.trim() !== '');
    if (finalSettings.method === 'container') {
        return `@container ${finalSettings.containerName} ${currentQueryList.join(' ')}`;
    }
    return `@media ${currentQueryList.join(' ')}`;
}
exports.default = buildMediaQuery;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEseUNBQXlDO0FBQ3pDLDRFQUFxRDtBQUNyRCwwRkFBb0U7QUFDcEUsdURBQXFEO0FBMEJyRCxTQUF3QixlQUFlLENBQ25DLFdBQW1CLEVBQ25CLFFBQTRDOztJQUU1QyxJQUFJLGdCQUFnQixHQUFhLEVBQUUsQ0FBQztJQUVwQyxNQUFNLGFBQWEsR0FBNkI7UUFDNUMsS0FBSyxFQUFFLFNBQVM7UUFDaEIsTUFBTSxFQUFFLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxNQUFNO1FBQ3hCLGFBQWEsRUFBRSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsYUFBYTtLQUN6QyxDQUFDO0lBRUYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUU7UUFDdEIsYUFBYSxDQUFDLEtBQUssR0FBRyxxQkFBWSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNuRDtJQUVELElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFO1FBQ3RCLE1BQU0sSUFBSSxLQUFLLENBQ1gsaUxBQWlMLENBQ3BMLENBQUM7S0FDTDtJQUVELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQ3RFLFdBQVcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUVuRCxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRTtRQUN2QixhQUFhLENBQUMsTUFBTSxHQUFHLE1BQUEsV0FBVyxDQUFDLE1BQU0sbUNBQUksT0FBTyxDQUFDO1FBQ3JELGFBQWEsQ0FBQyxhQUFhLEdBQUcsTUFBQSxXQUFXLENBQUMsYUFBYSxtQ0FBSSxFQUFFLENBQUM7S0FDakU7SUFFRCxN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