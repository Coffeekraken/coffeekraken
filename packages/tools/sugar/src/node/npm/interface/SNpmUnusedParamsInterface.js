import _SInterface from '@coffeekraken/s-interface';
/**
 * @name            SNpmUnusedParamsInterface
 * @namespace            node.npm.interface
 * @type            Class
 * @extends         SInterface
 * @status          beta
 *
 * Interface that represent the SNpmDependenciesProcess parameters
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SNpmUnusedParamsInteUnuseds extends _SInterface {
}
SNpmUnusedParamsInteUnuseds.definition = {
    clean: {
        type: 'Boolean',
        alias: 'r',
        description: 'Specify if you want the found unused dependencies to be reflected back into the package.json file',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU05wbVVudXNlZFBhcmFtc0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNOcG1VbnVzZWRQYXJhbXNJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxXQUFXLE1BQU0sMkJBQTJCLENBQUM7QUFFcEQ7Ozs7Ozs7Ozs7O0dBV0c7QUFFSCxNQUFNLENBQUMsT0FBTyxPQUFPLDJCQUE0QixTQUFRLFdBQVc7O0FBQzNELHNDQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFNBQVM7UUFDZixLQUFLLEVBQUUsR0FBRztRQUNWLFdBQVcsRUFDVCxtR0FBbUc7UUFDckcsT0FBTyxFQUFFLEtBQUs7S0FDZjtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxTQUFTO1FBQ2YsV0FBVyxFQUFFLHlEQUF5RDtRQUN0RSxPQUFPLEVBQUUsS0FBSztLQUNmO0lBQ0QsV0FBVyxFQUFFO1FBQ1gsSUFBSSxFQUFFLFNBQVM7UUFDZixXQUFXLEVBQUUsd0RBQXdEO1FBQ3JFLE9BQU8sRUFBRSxLQUFLO0tBQ2Y7Q0FDRixDQUFDIn0=