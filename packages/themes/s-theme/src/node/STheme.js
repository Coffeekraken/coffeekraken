import __SThemeBase from "../shared/SThemeBase";
import __SColor from "@coffeekraken/s-color";
class STheme extends __SThemeBase {
  constructor(theme, variant) {
    super(theme, variant);
  }
  static getCurrentTheme() {
    return this.getTheme();
  }
  getColor(name, variant, state = "default") {
    const color = this.config(`color.${name}.color`);
    if (!color) {
      throw new Error(`Sorry but the requested "<yellow>${name}</yellow> color does not exists...`);
    }
    if (!variant) {
      return new __SColor(color);
    }
    const variantObj = this.config(`color.${name}.${state}.${variant}`);
    if (!variantObj) {
      throw new Error(`Sorry but the requested "<yellow>${name}</yellow>"color, variant "<cyan>${variant}</cyan>" and state "<magenta>${state}</magenta>" does not exists...`);
    }
    const colorInstance = new __SColor(color);
    colorInstance.apply(variantObj);
    return colorInstance;
  }
}
export {
  STheme as default
};
