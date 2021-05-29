import __SugarConfig from '@coffeekraken/s-sugar-config';
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
        default: __SugarConfig.get('module.resolve.dirs')
    },
    extensions: {
        type: 'Array<String>',
        default: __SugarConfig.get('module.resolve.extensions')
    },
    fields: {
        type: 'Array<String>',
        default: __SugarConfig.get('module.resolve.fields')
    },
    buildInModules: {
        type: 'Boolean',
        default: __SugarConfig.get('module.resolve.builtInModules')
    },
    preferExports: {
        type: 'Boolean',
        default: __SugarConfig.get('module.resolve.preferExports')
    },
    method: {
        type: 'String',
        values: ['import', 'require'],
        default: __SugarConfig.get('module.resolve.method')
    },
    target: {
        type: 'String',
        values: ['node', 'default'],
        default: __SugarConfig.get('module.resolve.target')
    },
    rootDir: {
        type: 'String',
        default: __packageRoot()
    }
};
export default ResolveSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVzb2x2ZVNldHRpbmdzSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiUmVzb2x2ZVNldHRpbmdzSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBQ3pELE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sYUFBYSxNQUFNLHdCQUF3QixDQUFDO0FBRW5EOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLHdCQUF5QixTQUFRLFlBQVk7O0FBQzFDLG1DQUFVLEdBQUc7SUFDbEIsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLGVBQWU7UUFDckIsT0FBTyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUM7S0FDbEQ7SUFDRCxVQUFVLEVBQUU7UUFDVixJQUFJLEVBQUUsZUFBZTtRQUNyQixPQUFPLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQztLQUN4RDtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxlQUFlO1FBQ3JCLE9BQU8sRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDO0tBQ3BEO0lBQ0QsY0FBYyxFQUFFO1FBQ2QsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQztLQUM1RDtJQUNELGFBQWEsRUFBRTtRQUNiLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUM7S0FDM0Q7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUM7UUFDN0IsT0FBTyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUM7S0FDcEQ7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUM7UUFDM0IsT0FBTyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUM7S0FDcEQ7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxhQUFhLEVBQUU7S0FDekI7Q0FDRixDQUFDO0FBRUosZUFBZSx3QkFBd0IsQ0FBQyJ9