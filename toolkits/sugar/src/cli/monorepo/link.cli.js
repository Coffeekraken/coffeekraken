const __linkPackages = require('../../node/monorepo/linkPackages');

module.exports = async (stringArgs = '') => {
  await __linkPackages().on('log', (log) => {
    console.log(log.value);
  });
  process.exit();
};
