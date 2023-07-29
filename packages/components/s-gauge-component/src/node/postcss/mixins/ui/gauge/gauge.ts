import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          gauge
 * @as          @sugar.ui.gauge
 * @namespace     node.mixin.ui.gauge
 * @type               PostcssMixin
 * @interface       ./input
 * @platform      postcss
 * @status        beta
 *
 * Apply the gauge style to any element
 *
 * @param       {'solid'}                           [style='theme.ui.gauge.defaultLnf']         The lnf you want to generate
 * @param       {('bare'|'lnf')[]}        [scope=['bare', 'lnf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @snippet         @sugar.ui.gauge
 *
 * @example     css
 * .my-gauge {
 *    @sugar.ui.gauge;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiGaugeInterface extends __SInterface {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['solid'],
                default: __STheme.get('ui.gauge.defaultLnf'),
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf'],
                default: ['bare', 'lnf'],
            },
        };
    }
}

export interface IPostcssSugarPluginUiGaugeParams {
    lnf: 'solid';
    scope: string[];
}

export { postcssSugarPluginUiGaugeInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiGaugeParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiGaugeParams = {
        lnf: 'solid',
        scope: [],
        ...params,
    };

    const vars: string[] = [];

    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
        `);
    }

    if (finalParams.scope.indexOf('lnf') !== -1) {
        switch (finalParams.lnf) {
            default:
                vars.push(`

                    @keyframes s-gauge-track-in {
                        0% {
                            stroke-dashoffset: var(--dash-circle);
                        }
                        100% {
                            stroke-dashoffset: calc((var(--dash-circle) - var(--dash-length)));
                        }
                    }
                    @keyframes s-gauge-value-in {
                        0% {
                            opacity: 0;
                            transform: translate(-50%, calc(-50% + 0.5em));
                        }
                        100% {
                            opacity: 1;
                            transform: translate(-50%, -50%);
                        }
                    }
                    @keyframes s-gauge-in {
                        0% {
                            stroke-dashoffset: var(--dash-circle);
                        }
                        100% {
                            stroke-dashoffset: calc(
                                (
                                    var(--dash-circle) -
                                        (var(--dash-length) / 100 * var(--value-percent))
                                )
                            );
                        }
                    }

                    font-size: 150px;
                    
                    &.low {
                        @sugar.color (error);
                    }
                    &.medium {
                        @sugar.color (accent);
                    }
                    &.high {
                        @sugar.color (success);
                    }
                
                    ._track {
                        stroke: sugar.color(main, --alpha 0.1);
                        stroke-dashoffset: var(--dash-circle);
                        animation: s-gauge-track-in 0.3s ease-in-out 0s forwards;
                        @sugar.transition fast;
                    }
                    ._gauge {
                        stroke: sugar.color(current);
                        stroke-dashoffset: var(--dash-circle);
                        animation: s-gauge-in 0.3s ease-in-out 0.2s forwards;
                        @sugar.transition fast;
                    }
                
                    ._value {
                        opacity: 0;
                        animation: s-gauge-value-in 0.3s ease-out 0.3s forwards;
                        @sugar.transition fast;
                    }
                
                `);
                break;
        }
    }

    return vars;
}
