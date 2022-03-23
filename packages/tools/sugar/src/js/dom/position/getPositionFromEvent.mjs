import "../../../../../../chunk-PG3ZPS4G.mjs";
function getPositionFromEvent(e) {
  let x, y;
  if (e.type == "touchstart" || e.type == "touchmove" || e.type == "touchend" || e.type == "touchcancel") {
    const evt = typeof e.originalEvent === "undefined" ? e : e.originalEvent;
    const touch = evt.touches[0] || evt.changedTouches[0];
    x = touch.pageX;
    y = touch.pageY;
  } else if (e.type == "mousedown" || e.type == "mouseup" || e.type == "mousemove" || e.type == "mouseover" || e.type == "mouseout" || e.type == "mouseenter" || e.type == "mouseleave") {
    x = e.clientX;
    y = e.clientY;
  }
  return {
    x,
    y
  };
}
export {
  getPositionFromEvent as default
};
