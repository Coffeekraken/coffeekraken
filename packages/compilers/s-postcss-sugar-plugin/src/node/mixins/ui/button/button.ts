import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssSugarPluginUiButtonInterface extends __SInterface {
    static definition = {
        style: {
            type: 'String',
            values: ['solid', 'gradient', 'outline', 'text'],
            default: __STheme.config('ui.button.defaultStyle'),
        },
        outline: {
            type: 'Boolean',
            default: __STheme.config('ui.button.outline'),
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

export interface IPostcssSugarPluginUiButtonParams {
    style: 'solid' | 'gradient' | 'outline' | 'text';
    outline: boolean;
    scope: ('bare' | 'lnf')[];
}

export { postcssSugarPluginUiButtonInterface as interface };

/**
 * @name          button
 * @namespace     ui.button
 * @type          CssMixin
 * @interface     ./button          interface
 * @platform      css
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export default function ({
    params,
    atRule,
    applyNoScopes,
    sharedData,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiButtonParams>;
    atRule: any;
    applyNoScopes: Function;
    sharedData: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiButtonParams = {
        style: __STheme.config('ui.button.defaultStyle'),
        outline: true,
        scope: ['bare', 'lnf'],
        ...params,
    };
    finalParams.scope = applyNoScopes(finalParams.scope);

    const vars: string[] = [];

    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
        font-size: sugar.scalable(1rem);
        position: relative;
        display: inline-block;
        cursor: pointer;
        white-space: nowrap;
        vertical-align: middle;
        padding-inline: sugar.theme(ui.button.paddingInline);
        padding-block: sugar.theme(ui.button.paddingBlock);

        & > * {
          pointer-events: none;
        }
        & > i,
        & > .s-icon {
          font-size: 1em;
        }

        @sugar.state.disabled {
          @sugar.disabled;
        }

    `);
    }

    // lnf
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
          font-size: sugar.scalable(1rem);
          border-radius: sugar.theme(ui.button.borderRadius);
        `);

        switch (finalParams.style) {
            case 'gradient':
                vars.push(`
                    background: none !important;
                    color: sugar.color(current, foreground);
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
                      border-radius: sugar.theme(ui.button.borderRadius);
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
                      border-radius: sugar.theme(ui.button.borderRadius);
                      @sugar.gradient(sugar.color(current,gradientEnd), sugar.color(current, gradientStart), $angle: 90);
                      opacity: 0;
                      transition: sugar.theme(ui.button.transition);
                    }

                    &:hover, &:focus {
                      color: sugar.color(current, foreground);

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

                &:hover, &:focus {
                  background-color: sugar.color(current, --alpha 0.3);
                }
              `);
                break;
            case 'text':
                vars.push(`
                  background: none !important;
                  border: rgba(0,0,0,0) solid sugar.theme(ui.button.borderWidth);
                  color: sugar.color(current);

                  &:hover, &:focus {
                    transform: scale(1.1);
                  }

                  @sugar.state.disabled {
                    transform: scale(1) !important;
                  }
                `);
                break;
            case 'solid':
            default:
                vars.push(`
                  background-color: sugar.color(current);
                  border: sugar.color(current, border) solid sugar.theme(ui.button.borderWidth);
                  color: sugar.color(current, foreground);

                  &:hover, &:focus {
                    background-color: sugar.color(current, 55);
                    color: sugar.color(current, foreground);
                  }
        `);
                break;
        }

        if (finalParams.outline) {
            vars.push(`
              &:focus:not(:hover) {
                @sugar.outline;
              }
          `);
        }
    }

    return vars;
}
