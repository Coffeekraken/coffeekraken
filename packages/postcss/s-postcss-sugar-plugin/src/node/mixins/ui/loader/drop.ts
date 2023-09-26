import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          drop
 * @as          @s.ui.loader.drop
 * @namespace     node.mixin.ui.loader
 * @type               PostcssMixin
 * @interface     ./drop          interface
 * @platform      postcss
 * @status        beta
 *
 * Apply the drop style to any element
 *
 * @param        {String}           [name='s-loader-drop']               A name for your drop
 * @param       {String}            [duration='theme.ui.loader.duration']        The duration of your drop animation
 * @param        {String}           [easing='theme.ui.loader.easing']            The easing you want for your drop animation
 * @return      {String}            The generated css
 *
 * @snippet         @s.ui.loader.drop
 *
 * @example     css
 * .my-drop {
 *    @s.ui.loader.drop;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiLoaderDropMixinInterface extends __SInterface {
    static get _definition() {
        return {
            name: {
                type: 'String',
                default: 's-loader-drop',
            },
            duration: {
                type: 'String',
                default: __STheme.get('ui.loader.duration'),
            },
            easing: {
                type: 'String',
                default: __STheme.get('ui.loader.easing'),
            },
        };
    }
}

export interface IPostcssSugarPluginUiloaderDropMixinParams {
    name: string;
    duration: string;
    easing: string;
}

export { postcssSugarPluginUiLoaderDropMixinInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiloaderDropMixinParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiloaderDropMixinParams = {
        name: '',
        duration: '',
        easing: '',
        ...params,
    };

    const vars: string[] = [];

    vars.push(`
    position: relative;
    display: inline-block;
    pointer-events: none;
    width: s.scalable(1em);
    height: s.scalable(1em);
    
    &:before,
    &:after {
        content: '';
        display: block;
        position: absolute;
        top: 50%; left: 50%;
        opacity: 0;
        transform: translate(-50%, -50%) scale(0);
        border: s.scalable(0.1em) solid currentColor;
        border-radius: 50%;
        width: s.scalable(1em); height: s.scalable(1em);
    }
    &:before {
        animation: ${finalParams.name} ${finalParams.duration} ${finalParams.easing} infinite;
    }
    &:after {
        animation: ${finalParams.name} ${finalParams.duration} ${finalParams.easing} 0.7s infinite;
    }

    @keyframes ${finalParams.name} {
        from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1);
        }
    }
  `);

    // wireframe
    vars.push(`
        @s.wireframe {
            &:before,
            &:after {
                border-color: rgba(0,0,0,.5);
            }
        }
    `);

    return vars;
}
