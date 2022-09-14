import { __loadConfigFile } from '@coffeekraken/sugar/load';
import { __deepMerge } from '@coffeekraken/sugar/object';

export async function preprocess(api) {
    const config = (await __loadConfigFile('purgecss.config.js')) ?? {};
    return __deepMerge(api.this, config);
}

export default function (api) {
    if (api.env.platform !== 'node') return;
    return {
        /**
         * @name            content
         * @namespace       config.purgecss
         * @type            String[]
         * @default         ['index.html','[config.storage.src.rootDir]/ ** / *.js','[config.storage.src.rootDir]/ ** / *.jsx','[config.storage.src.rootDir]/ ** / *.html','[config.storage.src.rootDir]/ ** / *.vue','[config.storage.src.rootDir]/ ** / *.riot','[config.storage.src.rootDir]/ ** / *.svelte','[config.storage.src.rootDir]/ ** / *.blade.php','[config.storage.src.rootDir]/ ** / *.twig']
         *
         * Specify the content files to take in consideration to purge your css
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get content() {
            return [
                'index.html',
                `${api.config.storage.package.rootDir}/**/*.js`,
                `${api.config.storage.package.rootDir}/**/*.jsx`,
                `${api.config.storage.package.rootDir}/**/*.html`,
                `${api.config.storage.package.rootDir}/**/*.vue`,
                `${api.config.storage.package.rootDir}/**/*.riot`,
                `${api.config.storage.package.rootDir}/**/*.svelte`,
                `${api.config.storage.package.rootDir}/*/*.ladephp`,
                `${api.config.storage.package.rootDir}/*/*.wi`,
            ];
        },
    };
}
