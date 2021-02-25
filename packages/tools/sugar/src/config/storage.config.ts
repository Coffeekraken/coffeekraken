import __packageRoot from '../node/path/packageRoot';

export default {
  /**
   * @name            rootDir
   * @namespace       config.storage
   * @type            String
   * @default         ${__packageRoot()}
   *
   * Configure where is located the ".local" folder in which are stored usually some things like cache, etc...
   *
   * @since         2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  rootDir: `${__packageRoot()}`,

  /**
   * @name            localDir
   * @namespace       config.storage
   * @type            String
   * @default         [config.storage.rootDir]/.local
   *
   * Configure where is located the ".local" folder in which are stored usually some things like cache, etc...
   *
   * @since         2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  localDir: `[config.storage.rootDir]/.local`,

  /**
   * @name            srcDir
   * @namespace       config.storage
   * @type            String
   * @default         [config.storage.rootDir]/src
   *
   * Configure where is located the ".local" folder in which are stored usually some things like cache, etc...
   *
   * @since         2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  srcDir: `[config.storage.rootDir]/src`,

  /**
   * @name            distDir
   * @namespace       config.storage
   * @type            String
   * @default         [config.storage.rootDir]/src
   *
   * Configure where is located the ".local" folder in which are stored usually some things like cache, etc...
   *
   * @since         2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  distDir: `[config.storage.rootDir]/dist`,

  /**
   * @name            cacheDir
   * @namespace       config.storage
   * @type            String
   * @default         [config.storage.localDir]/cache
   *
   * Configure where is located the "cache" folder
   *
   * @since         2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  cacheDir: `[config.storage.localDir]/cache`,

  /**
   * @name            tmpDir
   * @namespace       config.storage
   * @type            String
   * @default         [config.storage.localDir]/cache
   *
   * Configure where is located the "temp" folder
   *
   * @since         2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  tmpDir: `[config.storage.localDir]/temp`,

  /**
   * @name            nodeModulesDir
   * @namespace       config.storage
   * @type            String
   * @default         [config.storage.rootDir]/node_modules
   *
   * Configure where is located the "node_modules" folder
   *
   * @since         2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  nodeModulesDir: `[config.storage.rootDir]/node_modules`
};
