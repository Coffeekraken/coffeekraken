import __SInterface from '@coffeekraken/s-interface';
import __SGlob from '@coffeekraken/s-glob';
import __path from 'path';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __chokidar from 'chokidar';
import __SEventEmitter from '@coffeekraken/s-event-emitter';
import __packageCacheDir from '@coffeekraken/sugar/node/path/packageCacheDir';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name           import
 * @namespace      node.mixins.import
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to import other files just like the @import statement does.
 * It add the feature to specify a glob pattern to import multiple files at once.
 *
 * @param         {String}        path        The file path you want to import relative to the file you're in
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.import('./my-cool-file.css');
 * \@sugar.import('../views/** /*.css');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginImportInterface extends __SInterface {
    static get _definition() {
        return {
            path: {
                type: 'String',
                required: true,
            },
            media: {
                type: 'String'
            }
        };
    }
}

export interface IPostcssSugarPluginImportParams {
    path: string;
    media: string;
}

export { postcssSugarPluginImportInterface as interface };

/**
 * @name          import
 * @namespace     sugar.postcss.mixin.import
 * @type          PostcssMixin
 *
 * This mixin allows you to import files as default import statement does but add the glob support like "something/* * /*.css"
 *
 * @param       {String}        path      The path or glob to import
 * @return      {Css}                   The corresponding imported css
 *
 * @example       css
 * \@sugar.import('./** /*.css');
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
let _watcher;
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

    const dirName =
        typeof atRule.source.input.file === 'string'
            ? __path.dirname(atRule.source.input.file)
            : __dirname();

    // resolve globs even if it's a simple path
    const files = __SGlob.resolve(finalParams.path, {
        cwd: dirName,
    });

    // watch for new / deleted files
    if (!_watcher) {
        function triggerUpdate(path) {
            __SEventEmitter.global.emit(
                's-postcss-sugar-plugin-import-update',
                {
                    path: __path.resolve(dirName, path),
                },
            );
        }
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
    }

    files.forEach((file) => {

        const cachedFilePath = `${__packageCacheDir()}/postcssSugarPlugin/import/${file.relPath.replace(/\.{1,2}\//gm, '')}`;
        const newFileContent = `
            /* S-IMPORTED:${file.relPath} */
            ${file.content}
            /* S-ENDIMPORTED:${file.relPath} */
        `;
        __writeFileSync(cachedFilePath, newFileContent);

        let newRule = postcss.parse(`@import "${cachedFilePath}";`);
        if (settings.target === 'vite') {
            newRule = postcss.parse(`@import url("${file.relPath}");`);
        }
        newRule.source.input.file = atRule.source.input.file;
        atRule.parent.insertAfter(atRule, newRule);
    });

    // registerPostProcessor((root) => {
    //     // do thing only if some media are specified
    //     if (!finalParams.media) return;

    //     const cssStr = root.toString();

    //     // search for imported files
    //     const importedMatches = cssStr.match(/\/\*\sS-IMPORTED:[a-zA-Z0-9@\/\._-]+\s\*\//gm);
    //     importedMatches?.forEach(cacheStr => {

    //         console.log('imPO', cacheStr);

    //         // loop on the imported files (globs)
    //         files.forEach(file => {
    //             const relPath = cacheStr.replace('/* S-IMPORTED:','').replace(' */', '').trim();
    //             // do the rest only if the file is the good one
    //             if (relPath !== file.relPath) return;
    //             // get the css string to mediatize
    //             const cssToMediatize = cssStr.match(new RegExp(`\\/\\*\\sS-IMPORTED:${relPath}\\s\\*\\/(.|\\r|\\t|\\n)*\\/\\*\\sS-ENDIMPORTED:${relPath}\\s\\*\\/`, 'g'));
    //             if (!cssToMediatize) return;
    //             // loop on all the medias to process
    //             finalParams.media.split(',').map(l => l.trim()).forEach(media => {
    //                 // build the mediatized file path                
    //                 const mediatizesFilePath = `${__packageCacheDir()}/postcssSugarPlugin/import/${file.relPath.replace(/\.{1,2}\//gm, '').replace('.css',`.${media}.css`)}`;
    //                 // search for css declarations
    //                 const ast = postcss.parse(cssToMediatize[0]);
    //                 ast.walkRules(rule => {
    //                     let sels = rule.selector.split(',').map(l => l.trim());
    //                     sels = sels.map(sel => {
    //                         const selectors = sel.match(/\.[a-zA-Z0-9_-]+/gm);
    //                         if (!selectors) return sel;
    //                         selectors.forEach(selector => {
    //                             sel = sel.replace(selector, `${selector}___${media}`);
    //                         });
    //                         return sel;
    //                     });
    //                     rule.selector = sels.join(',');
    //                 });
    //                 // remove all comments
    //                 ast.walkComments(comment => comment.remove());
    //                 // build the mediatized css
    //                 const mediatizedCss = `
    //                     ${__STheme.buildMediaQuery(media)} {
    //                         ${ ast.toString()}
    //                     }
    //                 `;
    //                 // import or include file depending on target
    //                 if (settings.target === 'vite') {
    //                     // write the mediatized file
    //                     __writeFileSync(mediatizesFilePath, mediatizedCss);
    //                     // add the import to the root
    //                     console.log('PREPEND', mediatizesFilePath);
    //                     root.prepend(postcss.parse(`@import "${mediatizesFilePath}";`));
    //                 } else {
    //                     root.append(mediatizedCss);
    //                 }

    //             });
    //         });
    //         // console.log(toCache);

    //         // const cachePath = getCacheFilePath(relPath);

    //         // const toCacheStr = toCache[0].replace(`/* CACHE:${relPath} */`, '').replace(`/* ENDCACHE:${relPath} */`, '');
    //         // __writeFileSync(cachePath, toCacheStr);
    //     });


    // });

    atRule.remove();
}
