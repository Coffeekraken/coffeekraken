// @ts-nocheck
import __linkPackages from '../../node/monorepo/linkPackages';

export default (stringArgs = '') => {
  let individual = false;
  if (stringArgs.match(/\s?--individual\s?/) || stringArgs.match(/\s?-i\s?/))
    individual = true;
  __linkPackages({
    individual
  });
};
