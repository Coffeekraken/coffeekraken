const __fs = require('fs');
const __find = require('find-in-files');
const __path = require('path');
const __writeFileSync = require('./fs/writeFileSync');
const __set = require('./object/set');

(async () => {

  let fileString = `
  `;

  const stackFn = {};
  const stack = {};

  const files = await __find.find('@namespace', __dirname, '.js$');

  for (let i = 0; i < Object.keys(files).length; i++) {

    const filepath = Object.keys(files)[i];

    if (filepath.includes('__wip__')) continue;
    if (filepath.includes('__tests__')) continue;
    if (filepath.includes('generateEasyStack')) continue;

    let fileContent = __fs.readFileSync(filepath).toString();

    // get namespace
    const namespaceReg = /@namespace\s+([a-zA-Z0-9\.]+)/;
    const namespaceMatches = fileContent.match(namespaceReg);
    let namespace = namespaceMatches && namespaceMatches[1] ? namespaceMatches[1] : null;
    namespace = namespace.replace('sugar.node.', '');

    // get src
    const srcReg = /@src\s+([a-zA-Z0-9\.\/]+)/;
    const srcMatches = fileContent.match(srcReg);
    const src = srcMatches && srcMatches[1] ? srcMatches[1] : null;

    // check if source exist to get the file content
    if (src) {
      const srcFilePath = filepath.split('/').slice(0, -1).join('/') + '/' + src;
      fileContent = __fs.readFileSync(srcFilePath).toString();
    }

    // get the name
    const nameReg = /@name\s+([a-zA-Z0-9-_]+)/;
    const nameMatches = fileContent.match(nameReg);
    const name = nameMatches && nameMatches[1] ? nameMatches[1] : null;

    // get the type
    const typeReg = /@type\s+([a-zA-Z]+)/;
    const typeMatches = fileContent.match(typeReg);
    const type = typeMatches && typeMatches[1] ? typeMatches[1] : null;

    // console.log(type, name, filepath);

    // switch depending on type
    switch (type.toLowerCase()) {
      case 'function':
        stackFn[namespace + '.' + name] = `
        (...args) => {
          return require('./${__path.relative(__dirname, filepath)}').apply(null, ...args);
        }
        `;
        fileString += `
        `;
        __set(stack, `${namespace}.${name}`, `@${namespace}.${name}`);
        break;
    }

    // console.log(fileContent);

  }

  let string = JSON.stringify(stack);

  Object.keys(stackFn).forEach(namespace => {

    string = string.replace(`"@${namespace}"`, stackFn[namespace]);

  });

  // export the stack
  fileString += `
    module.exports = ${string};
  `;

  // write the file
  __writeFileSync(__dirname + '/easy.js', fileString);

})();