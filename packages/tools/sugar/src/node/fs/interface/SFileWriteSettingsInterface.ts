import __SInterface from '@coffeekraken/s-interface';

/**
 * @name          SFileWriteSettingsInterface
 * @type          Class
 * @extends       SInterface
 * @status              beta
 *
 * Watch settings interface
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SFileWriteSettingsInterface extends __SInterface {
  static definition = {
    encoding: {
      type: 'String',
      values: [
        'utf8',
        'ascii',
        'utf-8',
        'utf16le',
        'ucs2',
        'ucs-2',
        'base64',
        'latin1',
        'binary',
        'hex'
      ],
      required: true,
      default: 'utf8'
    },
    flag: {
      type: 'String',
      required: false
    },
    mode: {
      type: 'Number',
      required: true,
      default: 0o666
    },
    cast: {
      type: 'Boolean',
      required: true,
      default: true
    },
    path: {
      type: 'String',
      required: true
    }
  };
}
