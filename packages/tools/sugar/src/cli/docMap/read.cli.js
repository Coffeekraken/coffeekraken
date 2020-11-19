const __SDocMap = require('../../node/doc/SDocMap');

module.exports = async function docMapRead(stringArgs = '') {
  const docMapJson = await __SDocMap.read();
  console.log(docMapJson);
  process.exit();
};
