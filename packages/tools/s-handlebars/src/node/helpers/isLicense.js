import __packageJsonSync from "@coffeekraken/sugar/node/package/jsonSync";
const packageJson = __packageJsonSync();
function isLicense(conditional, options) {
  var _a;
  let license = (_a = this.license) != null ? _a : packageJson.license;
  if (license.toLowerCase() === conditional.toLowerCase()) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
}
export {
  isLicense as default
};
