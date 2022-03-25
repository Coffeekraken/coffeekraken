function windows() {
  if (process && process.platform) {
    return process.platform === "win32";
  }
  return navigator.platform.toUpperCase().indexOf("WIN") > -1;
}
var windows_default = windows;
export {
  windows_default as default
};
