import "../../../../../../chunk-PG3ZPS4G.mjs";
import SAjax from "../http/SAjax";
import __formSerialize from "form-serialize";
function sendForm(form) {
  if (!form.tagName || form.tagName.toLowerCase() !== "form") {
    console.error("passed arguments", form);
    throw `The "form" parameter passed to the "sendForm" function is not a form`;
  }
  const enctype = form.getAttribute("enctype") || "application/x-www-form-urlencoded";
  let data = null;
  if (enctype === "application/x-www-form-urlencoded") {
    data = __formSerialize(form);
  } else {
    data = new FormData(form);
  }
  const ajx = new SAjax({
    url: form.getAttribute("action"),
    method: form.getAttribute("method") || "POST",
    data,
    contentType: enctype
  });
  form.setAttribute("loading", true);
  const promise = ajx.send();
  promise.then((success) => {
    form.removeAttribute("loading");
  }, (error) => {
    form.removeAttribute("loading");
  });
  return promise;
}
var sendForm_default = sendForm;
export {
  sendForm_default as default
};
