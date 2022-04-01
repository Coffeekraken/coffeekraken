import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
function decodeHtmlEntities(string) {
  const txt = document.createElement("textarea");
  txt.innerHTML = string;
  return txt.value;
}
var decodeHtmlEntities_default = decodeHtmlEntities;
export {
  decodeHtmlEntities_default as default
};
