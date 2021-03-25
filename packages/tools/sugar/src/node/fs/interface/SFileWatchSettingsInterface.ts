import __SInterface from '@coffeekraken/s-interface';

/**
 * @name          SFileWatchSettingsInterface
 * @type          Class
 * @extends       SInterface
 * @status              beta
 *
 * Watch settings interface
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SFileWatchSettingsInterface extends __SInterface {
  static definition = {
    pollingInterval: {
      type: 'Number',
      required: true,
      default: 500
    }
  };
}
export default SFileWatchSettingsInterface;
