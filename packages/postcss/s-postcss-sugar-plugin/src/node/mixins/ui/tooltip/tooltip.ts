import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          tooltip
 * @namespace     node.mixin.ui.tooltip
 * @type               PostcssMixin
 * @interface     ./tooltip          interface
 * @platform      postcss
 * @status        beta
 *
 * Apply the tooltip style to any element
 *
 * @param       {'solid'}                           [style='theme.ui.tooltip.defaultStyle']         The style you want to generate
 * @param       {'default'|'square'|'pill'}             [shape='theme.ui.tooltip.defaultShape']         The shape you want to generate
 * @param       {''top'|'right'|'bottom'|'left'}            [position='theme.ui.tooltip.defaultPosition']         The position you want to generate
 * @param      {Boolean}                                [interactive=false]                 Specify if the tooltip is interactive or not
 * @param       {('bare'|'lnf'|'shape')[]}        [scope=['bare', 'lnf', 'shape']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @example     css
 * .my-tooltip {
 *    @sugar.ui.tooltip;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiTooltipInterface extends __SInterface {
    static get _definition() {
        return {
            style: {
                type: 'String',
                values: ['solid'],
                default: __STheme.get('ui.tooltip.defaultShape'),
            },
            shape: {
                type: 'String',
                values: ['default', 'square', 'pill'],
                default: __STheme.get('ui.tooltip.defaultShape'),
            },
            position: {
                type: 'String',
                values: ['top', 'right', 'bottom', 'left'],
                default: 'top',
            },
            interactive: {
                type: 'Boolean',
                default: false,
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'shape', 'position', 'interactive'],
                default: ['bare', 'lnf', 'shape', 'position', 'interactive'],
            },
        };
    }
}

export interface IPostcssSugarPluginUiTooltipParams {
    style: 'solid';
    shape: 'default' | 'square' | 'pill';
    scope: ('bare' | 'lnf' | 'shape' | 'position' | 'interactive' | 'vr')[];
    position: 'top' | 'right' | 'bottom' | 'left';
    interactive: Boolean;
}

export { postcssSugarPluginUiTooltipInterface as interface };
export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiTooltipParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiTooltipParams = {
        style: 'solid',
        shape: 'default',
        position: 'top',
        interactive: false,
        scope: ['bare', 'lnf', 'shape', 'position', 'interactive'],
        ...params,
    };

    const vars: string[] = [];

    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
            font-size: sugar.scalable(1rem);
            position: absolute;
            z-index: 500;
            display: block;
            max-width: 9999999px !important;
            pointer-events: none;
      `);
    }

    vars.push(`
        .s-tooltip-container--active > & {
            opacity: 1;
        }
    `);

    if (finalParams.scope.indexOf('interactive') !== -1) {
        if (finalParams.interactive) {
            vars.push(`
                .s-tooltip-container--active > &,
                .s-tooltip-container:focus > &,
                .s-tooltip-container:focus-within > &,
                .s-tooltip-container &:focus,
                .s-tooltip-container:hover > & {
                    pointer-events: all;
                }
            `);
        }
    }

    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
          background-color: sugar.color(current);
          color: sugar.color(current, foreground);
          transition: sugar.theme(ui.tooltip.transition);
          padding-inline: sugar.padding(ui.tooltip.paddingInline);
          padding-block: sugar.padding(ui.tooltip.paddingBlock);
          @sugar.depth( theme.ui.tooltip.depth);

            &:not([s-floating]) {
                &:after {
                    content: " ";
                    position: absolute;
                    border-style: solid;
                    border-color: sugar.color(current) transparent transparent transparent;
                }
            }

             &:before {
                content: '' !important;
                position: absolute;
                background: rgba(0,0,0,0);
            }

      `);
    }

    // not s-floating tooltips
    vars.push(`&:not([s-floating]) {`);

    if (finalParams.scope.indexOf('position') !== -1) {
        switch (finalParams.position) {
            // RIGHT
            case 'right':
                vars.push(`  
                top: 50%;
                left: calc(100% + sugar.theme(ui.tooltip.arrowSize));
                right: auto;    
                bottom: auto;
                transform: translateY(-50%);

                &:after {
                    top: 50%;
                    left: auto;
                    right: 100%;
                    bottom: auto;
                    margin-top: calc(sugar.theme(ui.tooltip.arrowSize) * -1 / 2);
                    border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
                    transform: rotate(90deg);
                }
            `);
                break;
            // LEFT
            case 'left':
                vars.push(`  
                top: 50%;
                right: calc(100% + sugar.theme(ui.tooltip.arrowSize));
                left: auto;    
                bottom: auto;
                transform: translateY(-50%);

                &:after {
                    top: 50%;
                    right: auto;
                    left: calc(100% + sugar.theme(ui.tooltip.arrowSize) / 2 - 1px);
                    bottom: auto;
                    margin-top: calc(sugar.theme(ui.tooltip.arrowSize) * -1 / 2);
                    border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
                    transform: rotate(-90deg);
                }
            `);
                break;
            case 'bottom':
                vars.push(`  
                bottom: auto;
                right: auto;
                left: 50%;
                top: calc(100% + sugar.theme(ui.tooltip.arrowSize));
                transform: translateX(-50%);

                &:after {
                    bottom: 100%;
                    top: auto;
                    left: 50%;
                    right: auto;
                    margin-left: calc(sugar.theme(ui.tooltip.arrowSize) * -1 / 2);
                    border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
                    transform: rotate(180deg);
                }
            `);
                break;
            case 'top':
            default:
                vars.push(`  
                bottom: calc(100% + sugar.theme(ui.tooltip.arrowSize));
                left: 50%;
                transform: translateX(-50%);

                &:after {
                    top: 100%;
                    left: 50%;
                    margin-left: calc(sugar.theme(ui.tooltip.arrowSize) * -1 / 2);
                    border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
                }
            `);
                break;
        }
    }

    // not s-floating tooltips
    vars.push(`}`);

    if (finalParams.scope.indexOf('position') !== -1) {
        switch (finalParams.position) {
            // RIGHT
            case 'right':
                vars.push(`  
                &:before {
                  height: 100%;
                  width: sugar.theme(ui.tooltip.arrowSize);
                  right: 100%;
                  left: auto;
                  bottom: auto;
                  top: 0;
                }
            `);
                break;
            // LEFT
            case 'left':
                vars.push(`  
                &:before {
                  height: 100%;
                  width: sugar.theme(ui.tooltip.arrowSize);
                  left: 100%;
                  right: auto;
                  bottom: auto;
                  top: 0;
                }
            `);
                break;
            case 'bottom':
                vars.push(`  
                &:before {
                  width: 100%;
                  height: sugar.theme(ui.tooltip.arrowSize);
                  bottom: 100%;
                  top: auto;
                  left: 0;
                }
            `);
                break;
            case 'top':
            default:
                vars.push(`  
                &:before {
                  width: 100%;
                  height: sugar.theme(ui.tooltip.arrowSize);
                  top: 100%;
                  left: 0;
                }
            `);
                break;
        }
    }

    if (finalParams.scope.includes('shape')) {
        switch (finalParams.shape) {
            case 'square':
                vars.push(`
                    border-radius: 0;
                `);
                break;
            case 'pill':
                vars.push(`
                    border-radius: 9999px;
                `);
                break;
            default:
                vars.push(`
                    border-radius: sugar.border.radius(ui.tooltip.borderRadius);
                `);
                break;
        }
    }

    return vars;
}
