// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
export default class SSitemapBuilderBuildParamsInterface extends __SInterface {
    static get _definition() {
        return {
            source: {
                description: 'Specify the source(s) you want to build your sitemap. Can be all the configured sources specified under the "config.sitemap.sources" config',
                type: 'Array<String>',
                default: [],
            },
            sourcesSettings: {
                description: 'Specigy sources settings by passing an object under each source "id" property',
                type: 'Object',
                default: {},
            },
            output: {
                description: 'Specify where to save the sitemap in xml format',
                type: 'String',
                default: __SSugarConfig.get('sitemapBuilder.build.output'),
            },
            save: {
                description: 'Specify if you want to save the sitemap or not',
                type: 'Boolean',
                default: true,
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1NpdGVtYXBCdWlsZGVyQnVpbGRJUGFyYW1zSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1NpdGVtYXBCdWlsZGVyQnVpbGRJUGFyYW1zSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQXlCMUQsTUFBTSxDQUFDLE9BQU8sT0FBTyxtQ0FBb0MsU0FBUSxZQUFZO0lBQ3pFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUNQLDZJQUE2STtnQkFDakosSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLE9BQU8sRUFBRSxFQUFFO2FBQ2Q7WUFDRCxlQUFlLEVBQUU7Z0JBQ2IsV0FBVyxFQUNQLCtFQUErRTtnQkFDbkYsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLEVBQUU7YUFDZDtZQUNELE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQUUsaURBQWlEO2dCQUM5RCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQzthQUM3RDtZQUNELElBQUksRUFBRTtnQkFDRixXQUFXLEVBQUUsZ0RBQWdEO2dCQUM3RCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsSUFBSTthQUNoQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0oifQ==