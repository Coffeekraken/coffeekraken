import __fs from "fs-extra";
function move(src, dest) {
  return __fs.move(src, dest);
}
var move_default = move;
export {
  move_default as default
};
