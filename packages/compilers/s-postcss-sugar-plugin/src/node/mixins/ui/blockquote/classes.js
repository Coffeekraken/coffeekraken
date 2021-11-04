import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
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
        default: __STheme.config('ui.blockquote.defaultColor'),
    },
    defaultStyle: {
        type: 'String',
        values: ['solid'],
        default: __STheme.config('ui.blockquote.defaultStyle'),
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
export default function ({ params, atRule, applyNoScopes, replaceWith, }) {
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
        *   <p class="s-typo:p s-mbe:30">
        *       Text format mean that all the \`blockquote\` tags inside the \`s-format:text\` class scope will be **styled automatically** using the default style and color.
        *   </p>
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
                    ${__STheme.jsObjectToCssProperties(__STheme.config('ui.blockquote.rhythmVertical'))}
                } 
            }
        `);
    }
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCLE1BQU0sOENBQStDLFNBQVEsWUFBWTs7QUFDOUQseURBQVUsR0FBRztJQUNoQixNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsVUFBVTtRQUNoQixNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7UUFDakIsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO0tBQ3JCO0lBQ0QsWUFBWSxFQUFFO1FBQ1YsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyw0QkFBNEIsQ0FBQztLQUN6RDtJQUNELFlBQVksRUFBRTtRQUNWLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQ2pCLE9BQU8sRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLDRCQUE0QixDQUFDO0tBQ3pEO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFO1lBQ0YsSUFBSSxFQUFFLGVBQWU7WUFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztTQUN6QjtRQUNELE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztRQUNuQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7S0FDdkM7Q0FDSixDQUFDO0FBVU4sT0FBTyxFQUFFLDhDQUE4QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRXZFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixhQUFhLEVBQ2IsV0FBVyxHQU1kO0lB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