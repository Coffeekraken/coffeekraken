import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
export default class SPostcssBuilderBuildParamsInterface extends __SInterface {
    static get _definition() {
        return {
            glob: {
                description: 'Specify a glob pattern relative to the "inDir" to target images you want to process',
                type: 'String',
                required: true,
                default: __SSugarConfig.get('imagesBuilder.glob'),
                alias: 'g',
            },
            compressExts: {
                description: 'Specify the file extensions you want to compress',
                type: 'String[]',
                required: true,
                default: __SSugarConfig.get('imagesBuilder.compressExts')
            },
            inDir: {
                description: 'Specify the absolute path to the folder where your images stands',
                type: 'String',
                required: true,
                default: __SSugarConfig.get('imagesBuilder.inDir'),
                alias: 'i',
            },
            outDir: {
                description: 'Specify the absolute path to the folder you want to save your images. "inDir" folder structure is kept.',
                type: 'String',
                required: true,
                default: __SSugarConfig.get('imagesBuilder.outDir'),
                alias: 'o',
            },
            quality: {
                description: 'Specify the quality percentage you want to target without the "%" sign',
                type: 'Number',
                required: true,
                default: __SSugarConfig.get('imagesBuilder.quality'),
                alias: 'q',
            },
            webp: {
                description: 'Specify if you want to generate ".webp" versions of your images or not',
                type: 'Boolean',
                default: __SSugarConfig.get('imagesBuilder.webp'),
            },
            width: {
                description: 'Specify the maximum width you want to target for your images',
                type: 'Number',
                default: __SSugarConfig.get('imagesBuilder.width'),
                alias: 'w',
            },
            height: {
                description: 'Specify the maximum height you want to target for your images',
                type: 'Number',
                default: __SSugarConfig.get('imagesBuilder.height'),
                alias: 'h',
            },
            resolution: {
                description: 'Specify some resolutions you want to generate. The targeted "width" and "height" is considered as the resolution 1 and all others resolutions are declined from this',
                type: 'Array<Integer>',
                default: __SSugarConfig.get('imagesBuilder.resolution'),
                alias: 'r',
            },
            clear: {
                description: 'Specify if you want to clear the "outDir" before generate new images or not',
                type: 'Boolean',
                default: __SSugarConfig.get('imagesBuilder.clear'),
                alias: 'c',
            },
            specificParams: {
                description: 'Allows you to specify some custom params depending on folder globs like "myCoolFolder/*.jpg" used as object property. Override every settings you want in this new object for the specified folder(s)',
                type: 'Object',
                default: __SSugarConfig.get('imagesBuilder.specificParams'),
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ltYWdlc0J1aWxkZXJCdWlsZFBhcmFtc0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNJbWFnZXNCdWlsZGVyQnVpbGRQYXJhbXNJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFFMUQsTUFBTSxDQUFDLE9BQU8sT0FBTyxtQ0FBb0MsU0FBUSxZQUFZO0lBQ3pFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUNQLHFGQUFxRjtnQkFDekYsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUM7Z0JBQ2pELEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsV0FBVyxFQUNQLGtEQUFrRDtnQkFDdEQsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDO2FBQzVEO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFDUCxrRUFBa0U7Z0JBQ3RFLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDO2dCQUNsRCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFDUCx5R0FBeUc7Z0JBQzdHLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDO2dCQUNuRCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLFdBQVcsRUFDUCx3RUFBd0U7Z0JBQzVFLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDO2dCQUNwRCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLFdBQVcsRUFDUCx3RUFBd0U7Z0JBQzVFLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDO2FBQ3BEO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFDUCw4REFBOEQ7Z0JBQ2xFLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDO2dCQUNsRCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFDUCwrREFBK0Q7Z0JBQ25FLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDO2dCQUNuRCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLFdBQVcsRUFDUCxzS0FBc0s7Z0JBQzFLLElBQUksRUFBRSxnQkFBZ0I7Z0JBQ3RCLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDO2dCQUN2RCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFDUCw2RUFBNkU7Z0JBQ2pGLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDO2dCQUNsRCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsY0FBYyxFQUFFO2dCQUNaLFdBQVcsRUFDUCx1TUFBdU07Z0JBQzNNLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDO2FBQzlEO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSiJ9