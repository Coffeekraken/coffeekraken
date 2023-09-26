"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const faker_1 = __importDefault(require("faker"));
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
 * \@s.format.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginFormatClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = postcssSugarPluginFormatClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    const typoFormatElements = Object.keys(s_theme_1.default.get('typo')).map((typo) => {
        return `${typo}`;
    });
    const uiFormatElements = Object.keys(s_theme_1.default.get('ui'))
        .filter((ui) => {
        const uiObj = s_theme_1.default.get('ui')[ui];
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
        * \\@s.format.classes;
        * 
        * @cssClass               s-format:text             Apply the text formatting to childs elements like \`ul\`, \`ol\`, \`p\`, \`h1\`, \`h2\`, etc... HTML tags
        * 
        * @example        html
        * <!-- block -->
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Text format</h3>
        *   <div class="s-format:text s-rhythm:vertical">
        *       <h1>${faker_1.default.name.findName()}</h1>
        *       <p>${faker_1.default.lorem.sentence()}</p>
        *       <ul>
        *           <li>${faker_1.default.name.findName()}</li>
        *           <li>${faker_1.default.name.findName()}</li>
        *           <li>${faker_1.default.name.findName()}</li>
        *       </ul>
        *       <blockquote>
        *           ${faker_1.default.lorem.paragraph()}
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
        *           <li>${faker_1.default.name.findName()}</li>
        *           <li>${faker_1.default.name.findName()}</li>
        *           <li>${faker_1.default.name.findName()}</li>
        *       </ol>
        *       <select>
        *           <option>${faker_1.default.name.findName()}</option>
        *           <option>${faker_1.default.name.findName()}</option>
        *           <option>${faker_1.default.name.findName()}</option>
        *       </select>
        *       <br />
        *       <button>${faker_1.default.name.findName()}</button>
        *   </div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    const typoRhythmElements = Object.keys(s_theme_1.default.get('typo'))
        .filter((typo) => {
        const typoObj = s_theme_1.default.get('typo')[typo];
        return typoObj.rhythmVertical !== undefined;
    })
        .map((typo) => {
        return `${typo}`;
    });
    const uiRhythmElements = Object.keys(s_theme_1.default.get('ui'))
        .filter((ui) => {
        const uiObj = s_theme_1.default.get('ui')[ui];
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
        *       <h1>${faker_1.default.name.findName()}</h1>
        *       <p>${faker_1.default.lorem.sentence()}</p>
        *       <ul>
        *           <li>${faker_1.default.name.findName()}</li>
        *           <li>${faker_1.default.name.findName()}</li>
        *           <li>${faker_1.default.name.findName()}</li>
        *       </ul>
        *       <blockquote>
        *           ${faker_1.default.lorem.paragraph()}
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
        *           <li>${faker_1.default.name.findName()}</li>
        *           <li>${faker_1.default.name.findName()}</li>
        *           <li>${faker_1.default.name.findName()}</li>
        *       </ol>
        *       <select>
        *           <option>${faker_1.default.name.findName()}</option>
        *           <option>${faker_1.default.name.findName()}</option>
        *           <option>${faker_1.default.name.findName()}</option>
        *       </select>
        *       <br />
        *       <button>${faker_1.default.name.findName()}</button>
        *   </div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0Msa0RBQTRCO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBRUgsTUFBTSx3Q0FBeUMsU0FBUSxxQkFBWTtJQUMvRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUlvRCw2REFBUztBQUU5RCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixNQUFNLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUN0RSxPQUFPLEdBQUcsSUFBSSxFQUFFLENBQUM7SUFDckIsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbkQsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUU7UUFDWCxNQUFNLEtBQUssR0FBRyxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNyQyxPQUFPLEtBQUssQ0FBQyxVQUFVLEtBQUssSUFBSSxDQUFDO0lBQ3JDLENBQUMsQ0FBQztTQUNELEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFO1FBQ1IsT0FBTyxHQUFHLEVBQUUsRUFBRSxDQUFDO0lBQ25CLENBQUMsQ0FBQyxDQUFDO0lBRVAs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