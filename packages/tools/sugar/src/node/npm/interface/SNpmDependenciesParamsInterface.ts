import _SInterface from '../../interface/SInterface';

/**
 * @name            SNpmDependenciesParamsInterface
 * @namespace       sugar.node.npm.interface
 * @type            Class
 * @extends         SInterface
 * @status          beta
 *
 * Interface that represent the SNpmDependenciesProcess parameters
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export default class SNpmDependenciesParamsInterface extends _SInterface {
  static definition = {
    clean: {
      type: 'Boolean',
      alias: 'r',
      description:
        'Specify if you want the found unused dependencies to be reflected back into the package.json file',
      default: false
    },
    skipDev: {
      type: 'Boolean',
      description: 'Specify if you want to skip the "devDependencies" check',
      default: false
    },
    skipMissing: {
      type: 'Boolean',
      description: 'Specify if you want to skip the missing packages check',
      default: false
    }
  };
}
