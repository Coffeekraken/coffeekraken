import __urlFromString from "@coffeekraken/sugar/shared/url/urlFromString";
function menuTag(data, blockSettings) {
  if (data && data.value && typeof data.value === "string") {
    const parts = data.value.split(/\s{2,20000}/).map((l) => l.trim());
    let slug;
    if (parts.length > 1) {
      slug = parts[1];
    } else {
      slug = parts[0].split("/").map((l) => {
        return __urlFromString(l);
      });
    }
    return {
      tree: parts[0].split("/").map((l) => l.trim()),
      slug
    };
  }
  return data.value;
}
var menu_default = menuTag;
export {
  menu_default as default
};
