import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';
class postcssSugarPluginUiFormClassesInterface extends __SInterface {
    static get _definition() {
        return {
            styles: {
                type: 'String[]',
                default: ['solid'],
            },
            shapes: {
                type: 'String[]',
                values: ['default', 'square', 'pill'],
                default: ['default', 'square', 'pill'],
            },
            defaultStyle: {
                type: 'String',
                default: __STheme.config('ui.input.defaultStyle'),
            },
            defaultShape: {
                type: 'String',
                default: __STheme.config('ui.input.defaultShape'),
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
export { postcssSugarPluginUiFormClassesInterface as interface };
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export function dependencies() {
    return {
        files: [`${__dirname()}/text.js`],
    };
}
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ styles: [], shapes: [], defaultStyle: 'solid', defaultShape: 'default', scope: [] }, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Text Input
        * @namespace          sugar.css.ui.input
        * @type               Styleguide
        * @menu           Styleguide / Forms        /styleguide/forms/text-input
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some styles to your text input
        * 
        ${finalParams.styles
        .map((style) => {
        return ` * @cssClass     s-input${finalParams.defaultStyle === style ? '' : `:${style}`}           Apply the ${style} input style`;
    })
        .join('\n')}
        ${finalParams.shapes
        .map((shape) => {
        return ` * @cssClass     s-input${finalParams.defaultShape === shape ? '' : `:${shape}`}           Apply the ${shape} input shape`;
    })
        .join('\n')}
        * 
        ${finalParams.styles
        .map((style) => {
        return ` * @example        html       ${style}
            *   <label class="s-label s-mbe:30">
            *       ${__faker.name.findName()}
            *       <input type="text" placeholder="Type something!" class="s-input\:${style} s-width:40" />
            *   </label>
            *   <label class="s-label s-mbe:30">
            *       ${__faker.name.findName()}
            *       <input type="text" placeholder="Type something!" class="s-input\:${style} s-width:40 s-color:accent" />
            *   </label>
            *   <label class="s-label s-mbe:30">
            *        ${__faker.name.findName()}
            *       <input type="text" placeholder="Type something!" class="s-input\:${style} s-width:40 s-color:complementary" />
            *   </label>
            *   <label class="s-label s-mbe:30">
            *        ${__faker.name.findName()}
            *       <input type="text" placeholder="Type something!" class="s-input\:${style} s-width:40 s-color:error" />
            *   </label>
            *   <label dir="rtl" class="s-label s-mbe:30">
            *        ${__faker.name.findName()}
            *       <input type="text" placeholder="Type something! (RTL)" class="s-input\:${style} s-width:40 s-color:accent" />
            *   </label>
            *   <label class="s-label s-mbe:30">
            *        ${__faker.name.findName()}
            *       <input type="text" placeholder="Type something!" class="s-input\:${style} s-width:40 s-scale\:15 s-color:accent" />
            *   </label>
            * `;
    })
        .join('\n')}
        *
        ${finalParams.shapes
        .map((shape) => {
        return ` * @example        html       ${shape}
            *   <label class="s-label s-mbe:30">
            *       ${__faker.name.findName()}
            *       <input type="text" placeholder="Type something!" class="s-input\:${shape} s-width:40" />
            *   </label>
            *   <label class="s-label s-mbe:30">
            *       ${__faker.name.findName()}
            *       <input type="text" placeholder="Type something!" class="s-input\:${shape} s-width:40 s-color:accent" />
            *   </label>
            *   <label class="s-label s-mbe:30">
            *        ${__faker.name.findName()}
            *       <input type="text" placeholder="Type something!" class="s-input\:${shape} s-width:40 s-color:complementary" />
            *   </label>
            * `;
    })
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    if (finalParams.scope.includes('bare')) {
        vars.comment(() => `/**
        * @name           s-input
        * @namespace      sugar.css.ui.input
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>bare</yellow>" input
        * 
        * @example        html
        * <input type="text" class="s-input" placeholder="Hello world" />
      */
     `).code(`
        .s-input {
            @sugar.ui.input($scope: bare);
        }
        `);
    }
    if (finalParams.scope.includes('lnf')) {
        finalParams.styles.forEach((style) => {
            const isDefaultStyle = finalParams.defaultStyle === style;
            const styleCls = isDefaultStyle ? '' : `.s-input--${style}`;
            const cls = `.s-input${styleCls}`;
            vars.comment(() => `/**
            * @name           ${cls}
            * @namespace      sugar.css.ui.input
            * @type           CssClass
            * 
            * This class represent a(n) "<yellow>${style}</yellow>" input
            * 
            * @example        html
            * <input type="text" class="${cls.trim()}" placeholder="Hello world" />
        */`).code([
                `${cls} {`,
                ` @sugar.ui.input($style: ${style}, $scope: lnf);`,
                `}`,
            ].join('\n'));
        });
    }
    if (finalParams.scope.includes('shape')) {
        finalParams.shapes.forEach((shape) => {
            const isDefaultShape = finalParams.defaultShape === shape;
            const shapeCls = isDefaultShape ? '' : `.s-input--${shape}`;
            const cls = `.s-input${shapeCls}`;
            vars.comment(() => `/**
            * @name           ${cls}
            * @namespace      sugar.css.ui.input
            * @type           CssClass
            * 
            * This class represent a(n) "<yellow>${shape}</yellow>" input
            * 
            * @example        html
            * <input type="text" class="${cls.trim()}" placeholder="Hello world" />
        */`).code([
                `${cls} {`,
                ` @sugar.ui.input($shape: ${shape}, $scope: shape);`,
                `}`,
            ].join('\n'));
        });
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCLE1BQU0sd0NBQXlDLFNBQVEsWUFBWTtJQUMvRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxVQUFVO2dCQUNoQixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7YUFDckI7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDO2dCQUNyQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQzthQUN6QztZQUNELFlBQVksRUFBRTtnQkFDVixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQzthQUNwRDtZQUNELFlBQVksRUFBRTtnQkFDVixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQzthQUNwRDtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCO2dCQUNELE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7Z0JBQzVDLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7YUFD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