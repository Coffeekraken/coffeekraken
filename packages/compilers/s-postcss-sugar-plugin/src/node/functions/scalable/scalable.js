import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginScalableFunctionInterface extends __SInterface {
}
postcssSugarPluginScalableFunctionInterface.definition = {
    value: {
        type: 'String|Number',
        required: true,
    },
};
export { postcssSugarPluginScalableFunctionInterface as interface };
export default function ({ params }) {
    const finalParams = Object.assign({ value: '' }, params);
    return `calc(${finalParams.value} * var(--s-scale, 1))`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NhbGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzY2FsYWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUlyRCxNQUFNLDJDQUE0QyxTQUFRLFlBQVk7O0FBQzNELHNEQUFVLEdBQUc7SUFDaEIsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFLGVBQWU7UUFDckIsUUFBUSxFQUFFLElBQUk7S0FDakI7Q0FDSixDQUFDO0FBRU4sT0FBTyxFQUFFLDJDQUEyQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBTXBFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFBRSxNQUFNLEVBQWtFO0lBQy9GLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsRUFBRSxJQUNOLE1BQU0sQ0FDWixDQUFDO0lBRUYsT0FBTyxRQUFRLFdBQVcsQ0FBQyxLQUFLLHVCQUF1QixDQUFDO0FBQzVELENBQUMifQ==