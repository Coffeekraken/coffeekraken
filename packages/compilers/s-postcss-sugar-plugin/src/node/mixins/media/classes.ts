import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name           classes
 * @namespace      node.mixins.media
 * @type           PostcssMixin
 * @platform      css
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
    static get definition() {
        return (
            this.cached() ??
            this.cache({
                query: {
                    type: 'String',
                },
                mediasOnly: {
                    type: 'Boolean',
                },
            })
        );
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
    postcssApi,
    registerPostProcessor,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginMediaMixinClassesParams>;
    atRule: any;
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

    atRule.nodes?.forEach((node) => {
        if (!node.selector) return;

        medias.forEach((media) => {
            const mediaNode = node.clone();
            const selectorParts = mediaNode.selector.split(' ');
            selectorParts[0] = `${selectorParts[0]}___${media}`;
            mediaNode.selectors[0] = selectorParts[0];
            mediaNode.selector = selectorParts.join(' ');
            mediasRules[media].append(mediaNode);
        });
    });
    for (let i = Object.keys(mediasRules).length - 1; i >= 0; i--) {
        atRule.after(mediasRules[Object.keys(mediasRules)[i]]);
    }

    registerPostProcessor(() => {
        if (finalParams.mediasOnly) {
            atRule.remove();
        } else {
            atRule.replaceWith(atRule.nodes);
        }
    });
}
