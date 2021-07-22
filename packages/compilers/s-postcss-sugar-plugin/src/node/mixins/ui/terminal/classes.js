import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginUiTerminalClassesInterface extends __SInterface {
}
postcssSugarPluginUiTerminalClassesInterface.definition = {};
export { postcssSugarPluginUiTerminalClassesInterface as interface };
export default function ({ params, atRule, replaceWith }) {
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
  `
    ];
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFJckQsTUFBTSw0Q0FBNkMsU0FBUSxZQUFZOztBQUM5RCx1REFBVSxHQUFHLEVBQUUsQ0FBQztBQUt6QixPQUFPLEVBQUUsNENBQTRDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFckUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUNDLE1BQU0sV0FBVyxxQkFDWixNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhO1FBQ3JCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkQ7S0FDQSxDQUFDO0lBRUYsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BCLENBQUMifQ==