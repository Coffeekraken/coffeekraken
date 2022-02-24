import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SViteBuildParamsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe parameters of the SFrontstackViteProcess
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SViteBuildParamsInterface extends __SInterface {
    static get _definition() {
        return {
            input: {
                description: 'Specify the input js/ts file to use for the build',
                type: 'String',
                path: {
                    exists: true,
                    absolute: true,
                },
                default: `${__SSugarConfig.get('storage.src.jsDir')}/index.ts`,
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
export default SViteBuildParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1ZpdGVCdWlsZFBhcmFtc0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNWaXRlQnVpbGRQYXJhbXNJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBQ0gsTUFBTSx5QkFBMEIsU0FBUSxZQUFZO0lBQ2hELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUNQLG1EQUFtRDtnQkFDdkQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsSUFBSSxFQUFFO29CQUNGLE1BQU0sRUFBRSxJQUFJO29CQUNaLFFBQVEsRUFBRSxJQUFJO2lCQUNqQjtnQkFDRCxPQUFPLEVBQUUsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLFdBQVc7Z0JBQzlELFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLFdBQVcsRUFDUCwyRUFBMkU7Z0JBQy9FLElBQUksRUFBRSxlQUFlO2dCQUNyQixNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQztnQkFDbkMsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQztnQkFDN0IsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQ1AsOEVBQThFO2dCQUNsRixJQUFJLEVBQUUsZUFBZTtnQkFDckIsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDO2dCQUNwQyxPQUFPLEVBQUUsRUFBRTtnQkFDWCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFDUCxxR0FBcUc7Z0JBQ3pHLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUM7Z0JBQzNELE9BQU8sRUFBRSxTQUFTO2FBQ3JCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFDUCxnRkFBZ0Y7Z0JBQ3BGLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2dCQUNkLEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxHQUFHLEVBQUU7Z0JBQ0QsV0FBVyxFQUNQLG1GQUFtRjtnQkFDdkYsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQ1AseUZBQXlGO2dCQUM3RixJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSztnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLFdBQVcsRUFDUCwwRUFBMEU7Z0JBQzlFLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLFdBQVcsRUFDUCx5SEFBeUg7Z0JBQzdILElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2dCQUNkLEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUNQLDZFQUE2RTtnQkFDakYsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQUUsaURBQWlEO2dCQUM5RCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSztnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLFdBQVcsRUFDUCx3R0FBd0c7Z0JBQzVHLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2dCQUNkLEtBQUssRUFBRSxHQUFHO2FBQ2I7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBRUQsZUFBZSx5QkFBeUIsQ0FBQyJ9