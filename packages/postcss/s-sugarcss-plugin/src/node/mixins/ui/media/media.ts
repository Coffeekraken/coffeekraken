import __SInterface from '@coffeekraken/s-interface';

/**
 * @name          media
 * @as              @s.ui.media
 * @namespace     node.mixin.ui.media
 * @type          PostcssMixin
 * @interface       ./media
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to generate the "media" UI component css.
 *
 * @return      {Css}                   The corresponding css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet         @s.ui.media
 *
 * @example       css
 * .my-element {
 *      @s.ui.media();
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginUiMediaInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface ISSugarcssPluginUiMediaParams {}

export { SSugarcssPluginUiMediaInterface as interface };
export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<ISSugarcssPluginUiMediaParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginUiMediaParams = {
        ...params,
    };

    const vars: string[] = [];

    // bare

    // lnf

    return vars;
}
