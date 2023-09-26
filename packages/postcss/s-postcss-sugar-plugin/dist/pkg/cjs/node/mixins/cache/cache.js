"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const crypto_1 = require("@coffeekraken/sugar/crypto");
const fs_1 = __importDefault(require("fs"));
/**
 * @name           cache
 * @namespace      node.mixin.cache
 * @type           PostcssMixin
 * @platform      postcss
 * @status        wip
 *
 * This mixin allows you to cache some generated css to avoid generating it when it's not absolutely necessary.
 * This cache depends on the config.theme configuration as well as on the @coffeekraken/s-postcss-sugar-plugin integrity.
 * You can always clear the cache manually using the command `sugar postcss.clearCache`
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * \@s.cache {
 *   @s.classes;
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginCacheInterface extends s_interface_1.default {
    static get _definition() {
        return {
            id: {
                type: 'String',
            },
        };
    }
}
exports.interface = postcssSugarPluginCacheInterface;
function default_1({ params, atRule, CssVars, pluginHash, themeHash, cacheDir, nodesToString, settings, replaceWith, }) {
    const finalParams = Object.assign({ id: '' }, params);
    if (!settings.cache) {
        return nodesToString(atRule.nodes);
    }
    const vars = new CssVars();
    const contentStr = atRule
        .toString()
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line !== '')
        .join('\n');
    const contentHash = crypto_1.__sha256.encrypt(contentStr);
    let cacheId = `${pluginHash}=${themeHash}=${contentHash}`;
    if (finalParams.id) {
        cacheId += `=${finalParams.id}`;
    }
    // check if cache exists
    if (fs_1.default.existsSync(`${cacheDir}/${cacheId}.css`)) {
        console.log(`<green>[cache]</green> Content resolved from cache "<cyan>${finalParams.id || cacheId}</cyan>"`);
        const content = fs_1.default
            .readFileSync(`${cacheDir}/${cacheId}.css`)
            .toString();
        vars.code(content);
        return vars;
    }
    // prepare content to be cached using the cache postprocessor
    console.log(`<yellow>[cache]</yellow> Generating cache "<cyan>${finalParams.id || cacheId}</cyan>". <magenta>Please wait</magenta>...`);
    vars.code(`
        /*! SCACHE:${cacheId} */
        ${nodesToString(atRule.nodes)}
        /*! SENDCACHE:${cacheId} */
    `);
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCx1REFBc0Q7QUFDdEQsNENBQXNCO0FBRXRCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE1BQU0sZ0NBQWlDLFNBQVEscUJBQVk7SUFDdkQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEVBQUUsRUFBRTtnQkFDQSxJQUFJLEVBQUUsUUFBUTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNNEMscURBQVM7QUFFdEQsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFVBQVUsRUFDVixTQUFTLEVBQ1QsUUFBUSxFQUNSLGFBQWEsRUFDYixRQUFRLEVBQ1IsV0FBVyxHQVdkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEVBQUUsRUFBRSxFQUFFLElBQ0gsTUFBTSxDQUNaLENBQUM7SUFFRixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRTtRQUNqQixPQUFPLGFBQWEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDdEM7SUFFRCxNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBQzNCLE1BQU0sVUFBVSxHQUFHLE1BQU07U0FDcEIsUUFBUSxFQUFFO1NBQ1YsS0FBSyxDQUFDLElBQUksQ0FBQztTQUNYLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQzFCLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQztTQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFaEIsTUFBTSxXQUFXLEdBQUcsaUJBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDakQsSUFBSSxPQUFPLEdBQUcsR0FBRyxVQUFVLElBQUksU0FBUyxJQUFJLFdBQVcsRUFBRSxDQUFDO0lBQzFELElBQUksV0FBVyxDQUFDLEVBQUUsRUFBRTtRQUNoQixPQUFPLElBQUksSUFBSSxXQUFXLENBQUMsRUFBRSxFQUFFLENBQUM7S0FDbkM7SUFFRCx3QkFBd0I7SUFDeEIsSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsUUFBUSxJQUFJLE9BQU8sTUFBTSxDQUFDLEVBQUU7UUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FDUCw2REFDSSxXQUFXLENBQUMsRUFBRSxJQUFJLE9BQ3RCLFVBQVUsQ0FDYixDQUFDO1FBQ0YsTUFBTSxPQUFPLEdBQUcsWUFBSTthQUNmLFlBQVksQ0FBQyxHQUFHLFFBQVEsSUFBSSxPQUFPLE1BQU0sQ0FBQzthQUMxQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25CLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFFRCw2REFBNkQ7SUFDN0QsT0FBTyxDQUFDLEdBQUcsQ0FDUCxvREFDSSxXQUFXLENBQUMsRUFBRSxJQUFJLE9BQ3RCLDZDQUE2QyxDQUNoRCxDQUFDO0lBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQztxQkFDTyxPQUFPO1VBQ2xCLGFBQWEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO3dCQUNiLE9BQU87S0FDMUIsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQXZFRCw0QkF1RUMifQ==