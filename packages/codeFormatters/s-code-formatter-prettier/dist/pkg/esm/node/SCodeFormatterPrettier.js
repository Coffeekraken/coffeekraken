import __SSugarConfig from '@coffeekraken/s-sugar-config';
import * as __prettier from 'prettier';
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
        'shell',
        'sh',
        'bash',
    ],
    languagesToExtensionsMap: {
        shell: 'sh',
        bash: 'sh',
    },
    format(code, metas) {
        const prettierConfig = __SSugarConfig.get('prettier');
        let filePathForPrettier = metas.filePath;
        if (this.languagesToExtensionsMap[metas.extension]) {
            filePathForPrettier = filePathForPrettier.replace(/\.[a-zA-Z0-9]+$/, `.${this.languagesToExtensionsMap[metas.extension]}`);
        }
        const formattedCode = __prettier.format(code, Object.assign(Object.assign({}, prettierConfig), { filepath: filePathForPrettier }));
        return {
            code: formattedCode,
        };
    },
};
export default formatter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sS0FBSyxVQUFVLE1BQU0sVUFBVSxDQUFDO0FBRXZDOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsTUFBTSxTQUFTLEdBQTZCO0lBQ3hDLEVBQUUsRUFBRSxVQUFVO0lBQ2QsVUFBVSxFQUFFO1FBQ1IsSUFBSTtRQUNKLEtBQUs7UUFDTCxJQUFJO1FBQ0osS0FBSztRQUNMLE1BQU07UUFDTixLQUFLO1FBQ0wsTUFBTTtRQUNOLE1BQU07UUFDTixJQUFJO1FBQ0osS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1FBQ0wsTUFBTTtRQUNOLE9BQU87UUFDUCxJQUFJO1FBQ0osTUFBTTtLQUNUO0lBQ0Qsd0JBQXdCLEVBQUU7UUFDdEIsS0FBSyxFQUFFLElBQUk7UUFDWCxJQUFJLEVBQUUsSUFBSTtLQUNiO0lBQ0QsTUFBTSxDQUNGLElBQVksRUFDWixLQUFvQztRQUVwQyxNQUFNLGNBQWMsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3RELElBQUksbUJBQW1CLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUV6QyxJQUFJLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDaEQsbUJBQW1CLEdBQUcsbUJBQW1CLENBQUMsT0FBTyxDQUM3QyxpQkFBaUIsRUFDakIsSUFBSSxJQUFJLENBQUMsd0JBQXdCLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQ3ZELENBQUM7U0FDTDtRQUVELE1BQU0sYUFBYSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxrQ0FDckMsY0FBYyxLQUNqQixRQUFRLEVBQUUsbUJBQW1CLElBQy9CLENBQUM7UUFDSCxPQUFPO1lBQ0gsSUFBSSxFQUFFLGFBQWE7U0FDdEIsQ0FBQztJQUNOLENBQUM7Q0FDSixDQUFDO0FBQ0YsZUFBZSxTQUFTLENBQUMifQ==