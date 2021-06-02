import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginUiNavbarInterface extends __SInterface {
}
postcssSugarPluginUiNavbarInterface.definition = {};
export { postcssSugarPluginUiNavbarInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    // bare
    vars.push(`
      @sugar.scope.bare {
        display: flex;
        align-items: center;

        & > * {
            flex-grow: 0;
        }
      }
    `);
    // lnf
    vars.push(`
      @sugar.scope.lnf {

    }
  `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2YmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmF2YmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBS3JELE1BQU0sbUNBQW9DLFNBQVEsWUFBWTs7QUFDckQsOENBQVUsR0FBRyxFQUFFLENBQUM7QUFLekIsT0FBTyxFQUFFLG1DQUFtQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTVELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEVBS1o7SUFDQyxNQUFNLFdBQVcscUJBQ1osTUFBTSxDQUNWLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsT0FBTztJQUNQLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7OztLQVNQLENBQUMsQ0FBQztJQUVMLE1BQU07SUFDTixJQUFJLENBQUMsSUFBSSxDQUFDOzs7O0dBSVQsQ0FBQyxDQUFDO0lBRUgsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BCLENBQUMifQ==