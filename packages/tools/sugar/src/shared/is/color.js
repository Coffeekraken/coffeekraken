function isColor(value) {
  try {
    const ele = document.createElement("div");
    ele.style.color = value;
    return ele.style.color.split(/\s+/).join("").toLowerCase() !== "";
  } catch (e) {
  }
  if (typeof value !== "string")
    return false;
  return value.match(/^#[a-zA-Z0-9]{3,6}$/) || value.match(/^rgba\([0-9]{1,3}(\s+)?,(\s+)?[0-9]{1,3}(\s+)?,(\s+)?[0-9]{1,3}(\s+)?,(\s+)?[0-9]{1,3}\)$/) || value.match(/^rgb\([0-9]{1,3}(\s+)?,(\s+)?[0-9]{1,3}(\s+)?,(\s+)?[0-9]{1,3}\)$/) || value.match(/^hsl\([0-9]{1,3}%?(\s+)?,(\s+)?[0-9]{1,3}%?(\s+)?,(\s+)?[0-9]{1,3}%?(\s+)?\)$/) || value.match(/^hsv\([0-9]{1,3}%?(\s+)?,(\s+)?[0-9]{1,3}%?(\s+)?,(\s+)?[0-9]{1,3}%?(\s+)?\)$/);
}
var color_default = isColor;
export {
  color_default as default
};
