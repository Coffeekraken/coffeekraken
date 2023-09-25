import __SSugarConfig from '@coffeekraken/s-sugar-config';
import * as __prettier from 'prettier';
/**
 * @name                SCodeFormatterPrettier
 * @namespace           node
 * @type                Class
 * @extends             SClass
 * @platform            node
 * @status              beta
 * @private
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
        // 'shell',
        // 'sh',
        // 'bash',
    ],
    languagesToExtensionsMap: {
    // shell: 'sh',
    // bash: 'sh',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sS0FBSyxVQUFVLE1BQU0sVUFBVSxDQUFDO0FBRXZDOzs7Ozs7Ozs7Ozs7O0dBYUc7QUFDSCxNQUFNLFNBQVMsR0FBNkI7SUFDeEMsRUFBRSxFQUFFLFVBQVU7SUFDZCxVQUFVLEVBQUU7UUFDUixJQUFJO1FBQ0osS0FBSztRQUNMLElBQUk7UUFDSixLQUFLO1FBQ0wsTUFBTTtRQUNOLEtBQUs7UUFDTCxNQUFNO1FBQ04sTUFBTTtRQUNOLElBQUk7UUFDSixLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxNQUFNO1FBQ04sV0FBVztRQUNYLFFBQVE7UUFDUixVQUFVO0tBQ2I7SUFDRCx3QkFBd0IsRUFBRTtJQUN0QixlQUFlO0lBQ2YsY0FBYztLQUNqQjtJQUNELE1BQU0sQ0FDRixJQUFZLEVBQ1osS0FBb0M7UUFFcEMsTUFBTSxjQUFjLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN0RCxJQUFJLG1CQUFtQixHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUM7UUFFekMsSUFBSSxJQUFJLENBQUMsd0JBQXdCLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ2hELG1CQUFtQixHQUFHLG1CQUFtQixDQUFDLE9BQU8sQ0FDN0MsaUJBQWlCLEVBQ2pCLElBQUksSUFBSSxDQUFDLHdCQUF3QixDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUN2RCxDQUFDO1NBQ0w7UUFFRCxNQUFNLGFBQWEsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksa0NBQ3JDLGNBQWMsS0FDakIsUUFBUSxFQUFFLG1CQUFtQixJQUMvQixDQUFDO1FBQ0gsT0FBTztZQUNILElBQUksRUFBRSxhQUFhO1NBQ3RCLENBQUM7SUFDTixDQUFDO0NBQ0osQ0FBQztBQUNGLGVBQWUsU0FBUyxDQUFDIn0=