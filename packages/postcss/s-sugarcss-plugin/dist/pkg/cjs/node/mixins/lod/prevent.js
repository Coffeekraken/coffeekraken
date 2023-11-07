"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
class SSugarcssPluginScopePreventMixinInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = SSugarcssPluginScopePreventMixinInterface;
/**
 * @name           prevent
 * @as          @s.lod.prevent
 * @namespace      node.mixin.scope
 * @type           PostcssMixin
 * @platform        css
 * @status        alpha
 *
 * This mixin allows you to mark some css as not using the "lod" feature.
 * This mean that your inside rules selectors will not be affected and will not
 * have any ".s-lod..." classes added
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @snippet         @s.lod.prevent
 * @s.lod.prevent {
 *      $1
 * }
 *
 * @example        css
 * @s.lod.prevent() {
 *      // ...
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const _noScopesStack = [];
function default_1({ params, sharedData, atRule, settings, postcssApi, }) {
    var _a;
    const finalParams = Object.assign({ scopes: [] }, (params !== null && params !== void 0 ? params : {}));
    // check if the lod feature is enabled or not
    if (!((_a = settings.lod) === null || _a === void 0 ? void 0 : _a.enabled)) {
        atRule.replaceWith(atRule.nodes);
        return;
    }
    atRule.nodes.forEach((node) => {
        if (!node.selector) {
            if (!atRule._parentRule) {
                atRule._parentRule = postcssApi.rule({
                    selector: '&',
                });
                atRule.append(atRule._parentRule);
            }
            atRule._parentRule.append(node);
        }
    });
    // check if the lod feature is enabled or not
    atRule.walkRules((rule) => {
        rule.selectors = rule.selectors.map((sel) => {
            if (sel.match(/\.s-lod-prevent/))
                return sel;
            return `.s-lod-prevent ${sel}`;
        });
    });
    atRule.replaceWith(atRule.nodes);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUdyRCxNQUFNLHlDQUEwQyxTQUFRLHFCQUFZO0lBQ2hFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBQ3FELDhEQUFTO0FBSS9EOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILE1BQU0sY0FBYyxHQUFhLEVBQUUsQ0FBQztBQUNwQyxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLFVBQVUsRUFDVixNQUFNLEVBQ04sUUFBUSxFQUNSLFVBQVUsR0FPYjs7SUFDRyxNQUFNLFdBQVcsR0FBRyxnQkFDaEIsTUFBTSxFQUFFLEVBQUUsSUFDUCxDQUFDLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FBQyxDQUNwQixDQUFDO0lBRUYsNkNBQTZDO0lBQzdDLElBQUksQ0FBQyxDQUFBLE1BQUEsUUFBUSxDQUFDLEdBQUcsMENBQUUsT0FBTyxDQUFBLEVBQUU7UUFDeEIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakMsT0FBTztLQUNWO0lBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRTtnQkFDckIsTUFBTSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO29CQUNqQyxRQUFRLEVBQUUsR0FBRztpQkFDaEIsQ0FBQyxDQUFDO2dCQUNILE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQ3JDO1lBQ0QsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbkM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILDZDQUE2QztJQUM3QyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ3hDLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQztnQkFBRSxPQUFPLEdBQUcsQ0FBQztZQUM3QyxPQUFPLGtCQUFrQixHQUFHLEVBQUUsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDckMsQ0FBQztBQTdDRCw0QkE2Q0MifQ==