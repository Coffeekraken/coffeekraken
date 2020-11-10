const __path = require('path');
const __fs = require('fs');
const __isDir = require('../../../is/directory');
const __SEs6Import = require('../../../es6/SEs6Import');

exports.plugin = function ({ srcFilename, srcContent, alias }) {
  function escape(name) {
    return name.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
  }

  srcContent = `
    var exports = {};
    ${srcContent}
  `;

  Object.keys(alias).forEach((name) => {
    const path = alias[name];
    const imports = __SEs6Import.parseCode(srcContent);
    if (imports) {
      imports.forEach((es6Import) => {
        if (es6Import.default && !es6Import.star) {
          es6Import.star = es6Import.default;
          es6Import.default = null;
        }

        if (!es6Import.path.match(new RegExp(`^${name}`))) {
          return;
        }

        const fsPath = `${path}/${es6Import.path.replace(name, '')}`
          .split('//')
          .join('/');
        if (
          __isDir(fsPath) &&
          __fs.existsSync(`${fsPath}/package.json`.split('//').join('/'))
        ) {
          const json = require(`${fsPath}/package.json`.split('//').join('/'));
          if (json.main) {
            es6Import.path = `${es6Import.path}/${json.main}`;
            srcContent = srcContent.replace(
              es6Import.raw,
              es6Import.toString()
            );
            return;
          }
        } else {
          // const exts = ['.js', '.mjs', '.ts', '.tsx', '.jsx'];
          // for (let i = 0; i < exts.length; i++) {
          // const ext = exts[i];
          srcContent = srcContent.replace(es6Import.raw, es6Import.toString());
          return;
          // }
        }
      });
    }
  });

  return srcContent;
};
