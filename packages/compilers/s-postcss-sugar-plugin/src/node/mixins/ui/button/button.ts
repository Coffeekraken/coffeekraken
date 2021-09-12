import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
import __isInScope from '../../../utils/isInScope';
import __theme from '../../../utils/theme';

class postcssSugarPluginUiButtonInterface extends __SInterface {
    static definition = {
        style: {
            type: 'String',
            values: ['default', 'gradient', 'outline', 'text'],
            default: __theme().config('ui.button.defaultStyle'),
        },
        focusOutline: {
            type: 'Boolean',
            default: __theme().config('ui.button.focusOutline'),
        },
        scope: {
            type: 'Array<String>',
            values: ['bare', 'lnf'],
            default: ['bare', 'lnf'],
        },
    };
}

export interface IPostcssSugarPluginUiButtonParams {
    style: 'default' | 'gradient' | 'outline' | 'text';
    focusOutline: boolean;
    scope: string[];
}

export { postcssSugarPluginUiButtonInterface as interface };
export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiButtonParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiButtonParams = {
        style: __theme().config('ui.button.defaultStyle'),
        focusOutline: true,
        scope: ['bare', 'lnf'],
        ...params,
    };

    const vars: string[] = [];

    // lnf
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
      @sugar.ui.base(button);
    `);
    }

    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
        position: relative;
      display: inline-block;
      cursor: pointer;
      white-space: nowrap;
      vertical-align: middle;

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
        & > * {
          @sugar.color.remap(ui, main);
        }
      `);

        switch (finalParams.style) {
            case 'gradient':
                vars.push(`
                    background: none !important;
                    color: sugar.color(ui, foreground);
                    transition: sugar.theme(ui.button.transition);
                    border: none !important;

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
                      color: sugar.color(ui:hover, foreground);

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
              `);
                break;
            case 'text':
                vars.push(`
                  background-color: sugar.color(ui, --alpha 0);
                  border: none !important;
                  color: sugar.color(ui);

                  &:hover, &:focus {
                    background-color: sugar.color(ui, --alpha 0);
                    transform: scale(1.1);
                  }
                `);
                break;
            case 'default':
            default:
                vars.push(`
                  background-color: sugar.color(ui);
                  color: sugar.color(ui, foreground);

                  &:hover, &:focus {
                    background-color: sugar.color(ui:hover, 50);
                    color: sugar.color(ui:hover, foreground);
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

    replaceWith(vars);
}
