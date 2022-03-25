import __linkPackages from "../../node/monorepo/linkPackages";
var link_cli_default = (stringArgs = "") => {
  let individual = false;
  if (stringArgs.match(/\s?--individual\s?/) || stringArgs.match(/\s?-i\s?/))
    individual = true;
  __linkPackages({
    individual
  });
};
export {
  link_cli_default as default
};
