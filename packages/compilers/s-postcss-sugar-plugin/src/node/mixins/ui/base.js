import __SInterface from '@coffeekraken/s-interface';
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
        padding-inline: sugar.padding(sugar.theme(ui.${finalParams.name}.paddingInline));
        padding-block: sugar.padding(sugar.theme(ui.${finalParams.name}.paddingBlock));
    `);
    // lnf
    vars.push(`
        color: sugar.color(main, surfaceForeground);
        background-color: sugar.color(main, ui);
        font-size: sugar.scalable(1rem);
        border: sugar.color(ui, border) solid sugar.theme(ui.${finalParams.name}.borderWidth);
        border-radius: sugar.theme(ui.${finalParams.name}.borderRadius);
        transition: sugar.theme(ui.${finalParams.name}.transition);
        @sugar.depth(${__theme().config(`ui.${finalParams.name}.depth`)});
        cursor: auto !important;

        &::placeholder {
          color: sugar.color(main, placeholder);
        }

        &::selection {
            color: sugar.color(ui, 100);
            background-color: sugar.color(ui);
        }

        @sugar.state.hover {
          background-color: sugar.color(main, ui);
          border: sugar.color(ui, border) solid 1px;
          color: sugar.color(ui, foreground);
        }
        @sugar.state.focus {
          background-color: sugar.color(main, ui);
          border: sugar.color(ui, border) solid 1px;
          color: sugar.color(ui, foreground);
        }
        @sugar.state.active {
          background-color: sugar.color(main, ui);
          border: sugar.color(ui, border) solid 1px;
          color: sugar.color(ui, foreground);
        }
        @sugar.state.disabled {
            @sugar.disabled;

            label & + * {
                @sugar.disabled;
            }

        }
  `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFFeEMsTUFBTSxpQ0FBa0MsU0FBUSxZQUFZOztBQUNqRCw0Q0FBVSxHQUFHO0lBQ2hCLElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDakI7Q0FDSixDQUFDO0FBT04sT0FBTyxFQUFFLGlDQUFpQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTFELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsSUFBSSxFQUFFLEVBQUUsSUFDTCxNQUFNLENBQ1osQ0FBQztJQUVGLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSTtRQUFFLE9BQU87SUFFOUIsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE9BQU87SUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDOzt1REFFeUMsV0FBVyxDQUFDLElBQUk7c0RBQ2pCLFdBQVcsQ0FBQyxJQUFJO0tBQ2pFLENBQUMsQ0FBQztJQUVILE1BQU07SUFDTixJQUFJLENBQUMsSUFBSSxDQUFDOzs7OytEQUlpRCxXQUFXLENBQUMsSUFBSTt3Q0FDdkMsV0FBVyxDQUFDLElBQUk7cUNBQ25CLFdBQVcsQ0FBQyxJQUFJO3VCQUM5QixPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxXQUFXLENBQUMsSUFBSSxRQUFRLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUNwRSxDQUFDLENBQUM7SUFFRCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsQ0FBQyJ9