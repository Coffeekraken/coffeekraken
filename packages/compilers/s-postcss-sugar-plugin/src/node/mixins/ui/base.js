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
    const finalParams = Object.assign({ name: '' }, params);
    if (!finalParams.name)
        return;
    const vars = [];
    // bare
    vars.push(`
        display: inline-block;
        padding: ${__themeVar(`ui.${finalParams.name}.padding`)};
    `);
    // lnf
    vars.push(`
        color: sugar.color(ui, surfaceForeground);
        background-color: sugar.color(ui, surface);
        padding: ${__themeVar(`ui.${finalParams.name}.padding`)};
        border: sugar.color(ui, border) solid 1px;
        border-radius: ${__themeVar(`ui.${finalParams.name}.borderRadius`)};
        transition: ${__themeVar(`ui.${finalParams.name}.transition`)};
        @sugar.depth(${__theme().config(`ui.${finalParams.name}.depth`)});

        &::placeholder {
          color: sugar.color(ui, placeholder);
        }

        @sugar.state.hover {
          background-color: sugar.color(ui:hover, surface);
          border: sugar.color(ui:hover, border) solid 1px;
        }
        @sugar.state.focus {
          background-color: sugar.color(ui:focus, surface);
          border: sugar.color(ui:focus, border) solid 1px;
        }
        @sugar.state.active {
          background-color: sugar.color(ui:active, surface);
          border: sugar.color(ui:active, border) solid 1px;
        }
  `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxVQUFVLE1BQU0sc0JBQXNCLENBQUM7QUFDOUMsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFFeEMsTUFBTSxpQ0FBa0MsU0FBUSxZQUFZOztBQUNuRCw0Q0FBVSxHQUFHO0lBQ2hCLElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDakI7Q0FDSixDQUFDO0FBT0osT0FBTyxFQUFFLGlDQUFpQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTFELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEVBS1o7SUFDQyxNQUFNLFdBQVcsbUJBQ2YsSUFBSSxFQUFFLEVBQUUsSUFDTCxNQUFNLENBQ1YsQ0FBQztJQUVGLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSTtRQUFFLE9BQU87SUFFOUIsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE9BQU87SUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDOzttQkFFTyxVQUFVLENBQUMsTUFBTSxXQUFXLENBQUMsSUFBSSxVQUFVLENBQUM7S0FDMUQsQ0FBQyxDQUFDO0lBRUwsTUFBTTtJQUNOLElBQUksQ0FBQyxJQUFJLENBQUM7OzttQkFHTyxVQUFVLENBQUMsTUFBTSxXQUFXLENBQUMsSUFBSSxVQUFVLENBQUM7O3lCQUV0QyxVQUFVLENBQUMsTUFBTSxXQUFXLENBQUMsSUFBSSxlQUFlLENBQUM7c0JBQ3BELFVBQVUsQ0FBQyxNQUFNLFdBQVcsQ0FBQyxJQUFJLGFBQWEsQ0FBQzt1QkFDOUMsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sV0FBVyxDQUFDLElBQUksUUFBUSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQnBFLENBQUMsQ0FBQztJQUVILFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQixDQUFDIn0=