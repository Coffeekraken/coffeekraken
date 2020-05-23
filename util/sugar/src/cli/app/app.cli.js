const __SugarTermApp = require('../../../termapp/src/node/class/SugarTermApp');

module.exports = (stringArgs = '') => {
  const sugarTerm = new __SugarTermApp({});
  return sugarTerm;
};
