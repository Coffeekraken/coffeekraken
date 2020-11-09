const __folderPath = require('../../fs/folderPath');
const __getFilename = require('../../fs/filename');
const __fs = require('fs');
const __path = require('path');
const __sugarConfig = require('../../config/sugar');
const __jsObjectToScssMap = require('../../scss/jsObjectToScssMap');
const __putUseStatementsOnTop = require('../../scss/putUseStatementsOnTop');
const __isInPackage = require('../../is/inPackage');
const __deepMerge = require('../../object/deepMerge');
const __packageRoot = require('../../path/packageRoot');
const __injectSugarScss = require('../injectSugarScss');
const __ensureNoDuplicateImportStatements = require('../ensureNoDuplicateImportStatements');

module.exports = (settings = {}) => {
  settings = __deepMerge(
    {
      content: null,
      includePaths: []
    },
    settings
  );

  return (url, prev, done) => {
    // if (url === 'stdin') return null;

    let content;

    if (url !== 'stdin') {
      let prevFolderPath = process.cwd();
      if (prev !== 'stdin') {
        prevFolderPath = __folderPath(prev);
      }

      let filePath,
        fileIncludePath = '';

      for (let i = 0; i < settings.includePaths.length; i++) {
        const path = settings.includePaths[i];

        // if (path === tmpPath) continue;

        let relativeUrl;

        if (url.match(/\.{1,2}\//) || url.substr(0, 1) !== '/') {
          relativeUrl = __path
            .resolve(path, prevFolderPath, url)
            .replace(`${path}/`, '')
            .replace(path, '');
        }

        const fileName = __getFilename(url);
        const folderPath = __folderPath(url);

        let potentialPaths = [
          `${url}`,
          `${url}.scss`,
          `${url}.sass`,
          `${folderPath}/_${fileName}`,
          `${folderPath}/_${fileName}.scss`,
          `${folderPath}/_${fileName}.sass`
        ];

        if (relativeUrl) {
          const relativeFolderPath = __folderPath(relativeUrl);
          potentialPaths = [
            `${relativeUrl}`,
            `${relativeUrl}.scss`,
            `${relativeUrl}.sass`,
            `${relativeFolderPath}/_${fileName}`,
            `${relativeFolderPath}/_${fileName}.scss`,
            `${relativeFolderPath}/_${fileName}.sass`,
            ...potentialPaths
          ];
        }

        for (let j = 0; j < potentialPaths.length; j++) {
          const potentialPath = potentialPaths[j];

          if (__fs.existsSync(`${path}/${potentialPath}`)) {
            filePath = potentialPath;
            fileIncludePath = path;
            break;
          }
        }
        if (filePath) break;
      }

      // read the file
      content = __fs.readFileSync(`${fileIncludePath}/${filePath}`, 'utf8');
    } else {
      content = settings.content;
    }

    content = __injectSugarScss(content);
    content = __ensureNoDuplicateImportStatements(content);

    return { contents: content };
  };
};
