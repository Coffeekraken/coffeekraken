import __SInterface from '@coffeekraken/s-interface';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __base64 from '@coffeekraken/sugar/shared/crypt/base64';
import __fs from 'fs';
/**
 * @name           platform
 * @namespace      node.mixins.platform
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate all the css needed to display correctly a "platform" icon like
 * css, node, js, php, etc...
 *
 * @param         {IPostcssSugarPluginAssetPlatformParams}    params      The parameters object
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * .my-platform {
 *    \@sugar.platform(css);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginAssetPlatformInterface extends __SInterface {
}
postcssSugarPluginAssetPlatformInterface.definition = {
    platform: {
        type: 'String',
        values: ['js', 'node', 'ts', 'php'],
        required: true,
    },
};
export { postcssSugarPluginAssetPlatformInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ platform: '' }, params);
    const vars = [];
    if (!__fs.readFileSync(`${__dirname()}/platforms/${finalParams.platform}.svg`)) {
        throw new Error(`<red>[s-postcss-sugar-plugin]</red> Sorry but the requested platform "<yellow>${finalParams.platform}</yellow>" does not exists...`);
    }
    const svgStr = __fs.readFileSync(`${__dirname()}/platforms/${finalParams.platform}.svg`, 'utf8');
    vars.push(`
    display: inline-block;
    vertical-align: middle;
    width: 1em;
    height: 1em;
    background-size: contain;
    background-image: url("data:image/svg+xml;base64,${__base64.encrypt(svgStr)}");
  `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwbGF0Zm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLFNBQVMsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RCxPQUFPLFFBQVEsTUFBTSx5Q0FBeUMsQ0FBQztBQUMvRCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFFdEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsTUFBTSx3Q0FBeUMsU0FBUSxZQUFZOztBQUN4RCxtREFBVSxHQUFHO0lBQ2hCLFFBQVEsRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDO1FBQ25DLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0NBQ0osQ0FBQztBQU9OLE9BQU8sRUFBRSx3Q0FBd0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVqRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLFFBQVEsRUFBRSxFQUFFLElBQ1QsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFDSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQ2QsR0FBRyxTQUFTLEVBQUUsY0FBYyxXQUFXLENBQUMsUUFBUSxNQUFNLENBQ3pELEVBQ0g7UUFDRSxNQUFNLElBQUksS0FBSyxDQUNYLGlGQUFpRixXQUFXLENBQUMsUUFBUSwrQkFBK0IsQ0FDdkksQ0FBQztLQUNMO0lBQ0QsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FDNUIsR0FBRyxTQUFTLEVBQUUsY0FBYyxXQUFXLENBQUMsUUFBUSxNQUFNLEVBQ3RELE1BQU0sQ0FDVCxDQUFDO0lBRUYsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7O3VEQU15QyxRQUFRLENBQUMsT0FBTyxDQUMvRCxNQUFNLENBQ1Q7R0FDRixDQUFDLENBQUM7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=