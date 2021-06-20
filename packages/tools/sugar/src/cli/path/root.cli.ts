// @ts-nocheck

import __packageRootDir from '../../node/path/packageRootDir';
import __parseArgs from '../../node/cli/parseArgs';

interface IPathRootOptions {
  highest?: boolean;
}

export default async (stringArgs = '') => {
  const args: IPathRootOptions = __parseArgs(stringArgs, {
    definition: {
      highest: {
        type: 'Boolean',
        alias: 'h',
        default: false
      }
    }
  });

  console.log(__packageRootDir(args.highest));
};
