import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';

/**
 * @name           classes
 * @namespace      node.mixins.format
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate the documentation for the usage of the .s-format:... classes
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.format.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginFormatClassesInterface extends __SInterface {
    static definition = {};
}

export interface IPostcssSugarPluginFormatClassesParams {}

export { postcssSugarPluginFormatClassesInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginFormatClassesParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginFormatClassesParams = {
        ...params,
    };

    const vars: string[] = [];

    const typoFormatElements = Object.keys(__STheme.config('typo')).map(
        (typo) => {
            return `${typo}`;
        },
    );

    const uiFormatElements = Object.keys(__STheme.config('ui'))
        .filter((ui) => {
            const uiObj = __STheme.config('ui')[ui];
            return uiObj.formatText === true;
        })
        .map((ui) => {
            return `${ui}`;
        });

    vars.push(`
      /**
        * @name          Format text
        * @namespace          sugar.css.font
        * @type               CssClass
        * @menu           Styleguide / Tools        /styleguide/tools/format-text
        * @platform       css
        * @status       beta
        * 
        * This class allows you to apply some formatting to pure HTMLElement that are scoped into.
        * For example, a simple \`ul\` tag will be styled as if the \`s-list:ul\` class would be applied on it
        * when it is scoped inside the \`s-format:text\` class.
        * This feature has to be implemented using the \`@sugar.format.text\` mixin on the elements you
        * want to support the text formatting.
        * 
        ${typoFormatElements.map((typo) => {
            return ` * @feature         \`${typo}\` typo supported`;
        })}
        ${uiFormatElements.map((typo) => {
            return ` * @feature         \`${typo}\` UI supported`;
        })}
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @cssClass               s-format:text             Apply the text formatting to childs elements like \`ul\`, \`ol\`, \`p\`, \`h1\`, \`h2\`, etc... HTML tags
        * 
        * @example        html
        * <!-- block -->
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Text format</h3>
        *   <div class="s-format:text s-rhythm:vertical">
        *       <h1>${__faker.name.findName()}</h1>
        *       <p>${__faker.lorem.sentence()}</p>
        *       <ul>
        *           <li>${__faker.name.findName()}</li>
        *           <li>${__faker.name.findName()}</li>
        *           <li>${__faker.name.findName()}</li>
        *       </ul>
        *       <blockquote>
        *           ${__faker.lorem.paragraph()}
        *       </blockquote>
        *       <table>
        *           <tr>
        *               <th>Hello</th>
        *               <th>World</th>
        *           </tr>
        *           <tr>
        *               <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *               <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *           </tr>
        *           <tr>
        *               <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *               <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *           </tr>
        *       </table>
        *       <ol>
        *           <li>${__faker.name.findName()}</li>
        *           <li>${__faker.name.findName()}</li>
        *           <li>${__faker.name.findName()}</li>
        *       </ol>
        *       <select>
        *           <option>${__faker.name.findName()}</option>
        *           <option>${__faker.name.findName()}</option>
        *           <option>${__faker.name.findName()}</option>
        *       </select>
        *       <br />
        *       <button>${__faker.name.findName()}</button>
        *   </div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);

    const typoRhythmElements = Object.keys(__STheme.config('typo'))
        .filter((typo) => {
            const typoObj = __STheme.config('typo')[typo];
            return typoObj.rhythmVertical !== undefined;
        })
        .map((typo) => {
            return `${typo}`;
        });

    const uiRhythmElements = Object.keys(__STheme.config('ui'))
        .filter((ui) => {
            const uiObj = __STheme.config('ui')[ui];
            return uiObj.rhythmVertical !== undefined;
        })
        .map((ui) => {
            return `${ui}`;
        });

    vars.push(`
      /**
        * @name          Rhythm vertical
        * @namespace          sugar.css.font
        * @type               CssClass
        * @menu           Styleguide / Tools        /styleguide/tools/rhythm-vertical
        * @platform       css
        * @status       beta
        * 
        * This class allows you to apply some margins to make space between direct childs.
        * This feature has to be implemented using the \`@sugar.rhythm.vertical\` mixin on the elements you
        * want to support the rhythm vertical.
        * 
        ${typoRhythmElements.map((typo) => {
            return ` * @feature         \`${typo}\` typo supported`;
        })}
        ${uiRhythmElements.map((typo) => {
            return ` * @feature         \`${typo}\` UI supported`;
        })}
        * 
        * @cssClass               s-rhythm:vertical             Apply the rhythm vertical to direct childs elements like \`ul\`, \`ol\`, \`p\`, \`h1\`, \`h2\`, etc... HTML tags
        * 
        * @example        html
        * <!-- block -->
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Rhythm vertical</h3>
        *   <div class="s-format:text s-rhythm:vertical">
        *       <h1>${__faker.name.findName()}</h1>
        *       <p>${__faker.lorem.sentence()}</p>
        *       <ul>
        *           <li>${__faker.name.findName()}</li>
        *           <li>${__faker.name.findName()}</li>
        *           <li>${__faker.name.findName()}</li>
        *       </ul>
        *       <blockquote>
        *           ${__faker.lorem.paragraph()}
        *       </blockquote>
        *       <table>
        *           <tr>
        *               <th>Hello</th>
        *               <th>World</th>
        *           </tr>
        *           <tr>
        *               <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *               <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *           </tr>
        *           <tr>
        *               <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *               <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *           </tr>
        *       </table>
        *       <ol>
        *           <li>${__faker.name.findName()}</li>
        *           <li>${__faker.name.findName()}</li>
        *           <li>${__faker.name.findName()}</li>
        *       </ol>
        *       <select>
        *           <option>${__faker.name.findName()}</option>
        *           <option>${__faker.name.findName()}</option>
        *           <option>${__faker.name.findName()}</option>
        *       </select>
        *       <br />
        *       <button>${__faker.name.findName()}</button>
        *   </div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);

    return vars;
}
