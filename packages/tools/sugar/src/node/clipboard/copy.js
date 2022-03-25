import __clipboardy from "clipboardy";
import __toString from "../../shared/string/toString";
import __ncp from "copy-paste";
function copy(text) {
  text = __toString(text);
  try {
    __clipboardy.writeSync(text);
  } catch (e) {
    __ncp.copy(text);
  }
}
var copy_default = copy;
export {
  copy_default as default
};
