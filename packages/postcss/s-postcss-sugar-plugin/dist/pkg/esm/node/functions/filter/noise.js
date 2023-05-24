import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           noise
 * @as            sugar.filter.noise
 * @namespace      node.function.filter
 * @type           PostcssFunction
 * @platform      postcss
 * @interface       ./noise
 * @status        beta
 *
 * This function allows you to get a noise effect image back.
 *
 * @param       {Number}        [frequency=0.65]      The frequency of the noise
 * @param       {String}        [width='5000px']        The width of the noise
 * @param       {String}        [height='5000px']       The height of the noise
 * @return        {Css}         The generated css
 *
 * @snippet         sugar.filter.noise();
 *
 * @example        css
 * .my-element {
 *    filter: sugar.filter.noise()
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBRUgsTUFBTSxtQ0FBb0MsU0FBUSxZQUFZO0lBQzFELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxTQUFTLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLFFBQVE7YUFDcEI7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLFFBQVE7YUFDcEI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBUUQsT0FBTyxFQUFFLG1DQUFtQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTVELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsU0FBUyxFQUFFLElBQUksRUFDZixLQUFLLEVBQUUsUUFBUSxFQUNmLE1BQU0sRUFBRSxRQUFRLElBQ2IsTUFBTSxDQUNaLENBQUM7SUFDRixPQUFPLGdDQUFnQyxrQkFBa0IsQ0FDckQsd0RBQXdELFdBQVcsQ0FBQyxLQUFLLElBQUksV0FBVyxDQUFDLE1BQU0sa0JBQWtCLFdBQVcsQ0FBQyxLQUFLLFdBQVcsV0FBVyxDQUFDLE1BQU0sc0VBQXNFLFdBQVcsQ0FBQyxLQUFLLFdBQVcsV0FBVyxDQUFDLE1BQU0sc0ZBQXNGLFdBQVcsQ0FBQyxTQUFTLHVGQUF1RixDQUN4ZCxJQUFJLENBQUM7QUFDVixDQUFDIn0=