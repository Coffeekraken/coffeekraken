// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
export default class SSitemapBuildParamsInterface extends __SInterface {
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
                default: __SSugarConfig.get('sitemap.build.output'),
            },
            save: {
                description: 'Specify if you want to save the sitemap or not',
                type: 'Boolean',
                default: true,
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1NpdGVtYXBCdWlsZElQYXJhbXNJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTU2l0ZW1hcEJ1aWxkSVBhcmFtc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUF5QjFELE1BQU0sQ0FBQyxPQUFPLE9BQU8sNEJBQTZCLFNBQVEsWUFBWTtJQUNsRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFDUCw2SUFBNkk7Z0JBQ2pKLElBQUksRUFBRSxlQUFlO2dCQUNyQixPQUFPLEVBQUUsRUFBRTthQUNkO1lBQ0QsZUFBZSxFQUFFO2dCQUNiLFdBQVcsRUFDUCwrRUFBK0U7Z0JBQ25GLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxFQUFFO2FBQ2Q7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUFFLGlEQUFpRDtnQkFDOUQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUM7YUFDdEQ7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUFFLGdEQUFnRDtnQkFDN0QsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7YUFDaEI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=