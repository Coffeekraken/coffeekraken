import __urlSlug from "url";
function urlFromString(string) {
  return string.split("/").map((l) => {
    return __urlSlug(l.trim());
  }).join("/");
}
export {
  urlFromString as default
};
