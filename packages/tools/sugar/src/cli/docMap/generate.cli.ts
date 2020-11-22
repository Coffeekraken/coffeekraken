const __SDocMap = require('../../node/doc/SDocMap');

module.exports = async function docMapGenerate(stringArgs = '') {
  const pathes = await __SDocMap.find();
  console.log(pathes);
  process.exit();
};
