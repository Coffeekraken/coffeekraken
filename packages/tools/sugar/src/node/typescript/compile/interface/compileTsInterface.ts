import __SInterface from '../../../interface/SInterface';
import __packageRoot from '../../../path/packageRoot';
import __fs from 'fs';

// let defaultConfig;
// if (__fs.existsSync(`${__packageRoot()}/tsconfig.json`)) {
//   defaultConfig = `${__packageRoot()}/tsconfig.json`;
// } else if (__fs.exi)

class compileTsInterface extends __SInterface {
  static definition = {
    config: {
      type: 'File|Array<File>',
      alias: 'c'
    },
    input: {
      type: 'String',
      alias: 'i'
    }
  };
}
export = compileTsInterface;
