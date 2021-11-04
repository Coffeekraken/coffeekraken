import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssSugarPluginUiLoaderSpinnerMixinInterface extends __SInterface {
    static definition = {
        name: {
            type: 'String',
            default: 's-loader-spinner',
        },
        duration: {
            type: 'String',
            default: __STheme.config('ui.loaderSpinner.duration'),
        },
        easing: {
            type: 'String',
            default: __STheme.config('ui.loaderSpinner.easing'),
        },
    };
}

export interface IPostcssSugarPluginUiLoaderSpinnerMixinParams {
    name: string;
    duration: string;
    easing: string;
}

export { postcssSugarPluginUiLoaderSpinnerMixinInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiLoaderSpinnerMixinParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiLoaderSpinnerMixinParams = {
        name: '',
        duration: '',
        easing: '',
        ...params,
    };

    const vars: string[] = [];

    vars.push(`
    display: inline-block;
    text-indent: -9999em;
    border-top: 0.3em solid sugar.color(current, --alpha 0.8);
    border-right: 0.3em solid sugar.color(current, --alpha 0.8);
    border-bottom: 0.3em solid sugar.color(current, --alpha 0.8);
    border-left: 0.3em solid rgba(0,0,0,0);
    border-radius: 50%;
    width: 1em;
    height: 1em;
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

    replaceWith(vars);
}
