// @ts-nocheck

import _SInterface from '../../../node/class/SInterface';

export default class SNpmBinInterface extends _SInterface {
  static definition = {
    action: {
      type: 'String',
      required: true,
      alias: 'a',
      values: ['install', 'i', 'uninstall', 'u', 'un'],
      description:
        'Specify which action you want to execute in the "bin" module'
    },
    global: {
      type: 'Boolean',
      required: true,
      alias: 'g',
      description:
        'Specify if you want to symlink the passed bin in the global scope or in local one',
      default: false
    },
    package: {
      type: 'String',
      alias: 'p',
      description:
        "Specify the package you want to install the bin from. If not specified, will take the current package where you're in using ```process.cwd``` function",
      default: null
    },
    bin: {
      type: 'String',
      alias: 'b',
      description: 'Specify the bin you want to symlink',
      default: null
    }
  };
}
