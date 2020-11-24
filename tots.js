const fs = require('fs');
const glob = require('glob');
const childProcess = require('child_process');
const __path = require('path');

const folderPath = '/workspaces/coffeekraken/packages/tools/sugar/src/cli';

const jsFiles = glob.sync('**/*.ts', {
  cwd: folderPath,
  ignore: '**/__tests__/**'
});

// console.log(jsFiles);
// console.log(nodeFiles);

jsFiles.forEach((path) => {
  path = `${folderPath}/${path}`;
  let content = fs.readFileSync(path, 'utf8');
  if (!content.match(/\/\/\s@ts-nocheck/gm)) {
    content = `// @ts-nocheck

${content}`;
    fs.writeFileSync(path, content);
  }

  // if (!fs.existsSync(tsPath)) {
  //   fs.renameSync(path, tsPath);
  // }
});
