import __SInterface from '@coffeekraken/s-interface';
import __fs from 'fs';
import __base64 from '@coffeekraken/sugar/shared/crypt/base64';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
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
        required: true
    }
};
export { postcssSugarPluginAssetPlatformInterface as interface };
export default function ({ params, atRule, replaceWith }) {
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
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwbGF0Zm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUlyRCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxRQUFRLE1BQU0seUNBQXlDLENBQUM7QUFDL0QsT0FBTyxTQUFTLE1BQU0scUNBQXFDLENBQUM7QUFFNUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsTUFBTSx3Q0FBeUMsU0FBUSxZQUFZOztBQUMxRCxtREFBVSxHQUFHO0lBQ2hCLFFBQVEsRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsS0FBSyxDQUFDO1FBQ2xDLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7Q0FDSixDQUFDO0FBT0osT0FBTyxFQUFFLHdDQUF3QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRWpFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEVBS1o7SUFDQyxNQUFNLFdBQVcsbUJBQ2YsUUFBUSxFQUFFLEVBQUUsSUFDVCxNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLFNBQVMsRUFBRSxjQUFjLFdBQVcsQ0FBQyxRQUFRLE1BQU0sQ0FBQyxFQUFFO1FBQzVFLE1BQU0sSUFBSSxLQUFLLENBQUMsaUZBQWlGLFdBQVcsQ0FBQyxRQUFRLCtCQUErQixDQUFDLENBQUM7S0FDeko7SUFDRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsU0FBUyxFQUFFLGNBQWMsV0FBVyxDQUFDLFFBQVEsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRWpHLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozt1REFNMkMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7R0FDNUUsQ0FBQyxDQUFDO0lBRUgsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BCLENBQUMifQ==