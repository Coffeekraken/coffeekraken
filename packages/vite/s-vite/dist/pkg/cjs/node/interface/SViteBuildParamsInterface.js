"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const s_env_1 = __importDefault(require("@coffeekraken/s-env"));
/**
 * @name                SViteBuildParamsInterface
 * @namespace           node.interface
 * @type.                      Class
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
                default: ['bundle', 'module'],
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
                default: s_env_1.default.is('production'),
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
                type: 'Boolean',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELGtGQUEwRDtBQUMxRCxnRUFBeUM7QUFFekM7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBQ0gsTUFBTSx5QkFBMEIsU0FBUSxxQkFBWTtJQUNoRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFDUCxtREFBbUQ7Z0JBQ3ZELElBQUksRUFBRSxRQUFRO2dCQUNkLElBQUksRUFBRTtvQkFDRixNQUFNLEVBQUUsSUFBSTtvQkFDWixRQUFRLEVBQUUsSUFBSTtpQkFDakI7Z0JBQ0QsT0FBTyxFQUFFLEdBQUcsd0JBQWMsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsV0FBVztnQkFDOUQsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUNQLDJFQUEyRTtnQkFDL0UsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDO2dCQUNuQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDO2dCQUM3QixLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFDUCw4RUFBOEU7Z0JBQ2xGLElBQUksRUFBRSxlQUFlO2dCQUNyQixNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUM7Z0JBQ3BDLE9BQU8sRUFBRSxFQUFFO2dCQUNYLEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUNQLHFHQUFxRztnQkFDekcsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQztnQkFDM0QsT0FBTyxFQUFFLFNBQVM7YUFDckI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUNQLGdGQUFnRjtnQkFDcEYsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELEdBQUcsRUFBRTtnQkFDRCxXQUFXLEVBQ1AsbUZBQW1GO2dCQUN2RixJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSztnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFDUCx5RkFBeUY7Z0JBQzdGLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2dCQUNkLEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsV0FBVyxFQUNQLDBFQUEwRTtnQkFDOUUsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUNQLHlIQUF5SDtnQkFDN0gsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLGVBQU0sQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDO2dCQUNoQyxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFDUCw2RUFBNkU7Z0JBQ2pGLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2dCQUNkLEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUFFLGlEQUFpRDtnQkFDOUQsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELE9BQU8sRUFBRTtnQkFDTCxXQUFXLEVBQ1Asd0dBQXdHO2dCQUM1RyxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSztnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNiO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUVELGtCQUFlLHlCQUF5QixDQUFDIn0=