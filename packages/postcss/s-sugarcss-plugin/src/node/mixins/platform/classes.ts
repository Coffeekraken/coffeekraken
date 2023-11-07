import __SInterface from '@coffeekraken/s-interface';
import { __dirname } from '@coffeekraken/sugar/fs';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __fs from 'fs';

/**
 * @name           classes
 * @as              @s.platform.classes
 * @namespace      node.mixin.platform
 * @type           PostcssMixin
 * @platform      postcss
 * @status        alpha
 *
 * This mixin generate all the "platforms" css classes like s-platform:css, etc...
 * "Platforms" are some kind of "icons" of platforms like "css", "node", "js", "php", etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.platform.classes
 *
 * @example        css
 * @s.platform.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginPlatformClassesMixinInterface extends __SInterface {
    static get _definition() {
        return {
            platforms: {
                type: 'Array<String>',
            },
        };
    }
}

export interface ISSugarcssPluginPlatformClassesParams {
    platforms: string[];
}

export { SSugarcssPluginPlatformClassesMixinInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<ISSugarcssPluginPlatformClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginPlatformClassesParams = {
        platforms: [],
        ...params,
    };

    // list all the available platforms in the folder
    const files = __fs.readdirSync(
        `${__packageRootDir(__dirname())}/src/img/platforms`,
    );

    const vars = new CssVars();

    files.forEach((filename) => {
        const name = filename.split('.')[0];

        if (
            finalParams.platforms.length &&
            finalParams.platforms.indexOf(name) === -1
        )
            return;

        vars.comment(
            () => `
        
        /**
         * @name            s-platform:${name}
         * @namespace          sugar.style.helpers.platform
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
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        `,
        ).code(
            `
        .s-platform-${name} {
          @s.platform(${name});
        }

  `,
            { type: 'CssClass' },
        );
    });

    return vars;
}
