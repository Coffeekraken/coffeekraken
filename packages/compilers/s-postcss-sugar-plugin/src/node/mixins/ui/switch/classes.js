var _a;
import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';
class postcssSugarPluginUiSwitchClassesMixinInterface extends __SInterface {
}
postcssSugarPluginUiSwitchClassesMixinInterface.definition = {
    styles: {
        type: 'String[]',
        values: ['solid'],
        default: ['solid'],
    },
    defaultColor: {
        type: 'String',
        default: __STheme.config('ui.switch.defaultColor'),
    },
    defaultStyle: {
        type: 'String',
        values: ['solid'],
        default: (_a = __STheme.config('ui.switch.defaultStyle')) !== null && _a !== void 0 ? _a : 'solid',
    },
    scope: {
        type: {
            type: 'Array<String>',
            splitChars: [',', ' '],
        },
        values: ['bare', 'lnf', 'tf'],
        default: ['bare', 'lnf', 'tf'],
    },
};
export { postcssSugarPluginUiSwitchClassesMixinInterface as interface };
export default function ({ params, atRule, applyNoScopes, replaceWith, }) {
    const finalParams = Object.assign({ styles: ['solid'], defaultColor: 'ui', defaultStyle: 'solid', scope: [] }, params);
    finalParams.scope = applyNoScopes(finalParams.scope);
    const vars = [];
    vars.push(`
      /**
        * @name          Switch
        * @namespace          sugar.css.ui
        * @type               Styleguide
        * @menu           Styleguide / Forms        /styleguide/form/switch
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to style checkbox HTMLElement as switches
        * 
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
        return ` * @cssClass     s-switch${style === finalParams.defaultStyle ? '' : `:${style}`}           Apply the ${style} switch style`;
    })
        .join('\n')}
        * 
        * @example        html
        ${finalParams.styles
        .map((style) => {
        return ` * <!-- ${style} style -->
            * <div class="s-font:30 s-mbe:50">
            *   <h3 class="s-tc:accent s-font:30 s-mb\:20">${style} style</h3>
            *   <label class="s-mbe:30 s-label">
            *     ${__faker.name.title()} ${__faker.name.findName()}
            *     <input type="checkbox" ${Math.random() > 0.5 ? 'checked' : ''} class="s-switch${style === finalParams.defaultStyle ? '' : `:${style}`}" />
            *   </label>
            *   <label class="s-mbe:30 s-label">
            *     ${__faker.name.title()} ${__faker.name.findName()}
            *     <input type="checkbox" ${Math.random() > 0.5 ? 'checked' : ''} class="s-switch${style === finalParams.defaultStyle ? '' : `:${style}`} s-color:accent" />
            *   </label>
            *   <label class="s-mbe:30 s-label">
            *     ${__faker.name.title()} ${__faker.name.findName()}
            *     <input type="checkbox" ${Math.random() > 0.5 ? 'checked' : ''} class="s-switch${style === finalParams.defaultStyle ? '' : `:${style}`} s-color:complementary" />
            *   </label>
            *   <label class="s-mbe:30 s-label">
            *     ${__faker.name.title()} ${__faker.name.findName()}
            *     <input type="checkbox" ${Math.random() > 0.5 ? 'checked' : ''} class="s-switch${style === finalParams.defaultStyle ? '' : `:${style}`} s-color:error" />
            *   </label>
                <label class="s-mbe:30 s-label">
            *     ${__faker.name.title()} ${__faker.name.findName()}
            *     <input type="checkbox" disabled ${Math.random() > 0.5 ? 'checked' : ''} class="s-switch${style === finalParams.defaultStyle ? '' : `:${style}`} s-color:accent" />
            *   </label>
            * </div>
            * `;
    })
        .join('\n')}
        *
        * <!-- RTL -->
        * <div class="s-mbe:50" dir="rtl">
        *   <h3 class="s-tc:accent s-font:30 s-mb\:20">RTL Support</h3>
        *   <label class="s-mbe:30 s-label">
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *     <input type="checkbox" ${Math.random() > 0.5 ? 'checked' : ''} class="s-switch s-color:accent" />
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *     <input type="checkbox" ${Math.random() > 0.5 ? 'checked' : ''} class="s-switch s-color:accent" />
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *     <input type="checkbox" ${Math.random() > 0.5 ? 'checked' : ''} class="s-switch s-color:accent" />
        *   </label>
        * </div>
        * 
        * <!-- scales -->
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mb\:20">Scales</h3>
        *   <label class="s-mbe:30 s-label s-scale\:05">
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *     <input type="checkbox" ${Math.random() > 0.5 ? 'checked' : ''} class="s-switch s-color:accent" />
        *   </label>
        *   <label class="s-mbe:30 s-label s-scale\:10">
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *     <input type="checkbox" ${Math.random() > 0.5 ? 'checked' : ''} class="s-switch s-color:accent" />
        *   </label>
        *   <label class="s-mbe:30 s-label s-scale\:15">
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *     <input type="checkbox" ${Math.random() > 0.5 ? 'checked' : ''} class="s-switch s-color:accent" />
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
        * @feature      Vertical rhythm
        * 
        * @example        html
        * <label class="s-label">
        *   <input type="checkbox" class="${cls.replace(/\./gm, ' ').trim()}" />
        *   ${__faker.name.findName()}
        * </label>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
      .${cls.replace('\n', '--')} {
        @sugar.color(${finalParams.defaultColor});
        @sugar.ui.switch($style: ${style}, $scope: '${finalParams.scope.join(',')}');
        ${__STheme.jsObjectToCssProperties(__STheme.config('ui.switch.rhythmVertical'))}
      }
    `);
    });
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sT0FBTyxNQUFNLE9BQU8sQ0FBQztBQUU1QixNQUFNLCtDQUFnRCxTQUFRLFlBQVk7O0FBQy9ELDBEQUFVLEdBQUc7SUFDaEIsTUFBTSxFQUFFO1FBQ0osSUFBSSxFQUFFLFVBQVU7UUFDaEIsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQ2pCLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQztLQUNyQjtJQUNELFlBQVksRUFBRTtRQUNWLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUM7S0FDckQ7SUFDRCxZQUFZLEVBQUU7UUFDVixJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztRQUNqQixPQUFPLEVBQUUsTUFBQSxRQUFRLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDLG1DQUFJLE9BQU87S0FDaEU7SUFDRCxLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUU7WUFDRixJQUFJLEVBQUUsZUFBZTtZQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO1NBQ3pCO1FBQ0QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUM7UUFDN0IsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUM7S0FDakM7Q0FDSixDQUFDO0FBVU4sT0FBTyxFQUFFLCtDQUErQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRXhFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixhQUFhLEVBQ2IsV0FBVyxHQU1kO0lBQ0cs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