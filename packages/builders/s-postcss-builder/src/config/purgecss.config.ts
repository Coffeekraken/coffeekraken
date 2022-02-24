import __loadConfigFile from '@coffeekraken/sugar/node/config/loadConfigFile';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';

export async function preprocess(env, rawPurgecssConfig, rawConfig) {
    const config = (await __loadConfigFile('purgecss.config.js')) ?? {};
    return __deepMerge(rawPurgecssConfig, config);
}

export default function (env, config) {
    if (env.platform !== 'node') return;
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
        content: [
            'index.html',
            '[config.storage.src.rootDir]/ ** / *.js',
            '[config.storage.src.rootDir]/ ** / *.jsx',
            '[config.storage.src.rootDir]/ ** / *.html',
            '[config.storage.src.rootDir]/ ** / *.vue',
            '[config.storage.src.rootDir]/ ** / *.riot',
            '[config.storage.src.rootDir]/ ** / *.svelte',
            '[config.storage.src.rootDir]/**/*.blade.php',
            '[config.storage.src.rootDir]/**/*.twig',
        ],
    };
}
