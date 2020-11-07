const __fs = require('fs');
const path = require('path');
const execa = require('execa');
const npmRunPath = require('npm-run-path');
const sass = require('sass');
const __sugarConfig = require('../config/sugar');
const __jsObjectToScssMap = require('../scss/jsObjectToScssMap');
const __folderPath = require('../fs/folderPath');
const __getFilename = require('../fs/filename');
const __isPath = require('../is/path');
const __putUseStatementsOnTop = require('../scss/putUseStatementsOnTop');
const __sugarScssImporter = require('../scss/importer/sugarScssImporter');
const __injectSugarScss = require('../scss/injectSugarScss');
const __ensureNoDuplicateImportStatements = require('../scss/ensureNoDuplicateImportStatements');

const IMPORT_REGEX = /\@(use|import)\s*['"](.*?)['"]/g;

function stripFileExtension(filename) {
  return filename.split('.').slice(0, -1).join('.');
}

function scanSassImports(fileContents, filePath, fileExt) {
  // TODO: Replace with matchAll once Node v10 is out of TLS.
  // const allMatches = [...result.matchAll(new RegExp(HTML_JS_REGEX))];
  const allMatches = [];
  let match;
  const regex = new RegExp(IMPORT_REGEX);
  while ((match = regex.exec(fileContents))) {
    allMatches.push(match);
  }
  // return all imports, resolved to true files on disk.
  return allMatches
    .map((match) => match[2])
    .filter((s) => s.trim())
    .map((s) => {
      return path.resolve(path.dirname(filePath), s);
    });
}

module.exports = function sassPlugin(_, { native, compilerOptions = {} } = {}) {
  /** A map of partially resolved imports to the files that imported them. */
  const importedByMap = new Map();

  function addImportsToMap(filePath, sassImport) {
    const importedBy = importedByMap.get(sassImport);
    if (importedBy) {
      importedBy.add(filePath);
    } else {
      importedByMap.set(sassImport, new Set([filePath]));
    }
  }

  return {
    name: '@coffeekraken/snowpack-plugin-sass',
    resolve: {
      input: ['.scss', '.sass'],
      output: ['.css']
    },
    /**
     * If any files imported the given file path, mark them as changed.
     * @private
     */
    _markImportersAsChanged(filePath) {
      if (importedByMap.has(filePath)) {
        const importedBy = importedByMap.get(filePath);
        importedByMap.delete(filePath);
        for (const importerFilePath of importedBy) {
          this.markChanged(importerFilePath);
        }
      }
    },
    /**
     * When a file changes, also mark it's importers as changed.
     * Note that Sass has very lax matching of imports -> files.
     * Follow these rules to find a match: https://sass-lang.com/documentation/at-rules/use
     */
    onChange({ filePath }) {
      const filePathNoExt = stripFileExtension(filePath);
      // check exact: "_index.scss" (/a/b/c/foo/_index.scss)
      this._markImportersAsChanged(filePath);
      // check no ext: "_index" (/a/b/c/foo/_index)
      this._markImportersAsChanged(filePathNoExt);
      // check no underscore: "index.scss" (/a/b/c/foo/index.scss)
      this._markImportersAsChanged(filePath.replace(/([\\\/])_/, '$1'));
      // check no ext, no underscore: "index" (/a/b/c/foo/index)
      this._markImportersAsChanged(filePathNoExt.replace(/([\\\/])_/, '$1'));
      // check folder import: "foo" (/a/b/c/foo)
      if (filePathNoExt.endsWith('_index')) {
        const folderPathNoIndex = filePathNoExt.substring(
          0,
          filePathNoExt.length - 7
        );
        this._markImportersAsChanged(folderPathNoIndex);
      }
    },
    /** Load the Sass file and compile it to CSS. */
    async load({ filePath, isDev }) {
      const fileExt = path.extname(filePath);
      let contents = __fs.readFileSync(filePath, 'utf8');
      // During development, we need to track changes to Sass dependencies.
      const sassImports = scanSassImports(contents, filePath, fileExt);
      if (isDev) {
        sassImports.forEach((imp) => addImportsToMap(filePath, imp));
      }

      const includePaths = [
        path.dirname(filePath),
        ...(compilerOptions.includePaths || [])
      ];

      contents = __injectSugarScss(contents);
      contents = __ensureNoDuplicateImportStatements(contents);

      const result = sass.renderSync({
        ...compilerOptions,
        importer: [
          // __globImporter(),
          // __sugarScssImporter({
          //   content: contents
          // })
        ],
        includePaths,
        indentedSyntax: fileExt === '.sass',
        data: contents
      });

      if (result.css) return result.css.toString();
      else if (result.formatted) {
        return `
          ${result.formatted}
          ${result.file}
          ${result.line}
          ${result.column}
        `;
      }
    }
  };
};
