import "../../../../../chunk-JETN4ZEY.mjs";
import __md5 from "../crypt/md5";
function gravatarUrl(email, size = 200) {
  return `https://www.gravatar.com/avatar/${__md5.encrypt(email)}?s=${size}`;
}
var gravatarUrl_default = gravatarUrl;
export {
  gravatarUrl_default as default
};
