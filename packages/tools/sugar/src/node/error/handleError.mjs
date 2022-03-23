import "../../../../../chunk-TD77TI6B.mjs";
import __parseHtml from "../../shared/console/parseHtml";
import __isChildProcess from "../../node/is/childProcess";
import __toString from "../../shared/string/toString";
function handleError() {
  if (process.env.NODE_ENV === "test")
    return;
  if (__isChildProcess()) {
    process.on("uncaughtException", __handleChildProcessErrors);
    process.on("unhandledRejection", __handleChildProcessErrors);
  } else {
    process.on("uncaughtException", __handleMainProcessErrors);
    process.on("unhandledRejection", __handleMainProcessErrors);
  }
}
function __handleChildProcessErrors(error) {
  if (error.toString().includes(`Cannot read property 'itop' of null`))
    return;
  if (error.instanceId)
    return;
  if (!error)
    return;
  const errorStringArray = [error.stack];
  console.log(__parseHtml(errorStringArray.join("\n")));
}
function __handleMainProcessErrors(error) {
  if (error.toString().includes(`Cannot read property 'itop' of null`))
    return;
  if (error.instanceId)
    return;
  if (error instanceof Buffer) {
    error = error.toString();
  }
  setTimeout(() => {
    if (typeof error === "string") {
      console.log(__parseHtml(error));
    } else if (typeof error === "object" && error.name && error.message) {
      console.log(__parseHtml([error.name, error.message, error.stack].join("\n\n")));
    } else {
      console.log(__parseHtml(__toString(error)));
    }
    process.exit(1);
  }, 50);
}
var handleError_default = handleError;
export {
  handleError_default as default
};
