import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           noise
 * @namespace      node.functions.filter
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This function allows you to get a noise effect image back.
 *
 * @return        {Css}         The generated css for all the classes in the toolkit
 *
 * @example         postcss
 * .my-element {
 *    filter: sugar.filter.noise();
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginDisabledInterface extends __SInterface {
    static get _definition() {
        return {
            frequency: {
                type: 'Number',
                required: true,
                default: 0.65,
            },
            width: {
                type: 'String',
                required: true,
                default: '5000px',
            },
            height: {
                type: 'String',
                required: true,
                default: '5000px',
            },
        };
    }
}
export { postcssSugarPluginDisabledInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ frequency: 0.65, width: '5000px', height: '5000px' }, params);
    return `url('data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${finalParams.width} ${finalParams.height}" style="width:${finalParams.width};height:${finalParams.height};"><style type="text/css"><![CDATA[ rect{filter:url(#filter);width:${finalParams.width};height:${finalParams.height};} ]]></style><filter id="filter"><feTurbulence type="fractalNoise" baseFrequency="${finalParams.frequency}" numOctaves="3" stitchTiles="stitch" /></filter><rect filter="url(#filter)" /></svg>`)}')`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9pc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJub2lzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUdyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBRUgsTUFBTSxtQ0FBb0MsU0FBUSxZQUFZO0lBQzFELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxTQUFTLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLFFBQVE7YUFDcEI7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLFFBQVE7YUFDcEI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBUUQsT0FBTyxFQUFFLG1DQUFtQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTVELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsU0FBUyxFQUFFLElBQUksRUFDZixLQUFLLEVBQUUsUUFBUSxFQUNmLE1BQU0sRUFBRSxRQUFRLElBQ2IsTUFBTSxDQUNaLENBQUM7SUFDRixPQUFPLGdDQUFnQyxrQkFBa0IsQ0FDckQsd0RBQXdELFdBQVcsQ0FBQyxLQUFLLElBQUksV0FBVyxDQUFDLE1BQU0sa0JBQWtCLFdBQVcsQ0FBQyxLQUFLLFdBQVcsV0FBVyxDQUFDLE1BQU0sc0VBQXNFLFdBQVcsQ0FBQyxLQUFLLFdBQVcsV0FBVyxDQUFDLE1BQU0sc0ZBQXNGLFdBQVcsQ0FBQyxTQUFTLHVGQUF1RixDQUN4ZCxJQUFJLENBQUM7QUFDVixDQUFDIn0=