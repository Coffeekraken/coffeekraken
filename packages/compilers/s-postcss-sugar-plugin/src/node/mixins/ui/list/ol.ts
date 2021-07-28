import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
import __isInScope from '../../../utils/isInScope';
import __theme from '../../../utils/theme';
import __jsObjectToCssProperties from '../../../utils/jsObjectToCssProperties';

class postcssSugarPluginUiListOlMixinInterface extends __SInterface {
  static definition = {
  };
}

export interface IPostcssSugarPluginUiListOlMixinParams {
}

export { postcssSugarPluginUiListOlMixinInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginUiListOlMixinParams>;
  atRule: any;
  replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiListOlMixinParams = {
      ...params
    };

  const vars: string[] = [];

  const iconSelector = '&:before';

  vars.push(`
      position: relative;
      counter-reset: list-ol; 

      & > li,
      & > dt {
        display: block !important;
        padding-left: 1.5em;
        margin-bottom: 0.5em;
      
        &:before {  
          counter-increment: list-ol;    
          content: counter(list-ol);
          font-size: 1em;
          display: inline-block;
          position: absolute;
          left: 0.5em;
          transform: translateX(-50%);
          color: sugar.color(ui);
          text-align: right;
          width: 2ch;
        }          
      }

      @sugar.rhythm.vertical {
        ${__jsObjectToCssProperties(__theme().config('ui.list.:rhythmVertical'))}
     } 
  `);

    replaceWith(vars);
}
