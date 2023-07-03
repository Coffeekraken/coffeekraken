import __SEnv from '@coffeekraken/s-env';
import { __get } from '@coffeekraken/sugar/object';
export default function __i18n(str, settings) {
    var _a, _b, _c;
    const finalSettings = Object.assign({ tokens: {} }, (settings !== null && settings !== void 0 ? settings : {}));
    const i18n = (_a = __SEnv.get('i18n')) !== null && _a !== void 0 ? _a : {};
    // get the correct translation
    let translation;
    if (finalSettings.id) {
        translation = (_b = i18n[finalSettings.id]) !== null && _b !== void 0 ? _b : __get(i18n, finalSettings.id);
    }
    if (!translation) {
        translation = (_c = i18n[str]) !== null && _c !== void 0 ? _c : str;
    }
    // get all the tokens in the translation
    const tokens = ` ${translation} `.match(/(__\([^__\)]*\)__|(?!\|)%[a-zA-Z0-9])/gm);
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
            translation = translation.replaceAll(new RegExp(`([^\(])?${token}`, 'g'), `$1${tokenValue}`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQXdGbkQsTUFBTSxDQUFDLE9BQU8sVUFBVSxNQUFNLENBQzFCLEdBQVcsRUFDWCxRQUFpQzs7SUFFakMsTUFBTSxhQUFhLG1CQUNmLE1BQU0sRUFBRSxFQUFFLElBQ1AsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLE1BQUEsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsbUNBQUksRUFBRSxDQUFDO0lBRXRDLDhCQUE4QjtJQUM5QixJQUFJLFdBQVcsQ0FBQztJQUNoQixJQUFJLGFBQWEsQ0FBQyxFQUFFLEVBQUU7UUFDbEIsV0FBVyxHQUFHLE1BQUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsbUNBQUksS0FBSyxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDekU7SUFDRCxJQUFJLENBQUMsV0FBVyxFQUFFO1FBQ2QsV0FBVyxHQUFHLE1BQUEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxtQ0FBSSxHQUFHLENBQUM7S0FDbEM7SUFFRCx3Q0FBd0M7SUFDeEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxXQUFXLEdBQUcsQ0FBQyxLQUFLLENBQ25DLHlDQUF5QyxDQUM1QyxDQUFDO0lBRUYsZ0RBQWdEO0lBQ2hELElBQUksQ0FBQyxNQUFNLEVBQUU7UUFDVCxPQUFPLFdBQVcsQ0FBQztLQUN0QjtJQUVELFNBQVMsYUFBYSxDQUFDLENBQVM7O1FBQzVCLE9BQU8sQ0FDSCxNQUFBLE1BQUEsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsbUNBQ3ZCLGFBQWEsQ0FBQyxN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