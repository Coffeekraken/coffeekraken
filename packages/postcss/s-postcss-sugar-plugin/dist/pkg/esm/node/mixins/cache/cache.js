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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHlDQUF5QyxDQUFDO0FBQy9ELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUV0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxNQUFNLGdDQUFpQyxTQUFRLFlBQVk7SUFDdkQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEVBQUUsRUFBRTtnQkFDQSxJQUFJLEVBQUUsUUFBUTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNRCxPQUFPLEVBQUUsZ0NBQWdDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFekQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxVQUFVLEVBQ1YsU0FBUyxFQUNULFFBQVEsRUFDUixhQUFhLEVBQ2IsUUFBUSxFQUNSLFdBQVcsR0FXZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixFQUFFLEVBQUUsRUFBRSxJQUNILE1BQU0sQ0FDWixDQUFDO0lBRUYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUU7UUFDakIsT0FBTyxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3RDO0lBRUQsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUMzQixNQUFNLFVBQVUsR0FBRyxNQUFNO1NBQ3BCLFFBQVEsRUFBRTtTQUNWLEtBQUssQ0FBQyxJQUFJLENBQUM7U0FDWCxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUMxQixNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksS0FBSyxFQUFFLENBQUM7U0FDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRWhCLE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDakQsSUFBSSxPQUFPLEdBQUcsR0FBRyxVQUFVLElBQUksU0FBUyxJQUFJLFdBQVcsRUFBRSxDQUFDO0lBQzFELElBQUksV0FBVyxDQUFDLEVBQUUsRUFBRTtRQUNoQixPQUFPLElBQUksSUFBSSxXQUFXLENBQUMsRUFBRSxFQUFFLENBQUM7S0FDbkM7SUFFRCx3QkFBd0I7SUFDeEIsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsUUFBUSxJQUFJLE9BQU8sTUFBTSxDQUFDLEVBQUU7UUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FDUCw2REFDSSxXQUFXLENBQUMsRUFBRSxJQUFJLE9BQ3RCLFVBQVUsQ0FDYixDQUFDO1FBQ0YsTUFBTSxPQUFPLEdBQUcsSUFBSTthQUNmLFlBQVksQ0FBQyxHQUFHLFFBQVEsSUFBSSxPQUFPLE1BQU0sQ0FBQzthQUMxQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25CLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFFRCw2REFBNkQ7SUFDN0QsT0FBTyxDQUFDLEdBQUcsQ0FDUCxvREFDSSxXQUFXLENBQUMsRUFBRSxJQUFJLE9BQ3RCLDZDQUE2QyxDQUNoRCxDQUFDO0lBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQztxQkFDTyxPQUFPO1VBQ2xCLGFBQWEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO3dCQUNiLE9BQU87S0FDMUIsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9