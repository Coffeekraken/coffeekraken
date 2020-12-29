// @ts-nocheck

import __SInterface from '../../../interface/SInterface';
import __sugarConfig from '../../../config/sugar';
import __folderPath from '../../../fs/folderPath';
import __getFilename from '../../../fs/filename';
import __fs from 'fs';
import __get from '../../../object/get';
import __set from '../../../object/set';

/**
 * @name                SSugarAppInterface
 * @namespace           sugar.node.ui.sugar.interface
 * @type                Class
 * @extends             SInterface
 * @wip
 *
 * This class represent the interface that describe de arguments supported
 * when using the SSugarCli class
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SSugarAppInterface extends __SInterface {
  static definition = {};
}

const modules = __sugarConfig('sugar-app.modules');
Object.keys(modules).forEach((moduleId) => {
  const moduleObj = modules[moduleId];
  const interfacePath = moduleObj.interface;
  let ModuleInterface;
  if (interfacePath) {
    ModuleInterface = require(interfacePath);
  } else {
    const folderPath = __folderPath(
      moduleObj.processPath || moduleObj.modulePath
    );
    const filename = __getFilename(
      moduleObj.processPath || moduleObj.modulePath
    );
    const toTry = [
      `${folderPath}/interface/${filename.replace(
        /Process(\.js)?$/,
        'Interface.js'
      )}`,
      `${folderPath}/interface/${filename.replace(
        /Module(\.js)?$/,
        'Interface.js'
      )}`,
      `${folderPath}/${filename.replace(/Process(\.js)?$/, 'Interface.js')}`,
      `${folderPath}/${filename.replace(/Module(\.js)?$/, 'Interface.js')}`
    ].filter((path) => {
      if (!path.match(/\.js$/)) return false;
      if (!__fs.existsSync(path)) return false;
      return true;
    });
    if (!toTry.length) return;
    ModuleInterface = require(toTry[0]);
  }

  Object.keys(ModuleInterface.definition).forEach((argName) => {
    // params
    SSugarAppInterface.definition[
      `modules.${moduleId}.params.${argName}`
    ] = Object.assign({}, ModuleInterface.definition[argName]);
    if (
      SSugarAppInterface.definition[`modules.${moduleId}.params.${argName}`]
        .default === undefined
    ) {
      const defaultValue = __get(moduleObj, `params.${argName}`);
      if (defaultValue !== undefined) {
        SSugarAppInterface.definition[
          `modules.${moduleId}.params.${argName}`
        ].default = defaultValue;
      }
    }
    // presets
    SSugarAppInterface.definition[
      `modules.${moduleId}.presets.*.params.${argName}`
    ] = Object.assign({}, ModuleInterface.definition[argName]);
    delete SSugarAppInterface.definition[
      `modules.${moduleId}.presets.*.params.${argName}`
    ].required;
  });
});

export = SSugarAppInterface;
