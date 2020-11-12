const __packageRoot = require('../../../path/packageRoot');
const __SPromise = require('../../../promise/SPromise');
const __packageJson = require('../../../package/json');
const __babel = require('@babel/core');
const __babelParser = require('@babel/parser');
const __babelGenerator = require('@babel/generator').default;
const __fs = require('fs');
const __path = require('path');
const __isDir = require('../../../is/directory');
const __sugarConfig = require('../../../config/sugar');
const __SEs6Import = require('../../../es6/SEs6Import');
const __SEs6Export = require('../../../es6/SEs6Export');
const __extension = require('../../../fs/extension');
const __resolve = require('resolve');
const __glob = require('glob');
const __rollup = require('rollup');
const __rollupPluginVirtual = require('@rollup/plugin-virtual');
const __rollupPluginIncludePaths = require('rollup-plugin-includepaths');
const { match } = require('micromatch');
const __moduloze = require('moduloze').build;
const __uniqid = require('../../../string/uniqid');
const __builtInNodeModules = require('../../../module/buildInNodeModules');
const { parse } = require('path');
const __unquote = require('../../../string/unquote');
const __isBrowser = require('../../../is/browser');
const __decomment = require('decomment');
const __browserResolve = require('browser-resolve');

/**
 * @name                js
 * @namespace           sugar.node.server.frontend.handlers
 * @type                Function
 *
 * This function is responsible of responding to express requests made on the home page
 *
 * @param         {Object}          req             The express request object
 * @param         {Object}          res             The express response object
 * @param         {Object}         [settings={}]    The handler settings
 *
 * @since       2.0.0
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = async function js(req, res, settings = {}) {
  // search for the view to render
  const packageRoot = __packageRoot();
  const packageJson = __packageJson();

  let content = 'not found...';
  let filePath = req.path.slice(0, 1) === '/' ? req.path.slice(1) : req.path;

  const rootDir = __sugarConfig('frontend.rootDir');
  const potentialPath = __path.resolve(rootDir, filePath);

  // try to get the file
  if (__fs.existsSync(potentialPath)) {
    content = __fs.readFileSync(potentialPath, 'utf8');
  }

  if (content) {
    // const parsedContent = __babelParser.parse(content, {
    //   allowImportExportEverywhere: true
    // });

    // strip comments
    content = __decomment(content);

    // console.log(parsedContent.program.body[0]);

    // transpile commonjs to es6
    content = __babel.transformSync(content, __sugarConfig('babel')).code;

    // const exportMatches = __SEs6Export.parseCode(content);
    // console.log(exportMatches);

    const fromStatements = content.match(/\sfrom\s['"`].*['"`][;,]?/gm);

    if (fromStatements) {
      fromStatements.forEach((fromStatement) => {
        let lastCharacter = '';
        let fromPath = fromStatement.trim().replace('from ', '');
        if (fromPath.slice(-1) === ',' || fromPath.slice(-1) === ';') {
          lastCharacter = fromPath.slice(-1);
          fromPath = fromPath.slice(0, -1);
        }
        fromPath = __unquote(fromPath).trim();

        if (fromPath.slice(0, 1) === '/' || fromPath.slice(0, 1) === '.')
          return;

        if (Object.keys(__builtInNodeModules).indexOf(fromPath) !== -1) {
          const moduleObj = __builtInNodeModules[fromPath];
          if (moduleObj.polyfill.browser) {
            fromPath = moduleObj.polyfill.browser;
          }
        }

        let resolvedPath = __resolve.sync(fromPath, {
          basedir: rootDir,
          moduleDirectory: settings.nodeModulesDir || ['node_modules'],
          includeCoreModules: false,
          preserveSymlinks: true,
          packageFilter: (pkg, dir) => {
            if (pkg.browser) {
              if (typeof pkg.browser === 'string') {
                pkg.main = pkg.browser;
              } else if (typeof pkg.browser === 'object') {
                pkg.main = pkg.browser[Object.keys(pkg.browser)[0]];
              }
            }
            return pkg;
          }
        });

        const relativePath = '/' + __path.relative(rootDir, resolvedPath);

        // replace the import with the new one
        content = content.replace(
          fromStatement,
          ` from "${relativePath}"${lastCharacter}`
        );

        // return;
        // if (
        //   es6Import.path.slice(0, 1) === '/' ||
        //   es6Import.path.slice(0, 1) === '.'
        // )
        //   return;

        // if (Object.keys(__builtInNodeModules).indexOf(es6Import.path) !== -1) {
        //   const moduleObj = __builtInNodeModules[es6Import.path];
        //   if (moduleObj.polyfill.browser) {
        //     es6Import.path = moduleObj.polyfill.browser;
        //     es6Import.polyfill = true;
        //   }
        // }

        // if (es6Import.default && !es6Import.star) {
        //   es6Import.star = es6Import.default;
        //   es6Import.default = null;
        // }

        // const resolvedPath = __resolve.sync(es6Import.path, {
        //   basedir: rootDir,
        //   moduleDirectory: settings.nodeModulesDir || ['node_modules'],
        //   includeCoreModules: false,
        //   preserveSymlinks: true
        // });
        // if (es6Import.path === 'inherits') {
        //   console.log('oin', resolvedPath);
        // }

        // const relativePath = __path.relative(rootDir, resolvedPath);

        // // prepend the "node_modules" path
        // es6Import.path = `/${relativePath}`;

        // // replace the import with the new one
        // content = content.replace(es6Import.raw, es6Import.toString());
      });
    }

    // remove some weird exports for typescript
    content = content.replace(
      /export\svar\sdefault\s?=\s?((?!;|,).)*[,;]{1}/gm,
      ''
    );

    //   let matches = content.match(
    //     /(module\.)?exports(\.[a-zA-Z0-9-_\.]+)?\s{0,99999999999}=\s{0,99999999999}((?!;|,).)*[,;]{1}/gm
    //   );
    //   if (matches) {
    //     let matchesArray = [];
    //     matches
    //       .map((str) => str.trim())
    //       .map((match) => {
    //         const parts = match.split('=');
    //         const value = parts[1].trim().replace(/[,;]$/, '');
    //         const name = parts[0]
    //           .replace('module.exports', '')
    //           .replace('exports.', '')
    //           .trim();
    //         return {
    //           raw: match,
    //           name: name || 'default',
    //           value
    //         };
    //       })
    //       .forEach((exportObj) => {
    //         // only export the same variable once
    //         if (matchesArray.indexOf(exportObj.name) !== -1) return;
    //         matchesArray.push(exportObj.name);

    //         console.log(exportObj);

    //         const id = __uniqid();
    //         const strVar = `let __${id};`;
    //         const str = `
    //           __${id} = ${exportObj.value};
    //         `;
    //         const strExport = `
    //           export { __${id} as ${exportObj.name} };
    //         `;
    //         content = `
    //           ${strVar}
    //           ${content}
    //           ${strExport}
    //         `;

    //         content = content.replace(exportObj.raw, str);
    //       });
    //   }
  }

  return new __SPromise(
    (resolve, reject, trigger) => {
      return resolve({
        data: content,
        type: 'text/javascript'
      });
    },
    {
      id: 'frontendServerJsHandler'
    }
  );
};
