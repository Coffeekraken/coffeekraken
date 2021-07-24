import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
export default class SMarkdownBuilderBuildParamsInterface extends __SInterface {
}
SMarkdownBuilderBuildParamsInterface.definition = {
    glob: {
        type: 'String',
        required: true,
        alias: 'g',
        default: __SSugarConfig.get('markdownBuilder.default.glob')
    },
    inDir: {
        type: 'String',
        required: true,
        alias: 'i',
        default: __SSugarConfig.get('markdownBuilder.default.inDir')
    },
    outDir: {
        type: 'String',
        alias: 'o',
        default: __SSugarConfig.get('markdownBuilder.default.outDir')
    },
    save: {
        type: 'Boolean',
        alias: 's',
        default: __SSugarConfig.get('markdownBuilder.default.save')
    },
    target: {
        type: 'String',
        values: ['html', 'markdown'],
        alias: 't',
        default: __SSugarConfig.get('markdownBuilder.default.target')
    },
    preset: {
        type: 'Array<String>',
        values: Object.keys(__SSugarConfig.get('markdownBuilder.presets')),
        alias: 'p'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU01hcmtkb3duQnVpbGRlckJ1aWxkUGFyYW1zSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU01hcmtkb3duQnVpbGRlckJ1aWxkUGFyYW1zSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBRTFELE1BQU0sQ0FBQyxPQUFPLE9BQU8sb0NBQXFDLFNBQVEsWUFBWTs7QUFDbkUsK0NBQVUsR0FBRztJQUNoQixJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO1FBQ2QsS0FBSyxFQUFFLEdBQUc7UUFDVixPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQztLQUM5RDtJQUNELEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxLQUFLLEVBQUUsR0FBRztRQUNWLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDO0tBQy9EO0lBQ0QsTUFBTSxFQUFFO1FBQ0osSUFBSSxFQUFFLFFBQVE7UUFDZCxLQUFLLEVBQUUsR0FBRztRQUNWLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDO0tBQ2hFO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLFNBQVM7UUFDZixLQUFLLEVBQUUsR0FBRztRQUNWLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDO0tBQzlEO0lBQ0QsTUFBTSxFQUFFO1FBQ0osSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUMsVUFBVSxDQUFDO1FBQzNCLEtBQUssRUFBRSxHQUFHO1FBQ1YsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLENBQUM7S0FDaEU7SUFDRCxNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsZUFBZTtRQUNyQixNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDbEUsS0FBSyxFQUFFLEdBQUc7S0FDYjtDQUNKLENBQUEifQ==