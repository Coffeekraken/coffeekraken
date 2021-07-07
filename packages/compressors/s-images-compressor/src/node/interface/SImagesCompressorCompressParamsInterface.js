import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
export default class SPostcssBuilderBuildParamsInterface extends __SInterface {
}
SPostcssBuilderBuildParamsInterface.definition = {
    input: {
        type: 'Array<String>',
        required: true,
        default: __SSugarConfig.get('imagesCompressor.input'),
        alias: 'i'
    },
    outDir: {
        type: 'String',
        required: true,
        default: __SSugarConfig.get('imagesCompressor.outDir'),
        alias: 'o'
    },
    quality: {
        type: 'Number',
        required: true,
        default: __SSugarConfig.get('imagesCompressor.quality'),
        alias: 'q'
    },
    width: {
        type: 'Number',
        alias: 'w'
    },
    height: {
        type: 'Number',
        alias: 'h'
    },
    resolution: {
        type: 'Array<Integer>',
        default: [1],
        alias: 'r'
    },
    clear: {
        type: 'Boolean',
        default: false,
        alias: 'c'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ltYWdlc0NvbXByZXNzb3JDb21wcmVzc1BhcmFtc0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNJbWFnZXNDb21wcmVzc29yQ29tcHJlc3NQYXJhbXNJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFFMUQsTUFBTSxDQUFDLE9BQU8sT0FBTyxtQ0FBb0MsU0FBUSxZQUFZOztBQUNsRSw4Q0FBVSxHQUFHO0lBQ2hCLEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxlQUFlO1FBQ3JCLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUM7UUFDckQsS0FBSyxFQUFFLEdBQUc7S0FDYjtJQUNELE1BQU0sRUFBRTtRQUNKLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQztRQUN0RCxLQUFLLEVBQUUsR0FBRztLQUNiO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDO1FBQ3ZELEtBQUssRUFBRSxHQUFHO0tBQ2I7SUFDRCxLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsUUFBUTtRQUNkLEtBQUssRUFBRSxHQUFHO0tBQ2I7SUFDRCxNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtRQUNkLEtBQUssRUFBRSxHQUFHO0tBQ2I7SUFDRCxVQUFVLEVBQUU7UUFDUixJQUFJLEVBQUUsZ0JBQWdCO1FBQ3RCLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNaLEtBQUssRUFBRSxHQUFHO0tBQ2I7SUFDRCxLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxLQUFLO1FBQ2QsS0FBSyxFQUFFLEdBQUc7S0FDYjtDQUNKLENBQUEifQ==