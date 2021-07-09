import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
export default class SPostcssBuilderBuildParamsInterface extends __SInterface {
}
SPostcssBuilderBuildParamsInterface.definition = {
    glob: {
        type: 'String',
        required: true,
        default: __SSugarConfig.get('imagesBuilder.glob'),
        alias: 'g'
    },
    inDir: {
        type: 'String',
        required: true,
        default: __SSugarConfig.get('imagesBuilder.inDir'),
        alias: 'i'
    },
    outDir: {
        type: 'String',
        required: true,
        default: __SSugarConfig.get('imagesBuilder.outDir'),
        alias: 'o'
    },
    quality: {
        type: 'Number',
        required: true,
        default: __SSugarConfig.get('imagesBuilder.quality'),
        alias: 'q'
    },
    webp: {
        type: 'Boolean',
        default: __SSugarConfig.get('imagesBuilder.webp')
    },
    width: {
        type: 'Number',
        default: __SSugarConfig.get('imagesBuilder.width'),
        alias: 'w'
    },
    height: {
        type: 'Number',
        default: __SSugarConfig.get('imagesBuilder.height'),
        alias: 'h'
    },
    resolution: {
        type: 'Array<Integer>',
        default: __SSugarConfig.get('imagesBuilder.resolution'),
        alias: 'r'
    },
    clear: {
        type: 'Boolean',
        default: __SSugarConfig.get('imagesBuilder.clear'),
        alias: 'c'
    },
    specificParams: {
        type: 'Object',
        default: __SSugarConfig.get('imagesBuilder.specificParams')
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ltYWdlc0J1aWxkZXJCdWlsZFBhcmFtc0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNJbWFnZXNCdWlsZGVyQnVpbGRQYXJhbXNJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFFMUQsTUFBTSxDQUFDLE9BQU8sT0FBTyxtQ0FBb0MsU0FBUSxZQUFZOztBQUNsRSw4Q0FBVSxHQUFHO0lBQ2hCLElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQztRQUNqRCxLQUFLLEVBQUUsR0FBRztLQUNiO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDO1FBQ2xELEtBQUssRUFBRSxHQUFHO0tBQ2I7SUFDRCxNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUM7UUFDbkQsS0FBSyxFQUFFLEdBQUc7S0FDYjtJQUNELE9BQU8sRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQztRQUNwRCxLQUFLLEVBQUUsR0FBRztLQUNiO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQztLQUNwRDtJQUNELEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUM7UUFDbEQsS0FBSyxFQUFFLEdBQUc7S0FDYjtJQUNELE1BQU0sRUFBRTtRQUNKLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUM7UUFDbkQsS0FBSyxFQUFFLEdBQUc7S0FDYjtJQUNELFVBQVUsRUFBRTtRQUNSLElBQUksRUFBRSxnQkFBZ0I7UUFDdEIsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUM7UUFDdkQsS0FBSyxFQUFFLEdBQUc7S0FDYjtJQUNELEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUM7UUFDbEQsS0FBSyxFQUFFLEdBQUc7S0FDYjtJQUNELGNBQWMsRUFBRTtRQUNaLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUM7S0FDOUQ7Q0FDSixDQUFBIn0=