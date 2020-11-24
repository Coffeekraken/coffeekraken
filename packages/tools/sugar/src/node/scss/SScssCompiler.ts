// @ts-nocheck

import __extension from '../fs/extension';
import __SCache from '../cache/SCache';
import __unquote from '../string/unquote';
import __path from 'path';
import __stripCssComments from '../css/stripCssComments';
import __folderPath from '../fs/folderPath';
import __deepMerge from '../object/deepMerge';
import __SPromise from '../promise/SPromise';
import __md5 from '../crypt/md5';
import __sass from 'sass';
import __packageRoot from '../path/packageRoot';
import __getFilename from '../fs/filename';
import __isPath from '../is/path';
import __fs from 'fs';
import __getSharedResourcesString from './getSharedResourcesString';
import __putUseStatementsOnTop from './putUseStatementsOnTop';
import __glob from 'glob';
import { parse as __parseScss } from 'scss-parser';
import { stringify as __stringifyScss } from 'scss-parser';
import __createQueryWrapper from 'query-ast';
import __csso from 'csso';
import __isGlob from 'is-glob';
import __unique from '../array/unique';
import __SBuildScssInterface from './build/interface/SBuildScssInterface';
import { start } from 'repl';

/**
 * @name                SScssCompiler
 * @namespace           sugar.node.scss
 * @type                Class
 * @wip
 *
 * This class wrap the "sass" compiler with some additional features which are:
 *
 * @feature         2.0.0       Expose a simple API that return SPromise instances for convinience
 * @feature         2.0.0       Optimize the render time as much as 6x faster
 *
 * @param           {Object}            [settings={}]       An object of settings to configure your instance
 *
 * @setting         {String}        [id=this.constructor.name]          An id for your compiler. Used for cache, etc...
 * @setting         {Object}        [sass={}]        Pass the "sass" (https://www.npmjs.com/package/sass) options here. ! The "file" and "data" properties are overrided by the first parameter of the "compile" method
 * @setting         {Onject}       [optimizers={}]     Pass an object of optimizing settings
 * @setting         {Boolean}       [optimizers.split=true]     Specify if you want to make use of the splitting code technique to compile only what's really changed
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo            check for map output when no file path
 *
 * @example         js
 * import SScssCompiler from '@coffeekraken/sugar/node/scss/SScssCompiler';
 * const compiler = new SScssCompiler();
 * const compiledFile = await compiler.compile('my/cool/code.scss');
 * const compiledCode = await compiler.compile(`
 *      \@include myCoolMixin();
 * `);
 *
 * @see             https://www.npmjs.com/package/sass
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export = class SScssCompiler {
  /**
   * @name            _settings
   * @type            Object
   * @private
   *
   * Store the instance settings
   *
   * @since           2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _settings = {};

  _includePaths = [];

  /**
   * @name            constructor
   * @type             Function
   * @constructor
   *
   * Constructor
   *
   * @since           2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    this._settings = __deepMerge(
      {
        id: this.constructor.name,
        ...__SBuildScssInterface.getDefaultValues(),
        includePaths: [],
        putUseOnTop: true
      },
      settings
    );

    // prod
    if (this._settings.prod) {
      this._settings.cache = false;
      this._settings.style = 'compressed';
      this._settings.minify = true;
      this._settings.stripComments = true;
    }
  }

  /**
   * @name              compile
   * @type              Function
   * @async
   *
   * This method is the main one that allows you to actually compile the
   * code you pass either inline, either a file path.
   *
   * @param         {String}            source          The source you want to compile. Can be a file path or some inline codes
   * @param         {Object}            [settings={}]       An object of settings to override the instance ones
   * @return        {SPromise}                          An SPromise instance that will be resolved (or rejected) when the compilation is finished
   *
   * @since             2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  compile(source, settings = {}) {
    return new __SPromise(
      async (resolve, reject, trigger, cancel) => {
        settings = __deepMerge(
          this._settings,
          {
            _isChild: false
          },
          settings
        );

        const startTime = Date.now();
        let dataObj = {
          children: {},
          importStatements: [],
          sharedResources: null,
          mixinsAndVariables: null,
          scss: null,
          css: null
        };
        source = source.trim();

        const includePaths = __unique([
          ...(this._settings.includePaths
            ? !Array.isArray(this._settings.includePaths)
              ? [this._settings.includePaths]
              : this._settings.includePaths
            : []),
          ...(settings.rootDir
            ? !Array.isArray(settings.rootDir)
              ? [settings.rootDir]
              : settings.rootDir
            : []),
          ...(settings.sass.includePaths
            ? !Array.isArray(settings.sass.includePaths)
              ? [settings.sass.includePaths]
              : settings.sass.includePaths
            : []),
          `${__packageRoot()}/node_modules`
          // '/'
        ]);
        this._includePaths = includePaths;

        let sharedResources = settings.sharedResources || [];
        if (!Array.isArray(sharedResources))
          sharedResources = [sharedResources];

        const resourceContent = __getSharedResourcesString(sharedResources);
        if (resourceContent) {
          dataObj.sharedResources = resourceContent;
        }

        let sassPassedSettings = Object.assign({}, settings.sass || {});
        delete sassPassedSettings.includePaths;
        delete sassPassedSettings.sharedResources;
        const sassSettings = __deepMerge(
          {
            importer: [
              (url, prev, done) => {
                if (resourceContent) {
                  const realPath = this._findDependency(url);
                  if (realPath) {
                    let content = __fs.readFileSync(realPath, 'utf8');
                    const importMatches = content.match(
                      /@import\s['"].*['"];/gm
                    );
                    if (importMatches) {
                      importMatches.forEach((importStatement) => {
                        let replaceImportStatement = importStatement;
                        const importPathMatches = importStatement.match(
                          /['"].*['"]/g
                        );
                        if (importPathMatches) {
                          const importPath = __unquote(importPathMatches[0]);
                          const absoluteImportPath = __path.resolve(
                            __folderPath(realPath),
                            importPath
                          );
                          content = content.replace(
                            importStatement,
                            `@import "${absoluteImportPath}";`
                          );
                        }
                      });
                    }
                    return {
                      contents: `
                        ${resourceContent}
                        ${content}
                      `
                    };
                  }
                }
                return null;
              }
            ],
            sourceMap: this._settings.map,
            includePaths
          },
          sassPassedSettings
        );

        // engage the cache
        const cache = new __SCache(this._settings.id, {
          ttl: '10d'
        });
        if (settings.clearCache && !settings._isChild) {
          await cache.clear();
        }
        let cacheId;

        if (__isPath(source)) {
          if (!__fs.existsSync(source) && source.slice(0, 1) === '/') {
            source = source.slice(1);
          }
          source = __path.resolve(settings.rootDir, source);
          const sourcePath = this._getRealFilePath(source);
          if (sourcePath) {
            // get the file stats
            const stats = __fs.statSync(sourcePath);
            const mTimeMs = stats.mtimeMs;
            // try to get from cache
            cacheId = __md5.encrypt(`${sourcePath}-${mTimeMs}`);
            // add the folder path in the includePaths setting
            const filePath = __folderPath(sourcePath);
            sassSettings.includePaths.unshift(filePath);
            settings.rootDir = filePath;
            // read the file to get his content
            dataObj.scss = __fs.readFileSync(source, 'utf8');
          }
        } else {
          // set the scss property with the source
          dataObj.scss = source;
          // create the cache id using the source code
          cacheId = __md5.encrypt(source);
        }

        // try to get from cache
        const cachedObj = await cache.get(cacheId);
        if (this._settings.cache && cachedObj) {
          // build the css code to return
          dataObj = cachedObj;
          dataObj.fromCache = true;
        }

        // extract the things that can be used
        // by others like mixins and variables declarations$
        if (!dataObj.fromCache) {
          const ast = __parseScss(dataObj.scss);
          const $ = __createQueryWrapper(ast);
          let mixinsVariablesString = '';
          const nodes = $('stylesheet')
            .children()
            .filter((node) => {
              return (
                (node.node.type === 'atrule' &&
                  node.node.value[0].value === 'mixin') ||
                node.node.type === 'declaration'
              );
            });
          nodes.nodes.forEach((node) => {
            mixinsVariablesString += `
              ${__stringifyScss(node.node)}
            `;
          });
          // save the mixin and variables resources
          dataObj.mixinsAndVariables = mixinsVariablesString;

          // strip comments of not
          dataObj.scss = settings.stripComments
            ? __stripCssComments(dataObj.scss)
            : dataObj.scss;
        }

        if (!dataObj.fromCache) {
          const findedImports = dataObj.scss.match(
            /^((?!\/\/)[\s]{0,999999999999}?)@import\s['"].*['"];/gm
          );
          if (findedImports && findedImports.length) {
            // save imports
            dataObj.importStatements = findedImports.map((s) => s.trim());
          }
        }

        // go down children
        const { children, scss } = await this._compileImports(
          dataObj.importStatements,
          dataObj.scss,
          settings
        );
        dataObj.children = children;
        dataObj.scss = scss;

        let toCompile = `
            ${dataObj.sharedResources || ''}
          `;

        if (!settings._isChild) {
          toCompile += this._bundleChildren(dataObj);
          toCompile += dataObj.scss;
        } else {
          toCompile += dataObj.scss;
        }

        // compile
        if (!dataObj.fromCache || !settings._isChild) {
          if (settings.putUseOnTop) {
            toCompile = __putUseStatementsOnTop(toCompile);
          }

          const renderObj = __sass.renderSync({
            ...sassSettings,
            data: toCompile
          });
          let compiledResultString = settings.stripComments
            ? __stripCssComments(renderObj.css.toString())
            : renderObj.css.toString();
          dataObj.css = compiledResultString.trim();
          if (renderObj.map) {
            dataObj.map = renderObj.map.toString();
          }

          // set in cache if needed
          if (settings.cache) {
            cache.set(cacheId, dataObj);
          }
        }

        if (settings.minify && !settings._isChild) {
          dataObj.css = __csso.minify(dataObj.css).css;
        }

        // remove empty lines
        if (dataObj.css) {
          try {
            dataObj.css = dataObj.css.replace(/^(?:[\t ]*(?:\r?\n|\r))+/gm, '');
          } catch (e) {}
        }

        // banner
        if (!settings._isChild && settings.banner) {
          dataObj.css = `
            ${settings.banner}
            ${dataObj.css}
          `.trim();
        }

        // resolve with the compilation result
        resolve({
          ...dataObj,
          startTime: startTime,
          endTime: Date.now(),
          duration: Date.now() - startTime
        });
      },
      {
        id: this._settings.id
      }
    );
  }

  _findDependency(path) {
    for (let i = 0; i < this._includePaths.length; i++) {
      const includePath = this._includePaths[i];
      const realPath = this._getRealFilePath(`${includePath}/${path}`);
      if (realPath) return realPath;
    }
    return null;
  }

  _bundleChildren(object) {
    if (!object.children) {
      return '';
    }
    let resultString = '';
    Object.keys(object.children).forEach((importPath) => {
      const childObj = object.children[importPath];
      if (childObj.children) {
        const ch = this._bundleChildren(childObj);
        if (ch) resultString += ch;
      }
      resultString += `
        ${childObj.css || ''}
      `;
    });
    return resultString;
  }

  async _compileImports(importStatements, scss, settings) {
    // loop on each imports
    const childrenObj = {};

    let finalImports = {};

    for (let i = 0; i < importStatements.length; i++) {
      const importStatement = importStatements[i].trim();
      const importStatementPath = __unquote(
        importStatement.replace('@import ', '').replace(';', '').trim()
      );
      let importAbsolutePath = __path.resolve(
        settings.rootDir,
        importStatementPath
      );

      if (__isGlob(importAbsolutePath)) {
        if (!finalImports[importStatement]) {
          finalImports[importStatement] = {
            rawStatement: importStatement,
            rawPath: importStatementPath,
            paths: []
          };
        }
        const globPaths = __glob.sync(importAbsolutePath, {});
        if (globPaths && globPaths.length) {
          globPaths.forEach((path) => {
            finalImports[importStatement].paths.push({
              absolutePath: path,
              relativePath: __path.relative(settings.rootDir, path)
            });
          });
        }
        continue;
      }

      finalImports[importStatement] = {
        rawStatement: importStatement,
        rawPath: importStatementPath,
        paths: [
          {
            absolutePath: importAbsolutePath,
            relativePath: __path.relative(settings.rootDir, importAbsolutePath)
          }
        ]
      };
    }

    for (let i = 0; i < Object.keys(finalImports).length; i++) {
      const importObj = finalImports[Object.keys(finalImports)[i]];

      for (let j = 0; j < importObj.paths.length; j++) {
        const pathObj = importObj.paths[j];
        const importPath = this._getRealFilePath(pathObj.absolutePath);
        if (importPath) {
          // compile the finded path
          const compileRes = await this.compile(importPath, {
            ...settings,
            _isChild: true,
            rootDir: __folderPath(importPath)
          });
          childrenObj[pathObj.absolutePath] = compileRes;
        }
      }

      scss = scss.replace(importObj.rawStatement, '');
    }
    return {
      children: childrenObj,
      scss
    };
  }

  _getRealFilePath(path) {
    const extension = __extension(path);
    const filename = __getFilename(path);
    const folderPath = __folderPath(path);
    let pattern;
    if (!extension) {
      pattern = `${folderPath}/?(_)${filename}.*`;
    } else {
      pattern = `${folderPath}/?(_)${filename}`;
    }
    const potentialPaths = __glob.sync(pattern);
    if (potentialPaths && potentialPaths.length) {
      return potentialPaths[0];
    }
    return null;
  }
}
