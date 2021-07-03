import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
export default class SPostcssBuilderBuildParamsInterface extends __SInterface {
}
SPostcssBuilderBuildParamsInterface.definition = {
    input: {
        type: 'String',
        required: true,
        alias: 'i',
        default: __SSugarConfig.get('postcss.input')
    },
    output: {
        type: 'String',
        alias: 'o'
    },
    purge: {
        type: 'Boolean',
        alias: 'p'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Bvc3Rjc3NCdWlsZGVyQnVpbGRQYXJhbXNJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUG9zdGNzc0J1aWxkZXJCdWlsZFBhcmFtc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUUxRCxNQUFNLENBQUMsT0FBTyxPQUFPLG1DQUFvQyxTQUFRLFlBQVk7O0FBQ2xFLDhDQUFVLEdBQUc7SUFDaEIsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtRQUNkLEtBQUssRUFBRSxHQUFHO1FBQ1YsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDO0tBQy9DO0lBQ0QsTUFBTSxFQUFFO1FBQ0osSUFBSSxFQUFFLFFBQVE7UUFDZCxLQUFLLEVBQUUsR0FBRztLQUNiO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFLFNBQVM7UUFDZixLQUFLLEVBQUUsR0FBRztLQUNiO0NBQ0osQ0FBQSJ9