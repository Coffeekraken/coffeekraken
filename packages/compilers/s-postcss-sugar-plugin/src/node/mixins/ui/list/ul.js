import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginUiListUlInterface extends __SInterface {
}
postcssSugarPluginUiListUlInterface.definition = {
    color: {
        type: 'String',
        required: true,
        default: 'default',
        alias: 'c'
    },
    textColor: {
        type: 'String',
        alias: 't'
    },
    style: {
        type: 'String',
        values: ['default'],
        default: 'default'
    }
};
export { postcssSugarPluginUiListUlInterface as interface };
export default function ({ params, atRule, processNested }) {
    //   const finalParams: IPostcssSugarPluginUiListUlParams = {
    //     color: 'primary',
    //     ...params
    //   };
    const vars = [];
    // bare
    vars.push(`
      @sugar.scope.bare {
        min-width: 500px;
      }
    `);
    vars.push(`
    @sugar.scope.lnf {
        padding: sugar.space(20);
        background-color: sugar.color(surface);
        border-radius: 5px;
        @sugar.depth (30);

        & > li {
            border-radius: 5px;
            padding: sugar.space(40);

            .s-highlight {
              background-color: sugar.color.schema(accent, highlight) !important;
              color: white !important;
            }

          @sugar.state.hover {
            background-color: sugar.color.schema(accent:hover, surface);
            color: sugar.color.schema(accent:hover, foreground);
          }

          @sugar.state.focus {
            background-color: sugar.color.schema(accent:focus, surface) !important;
            color: sugar.color.schema(accent:focus, foreground) !important;
            outline: none;
          }

          @sugar.state.active {
            background-color: sugar.color.schema(accent:active, surface) !important;
            color: sugar.color.schema(accent:active, foreground) !important;
          }

        }

    }
  `);
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1bC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUtyRCxNQUFNLG1DQUFvQyxTQUFRLFlBQVk7O0FBQ3JELDhDQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLEtBQUssRUFBRSxHQUFHO0tBQ1g7SUFDRCxTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUsUUFBUTtRQUNkLEtBQUssRUFBRSxHQUFHO0tBQ1g7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztRQUNuQixPQUFPLEVBQUUsU0FBUztLQUNuQjtDQUNGLENBQUM7QUFTSixPQUFPLEVBQUUsbUNBQW1DLElBQUksU0FBUyxFQUFFLENBQUM7QUFFNUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLGFBQWEsRUFLZDtJQUNDLDZEQUE2RDtJQUM3RCx3QkFBd0I7SUFDeEIsZ0JBQWdCO0lBQ2hCLE9BQU87SUFFUCxNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsT0FBTztJQUNQLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7S0FJUCxDQUFDLENBQUM7SUFFTCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1DVCxDQUFDLENBQUM7SUFFSCxNQUFNLEdBQUcsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsQ0FBQyJ9