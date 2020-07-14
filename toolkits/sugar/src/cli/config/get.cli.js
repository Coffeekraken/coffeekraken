const __parseArgs = require('../../node/cli/parseArgs');
const __sugarConfig = require('../../node/config/sugar');

module.exports = async (stringArgs = '') => {
  const args = __parseArgs(stringArgs, {
    path: {
      type: 'String',
      alias: 'p',
      default: null
    }
  });

  if (!args.path) {
    throw new Error(`The cli action "config.get" need a "path" argument...`);
  }

  console.log(await __sugarConfig(args.path));
};
