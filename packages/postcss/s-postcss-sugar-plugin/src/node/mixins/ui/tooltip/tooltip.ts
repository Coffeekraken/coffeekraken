import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          tooltip
 * @as              @s.ui.tooltip
 * @namespace     node.mixin.ui.tooltip
 * @type               PostcssMixin
 * @interface     ./tooltip          interface
 * @platform      postcss
 * @status        beta
 *
 * Apply the tooltip style to any element
 *
 * @param       {'solid'}                           [style='theme.ui.tooltip.defaultLnf']         The style you want to generate
 * @param       {'top'|'right'|'bottom'|'left'}            [position='theme.ui.tooltip.defaultPosition']         The position you want to generate
 * @param      {Boolean}                                [interactive=false]                 Specify if the tooltip is interactive or not
 * @param       {('bare'|'lnf')[]}        [scope=['bare', 'lnf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @snippet         @s.ui.tooltip
 *
 * @example     css
 * .my-tooltip {
 *    @s.ui.tooltip;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiTooltipInterface extends __SInterface {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['solid'],
                default: __STheme.get('ui.tooltip.defaultLnf'),
            },
            position: {
                type: 'String',
                values: ['top', 'right', 'bottom', 'left'],
                default: __STheme.get('ui.tooltip.defaultPosition'),
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
                values: ['bare', 'lnf', 'position', 'interactive'],
                default: ['bare', 'lnf', 'position', 'interactive'],
            },
        };
    }
}

export interface IPostcssSugarPluginUiTooltipParams {
    lnf: 'solid';
    position: 'top' | 'right' | 'bottom' | 'left';
    interactive: Boolean;
    scope: ('bare' | 'lnf' | 'position' | 'interactive' | 'vr')[];
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
        lnf: 'solid',
        position: 'top',
        interactive: false,
        scope: ['bare', 'lnf', 'position', 'interactive'],
        ...params,
    };

    const vars: string[] = [];

    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
            font-size: s.scalable(1rem);
            position: absolute;
            z-index: 50;
            display: block;
            max-width: 9999999px !important;
            pointer-events: none;
            white-space: nowrap;

            &:before {
                content: '' !important;
                position: absolute;
                background: rgba(0,0,0,0);
            }
      `);
    }

    vars.push(`
        .s-tooltip-container-active > & {
            opacity: 1;
        }
    `);

    if (finalParams.scope.indexOf('interactive') !== -1) {
        if (finalParams.interactive) {
            vars.push(`
                &:not(.s-tooltip-container > .s-tooltip),
                .s-tooltip-container-active > &,
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
          background-color: s.color(current);
          color: s.color(current, foreground);
          transition: s.theme(ui.tooltip.transition);
          transition-property: opacity;
          padding-inline: s.padding(ui.tooltip.paddingInline);
          padding-block: s.padding(ui.tooltip.paddingBlock);
          @s.border.radius(ui.tooltip.borderRadius);
          @s.depth(ui.tooltip.depth);

            &:not([s-floating]) {
                &:after {
                    content: " ";
                    position: absolute;
                    border-style: default;
                    border-color: s.color(current) transparent transparent transparent;
                }
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
                left: calc(100% + s.theme(ui.tooltip.arrowSize));
                right: auto;    
                bottom: auto;
                transform: translateY(-50%);

                &:after {
                    top: 50%;
                    left: auto;
                    right: 100%;
                    bottom: auto;
                    margin-top: calc(s.theme(ui.tooltip.arrowSize) * -1 / 2);
                    border-width: calc(s.theme(ui.tooltip.arrowSize) / 2);
                    transform: rotate(90deg);
                }
            `);
                break;
            // LEFT
            case 'left':
                vars.push(`  
                top: 50%;
                right: calc(100% + s.theme(ui.tooltip.arrowSize));
                left: auto;    
                bottom: auto;
                transform: translateY(-50%);

                &:after {
                    top: 50%;
                    right: auto;
                    left: calc(100% + s.theme(ui.tooltip.arrowSize) / 2 - 1px);
                    bottom: auto;
                    margin-top: calc(s.theme(ui.tooltip.arrowSize) * -1 / 2);
                    border-width: calc(s.theme(ui.tooltip.arrowSize) / 2);
                    transform: rotate(-90deg);
                }
            `);
                break;
            case 'bottom':
                vars.push(`  
                bottom: auto;
                right: auto;
                left: 50%;
                top: calc(100% + s.theme(ui.tooltip.arrowSize));
                transform: translateX(-50%);

                &:after {
                    bottom: 100%;
                    top: auto;
                    left: 50%;
                    right: auto;
                    margin-left: calc(s.theme(ui.tooltip.arrowSize) * -1 / 2);
                    border-width: calc(s.theme(ui.tooltip.arrowSize) / 2);
                    transform: rotate(180deg);
                }
            `);
                break;
            case 'top':
            default:
                vars.push(`  
                bottom: calc(100% + s.theme(ui.tooltip.arrowSize));
                left: 50%;
                transform: translateX(-50%);

                &:after {
                    top: 100%;
                    left: 50%;
                    margin-left: calc(s.theme(ui.tooltip.arrowSize) * -1 / 2);
                    border-width: calc(s.theme(ui.tooltip.arrowSize) / 2);
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
                  width: s.theme(ui.tooltip.arrowSize);
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
                  width: s.theme(ui.tooltip.arrowSize);
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
                  height: s.theme(ui.tooltip.arrowSize);
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
                  height: s.theme(ui.tooltip.arrowSize);
                  top: 100%;
                  left: 0;
                }
            `);
                break;
        }
    }

    return vars;
}
