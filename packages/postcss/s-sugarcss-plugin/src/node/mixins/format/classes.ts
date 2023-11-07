import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';

/**
 * @name           classes
 * @as          @s.format.classes
 * @namespace      node.mixin.format
 * @type           PostcssMixin
 * @platform      postcss
 * @status        alpha
 *
 * This mixin generate the documentation for the usage of the .s-format:... classes
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.format.classes
 *
 * @example        css
 * @s.format.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginFormatClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface ISSugarcssPluginFormatClassesParams {}

export { SSugarcssPluginFormatClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<ISSugarcssPluginFormatClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginFormatClassesParams = {
        ...params,
    };

    const vars = new CssVars();

    const typoFormatElements = Object.keys(__STheme.get('typo')).map((typo) => {
        return `${typo}`;
    });

    const uiFormatElements = Object.keys(__STheme.get('ui'))
        .filter((ui) => {
            const uiObj = __STheme.get('ui')[ui];
            return uiObj.formatText === true;
        })
        .map((ui) => {
            return `${ui}`;
        });

    vars.comment(
        () => `
      /**
        * @name          Format text
        * @namespace          sugar.style.helpers.format
        * @type               CssClass
        * @menu           Styleguide / Tools        /styleguide/tools/format-text
        * @platform       css
        * @status       beta
        * 
        * This class allows you to apply some formatting to pure HTMLElement that are scoped into.
        * For example, a simple \`ul\` tag will be styled as if the \`s-list:ul\` class would be applied on it
        * when it is scoped inside the \`s-format:text\` class.
        * This feature has to be implemented using the \`@s.format.text\` mixin on the elements you
        * want to support the text formatting.
        * 
        ${typoFormatElements.map((typo) => {
            return ` * @feature         \`${typo}\` typo supported`;
        })}
        ${uiFormatElements.map((typo) => {
            return ` * @feature         \`${typo}\` UI supported`;
        })}
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * @s.format.classes;
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
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    const typoRhythmElements = Object.keys(__STheme.get('typo'))
        .filter((typo) => {
            const typoObj = __STheme.get('typo')[typo];
            return typoObj.rhythmVertical !== undefined;
        })
        .map((typo) => {
            return `${typo}`;
        });

    const uiRhythmElements = Object.keys(__STheme.get('ui'))
        .filter((ui) => {
            const uiObj = __STheme.get('ui')[ui];
            return uiObj.rhythmVertical !== undefined;
        })
        .map((ui) => {
            return `${ui}`;
        });

    vars.comment(
        () => `
      /**
        * @name          Rhythm vertical
        * @namespace          sugar.style.helpers.format
        * @type               CssClass
        * @menu           Styleguide / Tools        /styleguide/tools/rhythm-vertical
        * @platform       css
        * @status       beta
        * 
        * This class allows you to apply some margins to make space between direct childs.
        * This feature has to be implemented using the \`@s.rhythm.vertical\` mixin on the elements you
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
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    return vars;
}
