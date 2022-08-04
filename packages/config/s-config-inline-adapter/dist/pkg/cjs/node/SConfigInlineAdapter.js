"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_config_adapter_1 = __importDefault(require("@coffeekraken/s-config-adapter"));
const sha256_1 = __importDefault(require("@coffeekraken/sugar/shared/crypt/sha256"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
class SConfigInlineAdapter extends s_config_adapter_1.default {
    constructor(json, settings) {
        super((0, deepMerge_1.default)({}, settings || {}));
        this._json = json;
    }
    integrity() {
        return __awaiter(this, void 0, void 0, function* () {
            const hash = sha256_1.default.encrypt(JSON.stringify(this._json));
            return hash;
        });
    }
    load(clearCache = false, env, configObj) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._json;
        });
    }
}
exports.default = SConfigInlineAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUlkLHNGQUE4RDtBQUM5RCxxRkFBK0Q7QUFDL0QsNEZBQXNFO0FBdUJ0RSxNQUFxQixvQkFBcUIsU0FBUSwwQkFBZ0I7SUFHOUQsWUFBWSxJQUFJLEVBQUUsUUFBZ0Q7UUFDOUQsS0FBSyxDQUFDLElBQUEsbUJBQVcsRUFBQyxFQUFFLEVBQUUsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQUVLLFNBQVM7O1lBQ1gsTUFBTSxJQUFJLEdBQUcsZ0JBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUMxRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO0tBQUE7SUFFSyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssRUFBRSxHQUFtQixFQUFFLFNBQVM7O1lBQ3pELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDO0tBQUE7Q0FDSjtBQWhCRCx1Q0FnQkMifQ==