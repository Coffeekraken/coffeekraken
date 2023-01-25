"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_env_1 = __importDefault(require("@coffeekraken/s-env"));
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
        var _a;
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
            version: {
                description: 'Specify the version you want for your build. Can be "modules","esnext","es2015","es2016" or "es2020"',
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
            buildInitial: {
                description: 'Specify if you want to build first and watch the changes after of to only build when changes are detected',
                type: 'Boolean',
                default: false,
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
            target: {
                description: 'Specify the target of the build. Can be "development" or "production"',
                values: ['development', 'production'],
                alias: 't',
                default: (_a = s_env_1.default.get('target')) !== null && _a !== void 0 ? _a : 'development',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0VBQXlDO0FBQ3pDLDRFQUFxRDtBQUNyRCxrRkFBMEQ7QUFFMUQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBQ0gsTUFBTSx5QkFBMEIsU0FBUSxxQkFBWTtJQUNoRCxNQUFNLEtBQUssV0FBVzs7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQ1AsbURBQW1EO2dCQUN2RCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxJQUFJLEVBQUU7b0JBQ0YsTUFBTSxFQUFFLElBQUk7b0JBQ1osUUFBUSxFQUFFLElBQUk7aUJBQ2pCO2dCQUNELE9BQU8sRUFBRSxHQUFHLHdCQUFjLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLFdBQVc7Z0JBQzlELFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLFdBQVcsRUFDUCwyRUFBMkU7Z0JBQy9FLElBQUksRUFBRSxlQUFlO2dCQUNyQixNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQztnQkFDbkMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQUNuQixLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFDUCw4RUFBOEU7Z0JBQ2xGLElBQUksRUFBRSxlQUFlO2dCQUNyQixNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUM7Z0JBQ3BDLE9BQU8sRUFBRSxFQUFFO2dCQUNYLEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsV0FBVyxFQUNQLHNHQUFzRztnQkFDMUcsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQztnQkFDM0QsT0FBTyxFQUFFLFNBQVM7YUFDckI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUNQLGdGQUFnRjtnQkFDcEYsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELFlBQVksRUFBRTtnQkFDVixXQUFXLEVBQ1AsMkdBQTJHO2dCQUMvRyxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELEdBQUcsRUFBRTtnQkFDRCxXQUFXLEVBQ1AsbUZBQW1GO2dCQUN2RixJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSztnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFDUCx5RkFBeUY7Z0JBQzdGLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2dCQUNkLEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsV0FBVyxFQUNQLDBFQUEwRTtnQkFDOUUsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUNQLHVFQUF1RTtnQkFDM0UsTUFBTSxFQUFFLENBQUMsYUFBYSxFQUFFLFlBQVksQ0FBQztnQkFDckMsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsT0FBTyxFQUFFLE1BQUEsZUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsbUNBQUksYUFBYTthQUNqRDtZQUNELE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQ1AsNkVBQTZFO2dCQUNqRixJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSztnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFBRSxpREFBaUQ7Z0JBQzlELElBQUksRUFBRSxnQkFBZ0I7Z0JBQ3RCLE9BQU8sRUFBRSxLQUFLO2dCQUNkLEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsV0FBVyxFQUNQLHdHQUF3RztnQkFDNUcsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7YUFDYjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFFRCxrQkFBZSx5QkFBeUIsQ0FBQyJ9