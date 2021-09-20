import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
import __isInScope from '../../../utils/isInScope';
import __theme from '../../../utils/theme';

class postcssSugarPluginUiButtonInterface extends __SInterface {
    static definition = {
        style: {
            type: 'String',
            values: ['solid', 'gradient', 'outline', 'text'],
            default: __theme().config('ui.button.defaultStyle'),
        },
        focusOutline: {
            type: 'Boolean',
            default: __theme().config('ui.button.focusOutline'),
        },
        scope: {
            type: {
                type: 'Array<String>',
                splitChars: [',', ' '],
            },
            values: ['bare', 'lnf', 'vr'],
            default: ['bare', 'lnf', 'vr'],
        },
    };
}

export interface IPostcssSugarPluginUiButtonParams {
    style: 'solid' | 'gradient' | 'outline' | 'text';
    focusOutline: boolean;
    scope: ('bare' | 'lnf' | 'vr')[];
}

export { postcssSugarPluginUiButtonInterface as interface };
export default function ({
    params,
    atRule,
    applyNoScopes,
    jsObjectToCssProperties,
    sharedData,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiButtonParams>;
    atRule: any;
    applyNoScopes: Function;
    jsObjectToCssProperties: Function;
    sharedData: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiButtonParams = {
        style: __theme().config('ui.button.defaultStyle'),
        focusOutline: true,
        scope: ['bare', 'lnf', 'vr'],
        ...params,
    };
    finalParams.scope = applyNoScopes(finalParams.scope);

    const vars: string[] = [];

    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
        position: relative;
        display: inline-block;
        cursor: pointer;
        white-space: nowrap;
        vertical-align: middle;
        padding-inline: sugar.padding(sugar.theme(ui.button.paddingInline));
        padding-block: sugar.padding(sugar.theme(ui.button.paddingBlock));

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
                    color: sugar.color(ui, foreground);
                    transition: sugar.theme(ui.button.transition);
                    border: sugar.color(ui, border) solid sugar.theme(ui.button.borderWidth);

                    --borderWidth: sugar.theme(ui.button.borderWidth);

                    & > * {
                      @sugar.color.remap(ui, main);
                    }

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
                      @sugar.gradient(sugar.color(ui, gradientStart), sugar.color(ui, gradientEnd), $angle: 90);
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
                      @sugar.gradient(sugar.color(ui,gradientEnd), sugar.color(ui, gradientStart), $angle: 90);
                      opacity: 0;
                      transition: sugar.theme(ui.button.transition);
                    }

                    &:hover, &:focus {
                      color: sugar.color(ui, foreground);

                      &:after {
                        opacity: 1;
                      }
                    }
                `);

                break;
            case 'outline':
                vars.push(`
                background-color: sugar.color(ui, --alpha 0);
                border: sugar.color(ui) solid sugar.theme(ui.button.borderWidth);

                &:hover, &:focus {
                  background-color: sugar.color(ui, --alpha 0.3);
                }

                & > * {
                  @sugar.color.remap(ui, main);
                }
              `);
                break;
            case 'text':
                vars.push(`
                  background: none !important;
                  border: rgba(0,0,0,0) solid sugar.theme(ui.button.borderWidth);
                  color: sugar.color(ui);

                  &:hover, &:focus {
                    transform: scale(1.1);
                  }

                  @sugar.state.disabled {
                    transform: scale(1) !important;
                  }

                  & > * {
                    @sugar.color.remap(ui, main);
                  }
                `);
                break;
            case 'solid':
            default:
                vars.push(`
                  background-color: sugar.color(ui);
                  border: sugar.color(ui, border) solid sugar.theme(ui.button.borderWidth);
                  color: sugar.color(ui, foreground);

                  &:hover, &:focus {
                    background-color: sugar.color(ui, 55);
                    color: sugar.color(ui, foreground);
                  }

                  & > * {
                    @sugar.color.remap(ui, main);
                  }
        `);
                break;
        }

        if (finalParams.focusOutline) {
            vars.push(`
              @sugar.state.focusOutline;
          `);
        }
    }

    if (finalParams.scope.indexOf('vr') !== -1) {
        vars.push(`
            @sugar.rhythm.vertical {
                ${jsObjectToCssProperties(__theme().config('ui.button.:rhythmVertical'))}
            } 
        `);
    }

    replaceWith(vars);
}
