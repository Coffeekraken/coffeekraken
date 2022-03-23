import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __fileName from "@coffeekraken/sugar/node/fs/filename";
class postcssSugarPluginIconClassesInterface extends __SInterface {
  static get _definition() {
    return {
      icons: {
        type: {
          type: "Array<String>",
          splitChars: [",", " ", "\n"]
        },
        default: [],
        required: true
      }
    };
  }
}
function classes_default({
  params,
  atRule,
  CssVars,
  replaceWith
}) {
  const finalParams = __spreadValues({
    icons: []
  }, params);
  const icons = finalParams.icons.map((iconStr) => {
    var _a, _b;
    const protocol = iconStr.split(":")[0];
    let splits, name, as;
    switch (protocol) {
      case "fa":
      case "fab":
      case "far":
      case "fal":
      case "fad":
        splits = iconStr.split(":");
        name = splits[1];
        as = (_a = splits[2]) != null ? _a : name;
        return {
          str: iconStr,
          protocol,
          name,
          as
        };
        break;
      case "fs":
        splits = iconStr.split(":");
        const path = splits[1];
        as = (_b = splits[2]) != null ? _b : __fileName(path).split(".")[0];
        return {
          str: iconStr,
          protocol,
          path,
          name: as,
          as
        };
        break;
    }
  });
  const vars = new CssVars();
  vars.comment(() => `
      /**
        * @name          Icons
        * @namespace          sugar.css.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/icons
        * @platform       css
        * @status       beta
        * 
        * These classes represent all the icons that you have listed in your project using the \`@sugar.icon.classes\` mixin.
        * By using this mixin, your icons will be accessible using the same \`s-icon:{name}\` classes
        * independently of the icon source that can be **Fontawesome** or your **Filesystem**.
        * These providers are the one that we support for now but others can be added if needed.
        * 
        * @feature      Allows you to use multiples sources and **keep the same usage classes**
        * @feature      Support for **Fontawesome** provider out of the box
        * @feature      Support for **local filesystem** icons
        * 
        * @support      chromium        
        * @support      firefox         
        * @support      safari          
        * @support      edge           
        * 
        ${icons.map((iconObj) => {
    return ` * @cssClass      s-icon:${iconObj.as}      Display the \`${iconObj.as}\` icon`;
  }).join("\n")}
        * 
        * @example        html          Used icons in this website
        *   <div class="s-grid:5 @mobile s-grid:2">
        ${icons.map((iconObj) => {
    return ` *
        *   <div class="s-p:30 s-text:center s-ratio:1" style="padding-block-start: 30%">
        *     <i class="s-icon:${iconObj.as} s-font:70"></i><br/>
        *     <p class="s-typo:p s-mbs:20">${iconObj.as}</p>
        *     <p class="s-typo:p:bold">Source: ${iconObj == null ? void 0 : iconObj.protocol}</p>
        *   </div>`;
  }).join("\n")}
        *   </div>
        * 
        * @example      css
        * @sugar.icon.classes(
        ${icons.map((iconObj) => {
    return ` *    ${iconObj.str}`;
  }).join("\n")}
        * );
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  icons.forEach((iconObj) => {
    switch (iconObj == null ? void 0 : iconObj.protocol) {
      case "fa":
      case "fab":
      case "far":
      case "fal":
      case "fad":
        vars.comment(() => `
                /**
                 * @name        s-icon:${iconObj.as}
                  * @namespace      sugar.css.icon
                  * @type           CssClass
                  * @platform       css
                  * @status         beta
                  *
                  * This class allows you to display the "<yellow>${iconObj.as}</yellow>" icon using the "<cyan>i</cyan>" tag like bellow
                  *
                  * @example        html
                  * <i class="s-icon:${iconObj.as} s-font:20"></i>
                  * <i class="s-icon:${iconObj.as} s-font:40"></i>
                  * <i class="s-icon:${iconObj.as} s-font:60"></i>
                  * <i class="s-icon:${iconObj.as} s-font:80"></i>
                  * <i class="s-icon:${iconObj.as} s-font:100"></i>
                  * 
                  * @since      2.0.0
                  * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                  */
                `).code(`
                  .s-icon--${iconObj.as} {
                    @sugar.icon.fa(${iconObj.name}, ${iconObj.protocol});
                  }
              `);
        break;
      case "fs":
        vars.comment(() => `
                    /**
                     * @name        s-icon:${iconObj.as}
                      * @namespace      sugar.css.icon
                      * @type           CssClass
                      * @platform         css
                      * @status         beta
                      *
                      * This class allows you to display the "<yellow>${iconObj.as}</yellow>" icon using the "<cyan>i</cyan>" tag like bellow
                      *
                      * @example        html
                      * <i class="s-icon:${iconObj.as} s-font:20"></i>
                      * <i class="s-icon:${iconObj.as} s-font:40"></i>
                      * <i class="s-icon:${iconObj.as} s-font:60"></i>
                      * <i class="s-icon:${iconObj.as} s-font:80"></i>
                      * <i class="s-icon:${iconObj.as} s-font:100"></i>
                      * 
                      * @since      2.0.0
                      * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                      */
                    `).code(`
                      .s-icon--${iconObj.as} {
                        @sugar.icon.fs(${iconObj.path}, ${iconObj.as});
                      }
                  `);
        break;
    }
  });
  return vars;
}
export {
  classes_default as default,
  postcssSugarPluginIconClassesInterface as interface
};
