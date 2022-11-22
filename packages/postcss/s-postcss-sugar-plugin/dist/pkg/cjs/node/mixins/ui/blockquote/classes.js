"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const faker_1 = __importDefault(require("faker"));
/**
 * @name          classes
 * @namespace     node.mixin.ui.blockquote
 * @type          PostcssMixin
 * @interface       ./classes
 * @platform      postcss
 * @status        beta
 *
 * Generate the blockquote classes
 *
 * @param       {('bare'|'lnf'|'vr')[]}        [scope=['bare', 'lnf', 'vr']]      The scope you want to generate
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * \@sugar.ui.blockquote.classes();
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiBlockquoteClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'vr', 'tf'],
                default: ['bare', 'lnf', 'vr', 'tf'],
            },
        };
    }
}
exports.interface = postcssSugarPluginUiBlockquoteClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ scope: [] }, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Blockquote
        * @namespace          sugar.style.ui
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
        * @install          css
        * \\@sugar.ui.blockquote.classes;
        * 
        * .my-blockquote {
        *   \@sugar.ui.blockquote;
        * }
        * 
        * @cssClass         s-blockquote            Apply the blockquote styling
        * @cssClass         s-format:text blockquote            Apply the s-blockquote styling on plain blockquotes
        * @cssClass         s-rhythm:vertical &                 Apply the vertical rhythm on the blockquote
        *
        * @example        html       Colors (none-exhaustive)
        *   <p class="s-blockquote s-mbe:30 s-color:accent">
        *       ${faker_1.default.lorem.paragraph()}
        *   </p>
        *   <p class="s-blockquote s-mbe:30 s-color:error">
        *       ${faker_1.default.lorem.paragraph()}
        *   </p>
        *   <p class="s-blockquote s-mbe:30 s-color:info">
        *       ${faker_1.default.lorem.paragraph()}
        *   </p>
        *
        * @example    html       RTL Support
        *   <p class="s-blockquote s-mbe:30" dir="rtl">
        *       ${faker_1.default.lorem.paragraph()}
        *   </p>
        * 
        * @example          html        Shapes
        * <p class="s-blockquote s-shape:default s-mbe:30">
        *       ${faker_1.default.lorem.paragraph()}
        *   </p>
        *   <p class="s-blockquote s-shape:pill s-mbe:30">
        *       ${faker_1.default.lorem.paragraph()}
        *   </p>
        * <p class="s-blockquote s-shape:square s-mbe:30">
        *       ${faker_1.default.lorem.paragraph()}
        *   </p>
        * 
        * @example          html        Scales
        * <p class="s-blockquote s-scale:07 s-mbe:30">
        *       ${faker_1.default.lorem.paragraph()}
        *   </p>
        *   <p class="s-blockquote s-scale:10 s-mbe:30">
        *       ${faker_1.default.lorem.paragraph()}
        *   </p>
        * <p class="s-blockquote s-scale:13 s-mbe:30">
        *       ${faker_1.default.lorem.paragraph()}
        *   </p>
        * <p class="s-blockquote s-scale:16 s-mbe:30">
        *       ${faker_1.default.lorem.paragraph()}
        *   </p>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    if (finalParams.scope.includes('bare')) {
        vars.comment(() => `/**
        * @name           s-blockquote
        * @namespace          sugar.style.ui.blockquote
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
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `).code(`
        .s-blockquote {
            @sugar.ui.blockquote($scope: bare);
        }`, { type: 'CssClass' });
    }
    vars.comment(() => `/**
    * @name           s-blockquote
    * @namespace          sugar.style.ui.blockquote
    * @type           CssClass
    * 
    * This class represent a blockquote
    * 
    * @example        html
    * <blockquote class="s-blockquote">
    *   <p>Hello world</p>
    * </blockquote>
    * 
    * @since      2.0.0
    * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
`).code(`
    .s-blockquote {
        @sugar.ui.blockquote($scope: lnf);
    } `, { type: 'CssClass' });
    if (finalParams.scope.indexOf('tf') !== -1) {
        vars.comment(() => `/**
            * @name           s-format:text bloquote
            * @namespace          sugar.style.ui.blockquote
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
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            @sugar.format.text {
                blockquote {
                    @sugar.ui.blockquote($scope: '${finalParams.scope.join(',')}');
                } 
            }
        `, { type: 'CssClass' });
    }
    if (finalParams.scope.indexOf('vr') !== -1) {
        vars.comment(() => `/**
            * @name           s-rhythm:vertical
            * @namespace          sugar.style.ui.blockquote
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
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            @sugar.rhythm.vertical {
                blockquote, .s-blockquote {
                    ${s_theme_1.default.jsObjectToCssProperties(s_theme_1.default.get('ui.default.rhythmVertical'))}
                } 
            }
        `, { type: 'CssClass' });
    }
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0Msa0RBQTRCO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFFSCxNQUFNLDhDQUErQyxTQUFRLHFCQUFZO0lBQ3JFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7Z0JBQ25DLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQzthQUN2QztTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNMEQsbUVBQVM7QUFFcEUsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsRUFBRSxJQUNOLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkFtQ0ksZUFBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7OztrQkFHekIsZUFBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7OztrQkFHekIsZUFBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7Ozs7O2tCQUt6QixlQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTs7Ozs7a0JBS3pCLGVBQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFOzs7a0JBR3pCLGVBQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFOzs7a0JBR3pCLGVBQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFOzs7OztrQkFLekIsZUFBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7OztrQkFHekIsZUFBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7OztrQkFHekIsZUFBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7OztrQkFHekIsZUFBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7Ozs7OztLQU10QyxDQUNBLENBQUM7SUFFRixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3BDLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7OztNQWVaLENBQ0csQ0FBQyxJQUFJLENBQ0Y7OztVQUdGLEVBQ0UsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7S0FDTDtJQUVELElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7OztDQWViLENBQ0ksQ0FBQyxJQUFJLENBQ0Y7OztPQUdELEVBQ0MsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFFRixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ3hDLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBaUJWLENBQ0MsQ0FBQyxJQUFJLENBQ0Y7OztvREFHd0MsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQ2xELEdBQUcsQ0FDTjs7O1NBR1osRUFDRyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FDdkIsQ0FBQztLQUNMO0lBRUQsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUN4QyxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBeUJWLENBQ0MsQ0FBQyxJQUFJLENBQ0Y7OztzQkFHVSxpQkFBUSxDQUFDLHVCQUF1QixDQUM5QixpQkFBUSxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUM1Qzs7O1NBR1osRUFDRyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FDdkIsQ0FBQztLQUNMO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQXBPRCw0QkFvT0MifQ==