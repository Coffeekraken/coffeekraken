import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginUtilPilledInterface extends __SInterface {
}
postcssSugarPluginUtilPilledInterface.definition = {};
export { postcssSugarPluginUtilPilledInterface as interface };
export default function ({ params, atRule, processNested }) {
    const finalParams = Object.assign({}, params);
    const vars = ['border-radius: 999999px !important;'];
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlsbGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGlsbGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0scUNBQXNDLFNBQVEsWUFBWTs7QUFDdkQsZ0RBQVUsR0FBRyxFQUFFLENBQUM7QUFLekIsT0FBTyxFQUFFLHFDQUFxQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTlELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixhQUFhLEVBS2Q7SUFDQyxNQUFNLFdBQVcscUJBQ1osTUFBTSxDQUNWLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxDQUFDLHFDQUFxQyxDQUFDLENBQUM7SUFFL0QsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMzQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLENBQUMifQ==