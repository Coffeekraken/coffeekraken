import {
  __spreadValues
} from "../../../../../../chunk-JETN4ZEY.mjs";
function availableColors(settings) {
  settings = __spreadValues({
    excludeBasics: false
  }, settings != null ? settings : {});
  const _colors = [
    "yellow",
    "cyan",
    "green",
    "magenta",
    "blue",
    "red",
    "grey",
    "gray"
  ];
  let colors = _colors;
  if (settings.excludeBasics) {
    colors = _colors.filter((c) => {
      return c !== "white" && c !== "black" && c !== "grey" && c !== "gray";
    });
  }
  return colors;
}
export {
  availableColors as default
};
