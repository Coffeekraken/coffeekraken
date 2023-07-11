// @ts-nocheck
import _SInterface from '../../../node/class/SInterface.js';
export default class SNpmBinInterface extends _SInterface {
    static get _definition() {
        return {
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
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFdBQVcsTUFBTSxtQ0FBbUMsQ0FBQztBQUU1RCxNQUFNLENBQUMsT0FBTyxPQUFPLGdCQUFpQixTQUFRLFdBQVc7SUFDckQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxLQUFLLEVBQUUsR0FBRztnQkFDVixNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDO2dCQUNoRCxXQUFXLEVBQ1AsOERBQThEO2FBQ3JFO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxTQUFTO2dCQUNmLFFBQVEsRUFBRSxJQUFJO2dCQUNkLEtBQUssRUFBRSxHQUFHO2dCQUNWLFdBQVcsRUFDUCxtRkFBbUY7Z0JBQ3ZGLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxHQUFHO2dCQUNWLFdBQVcsRUFDUCx3SkFBd0o7Z0JBQzVKLE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1lBQ0QsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxHQUFHO2dCQUNWLFdBQVcsRUFBRSxxQ0FBcUM7Z0JBQ2xELE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSiJ9