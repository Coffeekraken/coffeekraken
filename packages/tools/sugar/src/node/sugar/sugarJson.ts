import __packageRoot from '../path/packageRoot';
import __glob from 'glob-all';
import __childProcess from 'child_process';
import __md5 from '../../shared/crypt/md5';
import __sanitizeSugarJson from '../../shared/sugar/sanitizeSugarJson';

/**
 * @name            sugarJson
 * @namespace            node.sugar
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
export interface ISugarJsonSettings {
  package: boolean;
  modules: boolean;
  global: boolean;
  top: boolean;
  cache: boolean;
}

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
  scope: 'default' | 'module' | 'repo' | 'package' | 'user';
  path: string;
}

export interface ISugarJsonFileConfig {
  folders?: ISugarJsonFileConfigFolder[];
}

export interface ISugarJsonFile {
  theme?: String;
  cli?: ISugarJsonFileCli;
  config?: ISugarJsonFileConfig;
}

const _cache: any = {};

export default function sugarJson(
  packageName = '*',
  settings?: Partial<ISugarJsonSettings>
): Record<string, ISugarJsonFile> | ISugarJsonFile {
  settings = {
    package: true,
    modules: true,
    top: true,
    global: true,
    cache: true,
    ...settings
  };

  const cacheId = __md5.encrypt(settings);
  if (settings.cache && _cache[cacheId]) return _cache[cacheId];

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
  if (localNodeModulesPath && settings.modules) {
    if (packageName === '*') {
      globs.push(`${localNodeModulesPath}/*/sugar.json`);
      globs.push(`${localNodeModulesPath}/*/*/sugar.json`);
      // globs.push(`${__packageRoot()}/sugar.json`);
    } else {
      packagesArray.forEach((name) => {
        globs.push(`${localNodeModulesPath}/${name}/sugar.json`);
      });
    }
  }
  // top local
  if (
    localNodeModulesPath !== topLocalNodeModulesPath &&
    settings.modules &&
    settings.top
  ) {
    if (packageName === '*') {
      globs.push(`${topLocalNodeModulesPath}/*/sugar.json`);
      globs.push(`${topLocalNodeModulesPath}/*/*/sugar.json`);
    } else {
      packagesArray.forEach((name) => {
        globs.push(`${topLocalNodeModulesPath}/${name}/sugar.json`);
      });
    }
  }
  // then global
  if (globalNodeModulesPath && settings.modules && settings.global) {
    if (packageName === '*') {
      globs.push(`${globalNodeModulesPath}/*/sugar.json`);
      globs.push(`${globalNodeModulesPath}/*/*/sugar.json`);
    } else {
      packagesArray.forEach((name) => {
        globs.push(`${globalNodeModulesPath}/${name}/sugar.json`);
      });
    }
  }

  if (settings.package) {
    globs.push(`${__packageRoot(process.cwd())}/sugar.json`);
  }
  if (
    localNodeModulesPath !== topLocalNodeModulesPath &&
    settings.package &&
    settings.top
  ) {
    globs.push(`${__packageRoot(process.cwd(), true)}/sugar.json`);
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
    results = __sanitizeSugarJson({
      metas: {
        path: files[0],
        folderPath: files[0].split('/').slice(0, -1).join('/')
      },
      ...require(files[0])
    });
  } else {
    files.forEach((path) => {
      // read the file
      const json = require(path);
      const packageJson = require(`${path.replace(
        'sugar.json',
        'package.json'
      )}`);
      results[packageJson.name] = __sanitizeSugarJson({
        metas: {
          path,
          folderPath: path.split('/').slice(0, -1).join('/')
        },
        ...json
      });
    });
  }

  // cache if needed
  if (settings.cache) _cache[cacheId] = Object.assign({}, results);

  return results;
}
