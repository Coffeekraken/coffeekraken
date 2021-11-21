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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1NpdGVtYXBCdWlsZEludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTaXRlbWFwQnVpbGRJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBc0IxRCxNQUFNLENBQUMsT0FBTyxPQUFPLDRCQUE2QixTQUFRLFlBQVk7SUFDbEUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQ1AsNklBQTZJO2dCQUNqSixJQUFJLEVBQUUsZUFBZTtnQkFDckIsT0FBTyxFQUFFLEVBQUU7YUFDZDtZQUNELGVBQWUsRUFBRTtnQkFDYixXQUFXLEVBQ1AsK0VBQStFO2dCQUNuRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsRUFBRTthQUNkO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFBRSxpREFBaUQ7Z0JBQzlELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDO2FBQ3REO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLFdBQVcsRUFBRSxnREFBZ0Q7Z0JBQzdELElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSiJ9