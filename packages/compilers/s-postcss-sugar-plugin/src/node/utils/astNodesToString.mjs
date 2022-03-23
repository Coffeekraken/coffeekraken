import "../../../../../chunk-TD77TI6B.mjs";
function astNodesToString(nodes) {
  const res = nodes.map((node) => {
    if (node.type === "decl")
      return node.toString() + ";";
    return node.toString();
  }).map((item) => {
    item = item.trim();
    if (!item.match(/\}$/) && !item.match(/;$/)) {
      item += ";";
    }
    return item;
  });
  return res.join("\n");
}
export {
  astNodesToString as default
};
