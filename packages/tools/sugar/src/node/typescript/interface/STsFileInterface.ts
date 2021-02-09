import __SInterface from '../../interface/SInterface';

/**
 * @name          STsFileInterface
 * @namespace       sugar.node.typescript.interface
 * @type            Class
 * @extends         SInterface
 * @status              beta
 *
 * The interface describing the tsFile instance
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class STsFileInterface extends __SInterface {
  static definition: {
    '_settings.tsFile': {
      interface: STsFileSettingsInterface;
      type: 'Object';
      required: true;
    };
  };
}

/**
 * @name          STsFileSettingsInterface
 * @type            Class
 * @extends         SInterface
 * @status              beta
 *
 * The interface describing the tsFile settings
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export class STsFileSettingsInterface extends __SInterface {
  static definition: {};
}
