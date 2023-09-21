import __SDocmap from "@coffeekraken/s-docmap";

export default async function () {
  const docmap = new __SDocmap();
  const docmapJson = await docmap.read();

  const uis = [];
  for (let [namespace, docmapObj] of Object.entries(docmapJson.map)) {
    if (
      docmapObj.menu &&
      docmapObj.menu.tree.includes("Styleguide") &&
      docmapObj.menu.tree.includes("UI")
    ) {
      uis.push(docmapObj);
    }
  }

  return {
    uis,
  };
}
