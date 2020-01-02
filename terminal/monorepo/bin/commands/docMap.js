const __config = require('./config');
const __log = require('@coffeekraken/sugar/node/log/log');
const __glob = require('glob');
const __fs = require('fs');

module.exports = () => {

  __log('Searching for the documentation files in markdown format...', 'info');

  const docFiles = __glob.sync(__config.docMap.srcFilesPattern, {
    cwd: __config.repositoryRootPath,
    root: __config.repositoryRootPath,
    ignore: __config.docMap.srcFilesIgnore
  });

  // init the docMap object
  let docMap = {};

  __log('Searching for namespace inside each documentation files and building docMap object...', 'info');

  // loop on each files fi find the ones that have "namespace" specified
  docFiles.forEach((docFile) => {

    // read the doc file content
    const docFileContent = __fs.readFileSync(`${__config.repositoryRootPath}/${docFile}`, 'utf8');

    // search for the namespace tag in the doc
    const reg = /<!--\s@namespace:\s(.+)\s-->/g;
    const result = reg.exec(docFileContent);
    if ( ! result || ! result[1]) return;

    // save in the docMap
    docMap[result[1]] = docFile;

  });

  // saving the docMap at the appRoot folder
  __log('Saving the "' + __config.docMap.outputFilename + '" file at the application root folder...', 'info');
  try { __fs.unlinkSync(`${__config.repositoryRootPath}/${__config.docMap.outputFilename}`) } catch(e) {}
  __fs.writeFileSync(`${__config.repositoryRootPath}/${__config.docMap.outputFilename}`, JSON.stringify(docMap, null, 4), 'utf8');

  __log('"' + __config.docMap.outputFilename + '" generation made successfully.', 'success');

};
