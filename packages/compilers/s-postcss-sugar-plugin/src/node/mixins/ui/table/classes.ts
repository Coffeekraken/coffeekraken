import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';

class postcssSugarPluginUiTableClassesInterface extends __SInterface {
    static definition = {
        styles: {
            type: 'String[]',
            default: ['solid'],
        },
        defaultColor: {
            type: 'String',
            default: __theme().config('ui.table.defaultColor'),
        },
        defaultStyle: {
            type: 'String',
            values: ['solid'],
            default: __theme().config('ui.table.defaultStyle'),
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

export interface IPostcssSugarPluginUiTableClassesParams {
    styles: 'solid'[];
    defaultColor: string;
    defaultStyle: 'solid';
    scope: ('bare' | 'lnf' | 'tf' | 'vr')[];
}

export { postcssSugarPluginUiTableClassesInterface as interface };

export default function ({
    params,
    atRule,
    jsObjectToCssProperties,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiTableClassesParams>;
    atRule: any;
    jsObjectToCssProperties: Function;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiTableClassesParams = {
        styles: ['solid'],
        defaultColor: 'ui',
        defaultStyle: 'solid',
        scope: [],
        ...params,
    };

    const vars: string[] = [];

    finalParams.styles.forEach((style) => {
        const isDefaultStyle =
            __theme().config('ui.table.defaultStyle') === style;

        const styleCls = isDefaultStyle ? '' : `.s-table--${style}`;
        const cls = `.s-table${styleCls}`;

        vars.push(`/**
        * @name           s-table${isDefaultStyle ? '' : `:${style}`}
        * @namespace      sugar.css.ui.table
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>${style}</yellow>" table
        * 
        * @example        html
        * <table class="s-table${isDefaultStyle ? '' : `:${style}`}">
        *   <tr>
        *       <th>Hello</th>
        *       <th>World</th>
        *   </tr>
        *   <tr>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *   </tr>
        *   <tr>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *   </tr>
        * </table>
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */`);
        vars.push(`
            ${cls} {
                @sugar.color(${finalParams.defaultColor});
                @sugar.ui.table($style: ${style}, $scope: '${finalParams.scope.join(
            ',',
        )}');
            }`);
    });

    vars.push(`/**
        * @name           s-format:text
        * @namespace      sugar.css.ui.table
        * @type           CssClass
        * 
        * This class represent a simple table tag in the s-format:text scope
        * 
        * @example        html
        * <div class="s-format\:text">
        *   <table>
        *   <tr>
        *       <th>Hello</th>
        *       <th>World</th>
        *   </tr>
        *   <tr>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *   </tr>
        *   <tr>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *   </tr>
        * </table>
        * </div>
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
        @sugar.format.text {
          table {
              @sugar.color(${__theme().config('ui.table.defaultColor')});
              @sugar.ui.table;
          }
        } 
    `);

    vars.push(`/**
        * @name           s-rhythm:vertical
        * @namespace      sugar.css.ui.table
        * @type           CssClass
        * 
        * This class represent some tables in the s-rhythm:vertical scope
        * 
        * @feature      Vertical rhythm
        * 
        * @example        html
        * <div class="s-rhythm:vertical">
        * <table class="s-table">
        *   <tr>
        *       <th>Hello</th>
        *       <th>World</th>
        *   </tr>
        *   <tr>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *   </tr>
        *   <tr>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *   </tr>
        * </table>
        * <table class="s-table">
        *   <tr>
        *       <th>Hello</th>
        *       <th>World</th>
        *   </tr>
        *   <tr>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *   </tr>
        *   <tr>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *   </tr>
        * </table>
        * </div>
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
        @sugar.rhythm.vertical {
          table, .s-table {
              ${jsObjectToCssProperties(
                  __theme().config('ui.table.rhythmVertical'),
              )}
          }
        } 
    `);

    replaceWith(vars);
}
