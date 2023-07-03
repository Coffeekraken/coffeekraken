"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const crypto_1 = require("@coffeekraken/sugar/crypto");
const fs_1 = require("@coffeekraken/sugar/fs");
const path_1 = require("@coffeekraken/sugar/path");
const fs_2 = __importDefault(require("fs"));
/**
 * @__name           platform
 * @__namespace      node.mixin.platform
 * @__type           PostcssMixin
 * @__platform      postcss
 * @__status        wip
 *
 * This mixin generate all the css needed to display correctly a "platform" icon like
 * css, node, js, php, etc...
 *
 * @__param         {IPostcssSugarPluginAssetPlatformParams}    params      The parameters object
 * @__return        {Css}         The generated css
 *
 * @__snippet         @sugar.platform($1)
 *
 * @__example        css
 * .my-platform {
 *    \@sugar.platform(css);
 * }
 *
 * @__since       2.0.0
 * @__author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
    const svgPath = `${(0, path_1.__packageRootDir)((0, fs_1.__dirname)())}/src/img/platforms/${finalParams.platform}.svg`;
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
    background-image: url("data:image/svg+xml;base64,${crypto_1.__base64.encrypt(svgStr)}");
  `);
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCx1REFBc0Q7QUFDdEQsK0NBQW1EO0FBQ25ELG1EQUE0RDtBQUM1RCw0Q0FBc0I7QUFFdEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFFSCxNQUFNLHdDQUF5QyxTQUFRLHFCQUFZO0lBQy9ELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxRQUFRLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDO2dCQUNuQyxRQUFRLEVBQUUsSUFBSTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNb0QsNkRBQVM7QUFFOUQsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLFFBQVEsRUFBRSxFQUFFLElBQ1QsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsTUFBTSxPQUFPLEdBQUcsR0FBRyxJQUFBLHVCQUFnQixFQUFDLElBQUEsY0FBUyxHQUFFLENBQUMsc0JBQzVDLFdBQVcsQ0FBQyxRQUNoQixNQUFNLENBQUM7SUFFUCxJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUMzQixNQUFNLElBQUksS0FBSyxDQUNYLGlGQUFpRixXQUFXLENBQUMsUUFBUSwrQkFBK0IsQ0FDdkksQ0FBQztLQUNMO0lBQ0QsTUFBTSxNQUFNLEdBQUcsWUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFFbEQsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7O3VEQU15QyxpQkFBUSxDQUFDLE9BQU8sQ0FDL0QsTUFBTSxDQUNUO0dBQ0YsQ0FBQyxDQUFDO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQXZDRCw0QkF1Q0MifQ==