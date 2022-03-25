import __scrollTop from "../scroll/scrollTop";
import __offset from "../offset/offset";
function fromElementTopToViewportBottom(elm) {
  const offsets = __offset(elm);
  const scrollTop = __scrollTop();
  const viewportHeight = window.innerHeight;
  const distance = viewportHeight - offsets.top + scrollTop;
  return distance;
}
export {
  fromElementTopToViewportBottom as default
};
