import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name                SCodeFormatterFormatParamsInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This interface represent the parameters for the SCodeFormatter.format method
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SCodeFormatterFormatParamsInterface extends __SInterface {
    static get _definition() {
        return {
            glob: {
                description: 'Specify a glog pattern relative to the "inDir"',
                type: 'String',
                default: __SSugarConfig.get('codeFormatter.glob'),
                alias: 'i',
            },
            inDir: {
                description:
                    'Specify the working directory from where the glob will be resolved',
                type: 'String',
                default: __SSugarConfig.get('codeFormatter.inDir'),
                alias: 'd',
            },
            watch: {
                description:
                    'Specify if you want to watch for files changes and format them automatically',
                type: 'Boolean',
                default: false,
                alias: 'w',
            },
            formatInitial: {
                description:
                    'Specify if you want to format the founded files directly even if you have specified the watch parameter to true',
                type: 'Boolean',
                default: false,
                alias: 'f',
            },
        };
    }
}
