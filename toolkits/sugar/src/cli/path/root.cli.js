const __packageRoot = require('../../node/path/packageRoot');
const __parseArgs = require('../../node/cli/parseArgs');

module.exports = async (stringArgs = '') => {
  const args = __parseArgs(stringArgs, {
    highest: {
      type: 'Boolean',
      alias: 'h',
      default: false
    }
  });

  console.log(__packageRoot(args.highest));
};
