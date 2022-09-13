// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SConfigAdapter from '@coffeekraken/s-config-adapter';
import { __sha256 } from '@coffeekraken/sugar/crypto';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
export default class SConfigInlineAdapter extends __SConfigAdapter {
    constructor(json, settings) {
        super(__deepMerge({}, settings || {}));
        this._json = json;
    }
    integrity() {
        return __awaiter(this, void 0, void 0, function* () {
            const hash = __sha256.encrypt(JSON.stringify(this._json));
            return hash;
        });
    }
    load(clearCache = false, env, configObj) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._json;
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFJZCxPQUFPLGdCQUFnQixNQUFNLGdDQUFnQyxDQUFDO0FBQzlELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN0RCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQXVCdEUsTUFBTSxDQUFDLE9BQU8sT0FBTyxvQkFBcUIsU0FBUSxnQkFBZ0I7SUFHOUQsWUFBWSxJQUFJLEVBQUUsUUFBZ0Q7UUFDOUQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQUVLLFNBQVM7O1lBQ1gsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzFELE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7S0FBQTtJQUVLLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxFQUFFLEdBQW1CLEVBQUUsU0FBUzs7WUFDekQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7S0FBQTtDQUNKIn0=