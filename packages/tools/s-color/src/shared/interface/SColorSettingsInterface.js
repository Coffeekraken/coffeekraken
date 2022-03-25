import __SInterface from "@coffeekraken/s-interface";
class SColorSettingsInterface extends __SInterface {
  static get _definition() {
    return {
      returnNewInstance: {
        description: "Specify if the methods returns by default a new SColor instance or the same",
        type: "boolean",
        default: false
      },
      defaultFormat: {
        description: "Specify the default format of the color",
        type: "String",
        values: ["hex", "rgb", "rgba", "hsl", "hsla"],
        default: "hex"
      }
    };
  }
}
var SColorSettingsInterface_default = SColorSettingsInterface;
export {
  SColorSettingsInterface_default as default
};
