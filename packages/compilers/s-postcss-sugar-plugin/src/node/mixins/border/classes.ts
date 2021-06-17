import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';

class postcssSugarPluginBorderRadiusClassesMixinInterface extends __SInterface {
  static definition = {};
}

export interface IPostcssSugarPluginBorderRadiusClassesMixinParams {}

export { postcssSugarPluginBorderRadiusClassesMixinInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginBorderRadiusClassesMixinParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginBorderRadiusClassesMixinParams = {
    ...params
  };

  const radiusesObj = __theme().config('border.radius');

  const vars: string[] = [];

  Object.keys(radiusesObj).forEach((radiusName) => {

    const cls = `s-border--radius-${radiusName}`.replace('-default', '');
    const radiusCss = `/**
  * @name          ${cls}
  * @namespace          sugar.css.border
  * @type               CssClass
  * 
  * This class allows you to apply a "<yellow>${radiusName}</yellow>" border radius style to any HTMLElement
  * 
  * @example        html
  * <div class="s-border--radius-30 s-color--complementary">
  *     Hello world
  * </div>
  */
.${cls} {
    @sugar.border.radius(${radiusName});
}`;
    vars.push(radiusCss);
  });

  replaceWith(vars);
}
