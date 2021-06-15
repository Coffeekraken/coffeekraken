import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginGradientLinearInterface extends __SInterface {
}
postcssSugarPluginGradientLinearInterface.definition = {
    start: {
        type: 'String',
        required: true,
        alias: 's'
    },
    end: {
        type: 'String',
        required: true,
        alias: 'e'
    },
    x: {
        type: 'String'
    },
    y: {
        type: 'String'
    },
    angle: {
        type: 'Number | String',
        default: 0
    }
};
export { postcssSugarPluginGradientLinearInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({ start: '', end: '', x: '50%', y: '50%', angle: 0 }, params);
    const vars = [`
    @sugar.gradient($type: linear, $start: ${finalParams.start}, $end: ${finalParams.end}, $x: ${finalParams.x}, $y: ${finalParams.y}, $angle: ${finalParams.angle});
  `];
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZWFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGluZWFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBR3JELE1BQU0seUNBQTBDLFNBQVEsWUFBWTs7QUFDM0Qsb0RBQVUsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO1FBQ2QsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELEdBQUcsRUFBRTtRQUNILElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxLQUFLLEVBQUUsR0FBRztLQUNYO0lBQ0QsQ0FBQyxFQUFFO1FBQ0QsSUFBSSxFQUFFLFFBQVE7S0FDZjtJQUNELENBQUMsRUFBRTtRQUNELElBQUksRUFBRSxRQUFRO0tBQ2Y7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsaUJBQWlCO1FBQ3ZCLE9BQU8sRUFBRSxDQUFDO0tBQ1g7Q0FDRixDQUFDO0FBV0osT0FBTyxFQUFFLHlDQUF5QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRWxFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEVBS1o7SUFDQyxNQUFNLFdBQVcsbUJBQ2YsS0FBSyxFQUFFLEVBQUUsRUFDVCxHQUFHLEVBQUUsRUFBRSxFQUNQLENBQUMsRUFBRSxLQUFLLEVBQ1IsQ0FBQyxFQUFFLEtBQUssRUFDUixLQUFLLEVBQUUsQ0FBQyxJQUNMLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsQ0FBQzs2Q0FDbUIsV0FBVyxDQUFDLEtBQUssV0FBVyxXQUFXLENBQUMsR0FBRyxTQUFTLFdBQVcsQ0FBQyxDQUFDLFNBQVMsV0FBVyxDQUFDLENBQUMsYUFBYSxXQUFXLENBQUMsS0FBSztHQUMvSixDQUFDLENBQUM7SUFFSCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIsQ0FBQyJ9