import __SugarConfig from "@coffeekraken/s-sugar-config";
function colorValue(color) {
  if (!__SugarConfig.get("dev.colors")[color]) {
    throw new Error(`[sugar.shared.dev.colors.colorValue] Sorry but the color "<yellow>${color}</yellow>" you want to get the value from does not exists... Here's the list of available colors at this time: ${Object.keys(__SugarConfig.get("dev.colors")).join(",")}`);
  }
  return __SugarConfig.get("dev.colors")[color];
}
export {
  colorValue as default
};
