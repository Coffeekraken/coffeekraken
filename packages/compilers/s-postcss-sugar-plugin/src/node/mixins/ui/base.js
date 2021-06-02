import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../utils/themeVar';
import __theme from '../../utils/theme';
class postcssSugarPluginUiBaseInterface extends __SInterface {
}
postcssSugarPluginUiBaseInterface.definition = {
    name: {
        type: 'String',
        required: true
    }
};
export { postcssSugarPluginUiBaseInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({}, params);
    if (!finalParams.name)
        return;
    const vars = [];
    // bare
    vars.push(`
      @sugar.scope.bare {
        display: inline-block;
        padding: ${__themeVar(`ui.${finalParams.name}.padding`)};
      }
    `);
    // lnf
    vars.push(`
      @sugar.scope.lnf {
        color: sugar.color(ui, text);
        background-color: sugar.color(ui, surface);
        padding: ${__themeVar(`ui.${finalParams.name}.padding`)};
        border: sugar.color(ui) solid 1px;
        border-radius: ${__themeVar(`ui.${finalParams.name}.borderRadius`)};
        transition: ${__themeVar(`ui.${finalParams.name}.transition`)};
        @sugar.depth(${__theme().config(`ui.${finalParams.name}.depth`)});

        &:hover {
          @sugar.depth(20);
          background-color: sugar.color(ui:hover, background);
          color: sugar.color(ui:hover, text);
        }
        &:focus {
          background-color: sugar.color(ui:focus, background);
          color: sugar.color(ui:focus, text);
        }

    }
  `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxVQUFVLE1BQU0sc0JBQXNCLENBQUM7QUFDOUMsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFFeEMsTUFBTSxpQ0FBa0MsU0FBUSxZQUFZOztBQUNuRCw0Q0FBVSxHQUFHO0lBQ2hCLElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDakI7Q0FDSixDQUFDO0FBT0osT0FBTyxFQUFFLGlDQUFpQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTFELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEVBS1o7SUFDQyxNQUFNLFdBQVcscUJBQ1osTUFBTSxDQUNWLENBQUM7SUFFRixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUk7UUFBRSxPQUFPO0lBRTlCLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixPQUFPO0lBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQzs7O21CQUdPLFVBQVUsQ0FBQyxNQUFNLFdBQVcsQ0FBQyxJQUFJLFVBQVUsQ0FBQzs7S0FFMUQsQ0FBQyxDQUFDO0lBRUwsTUFBTTtJQUNOLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7bUJBSU8sVUFBVSxDQUFDLE1BQU0sV0FBVyxDQUFDLElBQUksVUFBVSxDQUFDOzt5QkFFdEMsVUFBVSxDQUFDLE1BQU0sV0FBVyxDQUFDLElBQUksZUFBZSxDQUFDO3NCQUNwRCxVQUFVLENBQUMsTUFBTSxXQUFXLENBQUMsSUFBSSxhQUFhLENBQUM7dUJBQzlDLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLFdBQVcsQ0FBQyxJQUFJLFFBQVEsQ0FBQzs7Ozs7Ozs7Ozs7OztHQWFwRSxDQUFDLENBQUM7SUFFSCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIsQ0FBQyJ9