import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
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
            font-size: sugar.scalable(1rem);
            display: inline-block;
            padding-inline: sugar.theme(ui.${finalParams.name}.paddingInline);
            padding-block: sugar.theme(ui.${finalParams.name}.paddingBlock);
        `);
    }
    // lnf
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
            color: sugar.color(main, uiForeground);
            background-color: sugar.color(main, ui);
            font-size: sugar.scalable(1rem);
            border: sugar.color(current, --alpha 0.1) solid sugar.theme(ui.${finalParams.name}.borderWidth);
            border-radius: sugar.theme(ui.${finalParams.name}.borderRadius);
            transition: sugar.theme(ui.${finalParams.name}.transition);
            @sugar.depth(${__STheme.config(`ui.${finalParams.name}.depth`)});
            cursor: auto !important;

            &::placeholder {
            color: sugar.color(main, placeholder);
            }

            &::selection {
                color: sugar.color(current, 100);
                background-color: sugar.color(current);
            }

            @sugar.state.hover {
                border: sugar.color(current, --alpha 0.3) solid 1px;
            }
            @sugar.state.focus {
                border: sugar.color(current, --alpha 0.6) solid 1px;
            }
            @sugar.state.active {
                border: sugar.color(current, --alpha 0.6) solid 1px;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsTUFBTSxpQ0FBa0MsU0FBUSxZQUFZOztBQUNqRCw0Q0FBVSxHQUFHO0lBQ2hCLElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7S0FDM0I7Q0FDSixDQUFDO0FBUU4sT0FBTyxFQUFFLGlDQUFpQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTFELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsSUFBSSxFQUFFLEVBQUUsRUFDUixLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLElBQ25CLE1BQU0sQ0FDWixDQUFDO0lBRUYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJO1FBQUUsT0FBTztJQUU5QixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsT0FBTztJQUNQLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7OzZDQUcyQixXQUFXLENBQUMsSUFBSTs0Q0FDakIsV0FBVyxDQUFDLElBQUk7U0FDbkQsQ0FBQyxDQUFDO0tBQ047SUFFRCxNQUFNO0lBQ04sSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7OzZFQUtGLFdBQVcsQ0FBQyxJQUNoQjs0Q0FDZ0MsV0FBVyxDQUFDLElBQUk7eUNBQ25CLFdBQVcsQ0FBQyxJQUFJOzJCQUM5QixRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sV0FBVyxDQUFDLElBQUksUUFBUSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQTZCckUsQ0FBQyxDQUFDO0tBQ0Y7SUFFRCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsQ0FBQyJ9