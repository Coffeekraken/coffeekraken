import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
import __getStyleProperty from "./getStyleProperty";
import __convert from "../../../shared/time/convert";
function getAnimationProperties(elm) {
  const name = __getStyleProperty(elm, "animation-name") || "";
  const duration = __getStyleProperty(elm, "animation-duration") || "0s";
  const timingFunction = __getStyleProperty(elm, "animation-timing-function") || "linear";
  const delay = __getStyleProperty(elm, "animation-delay") || "0s";
  const iterationCount = __getStyleProperty(elm, "animation-iteration-count") || 1;
  const direction = __getStyleProperty(elm, "animation-direction") || "normal";
  const props = {
    name: name.split(","),
    duration: duration.split(",").map((value) => __convert(value, "ms")),
    delay: `${delay}`.split(",").map((value) => __convert(value, "ms")),
    timingFunction: timingFunction.split(","),
    iterationCount: `${iterationCount}`.split(","),
    direction: direction.split(",")
  };
  let totalDuration = 0;
  const i = 0;
  const delays = [0].concat(props.delay);
  [0].concat(props.duration).forEach((val) => {
    if (val + delays[i] > totalDuration) {
      totalDuration = val + delays[i];
    }
  });
  props.totalDuration = totalDuration;
  return props;
}
var getAnimationProperties_default = getAnimationProperties;
export {
  getAnimationProperties_default as default
};
