const __SScssDependenciesTree = require('../../node/scss/SScssDependenciesTree');

module.exports = async (stringArgs = '') => {
  const dep = new __SScssDependenciesTree('src/css/index.scss');
  dep.generate();
};
