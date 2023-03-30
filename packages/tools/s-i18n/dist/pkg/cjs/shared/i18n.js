"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_env_1 = __importDefault(require("@coffeekraken/s-env"));
const object_1 = require("@coffeekraken/sugar/object");
function __i18n(str, settings) {
    var _a, _b, _c;
    const finalSettings = Object.assign({ tokens: {} }, (settings !== null && settings !== void 0 ? settings : {}));
    const i18n = (_a = s_env_1.default.get('i18n')) !== null && _a !== void 0 ? _a : {};
    // get the correct translation
    let translation;
    if (finalSettings.id) {
        translation = (_b = i18n[finalSettings.id]) !== null && _b !== void 0 ? _b : (0, object_1.__get)(i18n, finalSettings.id);
    }
    if (!translation) {
        translation = (_c = i18n[str]) !== null && _c !== void 0 ? _c : str;
    }
    // get all the tokens in the translation
    const tokens = translation.match(/(__\([^__\)]*\)__|(?!\|)%[a-zA-Z0-9])/gm);
    // if no tokens, return the translation directly
    if (!tokens) {
        return translation;
    }
    function getTokenValue(t) {
        var _a, _b;
        return ((_b = (_a = finalSettings.tokens[t]) !== null && _a !== void 0 ? _a : finalSettings.tokens[t.replace(/^%/, '')]) !== null && _b !== void 0 ? _b : t);
    }
    let currentToken;
    tokens.forEach((token) => {
        var _a;
        if (token.match(/^%/)) {
            currentToken = token;
            const tokenValue = getTokenValue(token);
            translation = translation.replaceAll(new RegExp(`([^\(])${token}`, 'g'), `$1${tokenValue}`);
        }
        else {
            // pluralize token
            const tokenMatch = token.match(/\|(%[a-zA-Z0-9]+)\)__/), activeToken = (_a = tokenMatch === null || tokenMatch === void 0 ? void 0 : tokenMatch[1]) !== null && _a !== void 0 ? _a : currentToken, tokenValue = getTokenValue(activeToken);
            if (typeof tokenValue !== 'number') {
                translation = translation.replace(token, `**(invalid token "${activeToken}" for pluralization)**`);
                return;
            }
            // trick to keep "\|" string
            token = token.replace(/\\\|/gm, '_$_');
            let parts = token.split(/\|/gm);
            parts = parts.map((p) => {
                return p
                    .replace(/_\$_/gm, '|')
                    .replace(/^__\(/, '')
                    .replace(/\)__$/, '');
            });
            // take | back in the token
            token = token.replace(/_\$_/gm, '\\|');
            if (parts.length === 1) {
                // item__(s)__
                translation = translation.replace(token, tokenValue > 1 ? parts[0] : '');
            }
            else if (parts.length === 2 && parts[0].match(/^%[a-zA-Z0-9]+/)) {
                // item__(s|%s)__
                translation = translation.replace(token, tokenValue > 1 ? parts[1] : '');
            }
            else if (parts.length === 2 &&
                !parts[0].match(/^%[a-zA-Z0-9]+/)) {
                // __(item|items)__
                translation = translation.replace(token, tokenValue > 1 ? parts[1] : parts[0]);
            }
            else if (parts.length === 3) {
                // __(%s|item|items)
                translation = translation.replace(token, tokenValue > 1 ? parts[2] : parts[1]);
            }
        }
    });
    return translation;
}
exports.default = __i18n;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0VBQXlDO0FBQ3pDLHVEQUFtRDtBQXdGbkQsU0FBd0IsTUFBTSxDQUMxQixHQUFXLEVBQ1gsUUFBaUM7O0lBRWpDLE1BQU0sYUFBYSxtQkFDZixNQUFNLEVBQUUsRUFBRSxJQUNQLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxNQUFBLGVBQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLG1DQUFJLEVBQUUsQ0FBQztJQUV0Qyw4QkFBOEI7SUFDOUIsSUFBSSxXQUFXLENBQUM7SUFDaEIsSUFBSSxhQUFhLENBQUMsRUFBRSxFQUFFO1FBQ2xCLFdBQVcsR0FBRyxNQUFBLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLG1DQUFJLElBQUEsY0FBSyxFQUFDLElBQUksRUFBRSxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDekU7SUFDRCxJQUFJLENBQUMsV0FBVyxFQUFFO1FBQ2QsV0FBVyxHQUFHLE1BQUEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxtQ0FBSSxHQUFHLENBQUM7S0FDbEM7SUFFRCx3Q0FBd0M7SUFDeEMsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO0lBRTVFLGdEQUFnRDtJQUNoRCxJQUFJLENBQUMsTUFBTSxFQUFFO1FBQ1QsT0FBTyxXQUFXLENBQUM7S0FDdEI7SUFFRCxTQUFTLGFBQWEsQ0FBQyxDQUFTOztRQUM1QixPQUFPLENBQ0gsTUFBQSxNQUFBLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLG1DQUN2QixhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLG1DQUN6QyxDQUFD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