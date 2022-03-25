function stripDocblocks(str) {
  return str.replace(/(\/\*{2})([\s\S]+?)(\*\/)/gm, "");
}
export {
  stripDocblocks as default
};
