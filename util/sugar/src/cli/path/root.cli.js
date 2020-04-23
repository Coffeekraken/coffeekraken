const __findPkgJson = require('find-package-json');

module.exports = async (stringArgs) => {

  const f = __findPkgJson(process.cwd());
  let file = f.next();
  let finalFile, rootPath;
  while (!file.done) {
    if (file.done) break;
    finalFile = file;
    file = f.next();
  }
  if (finalFile.filename) {
    rootPath = finalFile.filename.split('/').slice(0, -1).join('/');
  }
  console.log(rootPath);

}