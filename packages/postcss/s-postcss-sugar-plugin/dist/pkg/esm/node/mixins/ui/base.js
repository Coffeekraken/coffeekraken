import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
class postcssSugarPluginUiBaseInterface extends __SInterface {
    static get _definition() {
        return {
            name: {
                type: 'String',
                required: true,
            },
            scope: {
                type: 'String',
                default: ['bare', 'lnf'],
            },
        };
    }
}
export { postcssSugarPluginUiBaseInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ name: '', scope: ['bare', 'lnf'] }, params);
    if (!finalParams.name)
        return;
    const vars = [];
    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
            font-size: s.scalable(1rem);
            display: inline-block;
            padding-inline: s.padding(ui.${finalParams.name}.paddingInline);
            padding-block: s.padding(ui.${finalParams.name}.paddingBlock);


        `);
    }
    // lnf
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
            color: s.color(main, text);
            background-color: s.color(main, uiBackground);
            font-size: s.scalable(1rem);
            border: s.color(current, --alpha 0.2) solid s.theme(ui.${finalParams.name}.borderWidth);
            border-radius: s.border.radius(ui.${finalParams.name}.borderRadius);
            transition: s.theme(ui.${finalParams.name}.transition);
            @s.depth(${__STheme.get(`ui.${finalParams.name}.depth`)});
            cursor: auto !important;

            &::placeholder {
                color: s.color(main, placeholder);
            }

            &::selection {
                color: s.color(current, 100);
                background-color: s.color(current);
            }

            &:not(textarea) {
                line-height: 1;
            }

            &[disabled] {
                @s.disabled();
            }

            @s.state.hover {
                border: s.color(current, --alpha 0.3) solid 1px;
            }
            @s.state.focus {
                border: s.color(current, --alpha 0.4) solid 1px;
            }
            @s.state.active {
                border: s.color(current, --alpha 0.4) solid 1px;
            }
    `);
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE1BQU0saUNBQWtDLFNBQVEsWUFBWTtJQUN4RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7YUFDM0I7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBT0QsT0FBTyxFQUFFLGlDQUFpQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTFELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsSUFBSSxFQUFFLEVBQUUsRUFDUixLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLElBQ25CLE1BQU0sQ0FDWixDQUFDO0lBRUYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJO1FBQUUsT0FBTztJQUU5QixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsT0FBTztJQUNQLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7OzJDQUd5QixXQUFXLENBQUMsSUFBSTswQ0FDakIsV0FBVyxDQUFDLElBQUk7OztTQUdqRCxDQUFDLENBQUM7S0FDTjtJQUVELE1BQU07SUFDTixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7cUVBS0YsV0FBVyxDQUFDLElBQ2hCO2dEQUNvQyxXQUFXLENBQUMsSUFBSTtxQ0FDM0IsV0FBVyxDQUFDLElBQUk7dUJBQzlCLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxXQUFXLENBQUMsSUFBSSxRQUFRLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBNkI5RCxDQUFDLENBQUM7S0FDRjtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==