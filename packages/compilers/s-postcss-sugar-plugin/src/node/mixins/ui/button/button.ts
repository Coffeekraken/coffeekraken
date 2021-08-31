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
        shrinked: {
            type: 'Boolean',
            default: false,
        },
        scope: {
            type: 'Array<String>',
            values: ['bare', 'lnf', 'shrinked', 'style'],
            default: ['bare', 'lnf', 'style'],
        },
    };
}

export interface IPostcssSugarPluginUiButtonParams {
    style: 'default' | 'gradient' | 'outline' | 'text';
    shrinked: boolean;
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
        shrinked: false,
        scope: ['bare', 'lnf', 'style'],
        ...params,
    };

    const vars: string[] = [];

    const dotPath = finalParams.style === 'default' ? `ui.button` : `ui.button.:${finalParams.style}`;

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

      & > * {
        pointer-events: none;
      }
    `);
    }

    // style
    if (finalParams.scope.indexOf('style') !== -1) {
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

    // shrinked
    if (finalParams.scope.indexOf('shrinked') !== -1) {
        const transitionStr = __theme().config('ui.button.transition');
        const duration = transitionStr
            .split(' ')
            .map((l) => l.trim())
            .filter((v) => v.match(/[0-9.]+s$/))[0];

        vars.push(`
      max-width: 1em;
      white-space: nowrap;

      & > *:not(i) {
        opacity: 0;
        white-space: nowrap;
        transition: ${__themeVar('ui.button.transition')};
      }

      & > i {
        transform: translateX(-50%);
        transition: ${__themeVar('ui.button.transition')};
      }

      &:hover {
        max-width: 30ch;

        & > *:not(i) {
          opacity: 1;
          transition-delay: ${duration}
        }

        & > i {
          transform: translateX(0);
        }
      }
    `);
    }

    replaceWith(vars);
}
