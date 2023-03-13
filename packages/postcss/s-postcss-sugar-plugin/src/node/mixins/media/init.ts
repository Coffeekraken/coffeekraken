import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginMediaInitMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginMediaInitMixinInterface as interface };

/**
 * @name           init
 * @namespace      node.mixin.media
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin initialize the media environment that make use of container queries instead of
 * traditional media queries. For that we need to add the "container" property onto the ".s-viewport"
 * element that contains the whole website as well as on the body to make sure it works everywere.
 *
 * @snippet         @sugar.media.init
 *
 * @example        css
 * \@sugar.media.init;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: any;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams = {
        ...(params ?? {}),
    };

    // const vars = [
    //     `
    //     body:has(.s-viewport) {
    //         overflow: hidden;
    //     }
    //     .s-viewport {
    //         container-type: inline-size;
    //         container-name: ${
    //             __STheme.get('media.containerName') ?? 'viewport'
    //         };
    //         height: 100vh;
    //         overflow-y: auto;
    //         overflow-x: hidden;
    //     }
    //     body:has(iframe.s-carpenter_editor-iframe) .s-viewport {
    //         @sugar.transition;
    //         position: relative;
    //         left: 50%;
    //         transform: translateX(-50%);
    //         border-left: solid 1px rgba(134, 134, 134, 0.3);
    //         border-right: solid 1px rgba(134, 134, 134, 0.3);
    //         @sugar.scrollbar(accent);
    //     }
    // `,
    // ];

    replaceWith('');
}
