import __SInterface from '@coffeekraken/s-interface';
import __faker from 'faker';

/**
 * @name          classes
 * @namespace     node.mixin.ui.inputContainer
 * @type               PostcssMixin
 * @interface     ./classes          interface
 * @platform      postcss
 * @status        beta
 *
 * Generate the input container classes
 *
 * @param       {('group'|'addon')[]}                           [lnfs=['group','addon']]         The style(s) you want to generate
 * @param       {'group'|'addon'}                [defaultLnf='group']           The default style you want
 * @param       {('bare'|'lnf')[]}        [scope=['bare', 'lnf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @snippet         @sugar.ui.inputContainer.classes
 * 
 * @example     css
 * \@sugar.ui.inputContainer.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiFormClassesInterface extends __SInterface {
    static get _definition() {
        return {
            lnfs: {
                type: 'String[]',
                default: ['group', 'addon'],
            },
            defaultLnf: {
                type: 'String',
                default: 'group',
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf'],
                default: ['bare', 'lnf'],
            },
        };
    }
}

export interface IPostcssSugarPluginUiFormClassesParams {
    lnfs: ('group' | 'addon')[];
    defaultLnf: 'group';
    scope: ('bare' | 'lnf')[];
}

export { postcssSugarPluginUiFormClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiFormClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiFormClassesParams = {
        lnfs: ['group', 'addon'],
        defaultLnf: 'group',
        scope: [],
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Input container
        * @namespace          sugar.style.ui.inputContainer
        * @type               Styleguide
        * @menu           Styleguide / Forms        /styleguide/forms/input-container
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some lnfs to input container
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@sugar.ui.inputContainer.classes;
        * 
        * .my-inputContainer {
        *   \@sugar.ui.inputContainer;
        * }
        * 
        ${finalParams.lnfs
            .map((lnf) => {
                return ` * @cssClass     s-input-container${
                    finalParams.defaultLnf === lnf ? '' : `:${lnf}`
                }           Apply the ${lnf} input container lnf`;
            })
            .join('\n')}
        * 
        * @example    html          Group
        * <label class="s-label:responsive s-mbe:30">
        *      <span>${__faker.name.findName()}</span>
        *      <div class="s-input-container:group s-width:50">
        *           <input type="text" placeholder="Keywords..." class="s-input" />
        *           <button class="s-btn s-color:accent">Search!</button>
        *      </div>
        * </label>
        * 
        * @example    html          Group (rtl)
        * <label dir="rtl" class="s-label:responsive s-mbe:30">
        *      <span>${__faker.name.findName()}</span>
        *      <div class="s-input-container:group s-width:50">
        *           <input type="text" placeholder="Keywords..." class="s-input" />
        *           <button class="s-btn s-color:accent">Search!</button>
        *      </div>
        * </label>
        * 
        * @example    html          Addon
        * <label class="s-label:responsive s-mbe:30">
        *      <span>${__faker.name.findName()}</span>
        *      <div class="s-input-container:addon s-width:50">
        *           <input type="text" placeholder="Keywords..." class="s-input" />
        *           <div>
        *              <i class="s-icon:ui-copy"></i>
        *           </div>
        *      </div>
        * </label>
        * 
        * @example    html          Addon (rtl)
        * <label dir="rtl" class="s-label:responsive s-mbe:30">
        *      <span>${__faker.name.findName()}</span>
        *      <div class="s-input-container:addon s-width:50">
        *           <input type="text" placeholder="Keywords..." class="s-input" />
        *           <div>
        *               <i class="s-icon:ui-copy"></i>
        *           </div>
        *      </div>
        * </label>
        * 
        * @example    html          Addon + group
        * <label class="s-label:responsive s-mbe:30">
        *    <span>${__faker.name.findName()}</span>
        *    <div class="s-input-container:group s-width:50">
        *       <div class="s-input-container:addon">
        *          <input type="text" placeholder="Keywords..." class="s-input" />
        *          <div>
        *             <i class="s-icon:ui-copy"></i>
        *          </div>
        *       </div>
        *       <button class="s-btn s-color:complementary">Search!</button>
        *    </div>
        * </label>
        * 
        * @example    html          Addon + group (rtl)
        * <label dir="rtl" class="s-label:responsive s-mbe:30">
        *    <span>${__faker.name.findName()}</span>
        *    <div class="s-input-container:group s-width:50">
        *       <div class="s-input-container:addon">
        *          <input type="text" placeholder="Keywords..." class="s-input" />
        *          <div>
        *             <i class="s-icon:ui-copy"></i>
        *          </div>
        *       </div>
        *       <button class="s-btn s-color:complementary">Search!</button>
        *    </div>
        * </label>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    if (finalParams.scope.includes('bare')) {
        vars.comment(
            () => `/**
        * @name           s-input-container:group
        * @namespace          sugar.style.ui.inputContainer
        * @type           CssClass
        * 
        * This class represent a group input container
        * 
        * @example        html
        * <div class="s-input-container:group">
        *      <input type="text" placeholder="Keywords..." class="s-input" />
        *      <button class="s-btn:accent">Search!</button>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `,
        ).code(`
        .s-input-container--group {
            @sugar.ui.inputContainer($lnf: group, $scope: bare);
        }
        `);
    }
    if (finalParams.scope.includes('lnf')) {
        vars.code(
            `
        .s-input-container--group:not(.s-bare) {
            @sugar.ui.inputContainer($lnf: group, $scope: lnf);
        }
        `,
            {
                type: 'CssClass',
            },
        );
    }

    if (finalParams.scope.includes('bare')) {
        vars.comment(
            () => `/**
        * @name           s-input-container:addon
        * @namespace          sugar.style.ui.inputContainer
        * @type           CssClass
        * 
        * This class represent a addon input container
        * 
        * @example    html          
        * <label class="s-label:responsive s-mbe:30">
        *      ${__faker.name.findName()}
        *      <div class="s-input-container:addon s-width:50">
        *           <input type="text" placeholder="Keywords..." class="s-input" />
        *           <div>
        *               <i class="s-icon:ui-copy"></i>
        *           </div>   
        *      </div>
        * <label>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `,
        ).code(
            `
        .s-input-container--addon {
            @sugar.ui.inputContainer($lnf: addon, $scope: bare);
        }
        `,
            {
                type: 'CssClass',
            },
        );
    }
    if (finalParams.scope.includes('lnf')) {
        vars.code(
            `
        .s-input-container--addon:not(.s-bare) {
            @sugar.ui.inputContainer($lnf: addon, $scope: lnf);
        }
        `,
            {
                type: 'CssClass',
            },
        );
    }

    return vars;
}
