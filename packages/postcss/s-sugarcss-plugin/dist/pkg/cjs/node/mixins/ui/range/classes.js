"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name          classes
 * @as              @s.ui.range.classes
 * @namespace     node.mixin.ui.range
 * @type               PostcssMixin
 * @interface     ./classes          interface
 * @platform      postcss
 * @status        stable
 *
 * Generate the range classes
 *
 * @param       {('solid')[]}                           [lnfs=['solid']]         The style(s) you want to generate
 * @param       {'solid'}                [defaultLnf='theme.ui.range.defaultLnf']           The default style you want
 * @return      {String}            The generated css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet         @s.ui.range.classes
 *
 * @example     css
 * @s.ui.range.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginUiRangeClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {
            lnfs: {
                type: 'String[]',
                values: ['solid'],
                default: ['solid'],
            },
            defaultLnf: {
                type: 'String',
                values: ['solid'],
                default: s_theme_1.default.current.get('ui.range.defaultLnf'),
            },
        };
    }
}
exports.interface = SSugarcssPluginUiRangeClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ lnfs: [], defaultLnf: 'solid' }, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Range 
        * @namespace          sugar.style.ui.range
        * @type               Styleguide
        * @menu           Styleguide / Forms        /styleguide/forms/range
        * @platform       css
        * @status       stable
        * 
        * These classes allows you to display nice radio in your forms
        * 
        * @feature          Support for shaping through the \`s-shape:...\` class
        * @feature          Support for scaling through the \`s-scale:...\` class
        * @feature          Support for colorizing through the \`s-color:...\` class
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * @s.ui.range.classes;
        * 
        * .my-range {
        *   @s.ui.range;
        * }
        * 
        ${finalParams.lnfs
        .map((lnf) => {
        return ` * @cssClass     s-range${lnf === finalParams.defaultLnf ? '' : `:${lnf}`}           Apply the ${lnf} range lnf`;
    })
        .join('\n')}
        * 
        ${finalParams.lnfs
        .map((lnf) => {
        return ` * @example        html       ${lnf}
            *   <label class="s-mbe:30 s-label:responsive">
            *     <span>John Doe</span>
            *     <input type="range" class="s-range ${finalParams.defaultLnf === lnf ? '' : `:${lnf}`}" min="0" max="100" step="10" />
            *   </label>
            *   <label class="s-mbe:30 s-label:responsive">
            *     <span>John Doe</span>
            *     <input type="range" class="s-range ${finalParams.defaultLnf === lnf ? '' : `:${lnf}`} s-color:accent" min="0" max="100" step="10" />
            *   </label>
            *   <label class="s-mbe:30 s-label:responsive">
            *     <span>John Doe</span>
            *     <input type="range" class="s-range ${finalParams.defaultLnf === lnf ? '' : `:${lnf}`} s-color:complementary" min="0" max="100" step="10" />
            *   </label>
            *   <label class="s-mbe:30 s-label:responsive">
            *     <span>I'm disabled</span>
            *     <input type="range" disabled class="s-range ${finalParams.defaultLnf === lnf ? '' : `:${lnf}`} s-color:complementary" min="0" max="100" step="10" />
            *   </label>
            * `;
    })
        .join('\n')}
        * 
        * @example        html          Shapes
        *   <label class="s-mbe:30 s-label:responsive">
        *     <span>John Doe</span>
        *     <input type="range" class="s-range s-shape:default" min="0" max="100" step="10" />
        * </label>
        * <label class="s-mbe:30 s-label:responsive">
        *     <span>John Doe</span>
        *     <input type="range" class="s-range s-shape:square" min="0" max="100" step="10" />
        * </label>
        * <label class="s-mbe:30 s-label:responsive">
        *     <span>John Doe</span>
        *     <input type="range" class="s-range s-shape:pill" min="0" max="100" step="10" />
        * </label>
        * 
        * @example        html          Colors (none-exclusive)
        *   <label class="s-mbe:30 s-label:responsive">
        *     <span>John Doe</span>
        *     <input type="range" class="s-range" min="0" max="100" step="10" />
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     <span>John Doe</span>
        *     <input type="range" class="s-range s-color:accent" min="0" max="100" step="10" />
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     <span>John Doe</span>
        *     <input type="range" class="s-range s-color:complementary" min="0" max="100" step="10" />
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     <span>John Doe</span>
        *     <input type="range" class="s-range s-color:error" disabled min="0" max="100" step="10" />
        *   </label>
        * 
        * @example      html        RTL
        * <div dir="rtl">
        *   <label class="s-mbe:30 s-label:responsive">
        *     <input type="range" class="s-range" min="0" max="100" step="10" />
        *     <span>John Doe</span>
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     <input type="range" class="s-range s-color:accent" min="0" max="100" step="10" />
        *     <span>John Doe</span>
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     <input type="range" class="s-range s-color:complementary" min="0" max="100" step="10" />
        *     <span>John Doe</span>
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     <input type="range" class="s-range s-color:error" disabled min="0" max="100" step="10" />
        *     <span>John Doe</span>
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     <span>I'm disabled</span>
        *     <input type="range" disabled class="s-range s-color:error" disabled min="0" max="100" step="10" />
        *   </label>
        * </div>
        *
        * @example        html          Scales
        *   <label class="s-mbe:30 s-label:responsive">
        *     <span>John Doe</span>
        *     <input type="range" class="s-range s-scale:08" min="0" max="100" step="10" />
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     <span>John Doe</span>
        *     <input type="range" class="s-range s-width:50" min="0" max="100" step="10" />
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     <span>John Doe</span>
        *     <input type="range" class="s-range s-scale:12" min="0" max="100" step="10" />
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     <span>John Doe</span>
        *     <input type="range" class="s-range s-scale:14" min="0" max="100" step="10" />
        *   </label>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    vars.code(`@s.scope 'bare' {`);
    vars.comment(() => `/**
        * @name           s-range
        * @namespace          sugar.style.ui.range
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">bare</s-color>" range
        * 
        * @example        html
        * <input type="range" class="s-range s-width:50" min="0" max="100" step="10" />
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `).code(`
        .s-range {
            @s.scope.only 'bare' {
                @s.ui.range;
            }
        }
        `, { type: 'CssClass' });
    vars.code('}');
    vars.code(`@s.scope 'lnf' {`);
    finalParams.lnfs.forEach((lnf) => {
        let cls = `s-range`;
        if (lnf !== finalParams.defaultLnf) {
            cls += `-${lnf}`;
        }
        vars.comment(() => `/**
            * @name           ${cls}
            * @namespace          sugar.style.ui.range
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">${lnf}</s-color>" range
            * 
            * @example        html
            * <input type="range" class="s-range ${finalParams.defaultLnf === lnf ? '' : `:${lnf}`}" min="0" max="100" step="10" />
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            .${cls} {
                @s.scope.only 'lnf' {
                    @s.ui.range($lnf: ${lnf});
                }
            }
            `, { type: 'CssClass' });
    });
    vars.code('}');
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFFSCxNQUFNLHNDQUF1QyxTQUFRLHFCQUFZO0lBQzdELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDakIsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO2FBQ3JCO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDakIsT0FBTyxFQUFFLGlCQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQzthQUN2RDtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFPa0QsMkRBQVM7QUFFNUQsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixJQUFJLEVBQUUsRUFBRSxFQUNSLFVBQVUsRUFBRSxPQUFPLElBQ2hCLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUEyQkosV0FBVyxDQUFDLElBQUk7U0FDYixHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUNULE9BQU8sMkJBQ0gsR0FBRyxLQUFLLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQ2pELHdCQUF3QixHQUFHLFlBQVksQ0FBQztJQUM1QyxDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOztVQUViLFdBQVcsQ0FBQyxJQUFJO1NBQ2IsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDVCxPQUFPLGlDQUFpQyxHQUFHOzs7dURBSTNDLFdBQVcsQ0FBQyxVQUFVLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUNqRDs7Ozt1REFLSSxXQUFXLENBQUMsVUFBVSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFDakQ7Ozs7dURBS0ksV0FBVyxDQUFDLFVBQVUsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQ2pEOzs7O2dFQUtJLFdBQVcsQ0FBQyxVQUFVLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUNqRDs7ZUFFRyxDQUFDO0lBQ0osQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQStFbEIsQ0FDQSxDQUFDO0lBRUYsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQy9CLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7TUFhUixDQUNELENBQUMsSUFBSSxDQUNGOzs7Ozs7U0FNQyxFQUNELEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVmLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUM5QixXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQzdCLElBQUksR0FBRyxHQUFHLFNBQVMsQ0FBQztRQUNwQixJQUFJLEdBQUcsS0FBSyxXQUFXLENBQUMsVUFBVSxFQUFFO1lBQ2hDLEdBQUcsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO1NBQ3BCO1FBRUQsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQztnQ0FDYyxHQUFHOzs7OzZEQUkwQixHQUFHOzs7bURBSWhELFdBQVcsQ0FBQyxVQUFVLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUNqRDs7Ozs7UUFLSixDQUNDLENBQUMsSUFBSSxDQUNGO2VBQ0csR0FBRzs7d0NBRXNCLEdBQUc7OzthQUc5QixFQUNELEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBQ04sQ0FBQyxDQUFDLENBQUM7SUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWYsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQXhPRCw0QkF3T0MifQ==