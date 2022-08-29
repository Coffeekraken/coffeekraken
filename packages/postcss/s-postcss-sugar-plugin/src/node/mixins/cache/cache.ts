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

export interface IPostcssSugarPluginCacheParams {
    id: string;
}

export { postcssSugarPluginCacheInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    pluginHash,
    themeHash,
    cacheDir,
    nodesToString,
    settings,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginCacheParams>;
    atRule: any;
    CssVars: any;
    pluginHash: string;
    themeHash: string;
    cacheDir: string;
    nodesToString: Function;
    settings: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginCacheParams = {
        id: '',
        ...params,
    };

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
        console.log(
            `<green>[cache]</green> Content resolved from cache "<cyan>${
                finalParams.id || cacheId
            }</cyan>"`,
        );
        const content = __fs
            .readFileSync(`${cacheDir}/${cacheId}.css`)
            .toString();
        vars.code(content);
        return vars;
    }

    // prepare content to be cached using the cache postprocessor
    console.log(
        `<yellow>[cache]</yellow> Generating cache "<cyan>${
            finalParams.id || cacheId
        }</cyan>". <magenta>Please wait</magenta>...`,
    );
    vars.code(`
        /*! SCACHE:${cacheId} */
        ${nodesToString(atRule.nodes)}
        /*! SENDCACHE:${cacheId} */
    `);

    return vars;
}
