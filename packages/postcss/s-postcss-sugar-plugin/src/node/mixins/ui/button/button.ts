import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          blockquote
 * @namespace     node.mixin.ui.button
 * @type          PostcssMixin
 * @interface     ./button
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to generate the "button" UI component css.
 *
 * @param       {'default'|'gradient'|'outline'|'text'}                           [style='theme.ui.button.defaultLnf']         The style you want to generate
 * @param       {('bare'|'lnf')[]}        [scope=['bare', 'lnf']]      The scope you want to generate
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * .my-element {
 *      \@sugar.ui.button();
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiButtonInterface extends __SInterface {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['default', 'gradient', 'outline', 'text'],
                default: __STheme.get('ui.button.defaultLnf'),
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

export interface IPostcssSugarPluginUiButtonParams {
    lnf: 'default' | 'gradient' | 'outline' | 'text';
    scope: ('bare' | 'lnf')[];
}

export { postcssSugarPluginUiButtonInterface as interface };

/**
 * @name          button
 * @namespace     ui.button
 * @type               PostcssMixin
 * @interface     ./button          interface
 * @platform      postcss
 * @status        beta
 *
 * Apply the button style to any element
 *
 * @example     css
 * .my-button {
 *    @sugar.ui.button;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function ({
    params,
    atRule,
    sharedData,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiButtonParams>;
    atRule: any;
    sharedData: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiButtonParams = {
        lnf: 'default',
        scope: ['bare', 'lnf'],
        ...params,
    };

    const vars: string[] = [];

    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
        font-size: sugar.scalable(1rem);
        position: relative;
        display: inline-flex;
        cursor: pointer;
        user-select: none;
        white-space: nowrap;
        vertical-align: middle;
        padding-inline: sugar.padding(ui.button.paddingInline);
        padding-block: sugar.padding(ui.button.paddingBlock);
        gap: sugar.margin(20);
        align-items: center;
        justify-content: center;

        & > * {
          pointer-events: none;
        }
        & > i,
        & > .s-icon {
          font-size: 1em;
        }
    `);
    }

    // lnf
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
          font-size: sugar.scalable(1rem);
          text-decoration: none;
          font-weight: bold;
          @sugar.shape;
        `);

        switch (finalParams.lnf) {
            case 'gradient':
                vars.push(`
                    background: none !important;
                    color: sugar.color(current, foreground) !important;
                    transition: sugar.theme(ui.button.transition);
                    border: sugar.color(current, border) solid sugar.theme(ui.button.borderWidth);

                    --borderWidth: sugar.theme(ui.button.borderWidth);

                    & > * {
                      position: relative;
                      z-index: 1;
                    }

                    &:before {
                      content: '';
                      position: absolute;
                      top: 0;
                      left: 0;
                      width: 100%;
                      height: 100%;
                      @sugar.gradient(sugar.color(current, gradientStart), sugar.color(current, gradientEnd), $angle: 90);
                      transition: sugar.theme(ui.button.transition);
                    }

                    &:after {
                      content: '';
                      position: absolute;
                      top: 0;
                      left: 0;
                      width: 100%;
                      height: 100%;
                      @sugar.gradient(sugar.color(current,gradientEnd), sugar.color(current, gradientStart), $angle: 90);
                      opacity: 0;
                      transition: sugar.theme(ui.button.transition);
                    }

                    &:hover, &:focus {
                      color: sugar.color(current, foreground) !important;

                      &:after {
                        opacity: 1;
                      }
                    }
                `);

                break;
            case 'outline':
                vars.push(`
                background-color: sugar.color(current, --alpha 0);
                border: sugar.color(current) solid sugar.theme(ui.button.borderWidth);
                color: sugar.color(current) !important;

                &:hover, &:focus {
                  background-color: sugar.color(current);
                  color: sugar.color(current, foreground) !important;
                }
              `);
                break;
            case 'text':
                vars.push(`
                  background: none !important;
                  border: rgba(0,0,0,0) solid sugar.theme(ui.button.borderWidth);
                  color: sugar.color(current) !important;
                  box-shadow: none !important;

                  &:hover, &:focus {
                    transform: scale(1.1);
                  }

                  @sugar.state.disabled {
                    transform: scale(1) !important;
                  }
                `);
                break;
            default:
                vars.push(`
                  background-color: sugar.color(current);
                  border: sugar.color(current, border) solid sugar.theme(ui.button.borderWidth);
                  color: sugar.color(current, foreground) !important;

                  &:hover, &:focus {
                    background-color: sugar.color(current, --darken 6);
                    color: sugar.color(current, foreground) !important;

                    @sugar.theme.when(dark) {
                      background-color: sugar.color(current, --lighten 6);
                    }
                  }
        `);
                break;
        }

        // outline
        vars.push(`
              &:focus:not(:hover) {
                @sugar.outline;
              }
          `);
    }

    return vars;
}
