const __SDocblock = require('../../node/docblock/SDocblock').default;
const __fs = require('fs');

module.exports = (stringArgs = '') => {
  const content = __fs.readFileSync(
    `${__dirname}/../../js/class/SInterface.ts`,
    'utf8'
  );
  const blocks = new __SDocblock(content);
  // console.log(blocks);
};
