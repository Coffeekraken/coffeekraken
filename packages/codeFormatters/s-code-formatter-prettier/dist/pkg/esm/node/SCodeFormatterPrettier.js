import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __prettier from 'prettier';
/**
 * @name                SCodeFormatterPrettier
 * @namespace           node
 * @type                Class
 * @extends             SClass
 * @status              wip
 *
 * This represent the prettier code formatter. It will format things like js, jsx, ts, tsx, json, css, less, scss, md, vue, hbs, php and html
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const formatter = {
    id: 'prettier',
    extensions: [
        'js',
        'jsx',
        'ts',
        'tsx',
        'json',
        'css',
        'less',
        'scss',
        'md',
        'vue',
        'hbs',
        'php',
        'html',
    ],
    format(code, metas) {
        const prettierConfig = __SSugarConfig.get('prettier');
        const formattedCode = __prettier.format(code, Object.assign(Object.assign({}, prettierConfig), { filepath: metas.filePath }));
        return {
            code: formattedCode,
        };
    },
};
export default formatter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sVUFBVSxNQUFNLFVBQVUsQ0FBQztBQUVsQzs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQU0sU0FBUyxHQUE2QjtJQUN4QyxFQUFFLEVBQUUsVUFBVTtJQUNkLFVBQVUsRUFBRTtRQUNSLElBQUk7UUFDSixLQUFLO1FBQ0wsSUFBSTtRQUNKLEtBQUs7UUFDTCxNQUFNO1FBQ04sS0FBSztRQUNMLE1BQU07UUFDTixNQUFNO1FBQ04sSUFBSTtRQUNKLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLE1BQU07S0FDVDtJQUNELE1BQU0sQ0FDRixJQUFZLEVBQ1osS0FBb0M7UUFFcEMsTUFBTSxjQUFjLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN0RCxNQUFNLGFBQWEsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksa0NBQ3JDLGNBQWMsS0FDakIsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRLElBQzFCLENBQUM7UUFDSCxPQUFPO1lBQ0gsSUFBSSxFQUFFLGFBQWE7U0FDdEIsQ0FBQztJQUNOLENBQUM7Q0FDSixDQUFDO0FBQ0YsZUFBZSxTQUFTLENBQUMifQ==