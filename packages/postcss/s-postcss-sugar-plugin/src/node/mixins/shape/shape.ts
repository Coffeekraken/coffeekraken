import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           shape
 * @as              @s.shape
 * @namespace      node.mixin.shape
 * @type           PostcssMixin
 * @platform        css
 * @status        stable
 *
 * This mixin allows you to apply a shape to any element that support it
 * by using the `border-radius: sugar.border.radius(shape)` statement like the buttons,
 * badges, etc...
 *
 * @param           {'square'|'pill'}           $shape      The shape you want for your item
 * @return        {Css}           The generated css
 *
 * @snippet         @s.shape($1)
 *
 * @example        css
 * .btn {
 *    @s.shape(square);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class PostcssSugarPluginShapeInterface extends __SInterface {
    static get _definition() {
        return {
            shape: {
                type: 'String',
                description:
                    'Specify the shape you want. Can be "square", "pill" or "default". If not specified, will print the border-radius necessary to shape an element.',
                values: ['square', 'pill', 'default'],
            },
        };
    }
}

export interface IPostcssSugarPluginShapeParams {
    shape: 'square' | 'pill' | 'default';
}

export { PostcssSugarPluginShapeInterface as interface };
export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginShapeParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginShapeParams = {
        shape: null,
        ...params,
    };

    const vars: string[] = [];

    // shape
    switch (finalParams.shape) {
        case 'square':
            vars.push(`
                --s-shape: 0;
            `);
            break;
        case 'pill':
            vars.push(`
                --s-shape: 99999px;
            `);
            break;
        case 'default':
            vars.push(`
                --s-shape: s.border.radius();
            `);
            break;
        default:
            vars.push(`
                border-radius: s.border.radius(shape);
            `);
            break;
    }

    return vars;
}
