import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../utils/themeVar';
import __theme from '../../utils/theme';
class postcssSugarPluginUiBaseInterface extends __SInterface {
}
postcssSugarPluginUiBaseInterface.definition = {
    name: {
        type: 'String',
        required: true,
    },
};
export { postcssSugarPluginUiBaseInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
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
        color: sugar.color(main, surfaceForeground);
        background-color: sugar.color(main, ui);
        padding: ${__themeVar(`ui.${finalParams.name}.padding`)};
        border: sugar.color(ui, border) solid sugar.theme(ui.${finalParams.name}.borderWidth);
        border-radius: ${__themeVar(`ui.${finalParams.name}.borderRadius`)};
        transition: ${__themeVar(`ui.${finalParams.name}.transition`)};
        @sugar.depth(${__theme().config(`ui.${finalParams.name}.depth`)});

        &::placeholder {
          color: sugar.color(main, placeholder);
        }

        @sugar.state.hover {
          background-color: sugar.color(main:hover, ui);
          border: sugar.color(ui:hover, border) solid 1px;
          color: sugar.color(ui:hover, foreground);
          
        }
        @sugar.state.focus {
          background-color: sugar.color(main:focus, ui);
          border: sugar.color(ui:focus, border) solid 1px;
          color: sugar.color(ui:focus, foreground);
        }
        @sugar.state.active {
          background-color: sugar.color(main:active, ui);
          border: sugar.color(ui:active, border) solid 1px;
          color: sugar.color(ui:active, foreground);
        }
  `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxVQUFVLE1BQU0sc0JBQXNCLENBQUM7QUFDOUMsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFFeEMsTUFBTSxpQ0FBa0MsU0FBUSxZQUFZOztBQUNqRCw0Q0FBVSxHQUFHO0lBQ2hCLElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDakI7Q0FDSixDQUFDO0FBT04sT0FBTyxFQUFFLGlDQUFpQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTFELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsSUFBSSxFQUFFLEVBQUUsSUFDTCxNQUFNLENBQ1osQ0FBQztJQUVGLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSTtRQUFFLE9BQU87SUFFOUIsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE9BQU87SUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDOzttQkFFSyxVQUFVLENBQUMsTUFBTSxXQUFXLENBQUMsSUFBSSxVQUFVLENBQUM7S0FDMUQsQ0FBQyxDQUFDO0lBRUgsTUFBTTtJQUNOLElBQUksQ0FBQyxJQUFJLENBQUM7OzttQkFHSyxVQUFVLENBQUMsTUFBTSxXQUFXLENBQUMsSUFBSSxVQUFVLENBQUM7K0RBQ0EsV0FBVyxDQUFDLElBQUk7eUJBQ3RELFVBQVUsQ0FBQyxNQUFNLFdBQVcsQ0FBQyxJQUFJLGVBQWUsQ0FBQztzQkFDcEQsVUFBVSxDQUFDLE1BQU0sV0FBVyxDQUFDLElBQUksYUFBYSxDQUFDO3VCQUM5QyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxXQUFXLENBQUMsSUFBSSxRQUFRLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQnBFLENBQUMsQ0FBQztJQUVELFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixDQUFDIn0=