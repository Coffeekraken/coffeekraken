import __packageRoot from '../../shared/path/packageRoot';
import __glob from 'glob-all';
import __childProcess from 'child_process';

/**
 * @name            sugarJson
 * @namespace       sugar.node.sugar
 * @type            Function
 *
 * This function allows you to get back all the "sugar.json" that are at the root of
 * each installed packages.
 *
 * @param       {String}            package             Specify the package(s) from which you want to get back the sugar.json file, or "*" if you want all the sugar.json files back
 * @param       {ISugarJsonSettings}        [settings={}]       Specify some settings to set how you want to get back these files
 *
 * @example         js
 * import sugarJson from '@coffeekraken/sugar/node/sugar/sugarJson';
 * sugarJson('@coffeekraken/s-js-compiler');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export interface ISugarJsonSettings {}

export interface ISugarJsonFileCliAction {
  description: string;
  process?: string;
  command?: string;
}

export interface ISugarJsonFileCliActions {
  [key: string]: ISugarJsonFileCliAction;
}

export interface ISugarJsonFileCli {
  stack: string;
  description: string;
  actions: ISugarJsonFileCliActions;
}

export interface ISugarJsonFileConfigFolder {
  level: 'default' | 'app' | 'user';
  path: string;
}

export interface ISugarJsonFileConfig {
  folders?: ISugarJsonFileConfigFolder[];
}

export interface ISugarJsonFile {
  cli?: ISugarJsonFileCli;
  config?: ISugarJsonFileConfig;
}

export default function sugarJson(
  packageName = '*',
  settings?: Partial<ISugarJsonSettings>
): Record<string, ISugarJsonFile> | ISugarJsonFile {
  // get global node modules directory path
  const globalNodeModulesPath = __childProcess
    .execSync(`npm root -g`)
    .toString()
    .trim();

  const packagesArray = packageName.split(',');

  // get local node modules directory path
  const localNodeModulesPath = `${__packageRoot()}/node_modules`;

  // get local node modules directory path
  const topLocalNodeModulesPath = `${__packageRoot(
    process.cwd(),
    true
  )}/node_modules`;

  // build globs
  const globs: string[] = [];

  // local first
  if (localNodeModulesPath) {
    if (packageName === '*') {
      globs.push(`${localNodeModulesPath}/*/sugar.json`);
      globs.push(`${localNodeModulesPath}/*/*/sugar.json`);
      globs.push(`${__packageRoot()}/sugar.json`);
    } else {
      packagesArray.forEach((name) => {
        globs.push(`${localNodeModulesPath}/${name}/sugar.json`);
      });
    }
  }
  // top local
  if (localNodeModulesPath !== topLocalNodeModulesPath) {
    if (packageName === '*') {
      globs.push(`${topLocalNodeModulesPath}/*/sugar.json`);
      globs.push(`${topLocalNodeModulesPath}/*/*/sugar.json`);
      globs.push(`${__packageRoot(process.cwd(), true)}/sugar.json`);
    } else {
      packagesArray.forEach((name) => {
        globs.push(`${topLocalNodeModulesPath}/${name}/sugar.json`);
      });
    }
  }
  // then global
  if (globalNodeModulesPath) {
    if (packageName === '*') {
      globs.push(`${globalNodeModulesPath}/*/sugar.json`);
      globs.push(`${globalNodeModulesPath}/*/*/sugar.json`);
    } else {
      packagesArray.forEach((name) => {
        globs.push(`${globalNodeModulesPath}/${name}/sugar.json`);
      });
    }
  }

  // search for "sugar.json" files
  const files = __glob.sync(globs, {}).filter((path) => {
    try {
      require(`${path.replace('sugar.json', 'package.json')}`);
      return true;
    } catch (e) {
      return false;
    }
  });

  let results = {};
  if (
    files.length === 1 &&
    packagesArray.length === 1 &&
    packagesArray[0] !== '*'
  ) {
    results = {
      metas: {
        path: files[0],
        folderPath: files[0].split('/').slice(0, -1).join('/')
      },
      ...require(files[0])
    };
  } else {
    files.forEach((path) => {
      // read the file
      const json = require(path);
      const packageJson = require(`${path.replace(
        'sugar.json',
        'package.json'
      )}`);
      results[packageJson.name] = {
        metas: {
          path,
          folderPath: path.split('/').slice(0, -1).join('/')
        },
        ...json
      };
    });
  }

  return results;
}
