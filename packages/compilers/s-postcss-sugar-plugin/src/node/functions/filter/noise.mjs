import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
class postcssSugarPluginDisabledInterface extends __SInterface {
  static get _definition() {
    return {
      frequency: {
        type: "Number",
        required: true,
        default: 0.65
      },
      width: {
        type: "String",
        required: true,
        default: "5000px"
      },
      height: {
        type: "String",
        required: true,
        default: "5000px"
      }
    };
  }
}
function noise_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({
    frequency: 0.65,
    width: "5000px",
    height: "5000px"
  }, params);
  return `url('data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${finalParams.width} ${finalParams.height}" style="width:${finalParams.width};height:${finalParams.height};"><style type="text/css"><![CDATA[ rect{filter:url(#filter);width:${finalParams.width};height:${finalParams.height};} ]]></style><filter id="filter"><feTurbulence type="fractalNoise" baseFrequency="${finalParams.frequency}" numOctaves="3" stitchTiles="stitch" /></filter><rect filter="url(#filter)" /></svg>`)}')`;
}
export {
  noise_default as default,
  postcssSugarPluginDisabledInterface as interface
};
