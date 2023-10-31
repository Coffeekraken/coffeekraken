import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import { __uniqid } from '@coffeekraken/sugar/string';

/**
 * @name          squareDots
 * @as              @s.ui.loader.squareDots
 * @namespace     node.mixin.ui.loader
 * @type               PostcssMixin
 * @interface     ./squareDots          interface
 * @platform      postcss
 * @status        beta
 *
 * Apply the squareDots style to any element
 *
 * @param        {String}           [name='s-loader-square-dots']               A name for your squareDots
 * @param       {String}            [duration='theme.ui.loader.duration']        The duration of your squareDots animation
 * @param        {String}           [easing='theme.ui.loader.easing']            The easing you want for your squareDots animation
 * @return      {String}            The generated css
 *
 * @snippet         @s.ui.loader.squareDots
 *
 * @example     css
 * .my-squareDots {
 *    @s.ui.loader.squareDots;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiLoaderSquareDotsMixinInterface extends __SInterface {
    static get _definition() {
        return {
            name: {
                type: 'String',
                default: 's-loader-square-dots',
            },
            duration: {
                type: 'String',
                default: __STheme.get('ui.loader.duration'),
            },
        };
    }
}

export interface IPostcssSugarPluginUiLoaderSquareDotsMixinParams {
    name: string;
    duration: string;
}

export { postcssSugarPluginUiLoaderSquareDotsMixinInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiLoaderSquareDotsMixinParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiLoaderSquareDotsMixinParams = {
        name: '',
        duration: '',
        ...params,
    };

    const id = __uniqid();

    const vars: string[] = [];

    vars.push(`
    display: inline-block;
    position: relative;
    pointer-events: none;
    overflow: hidden;
    height: s.scalable(1em);
    width: s.scalable(1.2ch);
    text-rendering: geometricPrecision;

    &:before {
        font-size: s.scalable(1em);
        position: absolute;
        top: 0;
        left: calc(-0.225ch);
        white-space: nowrap;
        color: currentColor;
        display: block;
        content: "⠁⠈⠀⠀⠀⠠⠄⠂";
        z-index: 1;
        text-indent: 0;
        animation: s-loader-square-dots-${id} ${finalParams.duration} steps(8) infinite;
    }
    &:after {
        font-size: s.scalable(1em);
        white-space: nowrap;
        position: absolute;
        top: 0;
        left: calc(0.59ch);
        color: currentColor;
        content: "⠀⠀⠁⠂⠄⠀⠀⠀";
        display: block;
        text-indent: 0;
        clip-path: polygon(0 0, 1ch 0, 1ch 100%, 0 100%);
        animation: s-loader-square-dots-${id} ${finalParams.duration} steps(8) infinite;
    }

    @keyframes s-loader-square-dots-${id} {
        to {
            text-indent: -9.8ch;
        }
    }
  `);

    return vars;
}
