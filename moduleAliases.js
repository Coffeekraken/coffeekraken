const __moduleAlias = require('module-alias');
const __glob = require('glob');
const __path = require('path');
const __fs = require('fs');

const modulePathes = __glob.sync('*/**/package.json', {
  ignore: '**/node_modules/**'
});

modulePathes.forEach(path => {
  if (!__fs.existsSync(__dirname + '/' + path)) return;
  const packageJson = require(__dirname + '/' + path);
  const name = packageJson.name;
  const folderPath = path.split('/').slice(0, -1).join('/');
  // if (moduleAliases) {
  //   Object.keys(moduleAliases).forEach((k, i) => {
  //     let p = folderPath + '/' + moduleAliases[Object.keys(moduleAliases)[i]];
  //     __moduleAlias.addAlias(k, __path.resolve(p));
  //   });
  // }
  __moduleAlias.addAlias(name, __path.resolve(folderPath));
});