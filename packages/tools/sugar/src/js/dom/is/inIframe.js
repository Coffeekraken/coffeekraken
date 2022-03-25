function inIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}
var inIframe_default = inIframe;
export {
  inIframe_default as default
};
