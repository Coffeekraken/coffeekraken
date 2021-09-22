import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
import __faker from 'faker';

class postcssSugarPluginUiSwitchClassesMixinInterface extends __SInterface {
    static definition = {
        styles: {
            type: 'String[]',
            values: ['solid'],
            default: ['solid'],
        },
        defaultColor: {
            type: 'String',
            default: __theme().config('ui.switch.defaultColor'),
        },
        defaultStyle: {
            type: 'String',
            values: ['solid'],
            default: __theme().config('ui.switch.defaultStyle') ?? 'solid',
        },
        scope: {
            type: {
                type: 'Array<String>',
                splitChars: [',', ' '],
            },
            values: ['bare', 'lnf', 'tf', 'vr'],
            default: ['bare', 'lnf', 'tf', 'vr'],
        },
    };
}

export interface IPostcssSugarPluginUiSwitchClassesMixinParams {
    styles: 'solid'[];
    defaultColor: string;
    defaultStyle: 'solid';
    scope: ('bare' | 'lnf' | 'tf' | 'vr')[];
}

export { postcssSugarPluginUiSwitchClassesMixinInterface as interface };

export default function ({
    params,
    atRule,
    applyNoScopes,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiSwitchClassesMixinParams>;
    atRule: any;
    applyNoScopes: Function;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiSwitchClassesMixinParams = {
        styles: ['solid'],
        defaultColor: 'ui',
        defaultStyle: 'solid',
        scope: [],
        ...params,
    };
    finalParams.scope = applyNoScopes(finalParams.scope);

    const vars: string[] = [];

    vars.push(`
      /**
        * @name          Switch
        * @namespace          sugar.css.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/form/switch
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to style checkbox HTMLElement as switches
        * 
        * @feature          Support for scaling through the "s-scale:..." class
        * @feature          Support for colorizing through the "s-ui:..." class
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        ${finalParams.styles
            .map((style) => {
                return ` * @cssClass     s-switch${
                    style === finalParams.defaultStyle ? '' : `:${style}`
                }           Apply the ${style} switch style`;
            })
            .join('\n')}
        * 
        * @example        html
        ${finalParams.styles
            .map((style) => {
                return ` * <!-- ${style} style -->
            * <div class="s-font:30 s-mbe:50">
            *   <h3 class="s-color:accent s-font:30 s-mb\:20">${style} style</h3>
            *   <label class="s-mbe:30 s-label">
            *     ${__faker.name.title()} ${__faker.name.findName()}
            *     <input type="checkbox" ${Math.random() > 0.5 ? 'checked' : ''} class="s-switch${
                    style === finalParams.defaultStyle ? '' : `:${style}`
                }" />
            *   </label>
            *   <label class="s-mbe:30 s-label">
            *     ${__faker.name.title()} ${__faker.name.findName()}
            *     <input type="checkbox" ${Math.random() > 0.5 ? 'checked' : ''} class="s-switch${
                    style === finalParams.defaultStyle ? '' : `:${style}`
                } s-ui\:accent" />
            *   </label>
            *   <label class="s-mbe:30 s-label">
            *     ${__faker.name.title()} ${__faker.name.findName()}
            *     <input type="checkbox" ${Math.random() > 0.5 ? 'checked' : ''} class="s-switch${
                    style === finalParams.defaultStyle ? '' : `:${style}`
                } s-ui\:complementary" />
            *   </label>
            *   <label class="s-mbe:30 s-label">
            *     ${__faker.name.title()} ${__faker.name.findName()}
            *     <input type="checkbox" ${Math.random() > 0.5 ? 'checked' : ''} class="s-switch${
                    style === finalParams.defaultStyle ? '' : `:${style}`
                } s-ui\:error" />
            *   </label>
                <label class="s-mbe:30 s-label">
            *     ${__faker.name.title()} ${__faker.name.findName()}
            *     <input type="checkbox" disabled ${Math.random() > 0.5 ? 'checked' : ''} class="s-switch${
                    style === finalParams.defaultStyle ? '' : `:${style}`
                } s-ui\:accent" />
            *   </label>
            * </div>
            * `;
            })
            .join('\n')}
        *
        * <!-- RTL -->
        * <div class="s-mbe:50" dir="rtl">
        *   <h3 class="s-color:accent s-font:30 s-mb\:20">RTL Support</h3>
        *   <label class="s-mbe:30 s-label">
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *     <input type="checkbox" ${Math.random() > 0.5 ? 'checked' : ''} class="s-switch s-ui\:accent" />
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *     <input type="checkbox" ${Math.random() > 0.5 ? 'checked' : ''} class="s-switch s-ui\:accent" />
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *     <input type="checkbox" ${Math.random() > 0.5 ? 'checked' : ''} class="s-switch s-ui\:accent" />
        *   </label>
        * </div>
        * 
        * <!-- scales -->
        * <div class="s-mbe:50">
        *   <h3 class="s-color:accent s-font:30 s-mb\:20">Scales</h3>
        *   <label class="s-mbe:30 s-label s-scale\:05">
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *     <input type="checkbox" ${Math.random() > 0.5 ? 'checked' : ''} class="s-switch s-ui\:accent" />
        *   </label>
        *   <label class="s-mbe:30 s-label s-scale\:10">
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *     <input type="checkbox" ${Math.random() > 0.5 ? 'checked' : ''} class="s-switch s-ui\:accent" />
        *   </label>
        *   <label class="s-mbe:30 s-label s-scale\:15">
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
        * <label class="s-label">
        *   <input type="checkbox" class="${cls.replace(/\./gm, ' ').trim()}" />
        *   ${__faker.name.findName()}
        * </label>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
      .${cls.replace('\n', '--')} {
        @sugar.color.remap(ui, ${finalParams.defaultColor});
        @sugar.ui.switch($style: ${style}, $scope: '${finalParams.scope.join(',')}');
      }
    `);
    });

    replaceWith(vars);
}
