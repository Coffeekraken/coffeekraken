// @ts-nocheck

import __extension from '../../fs/extension';
import __SCache from '../../cache/SCache';
import __SFileCache from '../../cache/SFileCache';
import __unquote from '../../string/unquote';
import __path from 'path';
import __stripCssComments from '../../css/stripCssComments';
import __folderPath from '../../fs/folderPath';
import __deepMerge from '../../object/deepMerge';
import __SPromise from '../../promise/SPromise';
import __md5 from '../../crypt/md5';
import __sass from 'sass';
import __packageRoot from '../../path/packageRoot';
import __getFilename from '../../fs/filename';
import __isPath from '../../is/path';
import __fs from 'fs';
import __getSharedResourcesString from '../utils/getSharedResourcesString';
import __putUseStatementsOnTop from '../utils/putUseStatementsOnTop';
import __glob from 'glob';
import { parse as __parseScss } from 'scss-parser';
import { stringify as __stringifyScss } from 'scss-parser';
import __createQueryWrapper from 'query-ast';
import __csso from 'csso';
import __isGlob from 'is-glob';
import __unique from '../../array/unique';
import __SCompiler from '../../compiler/SCompiler';
import __SScssInterface from './interface/SScssInterface';
import __absolute from '../../path/absolute';
import __ensureDirSync from '../../fs/ensureDirSync';

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
 * import SScssCompiler from '@coffeekraken/sugar/node/scss/compile/SScssCompiler';
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
export = class SScssCompiler extends __SCompiler {
  static interface = __SScssInterface;

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
    super(__deepMerge({}, settings));

    // prod
    if (this._settings.prod) {
      this._settings.cache = false;
      this._settings.style = 'compressed';
      this._settings.minify = true;
      this._settings.stripComments = true;
    }
  }

  /**
   * @name              _compile
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
  _compile(input, settings = {}) {
    return new __SPromise(
      async (resolve, reject, trigger) => {
        settings = __deepMerge(
          this._settings,
          {
            _isChild: false
          },
          settings
        );

        const resultsObj = {};

        let filesPaths = [];

        // make input absolute
        input = __absolute(input);
        // process inputs
        input.forEach((inputStr) => {
          if (__isGlob(inputStr)) {
            filesPaths = [...filesPaths, ...__glob.sync(inputStr)];
          } else {
            filesPaths.push(inputStr);
          }
        });

        const startTime = Date.now();

        for (let i = 0; i < filesPaths.length; i++) {
          let filePath = filesPaths[i];

          let compileObj = {
            children: {},
            importStatements: [],
            includePaths: [],
            sharedResources: null,
            sharedResourcesStr: null,
            sharedResourcesHash: null,
            mixinsAndVariables: null,
            mixinsAndVariablesFromChilds: null,
            settings: Object.assign({}, settings),
            outputPath: null,
            scss: null,
            css: null
          };

          const includePaths = __unique([
            ...(settings.includePaths
              ? !Array.isArray(settings.includePaths)
                ? [settings.includePaths]
                : settings.includePaths
              : []),
            ...(settings.rootDir
              ? !Array.isArray(settings.rootDir)
                ? [settings.rootDir]
                : settings.rootDir
              : []),
            ...(settings.sass && settings.sass.includePaths
              ? !Array.isArray(settings.sass.includePaths)
                ? [settings.sass.includePaths]
                : settings.sass.includePaths
              : []),
            `${__packageRoot()}/node_modules`
          ]);
          compileObj.includePaths = includePaths;

          // shared resources
          let sharedResources = settings.sharedResources || [];
          if (!Array.isArray(sharedResources))
            sharedResources = [sharedResources];
          const sharedResourcesStr = __getSharedResourcesString(
            sharedResources
          );
          if (sharedResourcesStr) {
            compileObj.sharedResources = sharedResources;
            compileObj.sharedResourcesStr = sharedResourcesStr;
            compileObj.sharedResourcesHash = __md5.encrypt(sharedResourcesStr);
          }

          // sass settings
          let sassPassedSettings = Object.assign({}, settings.sass || {});
          delete sassPassedSettings.includePaths;
          delete sassPassedSettings.sharedResources;
          const sassSettings = __deepMerge(
            {
              outputStyle: settings.style,
              importer: [this._importer(compileObj)],
              sourceMap: settings.map,
              includePaths: compileObj.includePaths
            },
            sassPassedSettings
          );

          // engage the cache
          const fileCache = new __SFileCache(settings.id, {
            ttl: '10d'
          });
          if (settings.clearCache && !settings._isChild) {
            await fileCache.clear();
          }

          if (__isPath(filePath)) {
            if (!__fs.existsSync(filePath) && filePath.slice(0, 1) === '/') {
              filePath = filePath.slice(1);
            }
            filePath = __path.resolve(settings.rootDir, filePath);
            const sourcePath = this._getRealFilePath(filePath);
            if (sourcePath) {
              // add the folder path in the includePaths setting
              const folderPath = __folderPath(sourcePath);
              sassSettings.includePaths.unshift(folderPath);
              settings.rootDir = folderPath;
              // read the file to get his content
              compileObj.scss = __fs.readFileSync(filePath, 'utf8');
            }
          } else {
            // set the scss property with the source
            compileObj.scss = filePath;
          }

          // extract the things that can be used
          // by others like mixins and variables declarations$
          const ast = __parseScss(compileObj.scss);
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
          compileObj.mixinsAndVariables = mixinsVariablesString;

          // search for imports statements
          const findedImports = compileObj.scss.match(
            /^((?!\/\/)[\s]{0,999999999999}?)@import\s['"].*['"];/gm
          );
          if (findedImports && findedImports.length) {
            // save imports
            compileObj.importStatements = findedImports.map((s) => s.trim());
          }

          // go down children
          const compileImportPromise = this._compileImports(
            compileObj,
            settings
          );
          compileImportPromise.on('reject', (e) => {
            reject(e);
          });
          const { files, scss } = await compileImportPromise;
          compileObj.children = files;
          compileObj.scss = scss;

          // generate the mixins and variables string from the children
          compileObj.mixinsAndVariablesFromChilds = this._generateMixinsAndVariablesStringFromChilds(
            compileObj
          );

          // init the string to compile
          let toCompile = __putUseStatementsOnTop(`
              ${compileObj.sharedResourcesStr || ''}
              ${compileObj.mixinsAndVariablesFromChilds || ''}
              ${compileObj.scss}
            `);

          const cacheContext = {
            toCompile,
            sassSettings
          };

          // try to get from cache
          let cachedObj = {};
          if (settings.cache) {
            cachedObj = await fileCache.get(filePath, {
              context: cacheContext
            });
            if (cachedObj) {
              console.log('from cache', filePath);

              // build the css code to return
              compileObj = cachedObj;
              compileObj.fromCache = true;
            }
          }

          // if (!settings._isChild) {
          //   toCompile += this._bundleChildren(compileObj);
          //   toCompile += compileObj.scss;
          // } else {
          //   toCompile += compileObj.scss;
          // }

          // compile
          if (!compileObj.fromCache) {
            let renderObj;
            let compiledResultString = '';

            try {
              renderObj = __sass.renderSync({
                ...sassSettings,
                data: toCompile
              });
            } catch (e) {
              return reject(e.toString());
            }
            compiledResultString = settings.stripComments
              ? __stripCssComments(renderObj.css.toString())
              : renderObj.css.toString();
            compileObj.css = compiledResultString.trim();
            if (renderObj.map) {
              compileObj.map = renderObj.map.toString();
            }
            // set in cache if needed
            if (settings.cache) {
              console.log('SAVE cache', filePath);
              await fileCache.set(filePath, compileObj, {
                context: cacheContext
              });
            }
          }

          // minify
          if (settings.minify) {
            compileObj.css = __csso.minify(compileObj.css).css;
          }

          // remove empty lines
          if (compileObj.css) {
            try {
              compileObj.css = compileObj.css.replace(
                /^(?:[\t ]*(?:\r?\n|\r))+/gm,
                ''
              );
            } catch (e) {}
          }

          // banner
          if (!settings._isChild && settings.banner) {
            compileObj.css = `
              ${settings.banner}
              ${compileObj.css}
            `.trim();
          }

          // check if need to save
          if (settings.save === true) {
            const outputPath = `${settings.outputDir}/${filePath.replace(
              `${settings.rootDir}/`,
              ''
            )}`.replace(/\.s[c|a]ss$/, '.css');

            trigger('log', {
              value: `Saving the css file "<cyan>${outputPath.replace(
                `${__packageRoot()}/`,
                ''
              )}</cyan>"`
            });

            // saving the path
            compileObj.outputPath = outputPath;

            __ensureDirSync(__folderPath(outputPath));
            __fs.writeFileSync(outputPath, compileObj.css, 'utf8');
          }

          // save into results object
          resultsObj[filePath] = compileObj;
        }

        // resolve with the compilation result
        resolve({
          files: resultsObj,
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

  _importer(compileObj) {
    return (url, prev, done) => {
      if (compileObj.sharedResourcesStr) {
        const realPath = this._findDependency(url);

        if (realPath) {
          let content = __fs.readFileSync(realPath, 'utf8');
          const importMatches = content.match(/@import\s['"].*['"];/gm);
          if (importMatches) {
            importMatches.forEach((importStatement) => {
              let replaceImportStatement = importStatement;
              const importPathMatches = importStatement.match(/['"].*['"]/g);
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
              ${compileObj.sharedResourcesStr}
              ${content}
            `
          };
        }
      }
      return null;
    };
  }

  _generateMixinsAndVariablesStringFromChilds(compileObj) {
    let string = '';
    let hashes = [];

    Object.keys(compileObj.children).forEach((path) => {
      const childCompileObj = compileObj.children[path];

      if (childCompileObj.children) {
        string += this._generateMixinsAndVariablesStringFromChilds(
          childCompileObj
        );
      }
      const hash = __md5.encrypt(
        childCompileObj.mixinsAndVariables.replace(/\s/g, '')
      );
      if (hashes.indexOf(hash) !== -1) return;
      hashes.push(hash);
      string += childCompileObj.mixinsAndVariables;
    });

    return string;
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

  _compileImports(compileObj, settings) {
    return new __SPromise(async (resolve, reject, trigger) => {
      // loop on each imports
      const childrenObj = {};

      let scss = compileObj.scss;
      let finalImports = {};

      const includePaths = __unique(compileObj.includePaths);

      for (let i = 0; i < compileObj.importStatements.length; i++) {
        const importStatement = compileObj.importStatements[i].trim();
        const importStatementPath = __unquote(
          importStatement.replace('@import ', '').replace(';', '').trim()
        );

        let importAbsolutePath;

        // search in include paths
        for (let j = 0; j < includePaths.length; j++) {
          const includePath = includePaths[j];
          const potentialPath = this._getRealFilePath(
            __path.resolve(includePath, importStatementPath)
          );
          if (__fs.existsSync(potentialPath)) {
            importAbsolutePath = potentialPath;
            break;
          }
        }

        if (!importAbsolutePath) {
          continue;
        }

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
              relativePath: __path.relative(
                settings.rootDir,
                importAbsolutePath
              )
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
            const compilePromise = this.compile(importPath, {
              ...settings,
              _isChild: true,
              rootDir: __folderPath(importPath),
              save: false
            });
            compilePromise.on('reject', (e) => {
              reject(e);
            });
            const compileRes = await compilePromise;
            childrenObj[pathObj.absolutePath] =
              compileRes.files[Object.keys(compileRes.files)[0]];
          }
        }

        scss = scss.replace(importObj.rawStatement, '');
      }
      resolve({
        files: childrenObj,
        scss
      });
    });
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
};
