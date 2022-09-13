import __SInterface from '@coffeekraken/s-interface';
import { __sha256 } from '@coffeekraken/sugar/crypto';
import __fs from 'fs';
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
class postcssSugarPluginCacheInterface extends __SInterface {
    static get _definition() {
        return {
            id: {
                type: 'String',
            },
        };
    }
}
export { postcssSugarPluginCacheInterface as interface };
export default function ({ params, atRule, CssVars, pluginHash, themeHash, cacheDir, nodesToString, settings, replaceWith, }) {
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
    const contentHash = __sha256.encrypt(contentStr);
    let cacheId = `${pluginHash}=${themeHash}=${contentHash}`;
    if (finalParams.id) {
        cacheId += `=${finalParams.id}`;
    }
    // check if cache exists
    if (__fs.existsSync(`${cacheDir}/${cacheId}.css`)) {
        console.log(`<green>[cache]</green> Content resolved from cache "<cyan>${finalParams.id || cacheId}</cyan>"`);
        const content = __fs
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN0RCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFFdEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsTUFBTSxnQ0FBaUMsU0FBUSxZQUFZO0lBQ3ZELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxFQUFFLEVBQUU7Z0JBQ0EsSUFBSSxFQUFFLFFBQVE7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBTUQsT0FBTyxFQUFFLGdDQUFnQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRXpELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsVUFBVSxFQUNWLFNBQVMsRUFDVCxRQUFRLEVBQ1IsYUFBYSxFQUNiLFFBQVEsRUFDUixXQUFXLEdBV2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsRUFBRSxFQUFFLEVBQUUsSUFDSCxNQUFNLENBQ1osQ0FBQztJQUVGLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFO1FBQ2pCLE9BQU8sYUFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN0QztJQUVELE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFDM0IsTUFBTSxVQUFVLEdBQUcsTUFBTTtTQUNwQixRQUFRLEVBQUU7U0FDVixLQUFLLENBQUMsSUFBSSxDQUFDO1NBQ1gsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDMUIsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDO1NBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUVoQixNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2pELElBQUksT0FBTyxHQUFHLEdBQUcsVUFBVSxJQUFJLFNBQVMsSUFBSSxXQUFXLEVBQUUsQ0FBQztJQUMxRCxJQUFJLFdBQVcsQ0FBQyxFQUFFLEVBQUU7UUFDaEIsT0FBTyxJQUFJLElBQUksV0FBVyxDQUFDLEVBQUUsRUFBRSxDQUFDO0tBQ25DO0lBRUQsd0JBQXdCO0lBQ3hCLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFFBQVEsSUFBSSxPQUFPLE1BQU0sQ0FBQyxFQUFFO1FBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQ1AsNkRBQ0ksV0FBVyxDQUFDLEVBQUUsSUFBSSxPQUN0QixVQUFVLENBQ2IsQ0FBQztRQUNGLE1BQU0sT0FBTyxHQUFHLElBQUk7YUFDZixZQUFZLENBQUMsR0FBRyxRQUFRLElBQUksT0FBTyxNQUFNLENBQUM7YUFDMUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNuQixPQUFPLElBQUksQ0FBQztLQUNmO0lBRUQsNkRBQTZEO0lBQzdELE9BQU8sQ0FBQyxHQUFHLENBQ1Asb0RBQ0ksV0FBVyxDQUFDLEVBQUUsSUFBSSxPQUN0Qiw2Q0FBNkMsQ0FDaEQsQ0FBQztJQUNGLElBQUksQ0FBQyxJQUFJLENBQUM7cUJBQ08sT0FBTztVQUNsQixhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQzt3QkFDYixPQUFPO0tBQzFCLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==