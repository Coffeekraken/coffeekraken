import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
import __faker from 'faker';
class postcssSugarPluginUiBlockquoteClassesInterface extends __SInterface {
}
postcssSugarPluginUiBlockquoteClassesInterface.definition = {
    styles: {
        type: 'String[]',
        values: ['solid'],
        default: ['solid'],
    },
    defaultColor: {
        type: 'String',
        default: __theme().config('ui.blockquote.defaultColor'),
    },
    defaultStyle: {
        type: 'String',
        values: ['solid'],
        default: __theme().config('ui.blockquote.defaultStyle'),
    },
    scope: {
        type: {
            type: 'Array<String>',
            splitChars: [',', ' '],
        },
        values: ['bare', 'lnf', 'vr', 'tf'],
        default: ['bare', 'lnf', 'vr', 'tf'],
    },
};
export { postcssSugarPluginUiBlockquoteClassesInterface as interface };
export default function ({ params, atRule, applyNoScopes, jsObjectToCssProperties, replaceWith, }) {
    const finalParams = Object.assign({ styles: [], defaultStyle: 'solid', defaultColor: 'ui', scope: [] }, params);
    finalParams.scope = applyNoScopes(finalParams.scope);
    const vars = [];
    vars.push(`
      /**
        * @name          Blockquote
        * @namespace          sugar.css.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/blockquote
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to display nice blockquote with simple class.
        * 
        * @feature          Support for vertical rhythm through the \`s-rhythm:vertical\` class
        * @feature          Support for text formatting through the \`s-format:text\` class
        * @feature          Full RTL support
        * @feature          Support for scaling through the \`s-scale:...\` class
        * @feature          Support for colorizing through the \`s-color:...\` class
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        ${finalParams.styles
        .map((style) => {
        return ` * @cssClass     s-blockquote${style === finalParams.defaultStyle ? '' : `:${style}`}           Apply the ${style} blockquote style`;
    })
        .join('\n')}
        * @cssClass         s-format:text blockquote            Apply the s-blockquote styling on plain blockquotes
        * @cssClass         s-rhythm:vertical &                 Apply the vertical rhythm on the blockquote
        * 
        * @example        html
        ${finalParams.styles
        .map((style) => {
        return ` * <!-- ${style} style -->
            * <div class="s-font:30 s-mbe:50">
            *   <h3 class="s-tc:accent s-font:30 s-mbe:30">${style} style</h3>
            *   <p class="s-blockquote${style === finalParams.defaultStyle ? '' : `:${style}`}">
            *       ${__faker.lorem.paragraph()}
            *   </p>
            * </div>
            * `;
    })
        .join('\n')}
        *
        * <!-- Colors -->
        * <div class="s-font:30 s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Colors (non-exhaustive)</h3>
        *   <p class="s-blockquote s-mbe:30 s-color:accent">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        *   <p class="s-blockquote s-mbe:30 s-color:error">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        *   <p class="s-blockquote s-mbe:30 s-color:info">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * </div>
        *
        * <!-- LTR -->
        * <div class="s-font:30 s-mbe:50" dir="rtl">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">LTR Support</h3>
        *   <p class="s-blockquote s-mbe:30">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * </div>
        * 
        * <!-- Scale -->
        * <div class="s-font:30 s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Scale</h3>
        *   <p class="s-blockquote s-scale:15 s-mbe:30">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * </div>
        * 
        * <!-- Rhythm and text format -->
        * <div class="s-font:30 s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Vertical rhythm and text formatting</h3>
        *   <div class="s-format:text s-rhythm:vertical">
        *       <blockquote>
        *          ${__faker.lorem.paragraph()}
        *       </blockquote>
        *       <blockquote>
        *           ${__faker.lorem.paragraph()}
        *       </blockquote>
        *   </div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    const cls = `s-blockquote`;
    vars.push(`/**
        * @name           ${cls}
        * @namespace      sugar.css.ui.blockquote
        * @type           CssClass
        * 
        * This class represent a simple blockquote
        * 
        * @example        html
        * <blockquote class="${cls.trim()}">
        *   <p>Hello world</p>
        * </blockquote>
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
        .${cls} {
            @sugar.color(${finalParams.defaultColor});
            @sugar.ui.blockquote($scope: '${finalParams.scope.join(',')}');
        } 
    `);
    if (finalParams.scope.indexOf('tf') !== -1) {
        vars.push(`/**
            * @name           s-format:text bloquote
            * @namespace      sugar.css.ui.blockquote
            * @type           CssClass
            * 
            * This class represent a simple blockquote tag in the s-format:text scope
            * 
            * @example        html
            * <div class="s-format:text">
            *   <blockquote>
            *       <p>Hello world</p>
            *   </blockquote>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
            @sugar.format.text {
                blockquote {
                    @sugar.color(${finalParams.defaultColor});
                    @sugar.ui.blockquote($scope: '${finalParams.scope.join(',')}');
                } 
            }
        `);
    }
    if (finalParams.scope.indexOf('vr') !== -1) {
        vars.push(`/**
            * @name           s-rhythm:vertical
            * @namespace      sugar.css.ui.blockquote
            * @type           CssClass
            * 
            * This class represent some blockquotes in the s-rhythm:vertical scope
            * 
            * @feature      Vertical rhythm
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   <blockquote class="s-blockquote">
            *       <p>Hello world</p>
            *   </blockquote>
            *   <blockquote class="s-blockquote">
            *       <p>Hello world</p>
            *   </blockquote>
            *   <blockquote class="s-blockquote">
            *       <p>Hello world</p>
            *   </blockquote>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
            @sugar.rhythm.vertical {
                blockquote, .s-blockquote {
                    ${jsObjectToCssProperties(__theme().config('ui.blockquote.rhythmVertical'))}
                } 
            }
        `);
    }
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFFM0MsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCLE1BQU0sOENBQStDLFNBQVEsWUFBWTs7QUFDOUQseURBQVUsR0FBRztJQUNoQixNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsVUFBVTtRQUNoQixNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7UUFDakIsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO0tBQ3JCO0lBQ0QsWUFBWSxFQUFFO1FBQ1YsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLDRCQUE0QixDQUFDO0tBQzFEO0lBQ0QsWUFBWSxFQUFFO1FBQ1YsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7UUFDakIsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyw0QkFBNEIsQ0FBQztLQUMxRDtJQUNELEtBQUssRUFBRTtRQUNILElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxlQUFlO1lBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7U0FDekI7UUFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7UUFDbkMsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO0tBQ3ZDO0NBQ0osQ0FBQztBQVVOLE9BQU8sRUFBRSw4Q0FBOEMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUV2RSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sYUFBYSxFQUNiLHVCQUF1QixFQUN2QixXQUFXLEdBT2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsTUFBTSxFQUFFLEVBQUUsRUFDVixZQUFZLEVBQUUsT0FBTyxFQUNyQixZQUFZLEVBQUUsSUFBSSxFQUNsQixLQUFLLEVBQUUsRUFBRSxJQUNOLE1BQU0sQ0FDWixDQUFDO0lBQ0YsV0FBVyxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRXJELE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBc0JKLFdBQVcsQ0FBQyxNQUFNO1NBQ2YsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDWCxPQUFPLGdDQUNILEtBQUssS0FBSyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUN2RCx3QkFBd0IsS0FBSyxtQkFBbUIsQ0FBQztJQUNyRCxDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztVQUtiLFdBQVcsQ0FBQyxNQUFNO1NBQ2YsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDWCxPQUFPLFdBQVcsS0FBSzs7NkRBRXNCLEtBQUs7d0NBRWxELEtBQUssS0FBSyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUN2RDtzQkFDVSxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTs7O2VBR2hDLENBQUM7SUFDSixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7a0JBTUwsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7OztrQkFHekIsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7OztrQkFHekIsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7Ozs7Ozs7O2tCQVF6QixPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTs7Ozs7Ozs7a0JBUXpCLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFOzs7Ozs7Ozs7cUJBU3RCLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFOzs7c0JBR3hCLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFOzs7Ozs7OztLQVExQyxDQUFDLENBQUM7SUFFSCxNQUFNLEdBQUcsR0FBRyxjQUFjLENBQUM7SUFFM0IsSUFBSSxDQUFDLElBQUksQ0FBQzs0QkFDYyxHQUFHOzs7Ozs7OytCQU9BLEdBQUcsQ0FBQyxJQUFJLEVBQUU7Ozs7Ozs7V0FPOUIsR0FBRzsyQkFDYSxXQUFXLENBQUMsWUFBWTs0Q0FDUCxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7O0tBRWxFLENBQUMsQ0FBQztJQUVILElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttQ0FtQmlCLFdBQVcsQ0FBQyxZQUFZO29EQUNQLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUNsRCxHQUFHLENBQ047OztTQUdaLENBQUMsQ0FBQztLQUNOO0lBRUQsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7c0JBMkJJLHVCQUF1QixDQUNyQixPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsOEJBQThCLENBQUMsQ0FDbkQ7OztTQUdaLENBQUMsQ0FBQztLQUNOO0lBRUQsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLENBQUMifQ==