import __SEnv from '@coffeekraken/s-env';
import { __get } from '@coffeekraken/sugar/object';
export default function __i18n(str, settings) {
    var _a, _b, _c;
    const finalSettings = Object.assign({ tokens: {} }, (settings !== null && settings !== void 0 ? settings : {}));
    const i18n = (_a = __SEnv.get('i18n')) !== null && _a !== void 0 ? _a : {};
    let translation;
    if (finalSettings.id) {
        translation = (_b = i18n[finalSettings.id]) !== null && _b !== void 0 ? _b : __get(i18n, finalSettings.id);
    }
    if (!translation) {
        translation = (_c = i18n[str]) !== null && _c !== void 0 ? _c : str;
    }
    // replace tokens
    for (let [token, value] of Object.entries(finalSettings.tokens)) {
        translation = translation.replace(token, value);
    }
    return translation;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQXlCbkQsTUFBTSxDQUFDLE9BQU8sVUFBVSxNQUFNLENBQzFCLEdBQVcsRUFDWCxRQUFpQzs7SUFFakMsTUFBTSxhQUFhLG1CQUNmLE1BQU0sRUFBRSxFQUFFLElBQ1AsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLE1BQUEsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsbUNBQUksRUFBRSxDQUFDO0lBRXRDLElBQUksV0FBVyxDQUFDO0lBQ2hCLElBQUksYUFBYSxDQUFDLEVBQUUsRUFBRTtRQUNsQixXQUFXLEdBQUcsTUFBQSxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxtQ0FBSSxLQUFLLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUN6RTtJQUNELElBQUksQ0FBQyxXQUFXLEVBQUU7UUFDZCxXQUFXLEdBQUcsTUFBQSxJQUFJLENBQUMsR0FBRyxDQUFDLG1DQUFJLEdBQUcsQ0FBQztLQUNsQztJQUVELGlCQUFpQjtJQUNqQixLQUFLLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDN0QsV0FBVyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ25EO0lBRUQsT0FBTyxXQUFXLENBQUM7QUFDdkIsQ0FBQyJ9