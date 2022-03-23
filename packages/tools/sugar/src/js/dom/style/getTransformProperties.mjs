import "../../../../../../chunk-PG3ZPS4G.mjs";
import __getTranslateProperties from "./getTranslateProperties";
import __getRotateProperties from "./getRotateProperties";
function getTransformProperties($elm) {
  const rotates = __getRotateProperties($elm), translates = __getTranslateProperties($elm);
  return {
    translateX: translates.x,
    translateY: translates.y,
    translateZ: translates.z,
    rotateX: rotates.x,
    rotateY: rotates.y,
    rotateZ: rotates.z
  };
}
var getTransformProperties_default = getTransformProperties;
export {
  getTransformProperties_default as default
};
