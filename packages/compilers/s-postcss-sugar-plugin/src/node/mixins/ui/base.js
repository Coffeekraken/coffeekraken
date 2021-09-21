import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
class postcssSugarPluginUiBaseInterface extends __SInterface {
}
postcssSugarPluginUiBaseInterface.definition = {
    name: {
        type: 'String',
        required: true,
    },
    scope: {
        type: 'String',
        default: ['bare', 'lnf'],
    },
};
export { postcssSugarPluginUiBaseInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ name: '', scope: ['bare', 'lnf'] }, params);
    if (!finalParams.name)
        return;
    const vars = [];
    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
            display: inline-block;
            padding-inline: sugar.padding(sugar.theme(ui.${finalParams.name}.paddingInline));
            padding-block: sugar.padding(sugar.theme(ui.${finalParams.name}.paddingBlock));
        `);
    }
    // lnf
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
            color: sugar.color(main, surfaceForeground);
            background-color: sugar.color(main, ui);
            font-size: sugar.scalable(1rem);
            border: sugar.color(ui, --alpha 0.1) solid sugar.theme(ui.${finalParams.name}.borderWidth);
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
            border: sugar.color(ui, --alpha 0.3) solid 1px;
            }
            @sugar.state.focus {
            background-color: sugar.color(main, ui);
            border: sugar.color(ui, --alpha 0.6) solid 1px;
            }
            @sugar.state.active {
            background-color: sugar.color(main, ui);
            border: sugar.color(ui, --alpha 0.6) solid 1px;
            }
            @sugar.state.disabled {
                @sugar.disabled;

                label & + * {
                    @sugar.disabled;
                }

            }
    `);
    }
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFFeEMsTUFBTSxpQ0FBa0MsU0FBUSxZQUFZOztBQUNqRCw0Q0FBVSxHQUFHO0lBQ2hCLElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7S0FDM0I7Q0FDSixDQUFDO0FBUU4sT0FBTyxFQUFFLGlDQUFpQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTFELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsSUFBSSxFQUFFLEVBQUUsRUFDUixLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLElBQ25CLE1BQU0sQ0FDWixDQUFDO0lBRUYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJO1FBQUUsT0FBTztJQUU5QixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsT0FBTztJQUNQLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7MkRBRXlDLFdBQVcsQ0FBQyxJQUFJOzBEQUNqQixXQUFXLENBQUMsSUFBSTtTQUNqRSxDQUFDLENBQUM7S0FDTjtJQUVELE1BQU07SUFDTixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7d0VBSXNELFdBQVcsQ0FBQyxJQUFJOzRDQUM1QyxXQUFXLENBQUMsSUFBSTt5Q0FDbkIsV0FBVyxDQUFDLElBQUk7MkJBQzlCLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLFdBQVcsQ0FBQyxJQUFJLFFBQVEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FnQ3RFLENBQUMsQ0FBQztLQUNGO0lBRUQsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLENBQUMifQ==