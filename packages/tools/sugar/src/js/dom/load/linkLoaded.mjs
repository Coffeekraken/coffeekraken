import "../../../../../../chunk-PG3ZPS4G.mjs";
function alreadyLoaded(link) {
  const href = link.href;
  let result = false;
  for (let i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].href && document.styleSheets[i].href.match(href)) {
      result = true;
    } else if (i == document.styleSheets.length - 1) {
    }
  }
  return result;
}
function linkLoaded(link, cb = null) {
  return new Promise((resolve, reject) => {
    if (alreadyLoaded(link)) {
      resolve(link);
      cb != null && cb(link);
    } else {
      const img = document.createElement("img");
      img.addEventListener("error", (e) => {
        resolve(link);
        cb != null && cb(link);
      });
      img.src = link.href;
    }
  });
}
var linkLoaded_default = linkLoaded;
export {
  linkLoaded_default as default
};
