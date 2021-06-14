import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../utils/themeVar';
import __theme from '../../utils/theme';
class postcssSugarPluginUiBaseInterface extends __SInterface {
}
postcssSugarPluginUiBaseInterface.definition = {
    name: {
        type: 'String',
        required: true
    },
    color: {
        type: 'String',
        default: 'ui'
    }
};
export { postcssSugarPluginUiBaseInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    var _a, _b;
    const finalParams = Object.assign({ name: '', color: 'ui' }, params);
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
        color: sugar.color(ui, foreground);
        background-color: sugar.color(ui, surface);
        padding: ${__themeVar(`ui.${finalParams.name}.padding`)};
        border: sugar.color(ui, border) solid 1px;
        border-radius: ${__themeVar(`ui.${finalParams.name}.borderRadius`)};
        transition: ${__themeVar(`ui.${finalParams.name}.transition`)};
        @sugar.depth(${__theme().config(`ui.${finalParams.name}.depth`)});

        &:hover {
          @sugar.depth(20);
          background-color: sugar.color(ui:hover, surface);
          color: sugar.color(ui:hover, foreground);
          border: sugar.color(ui:hover, border) solid 2px;
        }
        @sugar.state.focus {
          background-color: sugar.color(ui:focus, surface);
          color: sugar.color(ui:focus, foreground);
          border: sugar.color(${(_a = finalParams.color) !== null && _a !== void 0 ? _a : 'ui'}:focus, border) solid 2px;
        }
        @sugar.state.active {
          background-color: sugar.color(ui:active, surface);
          color: sugar.color(ui:active, foreground);
          border: sugar.color(${(_b = finalParams.color) !== null && _b !== void 0 ? _b : 'ui'}:active, border) solid 2px;
        }
    }
  `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxVQUFVLE1BQU0sc0JBQXNCLENBQUM7QUFDOUMsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFFeEMsTUFBTSxpQ0FBa0MsU0FBUSxZQUFZOztBQUNuRCw0Q0FBVSxHQUFHO0lBQ2hCLElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxJQUFJO0tBQ2Q7Q0FDSixDQUFDO0FBUUosT0FBTyxFQUFFLGlDQUFpQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTFELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEVBS1o7O0lBQ0MsTUFBTSxXQUFXLG1CQUNmLElBQUksRUFBRSxFQUFFLEVBQ1IsS0FBSyxFQUFFLElBQUksSUFDUixNQUFNLENBQ1YsQ0FBQztJQUVGLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSTtRQUFFLE9BQU87SUFFOUIsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE9BQU87SUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7bUJBR08sVUFBVSxDQUFDLE1BQU0sV0FBVyxDQUFDLElBQUksVUFBVSxDQUFDOztLQUUxRCxDQUFDLENBQUM7SUFFTCxNQUFNO0lBQ04sSUFBSSxDQUFDLElBQUksQ0FBQzs7OzttQkFJTyxVQUFVLENBQUMsTUFBTSxXQUFXLENBQUMsSUFBSSxVQUFVLENBQUM7O3lCQUV0QyxVQUFVLENBQUMsTUFBTSxXQUFXLENBQUMsSUFBSSxlQUFlLENBQUM7c0JBQ3BELFVBQVUsQ0FBQyxNQUFNLFdBQVcsQ0FBQyxJQUFJLGFBQWEsQ0FBQzt1QkFDOUMsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sV0FBVyxDQUFDLElBQUksUUFBUSxDQUFDOzs7Ozs7Ozs7OztnQ0FXdkMsTUFBQSxXQUFXLENBQUMsS0FBSyxtQ0FBSSxJQUFJOzs7OztnQ0FLekIsTUFBQSxXQUFXLENBQUMsS0FBSyxtQ0FBSSxJQUFJOzs7R0FHdEQsQ0FBQyxDQUFDO0lBRUgsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BCLENBQUMifQ==