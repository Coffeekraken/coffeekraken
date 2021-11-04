import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginUiTerminalClassesInterface extends __SInterface {
}
postcssSugarPluginUiTerminalClassesInterface.definition = {};
export { postcssSugarPluginUiTerminalClassesInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = [
        `
        /**
         * @name            s-terminal
         * @namespace       sugar.css.ui.terminal
         * @type            CssClass
         * 
         * This class allows you to apply a terminal look to any HTMLElement
         * 
         * @feature       Support vertical rhythm
         * 
         * @example         css
         * <span class="s-terminal">
         *  Something cool
         * </span>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        .s-terminal {
            @sugar.ui.terminal;
        }
  `,
    ];
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsTUFBTSw0Q0FBNkMsU0FBUSxZQUFZOztBQUM1RCx1REFBVSxHQUFHLEVBQUUsQ0FBQztBQUszQixPQUFPLEVBQUUsNENBQTRDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFckUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhO1FBQ25COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkw7S0FDRSxDQUFDO0lBRUYsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLENBQUMifQ==