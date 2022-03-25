function expandGlob(globs) {
  if (!Array.isArray(globs))
    globs = [globs];
  const finalPatterns = [];
  globs.forEach((globPattern) => {
    const maxDepthMatch = globPattern.match(/\/?\*\{(([0-9]+,[0-9]+|[0-9]+))\}\/?/gm);
    if (maxDepthMatch) {
      const minMaxStr = maxDepthMatch[0].replace("*{", "").replace("}", "").replace(/[\{\}\/]/g, "");
      const toReplace = maxDepthMatch[0].replace(/\//g, "");
      const spl = minMaxStr.split(",");
      let min = 0;
      let max = parseInt(spl[0]);
      if (spl.length === 2) {
        min = parseInt(spl[0]);
        max = parseInt(spl[1]);
      }
      const foldersArray = [
        ..."* ".repeat(min).split(" ").filter((l) => l !== "")
      ];
      for (let i = min; i < max; i++) {
        finalPatterns.push(globPattern.replace(toReplace, foldersArray.join("/")).replace(/\/\//g, "/"));
        foldersArray.push("*");
      }
      finalPatterns.push(globPattern.replace(toReplace, foldersArray.join("/")).replace(/\/\//g, "/"));
    } else {
      finalPatterns.push(globPattern);
    }
  });
  return finalPatterns;
}
var expandGlob_default = expandGlob;
export {
  expandGlob_default as default
};
