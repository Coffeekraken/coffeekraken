import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          gauge
 * @as          @s.ui.gauge
 * @namespace     node.mixin.ui.gauge
 * @type               PostcssMixin
 * @interface       ./input
 * @platform      postcss
 * @status        beta
 *
 * Apply the gauge style to any element
 *
 * @param       {'solid'}                           [style='theme.ui.gauge.defaultLnf']         The lnf you want to generate
 * @return      {String}            The generated css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet         @s.ui.gauge
 *
 * @example     css
 * .my-gauge {
 *    @s.ui.gauge;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginUiGaugeInterface extends __SInterface {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['solid'],
                default: __STheme.current.get('ui.gauge.defaultLnf'),
            },
        };
    }
}

export interface ISSugarcssPluginUiGaugeParams {
    lnf: 'solid';
}

export { SSugarcssPluginUiGaugeInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<ISSugarcssPluginUiGaugeParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginUiGaugeParams = {
        lnf: 'solid',
        ...params,
    };

    const vars: string[] = [];

    vars.push(`@s.scope 'lnf' {`);
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
                        @s.color (error);
                    }
                    &.medium {
                        @s.color (accent);
                    }
                    &.high {
                        @s.color (success);
                    }
                
                    ._track {
                        stroke: s.color(main, --alpha 0.1);
                        stroke-dashoffset: var(--dash-circle);
                        animation: s-gauge-track-in 0.3s ease-in-out 0s forwards;
                        @s.transition fast;
                    }
                    ._gauge {
                        stroke: s.color(current);
                        stroke-dashoffset: var(--dash-circle);
                        animation: s-gauge-in 0.3s ease-in-out 0.2s forwards;
                        @s.transition fast;
                    }
                
                    ._value {
                        opacity: 0;
                        animation: s-gauge-value-in 0.3s ease-out 0.3s forwards;
                        @s.transition fast;
                    }
                
                `);
            break;
    }
    vars.push('}');

    return vars;
}
