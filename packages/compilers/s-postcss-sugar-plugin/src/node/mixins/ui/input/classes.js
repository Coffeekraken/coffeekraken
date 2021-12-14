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
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ styles: [], shapes: [], defaultStyle: 'solid', defaultShape: 'default', scope: [] }, params);
    const vars = [
        `
  `,
    ];
    vars.push(`
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
        * @example        html
        ${finalParams.styles
        .map((style) => {
        return ` * <!-- ${style} style -->
            * <div class="s-mbe:50">
            *   <h3 class="s-tc:accent s-font:30 s-mbe:30">${style} style</h3>
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
            * </div>
            * `;
    })
        .join('\n')}
        *
        * <!-- Shapes -->
        ${finalParams.shapes
        .map((shape) => {
        return ` * <!-- ${shape} shape -->
            * <div class="s-mbe:50">
            *   <h3 class="s-tc:accent s-font:30 s-mbe:30">${shape} shape</h3>
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
            * </div>
            * `;
    })
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    if (finalParams.scope.includes('bare')) {
        vars.push(`/**
        * @name           s-input
        * @namespace      sugar.css.ui.input
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>bare</yellow>" input
        * 
        * @example        html
        * <input type="text" class="s-input" placeholder="Hello world" />
      */
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
            vars.push(`/**
            * @name           ${cls}
            * @namespace      sugar.css.ui.input
            * @type           CssClass
            * 
            * This class represent a(n) "<yellow>${style}</yellow>" input
            * 
            * @example        html
            * <input type="text" class="${cls.trim()}" placeholder="Hello world" />
        */`);
            vars.push([
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
            vars.push(`/**
            * @name           ${cls}
            * @namespace      sugar.css.ui.input
            * @type           CssClass
            * 
            * This class represent a(n) "<yellow>${shape}</yellow>" input
            * 
            * @example        html
            * <input type="text" class="${cls.trim()}" placeholder="Hello world" />
        */`);
            vars.push([
                `${cls} {`,
                ` @sugar.ui.input($shape: ${shape}, $scope: shape);`,
                `}`,
            ].join('\n'));
        });
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCLE1BQU0sd0NBQXlDLFNBQVEsWUFBWTtJQUMvRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxVQUFVO2dCQUNoQixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7YUFDckI7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDO2dCQUNyQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQzthQUN6QztZQUNELFlBQVksRUFBRTtnQkFDVixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQzthQUNwRDtZQUNELFlBQVksRUFBRTtnQkFDVixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQzthQUNwRDtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCO2dCQUNELE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7Z0JBQzVDLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7YUFD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