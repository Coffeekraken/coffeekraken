import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           shadow
 * @namespace      mixins.shadow
 * @type           Mixin
 * @platform        css
 * @status        beta
 *
 * This mixin allows you to apply a linear gradient shadow to any HTMLElement.
 * Note that this mixin make use of the :before pseudo class.
 *
 * @return        {Css}           The generated css
 *
 * @example         postcss
 * .myCoolElement {
 *    @sugar.shadow.gradient(0, 10px, 10px, 0, sugar.color(accent), sugar.color(complementary));
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginShadowGradientInterface extends __SInterface {
}
postcssSugarPluginShadowGradientInterface.definition = {
    x: {
        type: 'Number|String',
        required: true,
        default: 0,
    },
    y: {
        type: 'Number|String',
        required: true,
        default: 0,
    },
    blur: {
        type: 'Number|String',
        required: true,
        default: 0,
    },
    spread: {
        type: 'Number|String',
        required: true,
        default: 0,
    },
    startColor: {
        type: 'String',
        required: true,
        default: 'sugar.color(accent)',
    },
    endColor: {
        type: 'String',
        required: true,
        default: 'sugar.color(complementary)',
    },
    angle: {
        type: 'String',
        required: false,
        default: '90deg',
    },
};
export { postcssSugarPluginShadowGradientInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ x: 0, y: 0, blur: 0, spread: 0, startColor: '', endColor: '', angle: '' }, params);
    const vars = [];
    // lnf
    vars.push(`
        &:before {
            z-index: 0;
            content: '';
            position: absolute;
            top: calc(50% + ${typeof finalParams.y === 'number'
        ? finalParams.y + 'px'
        : finalParams.y});
            left: calc(50% + ${typeof finalParams.x === 'number'
        ? finalParams.x + 'px'
        : finalParams.x});
            width: 100%; height: 100%;
            background: linear-gradient(${finalParams.angle}, ${finalParams.startColor}, ${finalParams.endColor});
            filter: blur(${finalParams.blur});
            transform: translate(-50%, -50%) scale(${finalParams.spread});

            ${atRule.nodes.map((node) => node.toString()).join(';')}

        }
    `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhZGllbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJncmFkaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUVILE1BQU0seUNBQTBDLFNBQVEsWUFBWTs7QUFDekQsb0RBQVUsR0FBRztJQUNoQixDQUFDLEVBQUU7UUFDQyxJQUFJLEVBQUUsZUFBZTtRQUNyQixRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxDQUFDO0tBQ2I7SUFDRCxDQUFDLEVBQUU7UUFDQyxJQUFJLEVBQUUsZUFBZTtRQUNyQixRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxDQUFDO0tBQ2I7SUFDRCxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsZUFBZTtRQUNyQixRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxDQUFDO0tBQ2I7SUFDRCxNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsZUFBZTtRQUNyQixRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxDQUFDO0tBQ2I7SUFDRCxVQUFVLEVBQUU7UUFDUixJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLHFCQUFxQjtLQUNqQztJQUNELFFBQVEsRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsNEJBQTRCO0tBQ3hDO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsS0FBSztRQUNmLE9BQU8sRUFBRSxPQUFPO0tBQ25CO0NBQ0osQ0FBQztBQWFOLE9BQU8sRUFBRSx5Q0FBeUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUNsRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLENBQUMsRUFBRSxDQUFDLEVBQ0osQ0FBQyxFQUFFLENBQUMsRUFDSixJQUFJLEVBQUUsQ0FBQyxFQUNQLE1BQU0sRUFBRSxDQUFDLEVBQ1QsVUFBVSxFQUFFLEVBQUUsRUFDZCxRQUFRLEVBQUUsRUFBRSxFQUNaLEtBQUssRUFBRSxFQUFFLElBQ04sTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsTUFBTTtJQUNOLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7OzhCQU1FLE9BQU8sV0FBVyxDQUFDLENBQUMsS0FBSyxRQUFRO1FBQzdCLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLElBQUk7UUFDdEIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUN0QjsrQkFFSSxPQUFPLFdBQVcsQ0FBQyxDQUFDLEtBQUssUUFBUTtRQUM3QixDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxJQUFJO1FBQ3RCLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FDdEI7OzBDQUU4QixXQUFXLENBQUMsS0FBSyxLQUNuRCxXQUFXLENBQUMsVUFDaEIsS0FBSyxXQUFXLENBQUMsUUFBUTsyQkFDRixXQUFXLENBQUMsSUFBSTtxREFDVSxXQUFXLENBQUMsTUFBTTs7Y0FFekQsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7OztLQUc5RCxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=