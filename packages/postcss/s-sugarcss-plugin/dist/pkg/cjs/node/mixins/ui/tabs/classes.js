"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const faker_1 = __importDefault(require("faker"));
/**
 * @name          classes
 * @as          @s.ui.tabs.classes
 * @namespace     node.mixin.ui.tabs
 * @type               PostcssMixin
 * @interface     ./classes          interface
 * @platform      postcss
 * @status        beta
 *
 * Generate the tabs classes
 *
 * @return      {String}            The generated css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet     @s.ui.tabs.classes
 *
 * @example     css
 * @s.ui.tabs.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginUiListClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = SSugarcssPluginUiListClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Tabs
        * @namespace          sugar.style.ui.tabs
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/tabs
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to style list (or any others) HTMLElement as tabs
        * 
        * @feature          Support for shaping through the \`s-shape:...\` class
        * @feature          Support for scaling through the \`s-scale:...\` class
        * @feature          Support for colorizing through the \`s-color:...\` class
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * @s.ui.tabs.classes;
        * 
        * .my-tabs {
        *   @s.ui.tabs;
        * }
        * 
        * @cssClass     s-tabs                  Apply the tabs lnf
        * @cssClass       s-tabs:grow        Make the tabs items grow and take the available space
        * @cssClass       s-tabs:fill       Add a background to the tabs
        * @cssClass       s-tabs:vertical    Display the tabs horizontally
        * 
        * @example        html       Default
        *   <ul class="s-tabs s-color:accent">
        *     <li tabindex="0" active>${faker_1.default.name.findName()}</li>
        *     <li tabindex="0">${faker_1.default.name.findName()}</li>
        *     <li tabindex="0">${faker_1.default.name.findName()}</li>
        *   </ul>
        * 
        * @example        html       Grow
        *   <ul class="s-tabs:grow">
        *     <li tabindex="0" active>${faker_1.default.name.findName()}</li>
        *     <li tabindex="0">${faker_1.default.name.findName()}</li>
        *     <li tabindex="0">${faker_1.default.name.findName()}</li>
        *   </ul>
        * 
        * @example        html       Fill
        *   <ul class="s-tabs:fill">
        *     <li tabindex="0" active>${faker_1.default.name.findName()}</li>
        *     <li tabindex="0">${faker_1.default.name.findName()}</li>
        *     <li tabindex="0">${faker_1.default.name.findName()}</li>
        *   </ul>
        * 
        * @example        html       Shapes
        *   <ul class="s-tabs s-shape:square s-mbe:30">
        *     <li tabindex="0" active>${faker_1.default.name.findName()}</li>
        *     <li tabindex="0">${faker_1.default.name.findName()}</li>
        *     <li tabindex="0">${faker_1.default.name.findName()}</li>
        *   </ul>
        * <ul class="s-tabs s-shape:pill">
        *     <li tabindex="0" active>${faker_1.default.name.findName()}</li>
        *     <li tabindex="0">${faker_1.default.name.findName()}</li>
        *     <li tabindex="0">${faker_1.default.name.findName()}</li>
        *   </ul>
        * 
        * @example      html        RTL
        * <div dir="rtl">
        *   <ul class="s-tabs">
        *     <li class="s-color:accent" tabindex="0" active>${faker_1.default.name.findName()}</li>
        *     <li class="s-color:complementary" tabindex="0">${faker_1.default.name.findName()}</li>
        *     <li tabindex="0">${faker_1.default.name.findName()}</li>
        *   </ul>
        * </div>
        * 
        * @example      html        Vertical
        *   <ul class="s-tabs:vertical s-color:complementary">
        *     <li tabindex="0" active>${faker_1.default.name.findName()}</li>
        *     <li tabindex="0">${faker_1.default.name.findName()}</li>
        *     <li tabindex="0">${faker_1.default.name.findName()}</li>
        *   </ul>
        * 
        * @example      html        Scales
        *   <ul class="s-tabs:grow s-scale:13 s-color:accent">
        *     <li tabindex="0" active>${faker_1.default.name.findName()}</li>
        *     <li tabindex="0">${faker_1.default.name.findName()}</li>
        *     <li tabindex="0">${faker_1.default.name.findName()}</li>
        *   </ul>
        *
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    vars.code(`@s.scope 'bare' {`);
    vars.comment(() => `
            /**
              * @name           s-tabs
              * @namespace          sugar.style.ui.tabs
              * @type           CssClass
              * 
              * This class represent a "<yellow>bare</yellow>" tabs
              * 
              * @example        html
              * <div class="s-tabs">
              *    <div class="active">An active tab</div>
              *    <div>A tab</div>
              * </div>
            */
           `).code(`
          .s-tabs {
            @s.scope.only 'bare' {
              @s.ui.tabs;
            }
          }
          `, { type: 'CssClass' });
    vars.code('}');
    vars.code(`@s.scope 'lnf' {`);
    vars.comment(() => `/**
              * @name           s-tabs
              * @namespace          sugar.style.ui.tabs
              * @type           CssClass
              * 
              * This class represent some tabs
              * 
              * @example        html
              * <div class="s-tabs">
              *    <div class="active">An active tab</div>
              *    <div>A tab</div>
              * </div>
            */
           `).code(`
          .s-tabs {
            @s.scope.only 'lnf' {
              @s.ui.tabs;
            }
          }
        `, { type: 'CssClass' });
    vars.code('}');
    vars.code(`@s.scope 'bare' {`);
    vars.comment(() => `/**
        * @name           s-tabs-grow
        * @namespace          sugar.style.ui.tabs
        * @type           CssClass
        * 
        * This class represent a "<yellow>grow</yellow>" tabs
        * 
        * @example        html
        * <div class="s-tabs-grow">
        *    <div class="active">An active tab</div>
        *    <div>A tab</div>
        * </div>
      */
     `).code(`
    .s-tabs-grow {
        display: flex;
              
        & > * {
          flex-grow: 1;
        }
    }
  `, { type: 'CssClass' });
    vars.comment(() => `/**
        * @name           s-tabs-fill
        * @namespace          sugar.style.ui.tabs
        * @type           CssClass
        * 
        * This class represent a "<yellow>fill</yellow>" tabs
        * 
        * @example        html
        * <div class="s-tabs-fill">
        *    <div class="active">An active tab</div>
        *    <div>A tab</div>
        * </div>
      */
     `).code(`
    .s-tabs-fill {
      background: s.color(current, surface);
    }
  `, { type: 'CssClass' });
    vars.comment(() => `/**
        * @name           s-tabs-vertical
        * @namespace          sugar.style.ui.tabs
        * @type           CssClass
        * 
        * This class represent a "<yellow>vertical</yellow>" tabs
        * 
        * @example        html
        * <div class="s-tabs-vertical">
        *    <div class="active">An active tab</div>
        *    <div>A tab</div>
        * </div>
      */
     `).code(`
    .s-tabs-vertical {
        display: block;

        & > * {
          display: block;
          text-align: inherit;
        }

        & > *:first-child,
        & > template + * {
          border-top-left-radius: var(--s-shape, s.border.radius(ui.tabs.borderRadius)) !important;
          border-bottom-left-radius: 0 !important;
          border-top-right-radius: var(--s-shape, s.border.radius(ui.tabs.borderRadius)) !important;
          border-bottom-right-radius: 0 !important;
        }
        & > *:last-child {
          border-top-left-radius: 0 !important;
          border-bottom-left-radius: var(--s-shape, s.border.radius(ui.tabs.borderRadius)) !important;
          border-top-right-radius: 0 !important;
          border-bottom-right-radius: var(--s-shape, s.border.radius(ui.tabs.borderRadius)) !important;
        }
    }
  `, { type: 'CssClass' });
    vars.code('}');
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxrREFBNEI7QUFFNUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBRUgsTUFBTSxxQ0FBc0MsU0FBUSxxQkFBWTtJQUM1RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUlpRCwwREFBUztBQUUzRCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3dDQWtDMEIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7aUNBQzlCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO2lDQUN2QixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7d0NBS2hCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO2lDQUM5QixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtpQ0FDdkIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7O3dDQUtoQixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtpQ0FDOUIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7aUNBQ3ZCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozt3Q0FLaEIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7aUNBQzlCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO2lDQUN2QixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7O3dDQUdoQixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtpQ0FDOUIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7aUNBQ3ZCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozs7K0RBTU8sZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7K0RBQ3ZCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO2lDQUNyRCxlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7O3dDQU1oQixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtpQ0FDOUIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7aUNBQ3ZCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozt3Q0FLaEIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7aUNBQzlCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO2lDQUN2QixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7O0tBTW5ELENBQ0EsQ0FBQztJQUVGLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUMvQixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7OztZQWNGLENBQ1AsQ0FBQyxJQUFJLENBQ0Y7Ozs7OztXQU1HLEVBQ0gsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWYsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQzlCLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7WUFhRixDQUNQLENBQUMsSUFBSSxDQUNGOzs7Ozs7U0FNQyxFQUNELEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVmLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUUvQixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7O01BYVIsQ0FDRCxDQUFDLElBQUksQ0FDRjs7Ozs7Ozs7R0FRTCxFQUNLLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBRUYsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7OztNQWFSLENBQ0QsQ0FBQyxJQUFJLENBQ0Y7Ozs7R0FJTCxFQUNLLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBRUYsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7OztNQWFSLENBQ0QsQ0FBQyxJQUFJLENBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJMLEVBQ0ssRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFFRixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWYsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQTdRRCw0QkE2UUMifQ==