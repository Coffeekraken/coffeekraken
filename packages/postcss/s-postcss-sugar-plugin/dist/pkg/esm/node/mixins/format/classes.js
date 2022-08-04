import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';
/**
 * @name           classes
 * @namespace      node.mixin.format
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate the documentation for the usage of the .s-format:... classes
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * \@sugar.format.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginFormatClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginFormatClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
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
    vars.comment(() => `
      /**
        * @name          Format text
        * @namespace          sugar.style.font
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
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
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
    vars.comment(() => `
      /**
        * @name          Rhythm vertical
        * @namespace          sugar.style.font
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
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sT0FBTyxNQUFNLE9BQU8sQ0FBQztBQUU1Qjs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUVILE1BQU0sd0NBQXlDLFNBQVEsWUFBWTtJQUMvRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUlELE9BQU8sRUFBRSx3Q0FBd0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVqRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUN0RSxPQUFPLEdBQUcsSUFBSSxFQUFFLENBQUM7SUFDckIsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNuRCxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRTtRQUNYLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDckMsT0FBTyxLQUFLLENBQUMsVUFBVSxLQUFLLElBQUksQ0FBQztJQUNyQyxDQUFDLENBQUM7U0FD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