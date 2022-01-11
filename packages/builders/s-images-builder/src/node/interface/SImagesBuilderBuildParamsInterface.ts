import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name                SPostcssBuilderBuildParamsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe parameters of the SImagesBuilder.build method
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SPostcssBuilderBuildParamsInterface extends __SInterface {
    static get _definition() {
        return {
            glob: {
                description:
                    'Specify a glob pattern relative to the "inDir" to target images you want to process',
                type: 'String',
                required: true,
                default: __SSugarConfig.get('imagesBuilder.glob'),
                alias: 'g',
            },
            compressExts: {
                description:
                    'Specify the file extensions you want to compress',
                type: 'String[]',
                required: true,
                default: __SSugarConfig.get('imagesBuilder.compressExts')
            },
            inDir: {
                description:
                    'Specify the absolute path to the folder where your images stands',
                type: 'String',
                required: true,
                default: __SSugarConfig.get('imagesBuilder.inDir'),
                alias: 'i',
            },
            outDir: {
                description:
                    'Specify the absolute path to the folder you want to save your images. "inDir" folder structure is kept.',
                type: 'String',
                required: true,
                default: __SSugarConfig.get('imagesBuilder.outDir'),
                alias: 'o',
            },
            quality: {
                description:
                    'Specify the quality percentage you want to target without the "%" sign',
                type: 'Number',
                required: true,
                default: __SSugarConfig.get('imagesBuilder.quality'),
                alias: 'q',
            },
            webp: {
                description:
                    'Specify if you want to generate ".webp" versions of your images or not',
                type: 'Boolean',
                default: __SSugarConfig.get('imagesBuilder.webp'),
            },
            width: {
                description:
                    'Specify the maximum width you want to target for your images',
                type: 'Number',
                default: __SSugarConfig.get('imagesBuilder.width'),
                alias: 'w',
            },
            height: {
                description:
                    'Specify the maximum height you want to target for your images',
                type: 'Number',
                default: __SSugarConfig.get('imagesBuilder.height'),
                alias: 'h',
            },
            resolution: {
                description:
                    'Specify some resolutions you want to generate. The targeted "width" and "height" is considered as the resolution 1 and all others resolutions are declined from this',
                type: 'Array<Integer>',
                default: __SSugarConfig.get('imagesBuilder.resolution'),
                alias: 'r',
            },
            clear: {
                description:
                    'Specify if you want to clear the "outDir" before generate new images or not',
                type: 'Boolean',
                default: __SSugarConfig.get('imagesBuilder.clear'),
                alias: 'c',
            },
            specificParams: {
                description:
                    'Allows you to specify some custom params depending on folder globs like "myCoolFolder/*.jpg" used as object property. Override every settings you want in this new object for the specified folder(s)',
                type: 'Object',
                default: __SSugarConfig.get('imagesBuilder.specificParams'),
            },
        };
    }
}
