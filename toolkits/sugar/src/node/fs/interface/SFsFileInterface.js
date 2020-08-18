const __SInterface = require('../../class/SInterface');

/**
 * @name                SFsFileInterface
 * @namespace           node.fs.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed for a "file" descriptor element
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SFsFileInterface extends __SInterface {
  static definitionObj = {
    filename: {
      type: 'String',
      description: 'Store the file name',
      required: true
    },
    filepath: {
      type: 'String',
      description: 'Store the full file path to the file on the system',
      required: true
    },
    path: {
      type: 'String',
      description: 'Store the file path of the folder where lives the file',
      required: true
    },
    extension: {
      type: 'String',
      description: 'Store the file extension like "json", "js", "css", etc...',
      required: true
    },
    size: {
      type: 'Number',
      description:
        'Store the file size in megabytes. If the file does not exist this value will be "0"',
      required: true
    },
    sizeInBytes: {
      type: 'Number',
      description: 'Same as the "size" property but in bytes',
      requried: true
    },
    exists: {
      type: 'Boolean',
      description: 'true if the file exists on the filesystem, false if not',
      required: true
    }
  };
};
