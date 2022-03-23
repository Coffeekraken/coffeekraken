import "../../../../../chunk-JETN4ZEY.mjs";
function constrain(value, min = null, max = null) {
  if (min !== null && value < min)
    value = min;
  if (max !== null && value > max)
    value = max;
  return value;
}
var constrain_default = constrain;
export {
  constrain_default as default
};
