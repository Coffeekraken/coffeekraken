import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';

class postcssSugarPluginBorderRadiusClassesMixinInterface extends __SInterface {
  static definition = {};
}

export interface IPostcssSugarPluginBorderRadiusClassesMixinParams {}

export { postcssSugarPluginBorderRadiusClassesMixinInterface as interface };

/**
 * @name          classes
 * @namespace     node.mixins.border
 * @type          PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate the borders helpers like s-border:radius-20, etc...
 *
 * @return      {Css}                   The generated css
 *
 * @example       css
 * @sugar.border.classes;
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
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
3
  const radiusesObj = __theme().config('border.radius');

  const vars: string[] = [];

  Object.keys(radiusesObj).forEach((radiusName) => {

    const cls = `s-border--radius-${radiusName}`.replace('-default', '');
    const clsName = `s-border:radius-${radiusName}`.replace('-default', '');
    const radiusCss = `/**
  * @name               ${clsName}
  * @namespace          sugar.css.border
  * @type               CssClass
  * @platform         css
  * @status           beta
  * 
  * This class allows you to apply a "<yellow>${radiusName}</yellow>" border radius style to any HTMLElement
  * 
  * @example        html
  * <div class="${clsName.replace(':','\:')} s-color--complementary">
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
