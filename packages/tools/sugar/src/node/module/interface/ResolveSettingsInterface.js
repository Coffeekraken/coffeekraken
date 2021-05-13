import __sugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';
import __packageRoot from '../../path/packageRoot';
/**
 * @name            ResolveSettingsInterface
 * @namespace            node.module.interface
 * @type            Class
 * @extends         SInterface
 *
 * This represent the resolve settings interface
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class ResolveSettingsInterface extends __SInterface {
}
ResolveSettingsInterface.definition = {
    dirs: {
        type: 'Array<String>',
        default: __sugarConfig('module.resolve.dirs')
    },
    extensions: {
        type: 'Array<String>',
        default: __sugarConfig('module.resolve.extensions')
    },
    fields: {
        type: 'Array<String>',
        default: __sugarConfig('module.resolve.fields')
    },
    buildInModules: {
        type: 'Boolean',
        default: __sugarConfig('module.resolve.builtInModules')
    },
    preferExports: {
        type: 'Boolean',
        default: __sugarConfig('module.resolve.preferExports')
    },
    method: {
        type: 'String',
        values: ['import', 'require'],
        default: __sugarConfig('module.resolve.method')
    },
    target: {
        type: 'String',
        values: ['node', 'default'],
        default: __sugarConfig('module.resolve.target')
    },
    rootDir: {
        type: 'String',
        default: __packageRoot()
    }
};
export default ResolveSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVzb2x2ZVNldHRpbmdzSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiUmVzb2x2ZVNldHRpbmdzSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBQ3pELE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sYUFBYSxNQUFNLHdCQUF3QixDQUFDO0FBRW5EOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLHdCQUF5QixTQUFRLFlBQVk7O0FBQzFDLG1DQUFVLEdBQUc7SUFDbEIsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLGVBQWU7UUFDckIsT0FBTyxFQUFFLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQztLQUM5QztJQUNELFVBQVUsRUFBRTtRQUNWLElBQUksRUFBRSxlQUFlO1FBQ3JCLE9BQU8sRUFBRSxhQUFhLENBQUMsMkJBQTJCLENBQUM7S0FDcEQ7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsZUFBZTtRQUNyQixPQUFPLEVBQUUsYUFBYSxDQUFDLHVCQUF1QixDQUFDO0tBQ2hEO0lBQ0QsY0FBYyxFQUFFO1FBQ2QsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsYUFBYSxDQUFDLCtCQUErQixDQUFDO0tBQ3hEO0lBQ0QsYUFBYSxFQUFFO1FBQ2IsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsYUFBYSxDQUFDLDhCQUE4QixDQUFDO0tBQ3ZEO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDO1FBQzdCLE9BQU8sRUFBRSxhQUFhLENBQUMsdUJBQXVCLENBQUM7S0FDaEQ7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUM7UUFDM0IsT0FBTyxFQUFFLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQztLQUNoRDtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLGFBQWEsRUFBRTtLQUN6QjtDQUNGLENBQUM7QUFFSixlQUFlLHdCQUF3QixDQUFDIn0=