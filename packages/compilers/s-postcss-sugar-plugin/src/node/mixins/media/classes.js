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
export { postcssSugarPluginMediaClassesMixinInterface as interface };
export default function ({ params, atRule, getCacheFilePath, getRoot, postcssApi, registerPostProcessor, replaceWith, }) {
    var _a;
    const finalParams = Object.assign({ query: '', mediasOnly: false }, params);
    const mediaConfig = __STheme.config('media');
    const medias = finalParams.query
        ? finalParams.query.split(' ').map((l) => l.trim())
        : Object.keys(mediaConfig.queries);
    const mediasRules = {};
    medias.forEach((media) => {
        mediasRules[media] = new postcssApi.AtRule({
            name: 'sugar.media',
            params: `(${media})`,
        });
    });
    (_a = atRule.nodes) === null || _a === void 0 ? void 0 : _a.forEach((node) => {
        medias.forEach((media) => {
            if (node.type === 'comment' && node.text.trim().match(/FROMCACHE:[a-zA-Z0-9@\._-]+/)) {
                const parts = node.text.split(':').map(l => l.trim());
                const cacheId = parts[1];
                const cacheUrl = getCacheFilePath(cacheId);
                let cachedStr;
                try {
                    cachedStr = __fs.readFileSync(cacheUrl);
                }
                catch (e) {
                    // console.log(e);
                }
                if (!cachedStr)
                    return;
                console.log(cachedStr);
                // let newRule = __postcss.parse(`@import "${cacheUrl}";`);
                // if (settings.target === 'vite') {
                //     newRule = __postcss.parse(`@import url("${cacheUrl}");`);
                // }
                // // comment.remove();
                // root.prepend(newRule);
                // comment.replaceWith(newRule);
            }
            else if (node.name === 'sugar.classes') {
                getRoot(atRule).append(`/* MEDIACLASSES:${media} */`);
            }
            else {
                const mediaNode = node.clone();
                if (mediaNode.selector) {
                    const selectorParts = mediaNode.selector.split(' ');
                    selectorParts[0] = `${selectorParts[0]}___${media}`;
                    mediaNode.selectors[0] = selectorParts[0];
                    mediaNode.selector = selectorParts.join(' ');
                }
                mediasRules[media].append(mediaNode);
            }
        });
    });
    for (let i = Object.keys(mediasRules).length - 1; i >= 0; i--) {
        atRule.after(mediasRules[Object.keys(mediasRules)[i]]);
    }
    registerPostProcessor(() => {
        if (finalParams.mediasOnly) {
            atRule.remove();
        }
        else {
            atRule.replaceWith(atRule.nodes);
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBRXRCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Q0c7QUFFSCxNQUFNLDRDQUE2QyxTQUFRLFlBQVk7SUFDbkUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELFVBQVUsRUFBRTtnQkFDUixJQUFJLEVBQUUsU0FBUzthQUNsQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFPRCxPQUFPLEVBQUUsNENBQTRDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFckUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLGdCQUFnQixFQUNoQixPQUFPLEVBQ1AsVUFBVSxFQUNWLHFCQUFxQixFQUNyQixXQUFXLEdBU2Q7O0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxFQUFFLEVBQ1QsVUFBVSxFQUFFLEtBQUssSUFDZCxNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFN0MsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLEtBQUs7UUFDNUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25ELENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFP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