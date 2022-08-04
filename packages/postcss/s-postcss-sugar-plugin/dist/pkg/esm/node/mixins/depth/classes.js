import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __keysFirst from '@coffeekraken/sugar/shared/array/keysFirst';
/**
 * @name           classes
 * @namespace      node.mixin.depth
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to generate all the depth helper classes like s-depth:20, etc...
 *
 * @return        {Css}        The generated css
 *
 * @example        css
 * \@sugar.depth.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginDepthClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginDepthClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const depthsObj = __STheme.get('depth');
    const depthsArray = __keysFirst(Object.keys(depthsObj), ['default']);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Depth
        * @namespace          sugar.style.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/depth
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some depth shadows to any HTMLElement.
        * These depths are defined in the theme configuration under \`theme.depth\` namespace.
        * 
        * @support      chromium        
        * @support      firefox         
        * @support      safari          
        * @support      edge           
        * 
        ${depthsArray
        .map((depthName) => {
        return [
            ` * @cssClass          s-depth:${depthName}      Apply the depth ${depthName} to any HTMLElement`,
            ` * @cssClass          s-depth:text:${depthName}      Apply the text depth ${depthName} to any HTMLElement`,
            ` * @cssClass          s-depth:box:${depthName}      Apply the depth ${depthName} to any HTMLElement`,
        ].join('\n');
    })
        .join('\n')}
        *
        ${depthsArray
        .map((depthName) => {
        return ` * @example          html        Depth ${depthName}
                <div class="s-depth:${depthName} s-bg:main-surface s-width:40 s-ratio:16-9 s-text:center s-radius s-p:30 @tablet s-width:60 @mobile s-width:100">
                    <span class="s-depth:text:${depthName}">s-depth:${depthName}</span>
                </div>`;
    })
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    depthsArray.forEach((depthName) => {
        vars.comment(() => `/**
                * @name          s-depth:${depthName === 'default' ? '' : depthName}
                * @namespace          sugar.style.depth
                * @type               CssClass
                * @platform         css
                * @status           beta
                * 
                * This class allows you to apply a "<yellow>${depthName}</yellow>" depth style to any HTMLElement
                * 
                * @example        html
                * <a class="s-btn s-btn--accent s-depth:${depthName === 'default' ? '' : depthName}">I'm a cool depth button</a>
                */
                `).code(`
.s-depth${depthName === 'default' ? '' : `--${depthName}`}:not(.s-depth--text),
.s-depth--box.s-depth--${depthName === 'default' ? '' : `--${depthName}`} {
    @sugar.depth('${depthName}');
}`, { type: 'CssClass' });
    });
    depthsArray.forEach((depthName) => {
        vars.comment(() => `/**
                * @name          s-depth:text:${depthName === 'default' ? '' : depthName}
                * @namespace          sugar.style.depth
                * @type               CssClass
                * @platform         css
                * @status           beta
                * 
                * This class allows you to apply a "<yellow>${depthName}</yellow>" depth style to any text
                * 
                * @example        html
                * <a class="s-btn s-btn--accent s-depth:text:${depthName === 'default' ? '' : depthName}">I'm a cool depth button</a>
                */
                `).code(`
.s-depth--text.s-depth${depthName === 'default' ? '' : `--${depthName}`} {
    @sugar.depth(${depthName}, $type: text);
}`, { type: 'CssClass' });
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sV0FBVyxNQUFNLDRDQUE0QyxDQUFDO0FBRXJFOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBRUgsTUFBTSx1Q0FBd0MsU0FBUSxZQUFZO0lBQzlELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBSUQsT0FBTyxFQUFFLHVDQUF1QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRWhFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN4QyxNQUFNLFdBQVcsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFFckUsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztVQWlCSixXQUFXO1NBQ1IsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDZixPQUFPO1lBQ0gsaUNBQWlDLFNBQVMseUJBQXlCLFNBQVMscUJBQXFCO1lBQ2pHLHNDQUFzQyxTQUFTLDhCQUE4QixTQUFTLHFCQUFxQjtZQUMzRyxxQ0FBcUMsU0FBUyx5QkFBeUIsU0FBUyxxQkFBcUI7U0FDeEcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakIsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7VUFFYixXQUFXO1NBQ1IsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDZixPQUFPLDBDQUEwQyxTQUFTO3NDQUNwQyxTQUFTO2dEQUNDLFNBQVMsYUFBYSxTQUFTO3VCQUN4RCxDQUFDO0lBQ1osQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7S0FLbEIsQ0FDQSxDQUFDO0lBRUYsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQzlCLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7MkNBRUUsU0FBUyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUNuQzs7Ozs7OzhEQU04QyxTQUFTOzs7MERBSW5ELFNBQVMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FDbkM7O2lCQUVDLENBQ1IsQ0FBQyxJQUFJLENBQ0Y7VUFDRixTQUFTLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxFQUFFO3lCQUNoQyxTQUFTLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxFQUFFO29CQUNwRCxTQUFTO0VBQzNCLEVBQ1UsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztJQUVILFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUM5QixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDO2dEQUVFLFNBQVMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FDbkM7Ozs7Ozs4REFNOEMsU0FBUzs7OytEQUluRCxTQUFTLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQ25DOztpQkFFQyxDQUNSLENBQUMsSUFBSSxDQUNGO3dCQUNZLFNBQVMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLEVBQUU7bUJBQ3BELFNBQVM7RUFDMUIsRUFDVSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FDdkIsQ0FBQztJQUNOLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9