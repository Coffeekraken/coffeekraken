import __SInterface from '../../../interface/SInterface';
import __packageRoot from '../../../path/packageRoot';
import __fs from 'fs';
import __TscInterface from './TscInterface';

// let defaultConfig;
// if (__fs.existsSync(`${__packageRoot()}/tsconfig.json`)) {
//   defaultConfig = `${__packageRoot()}/tsconfig.json`;
// } else if (__fs.exi)

class compileTsInterface extends __SInterface {
  static definition = {
    ...__TscInterface.definition,
    project: {
      type: 'Array<File>',
      alias: 'p'
    },
    input: {
      type: 'String',
      alias: 'i'
    },
    watch: {
      type: 'Boolean',
      alias: 'w'
    }
  };
}
export = compileTsInterface;
