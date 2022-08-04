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
import __sha256 from '@coffeekraken/sugar/shared/crypt/sha256';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFJZCxPQUFPLGdCQUFnQixNQUFNLGdDQUFnQyxDQUFDO0FBQzlELE9BQU8sUUFBUSxNQUFNLHlDQUF5QyxDQUFDO0FBQy9ELE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBdUJ0RSxNQUFNLENBQUMsT0FBTyxPQUFPLG9CQUFxQixTQUFRLGdCQUFnQjtJQUc5RCxZQUFZLElBQUksRUFBRSxRQUFnRDtRQUM5RCxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxRQUFRLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBRUssU0FBUzs7WUFDWCxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDMUQsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztLQUFBO0lBRUssSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLEVBQUUsR0FBbUIsRUFBRSxTQUFTOztZQUN6RCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdEIsQ0FBQztLQUFBO0NBQ0oifQ==