import __getStyleProperty from "./getStyleProperty";
import __convert from "../../../shared/time/convert";
function splitIfNeeded(what, separator) {
  if (what.indexOf(separator) !== -1) {
    return what.split(separator).map((item) => item.trim());
  }
  return [what];
}
function getTransitionProperties(elm) {
  const property = __getStyleProperty(elm, "transition-property");
  const duration = __getStyleProperty(elm, "transition-duration") || 0;
  const timingFunction = __getStyleProperty(elm, "transition-timing-function");
  const delay = __getStyleProperty(elm, "transition-delay");
  const props = {
    property: splitIfNeeded(property, ","),
    duration: splitIfNeeded(duration, ",").map((value) => __convert(value, "ms")),
    delay: splitIfNeeded(delay, ",").map((value) => __convert(value, "ms")),
    timingFunction: splitIfNeeded(timingFunction, ",")
  };
  let totalDuration = 0;
  let i = 0;
  const delays = [0].concat(props.delay);
  [0].concat(props.duration).forEach((val) => {
    if (val + delays[i] > totalDuration) {
      totalDuration = val + delays[i];
    }
    i++;
  });
  props.totalDuration = totalDuration;
  return props;
}
var getTransitionProperties_default = getTransitionProperties;
export {
  getTransitionProperties_default as default
};
