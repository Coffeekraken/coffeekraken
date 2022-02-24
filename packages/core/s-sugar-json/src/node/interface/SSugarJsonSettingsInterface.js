import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SSugarJsonSettingsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe SSugarJson settings
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SSugarJsonSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            packages: {
                description: 'Specify an array of packages names in which to search for sugar.json file',
                type: 'Array<String>',
            },
            includePackage: {
                description: 'Specify if the current package has to be included in the search',
                type: 'Boolean',
                default: true,
            },
            includeModules: {
                description: 'Specify if the current package "node_modules" folder has to be included in the search',
                type: 'Boolean',
                default: true,
            },
            includeGlobal: {
                description: 'Specify if the global "node_modules" folder has to be included in the search',
                type: 'Boolean',
                default: true,
            },
            includeTop: {
                description: 'Specify if the root package folder in case of a mono-repo has to be included in the search',
                type: 'Boolean',
                default: true,
            }
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FySnNvblNldHRpbmdzSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1N1Z2FySnNvblNldHRpbmdzSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sMkJBQTRCLFNBQVEsWUFBWTtJQUNqRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0osUUFBUSxFQUFFO2dCQUNOLFdBQVcsRUFBRSwyRUFBMkU7Z0JBQ3hGLElBQUksRUFBRSxlQUFlO2FBQ3hCO1lBQ0QsY0FBYyxFQUFFO2dCQUNaLFdBQVcsRUFBRSxpRUFBaUU7Z0JBQzlFLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1lBQ0QsY0FBYyxFQUFFO2dCQUNaLFdBQVcsRUFBRSx1RkFBdUY7Z0JBQ3BHLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1lBQ0QsYUFBYSxFQUFFO2dCQUNYLFdBQVcsRUFBRSw4RUFBOEU7Z0JBQzNGLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLFdBQVcsRUFBRSw0RkFBNEY7Z0JBQ3pHLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1NBQ0gsQ0FBQztJQUNOLENBQUM7Q0FDSiJ9