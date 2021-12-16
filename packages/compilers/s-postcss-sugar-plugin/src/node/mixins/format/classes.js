import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';
/**
 * @name           classes
 * @namespace      node.mixins.format
 * @type           PostcssMixin
 * @platform      postcss
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
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginFormatClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    const typoFormatElements = Object.keys(__STheme.config('typo')).map((typo) => {
        return `${typo}`;
    });
    const uiFormatElements = Object.keys(__STheme.config('ui'))
        .filter((ui) => {
        const uiObj = __STheme.config('ui')[ui];
        return uiObj.formatText === true;
    })
        .map((ui) => {
        return `${ui}`;
    });
    vars.comment(() => `
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
    vars.comment(() => `
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBRUgsTUFBTSx3Q0FBeUMsU0FBUSxZQUFZO0lBQy9ELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBSUQsT0FBTyxFQUFFLHdDQUF3QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRWpFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixNQUFNLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FDL0QsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNMLE9BQU8sR0FBRyxJQUFJLEVBQUUsQ0FBQztJQUNyQixDQUFDLENBQ0osQ0FBQztJQUVGLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3RELE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFO1FBQ1gsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN4QyxPQUFPLEtBQUssQ0FBQyxVQUFVLEtBQUssSUFBSSxDQUFDO0lBQ3JDLENBQUMsQ0FBQztT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