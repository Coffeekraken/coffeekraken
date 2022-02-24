import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';
class postcssSugarPluginUiLabelClassesInterface extends __SInterface {
    static get _definition() {
        return {
            styles: {
                type: 'String[]',
                values: ['inline', 'block', 'float'],
                default: ['inline', 'block', 'float'],
            },
            defaultStyle: {
                type: 'String',
                values: ['inline', 'block', 'float'],
                default: __STheme.config('ui.label.defaultStyle'),
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
export { postcssSugarPluginUiLabelClassesInterface as interface };
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export function dependencies() {
    return {
        files: [`${__dirname()}/label.js`],
    };
}
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ styles: [], 
        // shapes: [],
        defaultStyle: 'inline', scope: [] }, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Labels
        * @namespace          sugar.css.ui
        * @type               Styleguide
        * @menu           Styleguide / Forms        /styleguide/forms/labels
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to structure forms using labels.
        * 
        ${finalParams.styles
        .map((style) => {
        return ` * @cssClass     s-label${style === finalParams.defaultStyle ? '' : `:${style}`}           Apply the ${style} label style`;
    })
        .join('\n')}
        * @cssClass         s-label:inline          Make sure the input and label stay inline even on mobile. Usefull for checkbox and radio for example.
        * 
        ${finalParams.styles
        .map((style) => {
        return ` * @example        html       ${style} style
            *   <label class="s-mbe:30 s-label${style === finalParams.defaultStyle ? '' : `:${style}`}">
            *     <input type="text" class="s-input s-width:40" placeholder="Type something!" />
            *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
            *   </label>
            *   <label class="s-mbe:30 s-label${style === finalParams.defaultStyle ? '' : `:${style}`}">
            *     <textarea class="s-input s-width:40" placeholder="Type something!" rows="3"></textarea>
            *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
            *   </label>
        *   <label class="s-mbe:30 s-label${style === finalParams.defaultStyle ? '' : `:${style}`}">
    *     <input type="text" disabled class="s-input s-width:40" placeholder="Type something!" />
    *     <span>I'm disabled</span>
    *   </label>
    *   <label dir="rtl" class="s-mbe:30 s-label${style === finalParams.defaultStyle ? '' : `:${style}`}">
    *     <input type="text" class="s-input s-width:40" placeholder="Type something!" />
    *     <span>Support RTL</span>
    *   </label>
    *   <label class="s-mbe:30 s-label${style === finalParams.defaultStyle ? '' : `:${style}`} s-color:accent">
    *     <input type="text" class="s-input s-width:40" placeholder="Type something!" />
    *     <span>With the accent color</span>
    *   </label>
            * `;
    })
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    finalParams.styles.forEach((style) => {
        let cls = `s-label`;
        if (style !== finalParams.defaultStyle) {
            cls += `:${style}`;
        }
        vars.comment(() => `/**
                * @name           ${cls}
                * @namespace      sugar.css.ui.label
                * @type           CssClass
                * 
                * This class represent a(n) "<s-color="accent">${style}</s-color>" label
                * 
                * @example        html
                * <label class="${cls.replace(':', ':')}">
                *   Hello world
                *   <input type="text" class="s-input" placeholder="Type something!" />
                * </label>
                * 
                * @since    2.0.0
                * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `);
        if (finalParams.scope.includes('bare')) {
            vars.code(`.s-label${finalParams.defaultStyle === style ? '' : `--${style}`} {
                @sugar.ui.label($style: ${style}, $scope: bare);
            } 
            `);
        }
        if (finalParams.scope.includes('lnf')) {
            vars.code(() => `
                .${cls.replace(':', '--')} {
                    @sugar.ui.label($style: ${style}, $scope: lnf);
                } 
            `);
        }
    });
    vars.comment(() => `/**
        * @name           s-label:responsive
        * @namespace      sugar.css.ui.input
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>responsive</yellow>" label.
        * This mean that on desktop and tablet it will be "inline", and on mobile it will be "block".
        * 
        * @example        html
        * <label class="s-label:responsive">
        *   Hello world
        *   <input type="text" class="s-input" placeholder="Hello world" />
        * </label>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `).code(`
        .s-label--responsive {
            @sugar.media(mobile) {
                @sugar.ui.label($style: block, $scope: bare);
            }
        }
        `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCLE1BQU0seUNBQTBDLFNBQVEsWUFBWTtJQUNoRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxVQUFVO2dCQUNoQixNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQztnQkFDcEMsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUM7YUFDeEM7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUM7Z0JBQ3BDLE9BQU8sRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDO2FBQ3BEO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztpQkFDekI7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztnQkFDNUMsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQzthQUNoRDtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFTRCxPQUFPLEVBQUUseUNBQXlDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFbEUsT0FBTyxTQUFTLE1BQU0scUNBQXFDLENBQUM7QUFDNUQsTUFB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