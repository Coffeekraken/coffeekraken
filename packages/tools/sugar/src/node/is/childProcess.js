function isChildProcess() {
  return process.send !== void 0 || process.env.IS_CHILD_PROCESS !== void 0;
}
var childProcess_default = isChildProcess;
export {
  childProcess_default as default
};
