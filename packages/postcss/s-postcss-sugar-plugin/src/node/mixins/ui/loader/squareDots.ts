import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import { __uniqid } from '@coffeekraken/sugar/string';

/**
 * @name          squareDots
 * @namespace     node.mixin.ui.loader
 * @type               PostcssMixin
 * @interface     ./squareDots          interface
 * @platform      postcss
 * @status        beta
 *
 * Apply the squareDots style to any element
 *
 * @param        {String}           [name='s-loader-square-dots']               A name for your squareDots
 * @param       {String}            [duration='theme.ui.loaderSquareDots.duration']        The duration of your squareDots animation
 * @param        {String}           [easing='theme.ui.loaderSquareDots.easing']            The easing you want for your squareDots animation
 * @return      {String}            The generated css
 *
 * @example     css
 * .my-squareDots {
 *    @sugar.ui.loader.squareDots;
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
                default: __STheme.get('ui.loaderSquareDots.duration'),
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
    height: sugar.scalable(1em);
    width: sugar.scalable(1.2ch);
    text-rendering: geometricPrecision;

    &:before {
        font-size: sugar.scalable(1em);
        position: absolute;
        top: 0;
        left: calc(-0.225ch);
        white-space: nowrap;
        color: sugar.color(current);
        display: block;
        content: "⠁⠈⠀⠀⠀⠠⠄⠂";
        z-index: 1;
        text-indent: 0;
        animation: s-loader-square-dots-${id} ${finalParams.duration} steps(8) infinite;
    }
    &:after {
        font-size: sugar.scalable(1em);
        white-space: nowrap;
        position: absolute;
        top: 0;
        left: calc(0.59ch);
        color: sugar.color(current);
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
