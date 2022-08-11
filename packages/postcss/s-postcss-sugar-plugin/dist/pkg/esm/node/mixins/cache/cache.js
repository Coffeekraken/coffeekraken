import __SInterface from '@coffeekraken/s-interface';
import __sha256 from '@coffeekraken/sugar/shared/crypt/sha256';
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
        return atRule;
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
        /* SCACHE:${cacheId} */
        ${nodesToString(atRule.nodes)}
        /* SENDCACHE:${cacheId} */
    `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHlDQUF5QyxDQUFDO0FBQy9ELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUV0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxNQUFNLGdDQUFpQyxTQUFRLFlBQVk7SUFDdkQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEVBQUUsRUFBRTtnQkFDQSxJQUFJLEVBQUUsUUFBUTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNRCxPQUFPLEVBQUUsZ0NBQWdDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFekQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxVQUFVLEVBQ1YsU0FBUyxFQUNULFFBQVEsRUFDUixhQUFhLEVBQ2IsUUFBUSxFQUNSLFdBQVcsR0FXZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixFQUFFLEVBQUUsRUFBRSxJQUNILE1BQU0sQ0FDWixDQUFDO0lBRUYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUU7UUFDakIsT0FBTyxNQUFNLENBQUM7S0FDakI7SUFFRCxNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBQzNCLE1BQU0sVUFBVSxHQUFHLE1BQU07U0FDcEIsUUFBUSxFQUFFO1NBQ1YsS0FBSyxDQUFDLElBQUksQ0FBQztTQUNYLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQzFCLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQztTQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFaEIsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNqRCxJQUFJLE9BQU8sR0FBRyxHQUFHLFVBQVUsSUFBSSxTQUFTLElBQUksV0FBVyxFQUFFLENBQUM7SUFDMUQsSUFBSSxXQUFXLENBQUMsRUFBRSxFQUFFO1FBQ2hCLE9BQU8sSUFBSSxJQUFJLFdBQVcsQ0FBQyxFQUFFLEVBQUUsQ0FBQztLQUNuQztJQUVELHdCQUF3QjtJQUN4QixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxRQUFRLElBQUksT0FBTyxNQUFNLENBQUMsRUFBRTtRQUMvQyxPQUFPLENBQUMsR0FBRyxDQUNQLDZEQUNJLFdBQVcsQ0FBQyxFQUFFLElBQUksT0FDdEIsVUFBVSxDQUNiLENBQUM7UUFDRixNQUFNLE9BQU8sR0FBRyxJQUFJO2FBQ2YsWUFBWSxDQUFDLEdBQUcsUUFBUSxJQUFJLE9BQU8sTUFBTSxDQUFDO2FBQzFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkIsT0FBTyxJQUFJLENBQUM7S0FDZjtJQUVELDZEQUE2RDtJQUM3RCxPQUFPLENBQUMsR0FBRyxDQUNQLG9EQUNJLFdBQVcsQ0FBQyxFQUFFLElBQUksT0FDdEIsNkNBQTZDLENBQ2hELENBQUM7SUFDRixJQUFJLENBQUMsSUFBSSxDQUFDO29CQUNNLE9BQU87VUFDakIsYUFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7dUJBQ2QsT0FBTztLQUN6QixDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=