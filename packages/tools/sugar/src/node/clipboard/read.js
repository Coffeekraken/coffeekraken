import __clipboardy from "clipboardy";
function read() {
  return __clipboardy.readSync();
}
var read_default = read;
export {
  read_default as default
};
