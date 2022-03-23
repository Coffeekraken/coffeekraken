import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __dirname from "@coffeekraken/sugar/node/fs/dirname";
import __fs from "fs";
class postcssSugarPluginPlatformClassesMixinInterface extends __SInterface {
  static get _definition() {
    return {
      platforms: {
        type: "Array<String>"
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
    platforms: []
  }, params);
  const files = __fs.readdirSync(`${__dirname()}/platforms`);
  const vars = new CssVars();
  files.forEach((filename) => {
    const name = filename.split(".")[0];
    if (finalParams.platforms.length && finalParams.platforms.indexOf(name) === -1)
      return;
    vars.comment(() => `
        
        /**
         * @name            s-platform:${name}
         * @namespace       sugar.css.platform
         * @type            CssClass
         * @platform          css
         * @status          beta
         * 
         * This class allows you to display a plarform "icon" like "js", "node, "php", etc...
         * 
         * @example     html
         * <i class="s-platform:${name} s-font:50"></i>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        `).code(`
        .s-platform--${name} {
          @sugar.platform(${name});
        }

  `);
  });
  return vars;
}
export {
  classes_default as default,
  postcssSugarPluginPlatformClassesMixinInterface as interface
};
