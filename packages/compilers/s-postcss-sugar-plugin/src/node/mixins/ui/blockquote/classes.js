import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';
class postcssSugarPluginUiBlockquoteClassesInterface extends __SInterface {
    static get _definition() {
        return {
            styles: {
                type: 'String[]',
                values: ['solid'],
                default: ['solid'],
            },
            shapes: {
                type: 'String[]',
                values: ['default', 'square', 'pill'],
                default: ['default', 'square', 'pill'],
            },
            defaultStyle: {
                type: 'String',
                values: ['solid'],
                default: __STheme.config('ui.blockquote.defaultStyle'),
            },
            defaultShape: {
                type: 'String',
                values: ['default', 'square', 'pill'],
                default: __STheme.config('ui.blockquote.defaultShape'),
            },
            defaultColor: {
                type: 'String',
                values: Object.keys(__STheme.config('color')),
                default: __STheme.config('ui.blockquote.defaultColor'),
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'shape', 'vr', 'tf'],
                default: ['bare', 'lnf', 'shape', 'vr', 'tf'],
            },
        };
    }
}
export { postcssSugarPluginUiBlockquoteClassesInterface as interface };
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export function dependencies() {
    return {
        files: [`${__dirname()}/blockquote.js`],
    };
}
export default function ({ params, atRule, applyNoScopes, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ styles: [], shapes: [], defaultStyle: 'solid', defaultShape: 'default', scope: [] }, params);
    finalParams.scope = applyNoScopes(finalParams.scope);
    const vars = new CssVars();
    vars.comment(() => `
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
        ${finalParams.shapes
        .map((shape) => {
        return ` * @cssClass     s-blockquote${shape === finalParams.defaultShape ? '' : `:${shape}`}           Apply the ${shape} blockquote shape`;
    })
        .join('\n')}
        * @cssClass         s-format:text blockquote            Apply the s-blockquote styling on plain blockquotes
        * @cssClass         s-rhythm:vertical &                 Apply the vertical rhythm on the blockquote
        * 
        ${finalParams.styles
        .map((style) => {
        return ` * @example        html       ${style} style
            *   <p class="s-blockquote${style === finalParams.defaultStyle ? '' : `:${style}`}">
            *       ${__faker.lorem.paragraph()}
            *   </p>
            * `;
    })
        .join('\n')}
        *
        ${finalParams.shapes
        .map((shape) => {
        return ` * @example        html       ${shape} shape
            *   <p class="s-blockquote${shape === finalParams.defaultShape ? '' : `:${shape}`}">
            *       ${__faker.lorem.paragraph()}
            *   </p>
            * `;
    })
        .join('\n')}
        *
        * @example        html       Colors (none-exhaustive)
        *   <p class="s-blockquote s-mbe:30 s-color:accent">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        *   <p class="s-blockquote s-mbe:30 s-color:error">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        *   <p class="s-blockquote s-mbe:30 s-color:info">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        *
        * @example    html       RTL Support
        *   <p class="s-blockquote s-mbe:30" dir="rtl">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * 
        * @example          html        Scales
        * <p class="s-blockquote s-scale:07 s-mbe:30">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        *   <p class="s-blockquote s-scale:10 s-mbe:30">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * <p class="s-blockquote s-scale:13 s-mbe:30">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * <p class="s-blockquote s-scale:16 s-mbe:30">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    if (finalParams.scope.includes('bare')) {
        vars.comment(() => `/**
        * @name           s-blockquote
        * @namespace      sugar.css.ui.blockquote
        * @type           CssClass
        * 
        * This class represent a <span class="s-tc:accent">bare</span> blockquote
        * 
        * @example        html
        * <blockquote class="s-blockquote">
        *   <p>Hello world</p>
        * </blockquote>
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
     `).code(`
        .s-blockquote {
            @sugar.ui.blockquote($scope: bare);
        } `);
    }
    if (finalParams.scope.includes('lnf')) {
        finalParams.styles.forEach((style) => {
            let cls = `s-blockquote`;
            if (style !== finalParams.defaultStyle) {
                cls += `--${style}`;
            }
            vars.comment(() => `/**
            * @name           ${cls}
            * @namespace      sugar.css.ui.blockquote
            * @type           CssClass
            * 
            * This class represent a <span class="s-tc:accent">${style}</span> blockquote
            * 
            * @example        html
            * <blockquote class="${cls.trim()}">
            *   <p>Hello world</p>
            * </blockquote>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
       `).code(`
            .${cls} {
                @sugar.ui.blockquote($style: ${style}, $scope: lnf);
            } `);
        });
    }
    if (finalParams.scope.includes('shape')) {
        finalParams.shapes.forEach((shape) => {
            let cls = `s-blockquote`;
            if (shape !== finalParams.defaultShape) {
                cls += `--${shape}`;
            }
            vars.comment(() => `/**
        * @name           ${cls}
        * @namespace      sugar.css.ui.blockquote
        * @type           CssClass
        * 
        * This class represent a <span class="s-tc:accent">${shape}</span> blockquote
        * 
        * @example        html
        * <blockquote class="${cls.trim()}">
        *   <p>Hello world</p>
        * </blockquote>
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
     `).code(`
        .${cls} {
            @sugar.ui.blockquote($shape: ${shape}, $scope: shape);
        } `);
        });
    }
    // default color
    if (finalParams.scope.includes('lnf')) {
        vars.code(() => `
            .s-blockquote:not(.s-color) {
                @sugar.color(${finalParams.defaultColor});
            }
        `);
    }
    if (finalParams.scope.indexOf('tf') !== -1) {
        vars.comment(() => `/**
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
       `).code(`
            @sugar.format.text {
                blockquote {
                    @sugar.ui.blockquote($scope: '${finalParams.scope.join(',')}');
                    @sugar.color(${finalParams.defaultColor});
                } 
            }
        `);
    }
    if (finalParams.scope.indexOf('vr') !== -1) {
        vars.comment(() => `/**
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
       `).code(`
            @sugar.rhythm.vertical {
                blockquote, .s-blockquote {
                    ${__STheme.jsObjectToCssProperties(__STheme.config('ui.blockquote.rhythmVertical'))}
                } 
            }
        `);
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCLE1BQU0sOENBQStDLFNBQVEsWUFBWTtJQUNyRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxVQUFVO2dCQUNoQixNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQ2pCLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQzthQUNyQjtZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUM7Z0JBQ3JDLE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDO2FBQ3pDO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDakIsT0FBTyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsNEJBQTRCLENBQUM7YUFDekQ7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUM7Z0JBQ3JDLE9BQU8sRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLDRCQUE0QixDQUFDO2FBQ3pEO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzdDLE9BQU8sRUFBRSxRQUFRLENB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