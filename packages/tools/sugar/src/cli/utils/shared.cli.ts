// @ts-nocheck
import __path from 'path';
import __fs from 'fs';
import __parseArgs from '../../node/cli/parseArgs';
import __resolveGlob from '../../node/glob/resolveGlob';
import __folderPath from '../../node/fs/folderPath';
import __ensureDirSync from '../../node/fs/ensureDirSync';
import __getFilename from '../../node/fs/filename';
import __childProcess from 'child_process';

/**
 * @status              wip
 * @todo    Enhance the process and maybe rename it...
 */

export default async (stringArgs = '') => {
  const args = __parseArgs(stringArgs, {
    definition: {
      source: {
        type: 'String',
        required: true,
        alias: 'a',
        default: __path.resolve(process.cwd(), 'src/js')
      },
      destination: {
        type: 'String',
        required: true,
        alias: 'd',
        default: __path.resolve(process.cwd(), 'src/node')
      }
    }
  });

  const src = args.source;
  const dest = args.destination;

  console.log(`Seaching for files with the "@shared" comment...`);

  const files = await __resolveGlob(`${src}/**/*.ts`, {
    contentRegex: /\/\/\s?@shared/gm,
    glob: {
      ignore: ['**/node_modules/**']
    }
  });

  // loop on files
  files.forEach((file) => {
    const relSrcPath = __path.relative(src, file.path);
    const srcPath = file.path;
    const destPath = `${dest}/${relSrcPath}`;
    const relSymlink = __path.relative(destPath, srcPath);
    const destDirPath = __folderPath(destPath);

    if (!__fs.existsSync(destPath)) {
      console.log(destPath);

      __ensureDirSync(destDirPath);
      __childProcess.execSync(
        `cd ${destDirPath} && ln -s ${relSymlink} ${__getFilename(destPath)}`
      );
      console.log(`- Symlink created from "${relSrcPath}" to "${relSymlink}"`);
    }
  });

  // completed
  console.log('Completed successfully!');
};
