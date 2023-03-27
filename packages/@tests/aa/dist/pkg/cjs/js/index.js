"use strict";
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
const s_feature_1 = __importDefault(require("@coffeekraken/s-feature"));
const s_front_1 = __importDefault(require("@coffeekraken/s-front"));
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const s_pack_essentials_1 = __importDefault(require("@coffeekraken/s-pack-essentials"));
// Views related
const viewsRelated = import.meta.globEager('../views/**/*.ts');
// Init script
(() => __awaiter(void 0, void 0, void 0, function* () {
    // Set some features defaults
    s_feature_1.default.setDefaultProps('*', {});
    // Set some components defaults
    s_lit_component_1.default.setDefaultProps('*', {});
    // Init front (theme, etc...)
    s_front_1.default.init({});
    // Essentials
    (0, s_pack_essentials_1.default)();
    // Features
    // ...
    // Components
    // ...
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0VBQWlEO0FBQ2pELG9FQUE2QztBQUM3QyxvRkFBNEQ7QUFDNUQsd0ZBQWdFO0FBRWhFLGdCQUFnQjtBQUNoQixNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBRS9ELGNBQWM7QUFDZCxDQUFDLEdBQVMsRUFBRTtJQUNSLDZCQUE2QjtJQUM3QixtQkFBVSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFcEMsK0JBQStCO0lBQy9CLHlCQUFlLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUV6Qyw2QkFBNkI7SUFDN0IsaUJBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFbEIsYUFBYTtJQUNiLElBQUEsMkJBQWlCLEdBQUUsQ0FBQztJQUVwQixXQUFXO0lBQ1gsTUFBTTtJQUVOLGFBQWE7SUFDYixNQUFNO0FBQ1YsQ0FBQyxDQUFBLENBQUMsRUFBRSxDQUFDIn0=