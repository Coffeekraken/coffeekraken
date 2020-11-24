// @ts-nocheck

import __parseArgs from '../../node/cli/parseArgs';
import __sugarConfig from '../../node/config/sugar';

export default async (stringArgs = '') => {
  const args = __parseArgs(stringArgs, {
    definitionObj: {
      path: {
        type: 'String',
        alias: 'p',
        default: null
      }
    }
  });
  if (!args.path) {
    throw new Error(`The cli action "config.get" need a "path" argument...`);
  }

  console.log(__sugarConfig(args.path));
};
