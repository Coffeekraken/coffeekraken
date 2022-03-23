import {
  __spreadValues
} from "../../../../../chunk-TD77TI6B.mjs";
import __SInterfaceRenderer from "./SInterfaceRenderer";
import __dirname from "@coffeekraken/sugar/node/fs/dirname";
class SInterfaceTerminalRenderer extends __SInterfaceRenderer {
  constructor(int, settings) {
    super(int, __spreadValues({
      templatesDir: `${__dirname()}/terminal`
    }, settings));
  }
  renderType(type) {
  }
}
SInterfaceTerminalRenderer.id = "terminal";
var SInterfaceTerminalRenderer_default = SInterfaceTerminalRenderer;
export {
  SInterfaceTerminalRenderer_default as default
};
