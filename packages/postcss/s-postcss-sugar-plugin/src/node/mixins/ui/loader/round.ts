import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          round
 * @namespace     node.mixin.ui.loader
 * @type               PostcssMixin
 * @interface     ./round          interface
 * @platform      postcss
 * @status        beta
 *
 * Apply the round style to any element
 *
 * @param        {String}           [name='s-loader-round']               A name for your round
 * @param       {String}            [duration='theme.ui.loader.duration']        The duration of your round animation
 * @param        {String}           [easing='theme.ui.loader.easing']            The easing you want for your round animation
 * @return      {String}            The generated css
 *
 * @snippet         @sugar.ui.loader.round
 *
 * @example     css
 * .my-round {
 *    @sugar.ui.loader.round;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiloaderRoundMixinInterface extends __SInterface {
    static get _definition() {
        return {
            name: {
                type: 'String',
                default: 's-loader-round',
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

export interface IPostcssSugarPluginUiloaderRoundMixinParams {
    name: string;
    duration: string;
    easing: string;
}

export { postcssSugarPluginUiloaderRoundMixinInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiloaderRoundMixinParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiloaderRoundMixinParams = {
        name: '',
        duration: '',
        easing: '',
        ...params,
    };

    const vars: string[] = [];

    vars.push(`
    pointer-events: none;
    display: inline-block;
    border-radius: 50%;
    background: sugar.color(current);
    width: sugar.scalable(1em);
    height: sugar.scalable(1em);
    animation: ${finalParams.name} ${finalParams.duration} ${finalParams.easing} infinite;
    
    @keyframes ${finalParams.name} {
       0%, 100% {
            animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
        }
        0% {
            transform: rotateY(0deg);
        }
        50% {
            transform: rotateY(900deg);
            animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
        }
        100% {
            transform: rotateY(1800deg);
        }
    }
  `);

    // wireframe
    vars.push(`
        @sugar.wireframe {
           background: rgba(0,0,0,.5);
        }
    `);

    return vars;
}
