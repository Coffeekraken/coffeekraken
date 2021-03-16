// @ts-nocheck

import __SInterface from '../../../../shared/interface/SInterface';
import __sugarConfig from '../../../config/sugar';
import __folderPath from '../../../fs/folderPath';
import __getFilename from '../../../fs/filename';
import __fs from 'fs';
import __get from '../../../../shared/object/get';
import __set from '../../../../shared/object/set';

/**
 * @name                SSugarAppInterface
 * @namespace           sugar.node.ui.sugar.interface
 * @type                Class
 * @extends             SInterface
 * @status              wip
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
  static definition = {
    modules: {
      type: 'Object',
      required: true,
      default: __sugarConfig('sugar-app.modules')
    }
  };
}

export default SSugarAppInterface;
