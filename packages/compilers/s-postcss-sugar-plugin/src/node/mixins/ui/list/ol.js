import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginUiListOlMixinInterface extends __SInterface {
}
postcssSugarPluginUiListOlMixinInterface.definition = {};
export { postcssSugarPluginUiListOlMixinInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    const iconSelector = '&:before';
    vars.push(`
    @sugar.scope.lnf {
        position: relative;
        counter-reset: list-ol; 

        & > li,
        & > dt {
          display: block !important;
          padding-left: 1.5em;
          margin-bottom: 0.5em;
        
          &:before {  
            counter-increment: list-ol;    
            content: counter(list-ol);
            font-size: 1em;
            display: inline-block;
            position: absolute;
            left: 0.5em;
            transform: translateX(-50%);
            color: sugar.color(ui);
            text-align: right;
            width: 2ch;
          }          
        }
    }
  `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2wuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUtyRCxNQUFNLHdDQUF5QyxTQUFRLFlBQVk7O0FBQzFELG1EQUFVLEdBQUcsRUFDbkIsQ0FBQztBQU1KLE9BQU8sRUFBRSx3Q0FBd0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVqRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxFQUtaO0lBQ0csTUFBTSxXQUFXLHFCQUNaLE1BQU0sQ0FDVixDQUFDO0lBRUosTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE1BQU0sWUFBWSxHQUFHLFVBQVUsQ0FBQztJQUVoQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJULENBQUMsQ0FBQztJQUVELFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixDQUFDIn0=