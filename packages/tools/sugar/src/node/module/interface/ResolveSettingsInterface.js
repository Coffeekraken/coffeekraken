import __SugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';
import __packageRootDir from '../../path/packageRootDir';
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
        default: __packageRootDir()
    }
};
export default ResolveSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVzb2x2ZVNldHRpbmdzSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiUmVzb2x2ZVNldHRpbmdzSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBQ3pELE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sZ0JBQWdCLE1BQU0sMkJBQTJCLENBQUM7QUFFekQ7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sd0JBQXlCLFNBQVEsWUFBWTs7QUFDMUMsbUNBQVUsR0FBRztJQUNsQixJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsZUFBZTtRQUNyQixPQUFPLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQztLQUNsRDtJQUNELFVBQVUsRUFBRTtRQUNWLElBQUksRUFBRSxlQUFlO1FBQ3JCLE9BQU8sRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDO0tBQ3hEO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLGVBQWU7UUFDckIsT0FBTyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUM7S0FDcEQ7SUFDRCxjQUFjLEVBQUU7UUFDZCxJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDO0tBQzVEO0lBQ0QsYUFBYSxFQUFFO1FBQ2IsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQztLQUMzRDtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQztRQUM3QixPQUFPLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQztLQUNwRDtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQztRQUMzQixPQUFPLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQztLQUNwRDtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLGdCQUFnQixFQUFFO0tBQzVCO0NBQ0YsQ0FBQztBQUVKLGVBQWUsd0JBQXdCLENBQUMifQ==