import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';

/**
 * @name          classes
 * @as              @s.ui.tooltip.classes
 * @namespace     node.mixin.ui.tooltip
 * @type               PostcssMixin
 * @interface     ./classes          interface
 * @platform      postcss
 * @status        beta
 *
 * Generate the tooltip classes
 *
 * @param       {('solid')[]}                           [lnfs=['solid']]         The lnf(s) you want to generate
 * @param       {'solid'}                [defaultLnf='theme.ui.tooltip.defaultLnf']           The default lnf you want
 * @param       {('bare'|'lnf')[]}        [scope=['bare', 'lnf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @snippet         @s.ui.tooltip.classes
 *
 * @example     css
 * @s.ui.tooltip.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiTooltipClassesInterface extends __SInterface {
    static get _definition() {
        return {
            lnfs: {
                type: 'String[]',
                values: ['solid'],
                default: ['solid'],
            },
            defaultLnf: {
                type: 'String',
                values: ['solid'],
                default: __STheme.get('ui.tooltip.defaultLnf'),
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

export interface IPostcssSugarPluginUiTooltipClassesParams {
    lnfs: 'solid'[];
    defaultLnf: 'solid';
    scope: ('bare' | 'lnf')[];
}

export { postcssSugarPluginUiTooltipClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiTooltipClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiTooltipClassesParams = {
        lnfs: [],
        defaultLnf: 'solid',
        scope: [],
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Tooltip
        * @namespace          sugar.style.ui.tooltip
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/tooltip
        * @platform       css
        * @status       beta
        * 
        * These classes allows you display nice tooltips on any HTMLElement
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * @s.ui.tooltip.classes;
        * 
        * .my-tooltip {
        *   @s.ui.tooltip;
        * }
        * 
        * @cssClass             s-tooltip-container             Allows to hide and show your tooltip on hover (focus)
        * @cssClass             s-tooltip-container:active     Allow to display a tooltip without having the need of the user interaction
        * @cssClass             s-tooltip                       Apply on the element you want as a tooltip
        ${finalParams.lnfs
            .map((lnf) => {
                return ` * @cssClass     s-tooltip${
                    lnf === finalParams.defaultLnf ? '' : `:${lnf}`
                }           Apply the ${lnf} tooltip lnf`;
            })
            .join('\n')}
        * @cssClass             s-tooltip:top                 Align your tooltip at "top". This is the default. Only then not using the "s-floating" feature       
        * @cssClass             s-tooltip:right               Align your tooltip at "right". Only then not using the "s-floating" feature
        * @cssClass             s-tooltip:left               Align your tooltip at "left". Only then not using the "s-floating" feature
        * @cssClass             s-tooltip:bottom               Align your tooltip at "bottom". Only then not using the "s-floating" feature
        * @cssClass             s-tooltip:interactive          Allow the user to interact with the tooltip. Only then not using the "s-floating" feature
        * 
        ${finalParams.lnfs.map((lnf) => {
            return ` * @example        html       ${lnf}
                *   <span class="s-tooltip-container">
                *       <a class="s-btn s-mie:20">Hover me!</a>
                *       <div class="s-white-space:nowrap s-tooltip${
                    finalParams.defaultLnf === lnf ? '' : `:${lnf}`
                } s-color:accent" s-floating>
                *           ${__faker.name.title()} ${__faker.name.findName()}
                *       </div>
                *   </span>
                *   <span class="s-tooltip-container">
                *       <a class="s-btn s-mie:20">Hover me!</a>
                *       <div class="s-white-space:nowrap s-tooltip${
                    finalParams.defaultLnf === lnf ? '' : `:${lnf}`
                } s-color:complementary" s-floating>
                *           ${__faker.name.title()} ${__faker.name.findName()}
                *       </div>
                *   </span>
                *   <span class="s-tooltip-container">
                *       <a class="s-btn s-mie:20">Hover me!</a>
                *       <div class="s-white-space:nowrap s-tooltip${
                    finalParams.defaultLnf === lnf ? '' : `:${lnf}`
                } s-color:info" s-floating>
                *           ${__faker.name.title()} ${__faker.name.findName()}
                *       </div>
                *   </span>
            `;
        })}
        * 
        * @example      html        Positions (no s-floating feature)
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mie:20">Block start (default)</a>
        *       <div class="s-tooltip s-white-space:nowrap s-color:accent">
        *           ${__faker.name.title()} ${__faker.name.findName()}
        *       </div>
        *   </span>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mie:20">Inline end</a>
        *       <div class="s-tooltip:right s-white-space:nowrap s-color:accent">
        *           ${__faker.name.title()} ${__faker.name.findName()}
        *       </div>
        *   </span>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mie:20">Block end</a>
        *       <div class="s-tooltip:bottom s-white-space:nowrap s-color:accent">
        *           ${__faker.name.title()} ${__faker.name.findName()}
        *       </div>
        *   </span>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mie:20">Inline start</a>
        *       <div class="s-tooltip:left s-white-space:nowrap s-color:accent">
        *           ${__faker.name.title()} ${__faker.name.findName()}
        *       </div>
        *   </span>
        * 
        * @example      html        Colors (none-exhaustive)
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mie:20">Accent</a>
        *       <div class="s-tooltip s-white-space:nowrap s-color:accent" s-floating>
        *           ${__faker.name.title()} ${__faker.name.findName()}
        *       </div>
        *   </span>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mie:20">Complementary</a>
        *       <div class="s-tooltip s-white-space:nowrap s-color:complementary" s-floating>
        *           ${__faker.name.title()} ${__faker.name.findName()}
        *       </div>
        *   </span>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mie:20">Error</a>
        *       <div class="s-tooltip s-white-space:nowrap s-color:error" s-floating>
        *           ${__faker.name.title()} ${__faker.name.findName()}
        *       </div>
        *   </span>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mie:20">Info</a>
        *       <div class="s-tooltip s-white-space:nowrap s-color:info" s-floating>
        *           ${__faker.name.title()} ${__faker.name.findName()}
        *       </div>
        *   </span>
        * 
        * @example      html        Interactive
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mie:20">I'm not interactive</a>
        *       <div class="s-tooltip s-white-space:nowrap">
        *           <a class="s-btn s-color:accent">Click me if you can!</a>
        *       </div>
        *   </span>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mie:20">I'm interactive</a>
        *       <div class="s-tooltip:interactive s-white-space:nowrap">
        *           <a class="s-btn s-color:accent">Click me because you can!</a>
        *       </div>
        *   </span>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    if (finalParams.scope.includes('bare')) {
        vars.comment(
            () => `/**
            * @name           s-toolip-container
            * @namespace          sugar.style.ui.tooltip
            * @type           CssClass
            * 
            * This class represent the tooltip container in which you have to put your actual .s-tooltip element
            * and anything you want as a tooltip activator. Can be a button, an image, really anything
            * 
            * @example        html
            * <div class="s-tooltip-container">
            *   <img src="..." />
            *   <div class="s-tooltip">Something cool</div>
            * </div>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */`,
        );
        vars.code(
            () => `
            .s-tooltip-container {
                position: relative;
                display: inline-block;

                & > .s-tooltip {
                    opacity: 0;
                }

                &:focus,
                &:focus-within,
                &:hover {
                    & > .s-tooltip-interactive {
                        pointer-events: all;
                        opacity: 1;
                    }
                }

                &:not(:focus):not(:focus-within):not(:hover) {
                    & > .s-tooltip {
                        
                    }
                }

                &:focus > .s-tooltip,
                &:focus-within > .s-tooltip,
                .s-tooltip:focus,
                &:hover > .s-tooltip {
                    opacity: 1;
                }
            }
        `,
            { type: 'CssClass' },
        );
        vars.comment(
            () => `/**
            * @name           s-toolip-container:active
            * @namespace          sugar.style.ui.tooltip
            * @type           CssClass
            * 
            * This class allows you to display a tooltip inside a tooltip container without needing hover by the user
            * 
            * @example        html
            * <div class="s-tooltip-container:active">
            *   <img src="..." />
            *   <div class="s-tooltip">Something cool</div>
            * </div>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */`,
        );
        // no need to write a class here cause this is handled in the tooltip.ts file directly...
    }

    if (finalParams.scope.includes('bare')) {
        vars.comment(
            () => `/**
            * @name           s-tooltip
            * @namespace          sugar.style.ui.tooltip
            * @type           CssClass
            * 
            * This class represent a simple tooltip
            * 
            * @example        html
            * <a class="s-tooltip-container s-btn">
            *   I'm a cool button
            *   <div class="s-tooltip">Something cool</div>
            * </a>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */`,
        );
        vars.code(
            () => `
            .s-tooltip {
                @s.ui.tooltip($scope: bare);
            }
        `,
            { type: 'CssClass' },
        );
    }

    if (finalParams.scope.includes('lnf')) {
        finalParams.lnfs.forEach((lnf) => {
            vars.comment(
                () => `/**
                * @name           s-tooltip${
                    finalParams.defaultLnf === lnf ? '' : `:${lnf}`
                }
                * @namespace          sugar.style.ui.tooltip
                * @type           CssClass
                * 
                * This class represent a ${lnf} tooltip
                * 
                * @example        html
                * <a class="s-tooltip-container s-btn">
                *   I'm a cool button
                *   <div class="s-tooltip${
                    finalParams.defaultLnf === lnf ? '' : `:${lnf}`
                }">Something cool</div>
                * </a>
                * 
                * @since    2.0.0
                * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                */`,
            );
            vars.code(
                () => `
                .s-tooltip${
                    finalParams.defaultLnf === lnf ? '' : `-${lnf}`
                }:not(.s-bare) {
                    @s.ui.tooltip($lnf: ${lnf}, $scope: lnf);
                }
            `,
                { type: 'CssClass' },
            );
        });
    }

    // Interactive
    vars.comment(
        () => `/**
        * @name           s-tooltip-interactive
        * @namespace          sugar.style.ui.tooltip
        * @type           CssClass
        * 
        * This class make a tooltip interactive. This mean that the user can hover the tooltip,
        * select texts in it, click on buttons, etc...
        * 
        * @example        html
        * <a class="s-tooltip-container s-btn">
        *   I'm a cool button
        *   <div class="s-tooltip:interactive">Something cool</div>
        * </a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
    );
    vars.code(
        () => `
        .s-tooltip-interactive {
            @s.ui.tooltip($interactive: true, $scope: 'interactive');
        }
    `,
        { type: 'CssClass' },
    );

    // TOP
    vars.comment(
        () => `/**
        * @name           s-tooltip
        * @namespace          sugar.style.ui.tooltip
        * @type           CssClass
        * 
        * This class represent a simple block start (top) tooltip
        * 
        * @example        html
        * <a class="s-tooltip-container s-btn">
        *   I'm a cool button
        *   <div class="s-tooltip">Something cool</div>
        * </a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
    );
    vars.code(
        () => `
        .s-tooltip[placement="top"],
        .s-tooltip {
            @s.ui.tooltip($position: top, $scope: position);
        }
    `,
        { type: 'CssClass' },
    );

    // RIGHT
    vars.comment(
        () => `/**
        * @name           s-tooltip:right
        * @namespace          sugar.style.ui.tooltip
        * @type           CssClass
        * 
        * This class represent a simple inline end (right) tooltip
        * 
        * @example        html
        * <a class="s-tooltip-container s-btn">
        *   I'm a cool button
        *   <div class="s-tooltip:right">Something cool</div>
        * </a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
    );
    vars.code(
        () => `
        .s-tooltip[placement="right"],
        .s-tooltip-right {
            @s.ui.tooltip($position: right, $scope: position);
        }
    `,
        { type: 'CssClass' },
    );

    // left
    vars.comment(
        () => `/**
        * @name           s-tooltip:left
        * @namespace          sugar.style.ui.tooltip
        * @type           CssClass
        * 
        * This class represent a simple left tooltip
        * 
        * @example        html
        * <a class="s-tooltip-container s-btn">
        *   I'm a cool button
        *   <div class="s-tooltip:left">Something cool</div>
        * </a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
    );
    vars.code(
        () => `
        .s-tooltip[placement="left"],
        .s-tooltip-left {
            @s.ui.tooltip($position: left, $scope: position);
        }
    `,
        { type: 'CssClass' },
    );

    // BOTTOM
    vars.comment(
        () => `/**
        * @name           s-tooltip:bottom
        * @namespace          sugar.style.ui.tooltip
        * @type           CssClass
        * 
        * This class represent a simple block end (bottom) tooltip
        * 
        * @example        html
        * <a class="s-tooltip-container s-btn">
        *   I'm a cool button
        *   <div class="s-tooltip:bottom">Something cool</div>
        * </a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
    );
    vars.code(
        () => `
        .s-tooltip[placement="bottom"],
        .s-tooltip-bottom {
            @s.ui.tooltip($position: bottom, $scope: position);
        }
    `,
        { type: 'CssClass' },
    );

    return vars;
}
