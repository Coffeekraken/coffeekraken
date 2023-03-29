import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name                SI18nExtractParamsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe parameters of the SI18nExtract method
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SI18nExtractParamsInterface extends __SInterface {
    static get _definition() {
        return {
            glob: {
                type: 'String',
                description:
                    'Specify a glob string relative to the cwd where to search and extract __i18n statements from',
                default: __SSugarConfig.get('i18n.extract.glob'),
                required: true,
            },
            outDir: {
                type: 'String',
                description:
                    'Specify the output directory path where the i18n files will be stored',
                default: __SSugarConfig.get('i18n.extract.outDir'),
                required: true,
            },
            fileName: {
                type: 'String',
                description:
                    'Specify the filename you want for your extracted i18n statements',
                default: __SSugarConfig.get('i18n.extract.fileName'),
                required: true,
            },
        };
    }
}

export default SI18nExtractParamsInterface;
