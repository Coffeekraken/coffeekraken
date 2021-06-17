import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginBorderRadiusMixinInterface extends __SInterface {
}
postcssSugarPluginBorderRadiusMixinInterface.definition = {
    radius: {
        type: 'Number|String',
        required: true,
        alias: 'r'
    }
};
export { postcssSugarPluginBorderRadiusMixinInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({ radius: 0 }, params);
    const vars = [`border-radius: sugar.border.radius(${finalParams.radius});`];
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaXVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmFkaXVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBSXJELE1BQU0sNENBQTZDLFNBQVEsWUFBWTs7QUFDOUQsdURBQVUsR0FBRztJQUNsQixNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsZUFBZTtRQUNyQixRQUFRLEVBQUUsSUFBSTtRQUNkLEtBQUssRUFBRSxHQUFHO0tBQ1g7Q0FDRixDQUFDO0FBT0osT0FBTyxFQUFFLDRDQUE0QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRXJFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEVBS1o7SUFDQyxNQUFNLFdBQVcsbUJBQ2YsTUFBTSxFQUFFLENBQUMsSUFDTixNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLENBQUMsc0NBQXNDLFdBQVcsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO0lBQ3RGLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQixDQUFDIn0=