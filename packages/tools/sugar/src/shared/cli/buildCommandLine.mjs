import {
  __spreadValues
} from "../../../../../chunk-JETN4ZEY.mjs";
import __argsToString from "./argsToString";
function buildCommandLine(command, args = {}, settings) {
  settings = __spreadValues({
    keepFalsy: false
  }, settings != null ? settings : {});
  const string = __argsToString(args, {
    keepFalsy: settings.keepFalsy
  });
  const cmdString = command.replace("[arguments]", string);
  return cmdString;
}
export {
  buildCommandLine as default
};
