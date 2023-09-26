import __SEventEmitter from '@coffeekraken/s-event-emitter';
import __SGlob from '@coffeekraken/s-glob';
import __SInterface from '@coffeekraken/s-interface';
import { __dirname } from '@coffeekraken/sugar/fs';
import __chokidar from 'chokidar';
import __path from 'path';

/**
 * @name           import
 * @as              @s.import
 * @namespace      node.mixin.import
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to import other files just like the @import statement does.
 * It add the feature to specify a glob pattern to import multiple files at once.
 *
 * @param         {String}        path        The file path you want to import relative to the file you're in
 * @return        {Css}         The generated css
 *
 * @snippet         @s.import($1)
 *
 * @example        css
 * \@s.import('./my-cool-file.css');
 * \@s.import('../views/** /*.css');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginImportInterface extends __SInterface {
    static get _definition() {
        return {
            path: {
                type: 'String',
                required: true,
            },
            media: {
                type: 'String',
            },
        };
    }
}

export interface IPostcssSugarPluginImportParams {
    path: string;
    media: string;
}

export { postcssSugarPluginImportInterface as interface };

let _watcherByPath = {};
export default function ({
    params,
    atRule,
    postcss,
    registerPostProcessor,
    settings,
}: {
    params: IPostcssSugarPluginImportParams;
    atRule: any;
    postcss: any;
    registerPostProcessor: Function;
    settings: any;
}) {
    const finalParams: IPostcssSugarPluginImportParams = {
        ...params,
    };

    if (!finalParams.path.match(/\.css$/)) {
        return;
    }

    const dirName =
        typeof atRule.source.input.file === 'string'
            ? __path.dirname(atRule.source.input.file)
            : __dirname();

    // resolve globs even if it's a simple path
    const files = __SGlob.resolveSync(finalParams.path, {
        cwd: dirName,
    });

    function triggerUpdate(path) {
        __SEventEmitter.global.emit('s-postcss-sugar-plugin-import-update', {
            path: __path.resolve(dirName, path),
        });
    }

    // watch for new / deleted files
    if (!_watcherByPath[finalParams.path]) {
        const watcher = __chokidar.watch(finalParams.path, {
            cwd: dirName,
            ignoreInitial: true,
        });
        watcher.on('change', (path) => {
            triggerUpdate(path);
        });
        watcher.on('add', (path) => {
            triggerUpdate(path);
        });
        watcher.on('unlink', (path) => {
            triggerUpdate(path);
        });
        _watcherByPath[finalParams.path] = watcher;
    }

    files.forEach((file) => {
        let newRule = postcss.parse(`@import "${file.relPath}";`);
        if (settings.target === 'vite') {
            newRule = postcss.parse(`@import url("${file.relPath}");`);
        }
        newRule.source.input.file = atRule.source.input.file;
        atRule.parent.insertBefore(atRule, newRule);
    });

    atRule.remove();
}
