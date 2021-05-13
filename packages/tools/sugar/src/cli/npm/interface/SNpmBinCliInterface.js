// @ts-nocheck
import _SInterface from '../../../node/class/SInterface';
export default class SNpmBinInterface extends _SInterface {
}
SNpmBinInterface.definition = {
    action: {
        type: 'String',
        required: true,
        alias: 'a',
        values: ['install', 'i', 'uninstall', 'u', 'un'],
        description: 'Specify which action you want to execute in the "bin" module'
    },
    global: {
        type: 'Boolean',
        required: true,
        alias: 'g',
        description: 'Specify if you want to symlink the passed bin in the global scope or in local one',
        default: false
    },
    package: {
        type: 'String',
        alias: 'p',
        description: "Specify the package you want to install the bin from. If not specified, will take the current package where you're in using ```process.cwd``` function",
        default: null
    },
    bin: {
        type: 'String',
        alias: 'b',
        description: 'Specify the bin you want to symlink',
        default: null
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU05wbUJpbkNsaUludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNOcG1CaW5DbGlJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sV0FBVyxNQUFNLGdDQUFnQyxDQUFDO0FBRXpELE1BQU0sQ0FBQyxPQUFPLE9BQU8sZ0JBQWlCLFNBQVEsV0FBVzs7QUFDaEQsMkJBQVUsR0FBRztJQUNsQixNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO1FBQ2QsS0FBSyxFQUFFLEdBQUc7UUFDVixNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDO1FBQ2hELFdBQVcsRUFDVCw4REFBOEQ7S0FDakU7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsU0FBUztRQUNmLFFBQVEsRUFBRSxJQUFJO1FBQ2QsS0FBSyxFQUFFLEdBQUc7UUFDVixXQUFXLEVBQ1QsbUZBQW1GO1FBQ3JGLE9BQU8sRUFBRSxLQUFLO0tBQ2Y7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsUUFBUTtRQUNkLEtBQUssRUFBRSxHQUFHO1FBQ1YsV0FBVyxFQUNULHdKQUF3SjtRQUMxSixPQUFPLEVBQUUsSUFBSTtLQUNkO0lBQ0QsR0FBRyxFQUFFO1FBQ0gsSUFBSSxFQUFFLFFBQVE7UUFDZCxLQUFLLEVBQUUsR0FBRztRQUNWLFdBQVcsRUFBRSxxQ0FBcUM7UUFDbEQsT0FBTyxFQUFFLElBQUk7S0FDZDtDQUNGLENBQUMifQ==