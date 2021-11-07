// @ts-nocheck
import _SInterface from '../../../node/class/SInterface';
export default class SNpmBinInterface extends _SInterface {
    static get definition() {
        var _a;
        return ((_a = this.cached()) !== null && _a !== void 0 ? _a : this.cache({
            action: {
                type: 'String',
                required: true,
                alias: 'a',
                values: ['install', 'i', 'uninstall', 'u', 'un'],
                description: 'Specify which action you want to execute in the "bin" module',
            },
            global: {
                type: 'Boolean',
                required: true,
                alias: 'g',
                description: 'Specify if you want to symlink the passed bin in the global scope or in local one',
                default: false,
            },
            package: {
                type: 'String',
                alias: 'p',
                description: "Specify the package you want to install the bin from. If not specified, will take the current package where you're in using ```process.cwd``` function",
                default: null,
            },
            bin: {
                type: 'String',
                alias: 'b',
                description: 'Specify the bin you want to symlink',
                default: null,
            },
        }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU05wbUJpbkNsaUludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNOcG1CaW5DbGlJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sV0FBVyxNQUFNLGdDQUFnQyxDQUFDO0FBRXpELE1BQU0sQ0FBQyxPQUFPLE9BQU8sZ0JBQWlCLFNBQVEsV0FBVztJQUNyRCxNQUFNLEtBQUssVUFBVTs7UUFDakIsT0FBTyxDQUNILE1BQUEsSUFBSSxDQUFDLE1BQU0sRUFBRSxtQ0FDYixJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ1AsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLEtBQUssRUFBRSxHQUFHO2dCQUNWLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUM7Z0JBQ2hELFdBQVcsRUFDUCw4REFBOEQ7YUFDckU7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsV0FBVyxFQUNQLG1GQUFtRjtnQkFDdkYsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsV0FBVyxFQUNQLHdKQUF3SjtnQkFDNUosT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCxHQUFHLEVBQUU7Z0JBQ0QsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsV0FBVyxFQUFFLHFDQUFxQztnQkFDbEQsT0FBTyxFQUFFLElBQUk7YUFDaEI7U0FDSixDQUFDLENBQ0wsQ0FBQztJQUNOLENBQUM7Q0FDSiJ9