import __SInterface from '@coffeekraken/s-interface';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __fs from 'fs';

/**
 * @name           classes
 * @namespace      node.mixins.platform
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate all the "platforms" css classes like s-platform:css, etc...
 * "Platforms" are some kind of "icons" of platforms like "css", "node", "js", "php", etc...
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.platform.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginPlatformClassesMixinInterface extends __SInterface {
    static definition = {
        platforms: {
            type: 'Array<String>',
        },
    };
}

export interface IPostcssSugarPluginPlatformClassesParams {
    platforms: string[];
}

export { postcssSugarPluginPlatformClassesMixinInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginPlatformClassesParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginPlatformClassesParams = {
        platforms: [],
        ...params,
    };

    // list all the available platforms in the folder
    const files = __fs.readdirSync(`${__dirname()}/platforms`);

    const vars: string[] = [];

    files.forEach((filename) => {
        const name = filename.split('.')[0];

        if (
            finalParams.platforms.length &&
            finalParams.platforms.indexOf(name) === -1
        )
            return;

        vars.push(`
        
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
         * <i class="s-platform\:${name} s-font:50"></i>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        .s-platform--${name} {
          @sugar.platform(${name});
        }

  `);
    });

    replaceWith(vars);
}
