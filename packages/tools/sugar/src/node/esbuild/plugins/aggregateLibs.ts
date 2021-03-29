import __extractImport from '../../module/extractImport';
import __resolve from '../../module/resolve';
import __fs from 'fs';
import __path from 'path';
import __packageRoot from '../../path/packageRoot';
import __SFile from '../../fs/SFile';
import __deepMerge from '../../../shared/object/deepMerge';
import __sugarConfig from '../../../shared/config/sugar';
import __folderPath from '../../fs/folderPath';
import __ensureDirSync from '../../fs/ensureDirSync';
import * as __esbuild from 'esbuild';

export interface IEsbuildAggregateLibsPlugin {
  outputDir: string;
  rootDir: string;
  folderName: string;
  esbuild: any;
}

export default function esbuildAggregateLibsPlugin(
  params?: Partial<IEsbuildAggregateLibsPlugin>
) {
  const p = <IEsbuildAggregateLibsPlugin>__deepMerge(
    {
      outputDir: __sugarConfig('js.compile.outputDir'),
      rootDir: __sugarConfig('js.compile.rootDir'),
      folderName: '.libs',
      esbuild: {}
    },
    params
  );

  return {
    name: 'aggregateLibs',
    setup(build) {
      build.onResolve({ filter: /.*\.[jt]s$/ }, function (args) {
        const content = __fs.readFileSync(args.path, 'utf8').toString();

        console.log('CCC');

        const imports = __extractImport(content);
        const importedFiles: __SFile[] = [];

        const esbuildParams = {
          charset: 'utf8',
          format: 'esm',
          logLevel: 'info',
          bundle: false,
          write: false, // write to disk bellow
          errorLimit: 100,
          ...p.esbuild
        };

        const dirs = [
          `${__packageRoot()}/node_modules`,
          `${__packageRoot(process.cwd(), true)}/node_modules`
        ];
        imports.forEach(async (importObj) => {
          const path = __resolve(importObj.path, {
            dirs
          });

          const file = __SFile.new(path);

          const moduleRootPath = __packageRoot(path);
          const moduleRelPath = __path.relative(moduleRootPath, path);

          const srcRelPath = __path.relative(
            __folderPath(args.path),
            p.rootDir
          );

          const relPath = `${
            srcRelPath.trim() !== '' ? srcRelPath + '/' : './'
          }${p.folderName}/${moduleRootPath.split('/').pop()}/${moduleRelPath}`;

          // replace the import statement
          const newImport = importObj.raw.replace(importObj.path, `${relPath}`);

          const newContent = content.replace(importObj.raw, newImport);

          const savePath = __path.resolve(
            p.outputDir,
            p.folderName,
            moduleRelPath
          );

          console.log(savePath);

          // passing the lib through esbuild
          //   const resultObj = await __esbuild.build({
          //     ...esbuildParams,
          //     entryPoints: [path]
          //   });

          //   _console.log(resultObj);

          // write the new file
          //   __ensureDirSync(__folderPath(savePath));
          //   __fs.writeFileSync(savePath, newContent);

          importedFiles.push(file);
        });

        return { path: args.path };
      });
    }
  };
}
