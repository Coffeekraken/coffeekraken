import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
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
export { postcssSugarPluginMediaClassesMixinInterface as interface };
export default function ({ params, atRule, getCacheFilePath, getRoot, postcssApi, registerPostProcessor, replaceWith, }) {
    const finalParams = Object.assign({ query: '', mediasOnly: false }, params);
    const mediaConfig = __STheme.config('media');
    registerPostProcessor((root) => {
        const cssStr = root.toString();
        // search for imported files
        const importedMatches = cssStr.match(/\/\*\sS-IMPORTED:[a-zA-Z0-9@\/\._-]+\s\*\//gm);
        importedMatches === null || importedMatches === void 0 ? void 0 : importedMatches.forEach(cacheStr => {
            console.log('imPO', cacheStr);
            // loop on the imported files (globs)
            files.forEach(file => {
                const relPath = cacheStr.replace('/* S-IMPORTED:', '').replace(' */', '').trim();
                // do the rest only if the file is the good one
                if (relPath !== file.relPath)
                    return;
                // get the css string to mediatize
                const cssToMediatize = cssStr.match(new RegExp(`\\/\\*\\sS-IMPORTED:${relPath}\\s\\*\\/(.|\\r|\\t|\\n)*\\/\\*\\sS-ENDIMPORTED:${relPath}\\s\\*\\/`, 'g'));
                if (!cssToMediatize)
                    return;
                // loop on all the medias to process
                finalParams.media.split(',').map(l => l.trim()).forEach(media => {
                    // build the mediatized file path                
                    const mediatizesFilePath = `${__packageCacheDir()}/postcssSugarPlugin/import/${file.relPath.replace(/\.{1,2}\//gm, '').replace('.css', `.${media}.css`)}`;
                    // search for css declarations
                    const ast = postcss.parse(cssToMediatize[0]);
                    ast.walkRules(rule => {
                        let sels = rule.selector.split(',').map(l => l.trim());
                        sels = sels.map(sel => {
                            const selectors = sel.match(/\.[a-zA-Z0-9_-]+/gm);
                            if (!selectors)
                                return sel;
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
                            ${ast.toString()}
                        }
                    `;
                    // import or include file depending on target
                    if (settings.target === 'vite') {
                        // write the mediatized file
                        __writeFileSync(mediatizesFilePath, mediatizedCss);
                        // add the import to the root
                        console.log('PREPEND', mediatizesFilePath);
                        root.prepend(postcss.parse(`@import "${mediatizesFilePath}";`));
                    }
                    else {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFHN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVDRztBQUVILE1BQU0sNENBQTZDLFNBQVEsWUFBWTtJQUNuRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxTQUFTO2FBQ2xCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU9ELE9BQU8sRUFBRSw0Q0FBNEMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVyRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sZ0JBQWdCLEVBQ2hCLE9BQU8sRUFDUCxVQUFVLEVBQ1YscUJBQXFCLEVBQ3JCLFdBQVcsR0FTZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsRUFBRSxFQUNULFVBQVUsRUFBRSxLQUFLLElBQ2QsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTdDLHFCQUFxQixDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDM0IsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRS9CLDRCQUE0QjtRQUM1QixNQUFNLGVBQWUsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7UUFDckYsZUFBZSxhQUFmLGVBQWUsdUJBQWYsZUFBZSxDQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUVoQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztZQUU5QixxQ0FBcUM7WUFDckMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDakIsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNoRiwrQ0FBK0M7Z0JBQy9DLElBQUksT0FBTyxLQUFLLElBQUksQ0FBQyxPQUFPO29CQUFFLE9BQU87Z0JBQ3JDLGtDQUFrQztnQkFDbEMsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyx1QkFBdUIsT0FBTyxtREFBbUQsT0FBTyxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDMUosSUFBSSxDQUFDLGNBQWM7b0JBQUUsT0FBTztnQkFDNUIsb0NBQW9DO2dCQUNwQyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQzVELGlEQUFpRDtvQkFDakQsTUFBTSxrQkFBa0IsR0FBRyxHQUFHLGlCQUFpQixFQUFFLDhCQUE4QixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBQyxJQUFJLEtBQUssTUFBTSxDQUFDLEVBQUUsQ0FBQztvQkFDekosOEJBQThCO29CQUM5QixNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM3QyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO3dCQUNqQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQzt3QkFDdkQsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7NEJBQ2xCLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQzs0QkFDbEQsSUFBSSxDQUFDLFNBQVM7Z0NBQUUsT0FBTyxHQUFHLENBQUM7NEJBQzNCLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0NBQ3pCLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLFFBQVEsTUFBTSxLQUFLLEVBQUUsQ0FBQyxDQUFDOzRCQUMxRCxDQUFDLENBQUMsQ0FBQzs0QkFDSCxPQUFPLEdBQUcsQ0FBQzt3QkFDZixDQUFDLENBQUMsQ0FBQzt3QkFDSCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ25DLENBQUMsQ0FBQyxDQUFDO29CQUNILHNCQUFzQjtvQkFDdEIsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO29CQUM5QywyQkFBMkI7b0JBQzNCLE1BQU0sYUFBYSxHQUFHOzBCQUNoQixRQUFRLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQzs4QkFDMUIsR0FBRyxDQUFDLFFBQVEsRUFBRTs7cUJBRXhCLENBQUM7b0JBQ0YsNkNBQTZDO29CQUM3QyxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssTUFBTSxFQUFFO3dCQUM1Qiw0QkFBNEI7d0JBQzVCLGVBQWUsQ0FBQyxrQkFBa0IsRUFBRSxhQUFhLENBQUMsQ0FBQzt3QkFDbkQsNkJBQTZCO3dCQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO3dCQUMzQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsWUFBWSxrQkFBa0IsSUFBSSxDQUFDLENBQUMsQ0FBQztxQkFDbkU7eUJBQU07d0JBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztxQkFDOUI7Z0JBRUwsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztZQUNILHdCQUF3QjtZQUV4QiwrQ0FBK0M7WUFFL0MsZ0hBQWdIO1lBQ2hILDBDQUEwQztRQUM5QyxDQUFDLENBQUMsQ0FBQztJQUdQLENBQUMsQ0FBQyxDQUFDO0lBRUgsbUNBQW1DO0lBQ25DLDBEQUEwRDtJQUMxRCwwQ0FBMEM7SUFFMUMsMEJBQTBCO0lBQzFCLDhCQUE4QjtJQUM5QixtREFBbUQ7SUFDbkQsK0JBQStCO0lBQy9CLGdDQUFnQztJQUNoQyxVQUFVO0lBQ1YsTUFBTTtJQUVOLG9DQUFvQztJQUVwQyxrQ0FBa0M7SUFFbEMsa0dBQWtHO0lBRWxHLHFFQUFxRTtJQUVyRSx3Q0FBd0M7SUFDeEMsMERBQTBEO0lBRTFELDZCQUE2QjtJQUM3QixvQkFBb0I7SUFDcEIsMkRBQTJEO0lBQzNELDJCQUEyQjtJQUMzQixxQ0FBcUM7SUFDckMsZ0JBQWdCO0lBRWhCLHNDQUFzQztJQUV0QyxzQ0FBc0M7SUFHdEMsMEVBQTBFO0lBQzFFLG1EQUFtRDtJQUNuRCwrRUFBK0U7SUFDL0UsbUJBQW1CO0lBRW5CLHNDQUFzQztJQUN0Qyx3Q0FBd0M7SUFFeEMsK0NBQStDO0lBQy9DLHNEQUFzRDtJQUN0RCxxRUFBcUU7SUFDckUsbUJBQW1CO0lBRW5CLDhDQUE4QztJQUM5Qyx3Q0FBd0M7SUFDeEMsdUVBQXVFO0lBQ3ZFLHVFQUF1RTtJQUN2RSw2REFBNkQ7SUFDN0QsZ0VBQWdFO0lBQ2hFLGdCQUFnQjtJQUNoQixvREFBb0Q7SUFFcEQsWUFBWTtJQUNaLFVBQVU7SUFDVixNQUFNO0lBQ04sbUVBQW1FO0lBQ25FLDhEQUE4RDtJQUM5RCxJQUFJO0lBRUosZ0NBQWdDO0lBQ2hDLG9DQUFvQztJQUNwQywyQkFBMkI7SUFDM0IsZUFBZTtJQUNmLDRDQUE0QztJQUM1QyxRQUFRO0lBQ1IsTUFBTTtBQUNWLENBQUMifQ==