import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
export default class SPostcssBuilderBuildParamsInterface extends __SInterface {
    static get definition() {
        var _a;
        return ((_a = this.cached()) !== null && _a !== void 0 ? _a : this.cache({
            glob: {
                description: 'Specify a glob pattern relative to the "inDir" to target images you want to process',
                type: 'String',
                required: true,
                default: __SSugarConfig.get('imagesBuilder.glob'),
                alias: 'g',
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
        }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ltYWdlc0J1aWxkZXJCdWlsZFBhcmFtc0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNJbWFnZXNCdWlsZGVyQnVpbGRQYXJhbXNJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFFMUQsTUFBTSxDQUFDLE9BQU8sT0FBTyxtQ0FBb0MsU0FBUSxZQUFZO0lBQ3pFLE1BQU0sS0FBSyxVQUFVOztRQUNqQixPQUFPLENBQ0gsTUFBQSxJQUFJLENBQUMsTUFBTSxFQUFFLG1DQUNiLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDUCxJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUNQLHFGQUFxRjtnQkFDekYsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUM7Z0JBQ2pELEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUNQLGtFQUFrRTtnQkFDdEUsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUM7Z0JBQ2xELEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUNQLHlHQUF5RztnQkFDN0csSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUM7Z0JBQ25ELEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsV0FBVyxFQUNQLHdFQUF3RTtnQkFDNUUsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUM7Z0JBQ3BELEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUNQLHdFQUF3RTtnQkFDNUUsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUM7YUFDcEQ7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUNQLDhEQUE4RDtnQkFDbEUsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUM7Z0JBQ2xELEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUNQLCtEQUErRDtnQkFDbkUsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUM7Z0JBQ25ELEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsV0FBVyxFQUNQLHNLQUFzSztnQkFDMUssSUFBSSxFQUFFLGdCQUFnQjtnQkFDdEIsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUM7Z0JBQ3ZELEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUNQLDZFQUE2RTtnQkFDakYsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUM7Z0JBQ2xELEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxjQUFjLEVBQUU7Z0JBQ1osV0FBVyxFQUNQLHVNQUF1TTtnQkFDM00sSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUM7YUFDOUQ7U0FDSixDQUFDLENBQ0wsQ0FBQztJQUNOLENBQUM7Q0FDSiJ9