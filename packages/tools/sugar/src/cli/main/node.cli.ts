// @ts-nocheck

import __fs from 'fs';
import __find from 'find-in-files';
import __path from 'path';
import __writeFileSync from '../../node/fs/writeFileSync';
import __set from '../../node/object/set';
import __appRoot from 'app-root-path';
import __parseArgs from '../../node/cli/parseArgs';
import __parse from '../../node/docblock/parse';
import __includes from '../../node/string/includes';

export = async (stringArgs = '') => {
  const args = __parseArgs(stringArgs, {
    definition: {
      source: {
        type: 'String',
        alias: 's',
        default: `${__appRoot.path}/src/node`
      },
      destination: {
        type: 'String',
        alias: 'd',
        default: `${__appRoot.path}/node.js`
      },
      ignore: {
        type: 'String',
        alias: 'i',
        default: `__tests__,__wip__`
      }
    }
  });

  const itemsArray = [
    `
  require('module-alias/register');
const __ensureExists = require('@coffeekraken/sugar/node/object/ensureExists');
const api = {};
  `
  ];

  const stackFn = {};
  const stack = {};

  const files = await __find.find('@namespace', args.source, '.js$');

  for (let i = 0; i < Object.keys(files).length; i++) {
    const filepath = Object.keys(files)[i];

    if (__includes(filepath, args.ignore)) continue;

    // let fileContent = __fs.readFileSync(filepath).toString();

    // parse the file docblocks
    const docObj = __parse(filepath, {
      preprocessor: (blockString) => {
        blockString = blockString.replace('sugar.js', 'sugar.node');
        blockString = blockString.replace('Sugar.js', 'Sugar.node');
        blockString = blockString.replace('sugar/js/', 'sugar/node/');
        return blockString;
      }
    })[0];

    const relativeFilePath = __path.relative(
      args.destination.split('/').slice(0, -1).join('/'),
      docObj._.filepath
    );

    // check the type of the parsed file
    switch (docObj.type.toLowerCase()) {
      case 'function':
        itemsArray.push(`
${docObj._.raw}
__ensureExists(api, '${docObj.namespace.split('.').slice(1).join('.')}.${
          docObj.name
        }', null);
api.${docObj.namespace.split('.').slice(1).join('.')}.${
          docObj.name
        } = (...args) => {
  return require('./${relativeFilePath}').call(null, ...args);
};
        `);
        break;
      case 'class':
      default:
        itemsArray.push(`
${docObj._.raw}
__ensureExists(api, '${docObj.namespace.split('.').slice(1).join('.')}.${
          docObj.name
        }', null);
Object.defineProperty(api.${docObj.namespace.split('.').slice(1).join('.')}, '${
          docObj.name
        }', {
  get: function() {
    return require('./${relativeFilePath}');
  }
});
          `);
        break;
    }
  }

  // export the API
  itemsArray.push(`module.exports = api;`);

  __writeFileSync(args.destination, itemsArray.join('\n'));
};
