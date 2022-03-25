function osx() {
  if (process && process.platform) {
    return process.platform === "darwin";
  }
  return navigator.platform.toUpperCase().indexOf("MAC") >= 0;
}
var osx_default = osx;
export {
  osx_default as default
};
