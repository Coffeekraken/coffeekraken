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
class SConfigJsonAdapter extends s_config_adapter_1.default {
    constructor(json, settings) {
        super((0, deepMerge_1.default)({}, settings || {}));
        this._json = json;
    }
    get configJsonAdapterSettings() {
        return this.settings.configJsonAdapter;
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
exports.default = SConfigJsonAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUdkLHNGQUE4RDtBQUM5RCxxRkFBK0Q7QUFDL0QsNEZBQXNFO0FBMEJ0RSxNQUFxQixrQkFBbUIsU0FBUSwwQkFBZ0I7SUFPNUQsWUFBWSxJQUFJLEVBQUUsUUFBa0Q7UUFDaEUsS0FBSyxDQUFDLElBQUEsbUJBQVcsRUFBQyxFQUFFLEVBQUUsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQVRELElBQUkseUJBQXlCO1FBQ3pCLE9BQWEsSUFBSyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQztJQUNsRCxDQUFDO0lBU0ssU0FBUzs7WUFDWCxNQUFNLElBQUksR0FBRyxnQkFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzFELE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7S0FBQTtJQUVLLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxFQUFFLEdBQW1CLEVBQUUsU0FBUzs7WUFDekQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7S0FBQTtDQUNKO0FBcEJELHFDQW9CQyJ9