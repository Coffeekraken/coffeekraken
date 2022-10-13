"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
/**
 * @name                SViteBuildParamsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe parameters of the SKitchenViteProcess
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SViteBuildParamsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            input: {
                description: 'Specify the input js/ts file to use for the build',
                type: 'String',
                path: {
                    exists: true,
                    absolute: true,
                },
                default: `${s_sugar_config_1.default.get('storage.src.jsDir')}/index.ts`,
                required: true,
            },
            type: {
                description: 'Specify the type(s) of build you want. Can be "lib", "bundle" or "module"',
                type: 'Array<String>',
                values: ['lib', 'bundle', 'module'],
                default: ['module'],
                alias: 't',
            },
            format: {
                description: 'Specify the format(s) of the output build. Can be "es","umd","cjs" or "iife"',
                type: 'Array<String>',
                values: ['es', 'umd', 'cjs', 'iife'],
                default: [],
                alias: 'f',
            },
            target: {
                description: 'Specify the target you want for your build. Can be "modules","esnext","es2015","es2016" or "es2020"',
                type: 'String',
                values: ['modules', 'esnext', 'es2015', 'es2016', 'es2020'],
                default: undefined,
            },
            watch: {
                description: 'Specify if you want the process to watch for updates and rebuild automatically',
                type: 'Boolean',
                default: false,
                alias: 'w',
            },
            lib: {
                description: 'Specify if your build type is "lib". Same as setting the "type" argument to "lib"',
                type: 'Boolean',
                default: false,
                alias: 'l',
            },
            bundle: {
                description: 'Specify if your build type is "bundle". Same as setting the "type" argument to "bundle"',
                type: 'Boolean',
                default: false,
                alias: 'b',
            },
            noWrite: {
                description: 'Specify if you want to ust build but not write file(s) to the filesystem',
                type: 'Boolean',
                default: false,
            },
            prod: {
                description: 'Specify if your build is made for production environment or not. This will automatically minify and optimize your build',
                type: 'Boolean',
                default: false,
                alias: 'p',
            },
            chunks: {
                description: 'Specify if you allow your build to be separated into multiple chunks or not',
                type: 'Boolean',
                default: false,
                alias: 'c',
            },
            minify: {
                description: 'Specify if you want to minify your build or not',
                type: 'Boolean|String',
                default: false,
                alias: 'm',
            },
            analyze: {
                description: 'Specify if you want an analyze report of your build. This use the rollup analyze plugin under the hood',
                type: 'Boolean',
                default: false,
                alias: 'a',
            },
        };
    }
}
exports.default = SViteBuildParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELGtGQUEwRDtBQUUxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSCxNQUFNLHlCQUEwQixTQUFRLHFCQUFZO0lBQ2hELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUNQLG1EQUFtRDtnQkFDdkQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsSUFBSSxFQUFFO29CQUNGLE1BQU0sRUFBRSxJQUFJO29CQUNaLFFBQVEsRUFBRSxJQUFJO2lCQUNqQjtnQkFDRCxPQUFPLEVBQUUsR0FBRyx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXO2dCQUM5RCxRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELElBQUksRUFBRTtnQkFDRixXQUFXLEVBQ1AsMkVBQTJFO2dCQUMvRSxJQUFJLEVBQUUsZUFBZTtnQkFDckIsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUM7Z0JBQ25DLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFDbkIsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQ1AsOEVBQThFO2dCQUNsRixJQUFJLEVBQUUsZUFBZTtnQkFDckIsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDO2dCQUNwQyxPQUFPLEVBQUUsRUFBRTtnQkFDWCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFDUCxxR0FBcUc7Z0JBQ3pHLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUM7Z0JBQzNELE9BQU8sRUFBRSxTQUFTO2FBQ3JCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFDUCxnRkFBZ0Y7Z0JBQ3BGLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2dCQUNkLEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxHQUFHLEVBQUU7Z0JBQ0QsV0FBVyxFQUNQLG1GQUFtRjtnQkFDdkYsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQ1AseUZBQXlGO2dCQUM3RixJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSztnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLFdBQVcsRUFDUCwwRUFBMEU7Z0JBQzlFLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLFdBQVcsRUFDUCx5SEFBeUg7Z0JBQzdILElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2dCQUNkLEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUNQLDZFQUE2RTtnQkFDakYsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQUUsaURBQWlEO2dCQUM5RCxJQUFJLEVBQUUsZ0JBQWdCO2dCQUN0QixPQUFPLEVBQUUsS0FBSztnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLFdBQVcsRUFDUCx3R0FBd0c7Z0JBQzVHLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2dCQUNkLEtBQUssRUFBRSxHQUFHO2FBQ2I7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBRUQsa0JBQWUseUJBQXlCLENBQUMifQ==