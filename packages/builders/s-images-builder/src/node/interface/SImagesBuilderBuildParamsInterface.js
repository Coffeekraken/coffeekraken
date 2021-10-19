import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
export default class SPostcssBuilderBuildParamsInterface extends __SInterface {
    static get definition() {
        var _a;
        return ((_a = this.cached()) !== null && _a !== void 0 ? _a : this.cache({
            glob: {
                type: 'String',
                required: true,
                default: __SSugarConfig.get('imagesBuilder.glob'),
                alias: 'g',
            },
            inDir: {
                type: 'String',
                required: true,
                default: __SSugarConfig.get('imagesBuilder.inDir'),
                alias: 'i',
            },
            outDir: {
                type: 'String',
                required: true,
                default: __SSugarConfig.get('imagesBuilder.outDir'),
                alias: 'o',
            },
            quality: {
                type: 'Number',
                required: true,
                default: __SSugarConfig.get('imagesBuilder.quality'),
                alias: 'q',
            },
            webp: {
                type: 'Boolean',
                default: __SSugarConfig.get('imagesBuilder.webp'),
            },
            width: {
                type: 'Number',
                default: __SSugarConfig.get('imagesBuilder.width'),
                alias: 'w',
            },
            height: {
                type: 'Number',
                default: __SSugarConfig.get('imagesBuilder.height'),
                alias: 'h',
            },
            resolution: {
                type: 'Array<Integer>',
                default: __SSugarConfig.get('imagesBuilder.resolution'),
                alias: 'r',
            },
            clear: {
                type: 'Boolean',
                default: __SSugarConfig.get('imagesBuilder.clear'),
                alias: 'c',
            },
            specificParams: {
                type: 'Object',
                default: __SSugarConfig.get('imagesBuilder.specificParams'),
            },
        }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ltYWdlc0J1aWxkZXJCdWlsZFBhcmFtc0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNJbWFnZXNCdWlsZGVyQnVpbGRQYXJhbXNJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFFMUQsTUFBTSxDQUFDLE9BQU8sT0FBTyxtQ0FBb0MsU0FBUSxZQUFZO0lBQ3pFLE1BQU0sS0FBSyxVQUFVOztRQUNqQixPQUFPLENBQ0gsTUFBQSxJQUFJLENBQUMsTUFBTSxFQUFFLG1DQUNiLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDUCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUM7Z0JBQ2pELEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUM7Z0JBQ2xELEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUM7Z0JBQ25ELEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUM7Z0JBQ3BELEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUM7YUFDcEQ7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUM7Z0JBQ2xELEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUM7Z0JBQ25ELEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLGdCQUFnQjtnQkFDdEIsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUM7Z0JBQ3ZELEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUM7Z0JBQ2xELEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxjQUFjLEVBQUU7Z0JBQ1osSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUM7YUFDOUQ7U0FDSixDQUFDLENBQ0wsQ0FBQztJQUNOLENBQUM7Q0FDSiJ9