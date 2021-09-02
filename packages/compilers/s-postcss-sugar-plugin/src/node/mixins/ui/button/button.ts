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
        scope: {
            type: 'Array<String>',
            values: ['bare', 'lnf'],
            default: ['bare', 'lnf'],
        },
    };
}

export interface IPostcssSugarPluginUiButtonParams {
    style: 'default' | 'gradient' | 'outline' | 'text';
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
      display: inline-block;
      cursor: pointer;
      white-space: nowrap;

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
        switch (finalParams.style) {
            case 'gradient':
                vars.push(`
            @sugar.gradient(sugar.color(ui, gradientStart), sugar.color(ui, gradientEnd), $angle: 90);
            color: sugar.color(ui, foreground);

            &:hover, &:focus {
              @sugar.gradient(sugar.color(ui,gradientEnd), sugar.color(ui, gradientStart), $angle: 90);
              color: sugar.color(ui:hover, foreground);
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
    }

    replaceWith(vars);
}
