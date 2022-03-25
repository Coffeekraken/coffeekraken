function linux() {
  if (process && process.platform) {
    return process.platform === "linux";
  }
  return navigator.platform.toUpperCase().indexOf("LINUX") >= 0;
}
var linux_default = linux;
export {
  linux_default as default
};
