import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
import __isInScope from '../../../utils/isInScope';
import __theme from '../../../utils/theme';

class postcssSugarPluginUiListUlInterface extends __SInterface {
  static definition = {
      icon: {
          type: 'Boolean',
          default: false
      }
  };
}

export interface IPostcssSugarPluginUiListUlParams {
    icon: boolean;
}

export { postcssSugarPluginUiListUlInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginUiListUlParams>;
  atRule: any;
  replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiListUlParams = {
      icon: false,
      ...params
    };

  const vars: string[] = [];

  let iconSelector = '&:before';
  if (finalParams.icon) {
      iconSelector = '& > i:first-child';
  }

  vars.push(`
    @sugar.scope.lnf {
        position: relative;

        & > li,
        & > dt {
          display: block !important;
          padding-left: 1em;
          margin-bottom: 0.5em;
        
          ${iconSelector} {  
            ${!finalParams.icon ? `
                content: '●';
                margin-top: 0.25em;
                font-size: 0.7em;
            `: `
                margin-top: 0.25em;
                font-size: 0.8em;
            `}    
            display: inline-block;
            position: absolute;
            left: 0.5em;
            transform: translateX(-50%);
            color: sugar.color(accent);
          }

          ${finalParams.icon ? `
            padding-left: 1.5em;
            &:before {
              content: ' ' !important;
            }
          `: ''}
          
        }
    }
  `);

    replaceWith(vars);
}
