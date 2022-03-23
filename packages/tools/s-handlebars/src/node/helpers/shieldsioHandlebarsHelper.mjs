import "../../../../../chunk-TD77TI6B.mjs";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
function ShieldsioHandlebarsHelper(settings) {
  const shieldsConfig = __SSugarConfig.get("shieldsio");
  return function(context, options) {
    const shields = [];
    shieldsConfig.shields.forEach((shield) => {
      shields.push(`![${shield}](https://shields.io/${shieldsConfig.urls[shield]})`);
    });
    return shields.join(" ");
  };
}
export {
  ShieldsioHandlebarsHelper as default
};
