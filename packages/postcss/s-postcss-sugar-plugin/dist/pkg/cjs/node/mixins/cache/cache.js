"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const sha256_1 = __importDefault(require("@coffeekraken/sugar/shared/crypt/sha256"));
const fs_1 = __importDefault(require("fs"));
/**
 * @name           cache
 * @namespace      node.mixin.cache
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to cache some generated css to avoid generating it when it's not absolutely necessary.
 * This cache depends on the config.theme configuration as well as on the @coffeekraken/s-postcss-sugar-plugin integrity.
 * You can always clear the cache manually using the command `sugar postcss.clearCache`
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * @sugar.cache {
 *   @sugar.classes;
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
        return atRule;
    }
    const vars = new CssVars();
    const contentStr = atRule
        .toString()
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line !== '')
        .join('\n');
    const contentHash = sha256_1.default.encrypt(contentStr);
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
        /* SCACHE:${cacheId} */
        ${nodesToString(atRule.nodes)}
        /* SENDCACHE:${cacheId} */
    `);
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxxRkFBK0Q7QUFDL0QsNENBQXNCO0FBRXRCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE1BQU0sZ0NBQWlDLFNBQVEscUJBQVk7SUFDdkQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEVBQUUsRUFBRTtnQkFDQSxJQUFJLEVBQUUsUUFBUTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNNEMscURBQVM7QUFFdEQsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFVBQVUsRUFDVixTQUFTLEVBQ1QsUUFBUSxFQUNSLGFBQWEsRUFDYixRQUFRLEVBQ1IsV0FBVyxHQVdkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEVBQUUsRUFBRSxFQUFFLElBQ0gsTUFBTSxDQUNaLENBQUM7SUFFRixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRTtRQUNqQixPQUFPLE1BQU0sQ0FBQztLQUNqQjtJQUVELE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFDM0IsTUFBTSxVQUFVLEdBQUcsTUFBTTtTQUNwQixRQUFRLEVBQUU7U0FDVixLQUFLLENBQUMsSUFBSSxDQUFDO1NBQ1gsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDMUIsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDO1NBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUVoQixNQUFNLFdBQVcsR0FBRyxnQkFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNqRCxJQUFJLE9BQU8sR0FBRyxHQUFHLFVBQVUsSUFBSSxTQUFTLElBQUksV0FBVyxFQUFFLENBQUM7SUFDMUQsSUFBSSxXQUFXLENBQUMsRUFBRSxFQUFFO1FBQ2hCLE9BQU8sSUFBSSxJQUFJLFdBQVcsQ0FBQyxFQUFFLEVBQUUsQ0FBQztLQUNuQztJQUVELHdCQUF3QjtJQUN4QixJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxRQUFRLElBQUksT0FBTyxNQUFNLENBQUMsRUFBRTtRQUMvQyxPQUFPLENBQUMsR0FBRyxDQUNQLDZEQUNJLFdBQVcsQ0FBQyxFQUFFLElBQUksT0FDdEIsVUFBVSxDQUNiLENBQUM7UUFDRixNQUFNLE9BQU8sR0FBRyxZQUFJO2FBQ2YsWUFBWSxDQUFDLEdBQUcsUUFBUSxJQUFJLE9BQU8sTUFBTSxDQUFDO2FBQzFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkIsT0FBTyxJQUFJLENBQUM7S0FDZjtJQUVELDZEQUE2RDtJQUM3RCxPQUFPLENBQUMsR0FBRyxDQUNQLG9EQUNJLFdBQVcsQ0FBQyxFQUFFLElBQUksT0FDdEIsNkNBQTZDLENBQ2hELENBQUM7SUFDRixJQUFJLENBQUMsSUFBSSxDQUFDO29CQUNNLE9BQU87VUFDakIsYUFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7dUJBQ2QsT0FBTztLQUN6QixDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBdkVELDRCQXVFQyJ9