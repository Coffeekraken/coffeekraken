import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __fs from 'fs';

/**
 * @name           classes
 * @namespace      node.mixins.media
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to automatically generate the requested media query as well
 * as updating all the direct child classnames so you will have classes that applies
 * only for these media queries.
 *
 * Take this as an example:
 *
 * ```css
 * \@sugar.media.classes {
 *    .my-cool-element {
 *      color: green;
 *    }
 * }
 * ```
 *
 * This wil generate these two classes:
 * - .my-cool-element: Always available
 * - .my-cool-element___mobile: Available only in the mobile media query context
 * - etc...
 *
 * Note that you can use the @sugar.media mixin parameters syntax here in the first argument.
 *
 * @param         {String}      query
 * @return        {Css}         The generated css
 *
 * @example         css
 * \@sugar.media.classes {
 *    // any classes you want to "duplicate" and generate
 *    // only for this media context...
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginMediaClassesMixinInterface extends __SInterface {
    static get _definition() {
        return {
            query: {
                type: 'String',
            },
            mediasOnly: {
                type: 'Boolean',
            },
        };
    }
}

export interface IPostcssSugarPluginMediaMixinClassesParams {
    query: string;
    mediasOnly: boolean;
}

export { postcssSugarPluginMediaClassesMixinInterface as interface };

export default function ({
    params,
    atRule,
    getCacheFilePath,
    getRoot,
    postcssApi,
    registerPostProcessor,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginMediaMixinClassesParams>;
    atRule: any;
    getCacheFilePath: Function;
    getRoot: Function;
    postcssApi: any;
    registerPostProcessor: Function;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginMediaMixinClassesParams = {
        query: '',
        mediasOnly: false,
        ...params,
    };

    const mediaConfig = __STheme.config('media');

    registerPostProcessor((root) => {
        const cssStr = root.toString();

        // search for imported files
        const importedMatches = cssStr.match(/\/\*\sS-IMPORTED:[a-zA-Z0-9@\/\._-]+\s\*\//gm);
        importedMatches?.forEach(cacheStr => {

            console.log('imPO', cacheStr);

            // loop on the imported files (globs)
            files.forEach(file => {
                const relPath = cacheStr.replace('/* S-IMPORTED:','').replace(' */', '').trim();
                // do the rest only if the file is the good one
                if (relPath !== file.relPath) return;
                // get the css string to mediatize
                const cssToMediatize = cssStr.match(new RegExp(`\\/\\*\\sS-IMPORTED:${relPath}\\s\\*\\/(.|\\r|\\t|\\n)*\\/\\*\\sS-ENDIMPORTED:${relPath}\\s\\*\\/`, 'g'));
                if (!cssToMediatize) return;
                // loop on all the medias to process
                finalParams.media.split(',').map(l => l.trim()).forEach(media => {
                    // build the mediatized file path                
                    const mediatizesFilePath = `${__packageCacheDir()}/postcssSugarPlugin/import/${file.relPath.replace(/\.{1,2}\//gm, '').replace('.css',`.${media}.css`)}`;
                    // search for css declarations
                    const ast = postcss.parse(cssToMediatize[0]);
                    ast.walkRules(rule => {
                        let sels = rule.selector.split(',').map(l => l.trim());
                        sels = sels.map(sel => {
                            const selectors = sel.match(/\.[a-zA-Z0-9_-]+/gm);
                            if (!selectors) return sel;
                            selectors.forEach(selector => {
                                sel = sel.replace(selector, `${selector}___${media}`);
                            });
                            return sel;
                        });
                        rule.selector = sels.join(',');
                    });
                    // remove all comments
                    ast.walkComments(comment => comment.remove());
                    // build the mediatized css
                    const mediatizedCss = `
                        ${__STheme.buildMediaQuery(media)} {
                            ${ ast.toString()}
                        }
                    `;
                    // import or include file depending on target
                    if (settings.target === 'vite') {
                        // write the mediatized file
                        __writeFileSync(mediatizesFilePath, mediatizedCss);
                        // add the import to the root
                        console.log('PREPEND', mediatizesFilePath);
                        root.prepend(postcss.parse(`@import "${mediatizesFilePath}";`));
                    } else {
                        root.append(mediatizedCss);
                    }

                });
            });
            // console.log(toCache);

            // const cachePath = getCacheFilePath(relPath);

            // const toCacheStr = toCache[0].replace(`/* CACHE:${relPath} */`, '').replace(`/* ENDCACHE:${relPath} */`, '');
            // __writeFileSync(cachePath, toCacheStr);
        });


    });

    // const medias = finalParams.query
    //     ? finalParams.query.split(' ').map((l) => l.trim())
    //     : Object.keys(mediaConfig.queries);

    // const mediasRules = {};
    // medias.forEach((media) => {
    //     mediasRules[media] = new postcssApi.AtRule({
    //         name: 'sugar.media',
    //         params: `(${media})`,
    //     });
    // });

    // atRule.nodes?.forEach((node) => {

    //     medias.forEach((media) => {

    //         if (node.type === 'comment' && node.text.trim().match(/FROMCACHE:[a-zA-Z0-9@\._-]+/)) {

    //             const parts = node.text.split(':').map(l => l.trim());

    //             const cacheId = parts[1];
    //             const cacheUrl = getCacheFilePath(cacheId);

    //             let cachedStr;
    //             try {
    //                 cachedStr = __fs.readFileSync(cacheUrl);
    //             } catch(e) {
    //                 // console.log(e);
    //             }

    //             if (!cachedStr) return;

    //             console.log(cachedStr);


    //             // let newRule = __postcss.parse(`@import "${cacheUrl}";`);
    //             // if (settings.target === 'vite') {
    //             //     newRule = __postcss.parse(`@import url("${cacheUrl}");`);
    //             // }

    //             // // comment.remove();
    //             // root.prepend(newRule);

    //             // comment.replaceWith(newRule);
    //         } else if (node.name === 'sugar.classes') {
    //             getRoot(atRule).append(`/* MEDIACLASSES:${media} */`);
    //         } else {

    //             const mediaNode = node.clone();
    //             if (mediaNode.selector) {
    //                 const selectorParts = mediaNode.selector.split(' ');
    //                 selectorParts[0] = `${selectorParts[0]}___${media}`;
    //                 mediaNode.selectors[0] = selectorParts[0];
    //                 mediaNode.selector = selectorParts.join(' ');
    //             }
    //             mediasRules[media].append(mediaNode);

    //         }
    //     });
    // });
    // for (let i = Object.keys(mediasRules).length - 1; i >= 0; i--) {
    //     atRule.after(mediasRules[Object.keys(mediasRules)[i]]);
    // }

    // registerPostProcessor(() => {
    //     if (finalParams.mediasOnly) {
    //         atRule.remove();
    //     } else {
    //         atRule.replaceWith(atRule.nodes);
    //     }
    // });
}
