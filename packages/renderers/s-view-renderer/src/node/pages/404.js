import __SViewRenderer from "../SViewRenderer";
function page404(data) {
  const engine = new __SViewRenderer("pages.error.404", {
    viewRenderer: {}
  });
  const result = engine.render(data);
  return result;
}
export {
  page404 as default
};
