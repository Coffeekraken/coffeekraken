import __SInterface from '../../../interface/SInterface';

/**
 * @name            SSugarAppModuleInterface
 * @namespace       sugar.node.app.sugar.interface
 * @type            Class
 * @extends         SInterface
 *
 * This interface represent the sugar app module instance requirements and defaults
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SSugarAppModuleSettingsInterface extends __SInterface {
  static definition = {
    mainProcessId: {
      type: 'String',
      required: true,
      default: 'main'
    },
    processIdUsedForState: {
      type: 'String',
      default: undefined
    }
  };
}

export default class SSugarAppModuleInterface extends __SInterface {
  static definition = {
    '_settings.sugarAppModule': {
      interface: SSugarAppModuleSettingsInterface,
      type: 'Object',
      required: true
    }
  };
}
