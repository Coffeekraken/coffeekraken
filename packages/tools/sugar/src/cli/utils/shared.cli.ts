// @ts-nocheck
import __path from 'path';
import __fs from 'fs';
import __parseArgs from '../../node/cli/parseArgs';
import __resolveGlob from '../../node/glob/resolveGlob';
import __folderPath from '../../node/fs/folderPath';
import __ensureDirSync from '../../node/fs/ensureDirSync';
import __getFilename from '../../node/fs/filename';
import __childProcess from 'child_process';
import __parseHtml from '../../node/console/parseHtml';

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

  console.log(
    __parseHtml(
      `Seaching for files with the "<yellow>@shared</yellow>" comment...`
    )
  );

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

    const srcFolderPath = __folderPath(srcPath);
    const destFolderPath = __folderPath(destPath);
    const relFolderPath = __path.relative(destFolderPath, srcFolderPath);

    __ensureDirSync(destFolderPath);
    try {
      __childProcess.execSync(`rm -rf ${destPath}`);
    } catch (e) {}
    __childProcess.execSync(
      `cd ${destFolderPath} && ln -s ${
        relFolderPath + '/' + __getFilename(srcPath)
      } ${__getFilename(destPath)}`
    );

    console.log(
      __parseHtml(
        `- Symlink <green>created</green> from "<yellow>${__path.relative(
          process.cwd(),
          srcPath
        )}</yellow>" to "<cyan>${__path.relative(
          process.cwd(),
          destPath
        )}</cyan>"`
      )
    );

    // const destDirPath = __folderPath(destPath);

    // if (!__fs.existsSync(destPath)) {
    //   console.log(destPath);

    //   __ensureDirSync(destDirPath);
    //   __childProcess.execSync(
    //     `cd ${destDirPath} && ln -s ${relSymlink} ${__getFilename(destPath)}`
    //   );
    //   console.log(`- Symlink created from "${relSrcPath}" to "${relSymlink}"`);
    // }
  });
};
