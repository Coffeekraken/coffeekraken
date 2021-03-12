import __extractImport from '../../module/extractImport';
import __resolve from '../../module/resolve';
import __fs from 'fs';
import __packageRoot from '../../path/packageRoot';
import __SFile from '../../fs/SFile';

export default {
  name: 'aggregateLibs',
  setup(build) {
    build.onResolve({ filter: /.*\.[jt]s$/ }, function (args) {
      nativeConsole.log(args, build);

      const content = __fs.readFileSync(args.path, 'utf8');

      const imports = __extractImport(content);

      const dirs = [
        __packageRoot(),
        `${__packageRoot()}/node_modules`,
        `${__packageRoot(process.cwd(), true)}/node_modules`
      ];
      imports.forEach((importObj) => {
        const path = __resolve(importObj.path, {
          dirs
        });
        const file = __SFile.instanciate(path);
      });

      console.log(imports);

      return { path: args.path };
    });
  }
};
