// const __moduleAlias = require('module-alias');
// const __glob = require('glob');
// const __path = require('path');

// module.exports = function moduleAliases(currentPackage = null) {

//   const modulePathes = __glob.sync('*/**/package.json', {
//     ignore: '**/node_modules/**'
//   });

//   modulePathes.forEach(path => {
//     const packageJson = require('./' + path);
//     const name = packageJson.name;
//     const moduleAliases = packageJson._moduleAliases || packageJson.moduleAliases;
//     const folderPath = path.split('/').slice(0, -1).join('/');
//     if (moduleAliases) {
//       console.log(name);
//       Object.keys(moduleAliases).forEach((k, i) => {
//         let p = folderPath + '/' + moduleAliases[Object.keys(moduleAliases)[i]];
//         console.log('SMALL', k, __path.resolve(p));
//         __moduleAlias.addAlias(k, __path.resolve(p));
//       });
//     }
//     if (!currentPackage || currentPackage !== name) {
//       // __moduleAlias.addAlias(name, __path.resolve(folderPath));
//       __moduleAlias.addAlias(name, (fromPath, request, alias) => {
//         // fromPath - Full path of the file from which `require` was called
//         // request - The path (first argument) that was passed into `require`
//         // alias - The same alias that was passed as first argument to `addAlias` (`@src` in this case)

//         // console.log(fromPath);
//         // console.log(request);
//         // console.log(alias);
//         // console.log(' ');

//         if (request.startsWith(alias)) {
//           const importRequest = request.replace(alias, '');
//           const importPath = __path.resolve(folderPath);
//           console.log('IMCO', importPath);
//           return importPath;
//         }

//         return '';

//         // Return any custom target path for the `@src` alias depending on arguments
//         // if (fromPath.startsWith(__dirname + '/others')) return __dirname + '/others'
//         // return __dirname + '/src'
//       });
//       // console.log('ALIAS', name, __path.resolve(folderPath));
//       // console.log(' ');
//     }
//   });

// }