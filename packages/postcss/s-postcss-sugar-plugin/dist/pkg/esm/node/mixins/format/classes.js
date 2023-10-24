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
    `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sT0FBTyxNQUFNLE9BQU8sQ0FBQztBQUU1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUVILE1BQU0sd0NBQXlDLFNBQVEsWUFBWTtJQUMvRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUlELE9BQU8sRUFBRSx3Q0FBd0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVqRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUN0RSxPQUFPLEdBQUcsSUFBSSxFQUFFLENBQUM7SUFDckIsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNuRCxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRTtRQUNYLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDckMsT0FBTyxLQUFLLENBQUMsVUFBVSxLQUFLLElBQUksQ0FBQztJQUNyQyxDQUFDLENBQUM7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