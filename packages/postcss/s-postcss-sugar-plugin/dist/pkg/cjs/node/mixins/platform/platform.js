"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const fs_1 = require("@coffeekraken/sugar/fs");
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const base64_1 = __importDefault(require("@coffeekraken/sugar/shared/crypt/base64"));
const fs_2 = __importDefault(require("fs"));
/**
 * @name           platform
 * @namespace      node.mixin.platform
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the css needed to display correctly a "platform" icon like
 * css, node, js, php, etc...
 *
 * @param         {IPostcssSugarPluginAssetPlatformParams}    params      The parameters object
 * @return        {Css}         The generated css
 *
 * @example        css
 * .my-platform {
 *    \@sugar.platform(css);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginAssetPlatformInterface extends s_interface_1.default {
    static get _definition() {
        return {
            platform: {
                type: 'String',
                values: ['js', 'node', 'ts', 'php'],
                required: true,
            },
        };
    }
}
exports.interface = postcssSugarPluginAssetPlatformInterface;
function default_1({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ platform: '' }, params);
    const vars = [];
    const svgPath = `${(0, packageRoot_1.default)((0, fs_1.__dirname)())}/src/img/platforms/${finalParams.platform}.svg`;
    if (!fs_2.default.existsSync(svgPath)) {
        throw new Error(`<red>[s-postcss-sugar-plugin]</red> Sorry but the requested platform "<yellow>${finalParams.platform}</yellow>" does not exists...`);
    }
    const svgStr = fs_2.default.readFileSync(svgPath, 'utf8');
    vars.push(`
    display: inline-block;
    vertical-align: middle;
    width: 1em;
    height: 1em;
    background-size: contain;
    background-image: url("data:image/svg+xml;base64,${base64_1.default.encrypt(svgStr)}");
  `);
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCwrQ0FBbUQ7QUFDbkQsNEZBQXNFO0FBQ3RFLHFGQUErRDtBQUMvRCw0Q0FBc0I7QUFFdEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsTUFBTSx3Q0FBeUMsU0FBUSxxQkFBWTtJQUMvRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQztnQkFDbkMsUUFBUSxFQUFFLElBQUk7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBTW9ELDZEQUFTO0FBRTlELG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixRQUFRLEVBQUUsRUFBRSxJQUNULE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE1BQU0sT0FBTyxHQUFHLEdBQUcsSUFBQSxxQkFBYSxFQUFDLElBQUEsY0FBUyxHQUFFLENBQUMsc0JBQ3pDLFdBQVcsQ0FBQyxRQUNoQixNQUFNLENBQUM7SUFFUCxJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUMzQixNQUFNLElBQUksS0FBSyxDQUNYLGlGQUFpRixXQUFXLENBQUMsUUFBUSwrQkFBK0IsQ0FDdkksQ0FBQztLQUNMO0lBQ0QsTUFBTSxNQUFNLEdBQUcsWUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFFbEQsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7O3VEQU15QyxnQkFBUSxDQUFDLE9BQU8sQ0FDL0QsTUFBTSxDQUNUO0dBQ0YsQ0FBQyxDQUFDO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQXZDRCw0QkF1Q0MifQ==