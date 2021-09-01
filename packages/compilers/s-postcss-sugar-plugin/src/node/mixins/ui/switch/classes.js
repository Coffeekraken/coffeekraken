var _a;
import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
import __faker from 'faker';
class postcssSugarPluginUiSwitchClassesMixinInterface extends __SInterface {
}
postcssSugarPluginUiSwitchClassesMixinInterface.definition = {
    styles: {
        type: 'String[]',
        values: ['solid'],
        default: ['solid'],
    },
    defaultStyle: {
        type: 'String',
        values: ['solid'],
        default: (_a = __theme().config('ui.switch.defaultStyle')) !== null && _a !== void 0 ? _a : 'solid',
    },
};
export { postcssSugarPluginUiSwitchClassesMixinInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ styles: [], defaultStyle: 'solid' }, params);
    const vars = [];
    vars.push(`
      /**
        * @name          Switches
        * @namespace          sugar.css.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/switches
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to style checkbox HTMLElement as switches
        * 
        ${finalParams.styles
        .map((style) => {
        return ` * @cssClass     s-switch${style === finalParams.defaultStyle ? '' : `\:${style}`}           Apply the ${style} switch style`;
    })
        .join('\n')}
        * 
        * @example        html
        ${finalParams.styles
        .map((style) => {
        return ` * <!-- ${style} style -->
            * <div class="s-font\:30 s-mb\:50">
            *   <h3 class="s-color\:accent s-font\:30 s-mb\:20">${style} style</h3>
            *   <label class="s-mb\:30 s-label">
            *     ${__faker.name.title()} ${__faker.name.findName()}
            *     <input type="checkbox" ${Math.random() > 0.5 ? 'checked' : ''} class="s-switch${style === finalParams.defaultStyle ? '' : `\:${style}`}" />
            *   </label>
            *   <label class="s-mb\:30 s-label">
            *     ${__faker.name.title()} ${__faker.name.findName()}
            *     <input type="checkbox" ${Math.random() > 0.5 ? 'checked' : ''} class="s-switch${style === finalParams.defaultStyle ? '' : `\:${style}`} s-ui\:accent" />
            *   </label>
            *   <label class="s-mb\:30 s-label">
            *     ${__faker.name.title()} ${__faker.name.findName()}
            *     <input type="checkbox" ${Math.random() > 0.5 ? 'checked' : ''} class="s-switch${style === finalParams.defaultStyle ? '' : `\:${style}`} s-ui\:complementary" />
            *   </label>
            *   <label class="s-mb\:30 s-label">
            *     ${__faker.name.title()} ${__faker.name.findName()}
            *     <input type="checkbox" ${Math.random() > 0.5 ? 'checked' : ''} class="s-switch${style === finalParams.defaultStyle ? '' : `\:${style}`} s-ui\:error" />
            *   </label>
            * </div>
            * `;
    })
        .join('\n')}
        *
        * 
        * <!-- scales -->
        * <div class="s-mb\:50">
        *   <h3 class="s-color\:accent s-font\:30 s-mb\:20">Scales</h3>
        *   <label class="s-mb\:30 s-label s-scale\:05">
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *     <input type="checkbox" ${Math.random() > 0.5 ? 'checked' : ''} class="s-switch s-ui\:accent" />
        *   </label>
        *   <label class="s-mb\:30 s-label s-scale\:10">
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *     <input type="checkbox" ${Math.random() > 0.5 ? 'checked' : ''} class="s-switch s-ui\:accent" />
        *   </label>
        *   <label class="s-mb\:30 s-label s-scale\:15">
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *     <input type="checkbox" ${Math.random() > 0.5 ? 'checked' : ''} class="s-switch s-ui\:accent" />
        *   </label>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    finalParams.styles.forEach((style) => {
        let cls = `s-switch`;
        if (style !== finalParams.defaultStyle) {
            cls += `\n${style}`;
        }
        vars.push(`/**
        * @name           ${cls}
        * @namespace      sugar.css.ui.switch
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">${style}</s-color>" switch
        * 
        * @example        html
        * <label class="${cls.replace(/\./gm, ' ').trim()}">
        *   <input type="checkbox" />
        *   <div></div>
        * </label>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
      .${cls.replace('\n', '--')} {
        @sugar.ui.switch($style: ${style});
      }
    `);
    });
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sT0FBTyxNQUFNLE9BQU8sQ0FBQztBQUU1QixNQUFNLCtDQUFnRCxTQUFRLFlBQVk7O0FBQy9ELDBEQUFVLEdBQUc7SUFDaEIsTUFBTSxFQUFFO1FBQ0osSUFBSSxFQUFFLFVBQVU7UUFDaEIsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQ2pCLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQztLQUNyQjtJQUNELFlBQVksRUFBRTtRQUNWLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQ2pCLE9BQU8sRUFBRSxNQUFBLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxtQ0FBSSxPQUFPO0tBQ2pFO0NBQ0osQ0FBQztBQVFOLE9BQU8sRUFBRSwrQ0FBK0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUV4RSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLE1BQU0sRUFBRSxFQUFFLEVBQ1YsWUFBWSxFQUFFLE9BQU8sSUFDbEIsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7VUFXSixXQUFXLENBQUMsTUFBTTtTQUNmLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ1gsT0FBTyw0QkFDSCxLQUFLLEtBQUssV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssRUFDeEQsd0JBQXdCLEtBQUss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