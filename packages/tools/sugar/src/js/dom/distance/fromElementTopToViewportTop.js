import __scrollTop from "../scroll/scrollTop";
import __offset from "../offset/offset";
function fromElementTopToViewportTop(elm) {
  const offsets = __offset(elm);
  const scrollTop = __scrollTop();
  return offsets.top - scrollTop;
}
export {
  fromElementTopToViewportTop as default
};
