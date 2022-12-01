import type {
    ISCodeFormatterFormatter,
    ISCodeFormatterFormatterMetas,
    ISCodeFormatterFormatterResult,
} from '@coffeekraken/s-code-formatter';
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
const formatter: ISCodeFormatterFormatter = {
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
    format(
        code: string,
        metas: ISCodeFormatterFormatterMetas,
    ): ISCodeFormatterFormatterResult {
        const prettierConfig = __SSugarConfig.get('prettier');
        let filePathForPrettier = metas.filePath;

        if (this.languagesToExtensionsMap[metas.extension]) {
            filePathForPrettier = filePathForPrettier.replace(
                /\.[a-zA-Z0-9]+$/,
                `.${this.languagesToExtensionsMap[metas.extension]}`,
            );
        }

        const formattedCode = __prettier.format(code, {
            ...prettierConfig,
            filepath: filePathForPrettier,
        });
        return {
            code: formattedCode,
        };
    },
};
export default formatter;
