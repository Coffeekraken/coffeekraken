// @ts-nocheck

import __SInterface from '../../../shared/class/SInterface';

/**
 * @name                SFileInterface
 * @namespace           sugar.node.fs.interface
 * @type                Class
 * @extends             SInterface
 * @status              wip
 *
 * This class represent the interface that describe the minimum requirement
 * needed for a "file" descriptor element
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export class SFileSettingsInterface extends __SInterface {
  static definition = {};
}

export default class SFileInterface extends __SInterface {
  static definition = {
    name: {
      type: 'String',
      description: 'Store the file name',
      required: true
    },
    path: {
      type: 'String',
      description: 'Store the full file path to the file on the system',
      required: true
    },
    cwd: {
      type: 'String',
      description:
        'Store the path to the root directory where lives the file. This has to be specified in the settings.rootDir property through the constructor'
    },
    relPath: {
      type: 'String',
      description:
        'Store the path to the file relative to the ```rootDir``` property if this one has been setted'
    },
    dirPath: {
      type: 'String',
      description: 'Store the file path of the folder where lives the file',
      required: true
    },
    extension: {
      type: 'String',
      description: 'Store the file extension like "json", "js", "css", etc...',
      required: true
    },
    exists: {
      type: 'Boolean',
      description: 'true if the file exists on the filesystem, false if not',
      required: true
    }
  };
}
