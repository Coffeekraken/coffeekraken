import "../../../../../chunk-TD77TI6B.mjs";
import __terminalKit from "terminal-kit";
const __onProcessExitCallbacks = [];
function onProcessExit(callback) {
  if (!__onProcessExitCallbacks.length) {
    process.stdin.resume();
    process.env.HAS_ON_PROCESS_EXIT_HANDLERS = true;
    let isExiting = false;
    async function exitHandler(state) {
      if (isExiting)
        return;
      isExiting = true;
      for (let i = 0; i < __onProcessExitCallbacks.length; i++) {
        const cbFn = __onProcessExitCallbacks[i];
        await cbFn(state);
      }
      setTimeout(() => {
        __terminalKit.terminal.processExit("SIGTERM");
      }, 100);
    }
    process.on("close", (code) => code === 0 ? exitHandler("success") : exitHandler("error"));
    process.on("exit", (code) => code === 0 ? exitHandler("success") : exitHandler("error"));
    process.on("custom_exit", (state) => {
      exitHandler(state);
    });
    process.on("SIGINT", () => exitHandler("killed"));
    process.on("SIGUSR1", () => exitHandler("killed"));
    process.on("SIGUSR2", () => exitHandler("killed"));
    process.on("uncaughtException", () => exitHandler("error"));
  }
  if (__onProcessExitCallbacks.indexOf(callback) !== -1)
    return;
  __onProcessExitCallbacks.push(callback);
}
var onProcessExit_default = onProcessExit;
export {
  onProcessExit_default as default
};
