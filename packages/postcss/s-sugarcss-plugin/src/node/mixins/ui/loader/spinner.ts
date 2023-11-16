import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          spinner
 * @as          @s.ui.loader.spinner
 * @namespace     node.mixin.ui.loader
 * @type               PostcssMixin
 * @interface     ./spinner          interface
 * @platform      postcss
 * @status        beta
 *
 * Apply the spinner style to any element
 *
 * @param        {String}           [name='s-loader-spinner']               A name for your spinner
 * @param       {String}            [duration='theme.ui.loader.duration']        The duration of your spinner animation
 * @param        {String}           [easing='theme.ui.loader.easing']            The easing you want for your spinner animation
 * @return      {String}            The generated css
 *
 * @snippet         @s.ui.loader.spinner
 *
 * @example     css
 * .my-spinner {
 *    @s.ui.loader.spinner;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginUiLoaderSpinnerMixinInterface extends __SInterface {
    static get _definition() {
        return {
            name: {
                type: 'String',
                default: 's-loader-spinner',
            },
            duration: {
                type: 'String',
                default: __STheme.current.get('ui.loader.duration'),
            },
            easing: {
                type: 'String',
                default: __STheme.current.get('ui.loader.easing'),
            },
        };
    }
}

export interface ISSugarcssPluginUiLoaderSpinnerMixinParams {
    name: string;
    duration: string;
    easing: string;
}

export { SSugarcssPluginUiLoaderSpinnerMixinInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<ISSugarcssPluginUiLoaderSpinnerMixinParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginUiLoaderSpinnerMixinParams = {
        name: '',
        duration: '',
        easing: '',
        ...params,
    };

    const vars: string[] = [];

    vars.push(`
    display: inline-block;
    pointer-events: none;
    text-indent: -9999em;
    border-top: 0.3em solid currentColor;
    border-right: 0.3em solid currentColor;
    border-bottom: 0.3em solid currentColor;
    border-left: 0.3em solid rgba(0,0,0,0);
    border-radius: 50%;
    width: s.scalable(1em);
    height: s.scalable(1em);
    animation: ${finalParams.name} ${finalParams.duration} ${finalParams.easing} infinite;
    
    @keyframes ${finalParams.name} {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
  `);

    return vars;
}
