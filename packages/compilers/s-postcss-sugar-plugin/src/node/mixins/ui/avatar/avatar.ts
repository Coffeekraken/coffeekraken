import __SInterface from '@coffeekraken/s-interface';

/**
 * @name          avatar
 * @namespace     node.mixins.ui.avatar
 * @type          PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to generate the "avatar" UI component css.
 *
 * @param       {'solid'}                           [style='solid']         The style you want your avatar to have
 * @param       {'default'|'square'|'rounded'}          [shape='default']       The shape you want your badge to have
 * @param       {('bare'|'lnf'|'shape'|'interactive')[]}        [scope=['bare','lnf','shape']]      The scope you want to generate
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * .my-element {
 *      \@sugar.ui.badge();
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginUiAvatarInterface extends __SInterface {
    static get _definition() {
        return {
            style: {
                type: 'String',
                value: ['solid'],
                default: 'solid',
            },
            shape: {
                type: 'String',
                values: ['default', 'square', 'rounded'],
                default: 'default',
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'shape', 'interactive'],
                default: ['bare', 'lnf', 'shape'],
            },
        };
    }
}

export interface IPostcssSugarPluginUiBadgeParams {
    shape: 'default' | 'square' | 'rounded';
    style: 'solid';
    scope: ('bare' | 'lnf' | 'shape' | 'interactive')[];
}

export { postcssSugarPluginUiAvatarInterface as interface };
export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiBadgeParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiBadgeParams = {
        shape: 'square',
        style: 'solid',
        scope: ['bare', 'lnf', 'shape'],
        ...params,
    };

    const vars: string[] = [];

    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
            position: relative;
            display: inline-block;
            overflow: hidden;
            width: 1em;
            height: 1em;
        `);
    }

    // lnf
    if (finalParams.scope.indexOf('lnf') !== -1) {
        switch (finalParams.style) {
            case 'solid':
                vars.push(`
                    border-width: sugar.theme(ui.avatar.borderWidth);
                    border-color: sugar.color(current);
                    border-style: solid;
                    @sugar.depth(sugar.theme(ui.avatar.depth));
                `);
                break;
        }
    }

    // interactive
    if (finalParams.scope.indexOf('interactive') !== -1) {
        vars.push(`
            cursor: pointer;
        `);

        switch (finalParams.style) {
            case 'solid':
                vars.push(`
                    &:hover {
                        @sugar.outline($where: element);
                    }
                `);
                break;
        }
    }

    // shape
    if (finalParams.scope.indexOf('shape') !== -1) {
        switch (finalParams.shape) {
            case 'square':
                vars.push(`
                    border-radius: 0;
                `);
                break;
            case 'rounded':
                vars.push(`
                    border-radius: sugar.theme(ui.avatar.borderRadius);
                    `);
                break;
            case 'default':
            default:
                vars.push(`
                    border-radius: 0.5em;
                `);
                break;
        }
    }

    return vars;
}
