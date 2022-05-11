import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          drop
 * @namespace     node.mixin.ui.loader
 * @type               PostcssMixin
 * @interface     ./drop          interface
 * @platform      postcss
 * @status        beta
 *
 * Apply the drop style to any element
 *
 * @param        {String}           [name='s-loader-drop']               A name for your drop
 * @param       {String}            [duration='theme.ui.loaderDrop.duration']        The duration of your drop animation
 * @param        {String}           [easing='theme.ui.loaderDrop.easing']            The easing you want for your drop animation
 * @return      {String}            The generated css
 *
 * @example     css
 * .my-drop {
 *    @sugar.ui.loader.drop;
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
                default: __STheme.get('ui.loaderDrop.duration'),
            },
            easing: {
                type: 'String',
                default: __STheme.get('ui.loaderDrop.easing'),
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
    width: sugar.scalable(1em);
    height: sugar.scalable(1em);
    
    &:before,
    &:after {
        content: '';
        display: block;
        position: absolute;
        top: 50%; left: 50%;
        opacity: 0;
        transform: translate(-50%, -50%) scale(0);
        border: sugar.scalable(0.1em) solid sugar.color(current);
        border-radius: 50%;
        width: sugar.scalable(1em); height: sugar.scalable(1em);
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

    return vars;
}
