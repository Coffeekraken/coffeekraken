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
exports.define = void 0;
const s_feature_1 = __importDefault(require("@coffeekraken/s-feature"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const STemplateFeatureInterface_1 = __importDefault(require("./interface/STemplateFeatureInterface"));
/**
 * @name            STemplateFeature
 * @as              Template features
 * @namespace       js
 * @type            Feature
 * @interface       ./interface/STemplateFeatureInterface.ts
 * @menu            Styleguide / Features               /styleguide/feature/s-sugar-feature
 * @platform        js
 * @status          beta
 *
 * This feature allows you to scope your sections, etc... inside a "template" tag to avoid rendering it directly. It will then be rendered
 * as soon as your section comes near the viewport.
 *
 * @support          chromium
 * @support          firefox
 * @support          safari
 * @support          edge
 *
 * @example         html        Simple usage        Simply add the `s-sugar` property on your body tag
 * <template s-template>
 *      <!-- my normal code... -->
 * </template>
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class STemplateFeature extends s_feature_1.default {
    constructor(name, node, settings) {
        super(name, node, (0, deepMerge_1.default)({
            name: 's-template',
            interface: STemplateFeatureInterface_1.default,
        }, settings !== null && settings !== void 0 ? settings : {}));
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            this.node.after(this.node.content);
        });
    }
}
exports.default = STemplateFeature;
function define(props = {}, name = 's-template') {
    s_feature_1.default.defineFeature(name, STemplateFeature, props);
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHdFQUFpRDtBQUNqRCw0RkFBc0U7QUFDdEUsc0dBQWdGO0FBSWhGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsTUFBcUIsZ0JBQWlCLFNBQVEsbUJBQVU7SUFDcEQsWUFBWSxJQUFZLEVBQUUsSUFBaUIsRUFBRSxRQUFhO1FBQ3RELEtBQUssQ0FDRCxJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUEsbUJBQVcsRUFDUDtZQUNJLElBQUksRUFBRSxZQUFZO1lBQ2xCLFNBQVMsRUFBRSxtQ0FBMkI7U0FDekMsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztJQUNOLENBQUM7SUFDSyxLQUFLOztZQUNQLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkMsQ0FBQztLQUFBO0NBQ0o7QUFqQkQsbUNBaUJDO0FBRUQsU0FBZ0IsTUFBTSxDQUNsQixRQUF5QyxFQUFFLEVBQzNDLElBQUksR0FBRyxZQUFZO0lBRW5CLG1CQUFVLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUM1RCxDQUFDO0FBTEQsd0JBS0MifQ==