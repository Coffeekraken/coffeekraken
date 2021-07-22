import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
export default class SMarkdownBuilderBuildParamsInterface extends __SInterface {
}
SMarkdownBuilderBuildParamsInterface.definition = {
    input: {
        type: 'String',
        required: true,
        alias: 'i',
        default: __SSugarConfig.get('markdownBuilder.input')
    },
    output: {
        type: 'String',
        alias: 'o',
        default: __SSugarConfig.get('markdownBuilder.output')
    },
    target: {
        type: 'String',
        values: ['html', 'markdown'],
        alias: 't',
        default: 'markdown'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU01hcmtkb3duQnVpbGRlckJ1aWxkUGFyYW1zSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU01hcmtkb3duQnVpbGRlckJ1aWxkUGFyYW1zSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBRTFELE1BQU0sQ0FBQyxPQUFPLE9BQU8sb0NBQXFDLFNBQVEsWUFBWTs7QUFDbkUsK0NBQVUsR0FBRztJQUNoQixLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO1FBQ2QsS0FBSyxFQUFFLEdBQUc7UUFDVixPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQztLQUN2RDtJQUNELE1BQU0sRUFBRTtRQUNKLElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLEdBQUc7UUFDVixPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQztLQUN4RDtJQUNELE1BQU0sRUFBRTtRQUNKLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFDLFVBQVUsQ0FBQztRQUMzQixLQUFLLEVBQUUsR0FBRztRQUNWLE9BQU8sRUFBRSxVQUFVO0tBQ3RCO0NBQ0osQ0FBQSJ9