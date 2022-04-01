import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
import __SLitComponent from "@coffeekraken/s-lit-component";
class SSliderBehavior {
  constructor(settings) {
    this.settings = settings != null ? settings : {};
    this.$slider = void 0;
  }
}
SSliderBehavior.properties = __SLitComponent.properties;
export {
  SSliderBehavior as default
};
