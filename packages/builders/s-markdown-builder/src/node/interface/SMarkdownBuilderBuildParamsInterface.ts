import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

export default class SMarkdownBuilderBuildParamsInterface extends __SInterface {
    static get definition() {
        return (
            this.cached() ??
            this.cache({
                glob: {
                    type: 'String',
                    required: true,
                    alias: 'g',
                    default: __SSugarConfig.get('markdownBuilder.default.glob'),
                },
                inDir: {
                    type: 'String',
                    required: true,
                    alias: 'd',
                    default: __SSugarConfig.get(
                        'markdownBuilder.default.inDir',
                    ),
                },
                inPath: {
                    type: 'String',
                    alias: 'p',
                    default: __SSugarConfig.get(
                        'markdownBuilder.default.inPath',
                    ),
                },
                inRaw: {
                    type: 'String',
                    alias: 'r',
                    default: __SSugarConfig.get(
                        'markdownBuilder.default.inRaw',
                    ),
                },
                outDir: {
                    type: 'String',
                    alias: 'o',
                    default: __SSugarConfig.get(
                        'markdownBuilder.default.outDir',
                    ),
                },
                outPath: {
                    type: 'String',
                    default: __SSugarConfig.get(
                        'markdownBuilder.default.outPath',
                    ),
                },
                save: {
                    type: 'Boolean',
                    alias: 's',
                    default: __SSugarConfig.get('markdownBuilder.default.save'),
                },
                target: {
                    type: 'String',
                    values: ['html', 'markdown'],
                    alias: 't',
                    default: __SSugarConfig.get(
                        'markdownBuilder.default.target',
                    ),
                },
                preset: {
                    type: 'Array<String>',
                    values: Object.keys(
                        __SSugarConfig.get('markdownBuilder.presets'),
                    ),
                    alias: 'p',
                },
            })
        );
    }
}
