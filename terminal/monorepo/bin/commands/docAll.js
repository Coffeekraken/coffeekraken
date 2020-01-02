const __config = require('./config');
const __log = require('@coffeekraken/sugar/node/log/log');
const __glob = require('glob');

module.exports = () => {

  __log('Searching for each packages inside the monorepo that have a "' + __config.doc.srcFoldersPattern + '" folder to generate the documentation files...', 'info');

  const srcFolders = __glob.sync(__config.doc.srcFoldersPattern, {
    cwd: __config.repositoryRootPath,
    root: __config.repositoryRootPath,
    ignore: __config.doc.srcFoldersIgnore
  });

  if ( ! srcFolders.length) {
    __log('No "' + __config.doc.srcFoldersPattern + '" folders finded...', 'error');
    process.exit(0);
  }

  // loop on each finded "src" folders to generate the documentation for it
  srcFolders.forEach((srcFolder) => {

    let packageRoot = __config.repositoryRootPath + '/' + srcFolder;
    packageRoot = packageRoot.split('/').slice(0,-1).join('/');
    __log(`Generating the documentation for the package "${srcFolder.split('/').slice(0, -1).join('/')}"`, 'info');

    // generate the docuentation files for the current srcFolder
    const { execSync } = require("child_process");
    try {
      const error = execSync(`coffeekraken-docblock-to-markdown -f '${__config.doc.filesPattern}' -d '${__config.doc.outputFolder}'`, {
        stdio: "inherit",
        cwd: packageRoot
      });

      if (error) {
        __log(error, 'error');
        process.exit();
      }
    } catch(e) {}

  });

};
