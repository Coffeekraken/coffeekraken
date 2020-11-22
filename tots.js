const fs = require('fs');
const glob = require('glob');
const childProcess = require('child_process');
const __path = require('path');

const folderPath = '/workspaces/coffeekraken/packages/tools/sugar/src';

const jsFiles = glob
  .sync('js/**/*.ts', {
    cwd: folderPath
  })
  .map((p) => {
    return p.replace(/^js\//, '');
  });
const nodeFiles = glob
  .sync('node/**/*.ts', {
    cwd: folderPath
  })
  .map((p) => {
    return p.replace(/^node\//, '');
  });

// console.log(jsFiles);
// console.log(nodeFiles);

nodeFiles.forEach((path) => {
  const nodePath = `${folderPath}/node/${path}`;
  const jsPath = `${folderPath}/js/${path}`;

  const nodeContent = fs.readFileSync(nodePath, 'utf8');
  if (nodeContent.match(/\*\s@src\s/gm)) {
    if (fs.existsSync(jsPath)) {
      console.log('efef');

      const folderPath = nodePath.split('/').slice(0, -1).join('/');
      const relPath = __path.relative(nodePath, jsPath);
      const fileName = nodePath.split('/').pop();

      fs.unlinkSync(nodePath);
      const command = `ln -s ${relPath} ${fileName}`;
      childProcess.execSync(command, {
        cwd: folderPath
      });
    }
  }

  // if (!fs.existsSync(tsPath)) {
  //   fs.renameSync(path, tsPath);
  // }
});
