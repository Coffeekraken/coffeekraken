"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
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
class SSugarcssPluginUiGaugeInterface extends s_interface_1.default {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['solid'],
                default: s_theme_1.default.current.get('ui.gauge.defaultLnf'),
            },
        };
    }
}
exports.interface = SSugarcssPluginUiGaugeInterface;
function default_1({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ lnf: 'solid' }, params);
    const vars = [];
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBRUgsTUFBTSwrQkFBZ0MsU0FBUSxxQkFBWTtJQUN0RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDakIsT0FBTyxFQUFFLGlCQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQzthQUN2RDtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNMkMsb0RBQVM7QUFFckQsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEdBQUcsRUFBRSxPQUFPLElBQ1QsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQzlCLFFBQVEsV0FBVyxDQUFDLEdBQUcsRUFBRTtRQUNyQjtZQUNJLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2lCQWlFTCxDQUFDLENBQUM7WUFDUCxNQUFNO0tBQ2I7SUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWYsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQTFGRCw0QkEwRkMifQ==