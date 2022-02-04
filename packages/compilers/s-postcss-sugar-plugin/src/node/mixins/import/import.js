import __SInterface from '@coffeekraken/s-interface';
import __SGlob from '@coffeekraken/s-glob';
import __path from 'path';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __chokidar from 'chokidar';
import __SEventEmitter from '@coffeekraken/s-event-emitter';
import __packageCacheDir from '@coffeekraken/sugar/node/path/packageCacheDir';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
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
export default function ({ params, atRule, postcss, registerPostProcessor, settings, }) {
    const finalParams = Object.assign({}, params);
    const dirName = typeof atRule.source.input.file === 'string'
        ? __path.dirname(atRule.source.input.file)
        : __dirname();
    // resolve globs even if it's a simple path
    const files = __SGlob.resolve(finalParams.path, {
        cwd: dirName,
    });
    // watch for new / deleted files
    if (!_watcher) {
        function triggerUpdate(path) {
            __SEventEmitter.global.emit('s-postcss-sugar-plugin-import-update', {
                path: __path.resolve(dirName, path),
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW1wb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLFNBQVMsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RCxPQUFPLFVBQVUsTUFBTSxVQUFVLENBQUM7QUFDbEMsT0FBTyxlQUFlLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsT0FBTyxpQkFBaUIsTUFBTSwrQ0FBK0MsQ0FBQztBQUM5RSxPQUFPLGVBQWUsTUFBTSwyQ0FBMkMsQ0FBQztBQUd4RTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUVILE1BQU0saUNBQWtDLFNBQVEsWUFBWTtJQUN4RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU9ELE9BQU8sRUFBRSxpQ0FBaUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUUxRDs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxJQUFJLFFBQVEsQ0FBQztBQUNiLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AscUJBQXFCLEVBQ3JCLFFBQVEsR0FPWDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sT0FBTyxHQUNULE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLFFBQVE7UUFDeEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1B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