const __linkPackages = require('../../node/monorepo/linkPackages');
const __output = require('../../node/process/output');

module.exports = (stringArgs = '') => {
  const process = __linkPackages();
  __output(process);
};
