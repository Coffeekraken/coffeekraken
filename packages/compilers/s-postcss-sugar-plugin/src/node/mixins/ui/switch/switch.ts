import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
import __isInScope from '../../../utils/isInScope';
import __theme from '../../../utils/theme';

class postcssSugarPluginUiSwitchMixinInterface extends __SInterface {
  static definition = {
      style: {
          type: 'String',
          values: ['default','gradient','outline'],
          default: 'default'
      },
      scope: {
          type: 'String',
          values: ['bare','lnf','style'],
          default: ['bare','lnf','style']
      }
  };
}

export interface IPostcssSugarPluginUiSwitchMixinParams {
    style: string;
    scope: string[];
}

export { postcssSugarPluginUiSwitchMixinInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginUiSwitchMixinParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginUiSwitchMixinParams = {
    ...params
  };

  const vars: string[] = [];

  // bare
  if (finalParams.scope.indexOf('bare') !== -1) {
    vars.push(`
        @sugar.scope.bare {
            display: inline-block;
            position: relative;            

            & input[type="checkbox"] {
                visibility: hidden;
                position: absolute;
            } 

            & input[type="checkbox"]:checked + *:after {
                left: 1em;
            }

            & input[type="checkbox"] + * {
                height: 1em;
                width: 2em;
                top: 0.1em;
                display: inline-block;
            }

            & input[type="checkbox"] + *:before {
                content: '';
                display: block;
                position: absolute;
                top: 0; left: 0;
                height: 1em;
                width: 2em;
            }
            & input[type="checkbox"] + *:after {
                content: '';
                display: block;
                position: absolute;
                top: 0; left: 0;
                height: 1em;
                width: 1em;
                transform: scale(0.7);
            }
        }
        `);
  }

  if (finalParams.scope.indexOf('lnf') !== -1 && finalParams.scope.indexOf('style') !== -1) {

    switch(finalParams.style) {
        case 'gradient':

        break;
        case 'outline':

        break;
        case 'default':
        default:
            vars.push(`
                @sugar.scope.lnf {

                    & input[type="checkbox"]:checked + *:before {
                        background-color: sugar.color(ui);
                    }

                    & input[type="checkbox"] + *:before {
                        background: sugar.color(ui, --lighten 40 --desaturate 100);
                        transition: sugar.theme(ui.switch.transition);
                        border-radius: sugar.theme(ui.switch.borderRadius);
                    }
                    & input[type="checkbox"] + *:after {
                        background: sugar.color(ui, foreground);
                        transition: sugar.theme(ui.switch.transition);
                        border-radius: sugar.theme(ui.switch.borderRadius);
                    }
                }
            `)

        break;
    }

  }

    

  replaceWith(vars);
}
