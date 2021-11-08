import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
export default class SMarkdownBuilderBuildParamsInterface extends __SInterface {
    static get _definition() {
        return {
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
                default: __SSugarConfig.get('markdownBuilder.default.inDir'),
            },
            inPath: {
                type: 'String',
                alias: 'p',
                default: __SSugarConfig.get('markdownBuilder.default.inPath'),
            },
            inRaw: {
                type: 'String',
                alias: 'r',
                default: __SSugarConfig.get('markdownBuilder.default.inRaw'),
            },
            outDir: {
                type: 'String',
                alias: 'o',
                default: __SSugarConfig.get('markdownBuilder.default.outDir'),
            },
            outPath: {
                type: 'String',
                default: __SSugarConfig.get('markdownBuilder.default.outPath'),
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
                default: __SSugarConfig.get('markdownBuilder.default.target'),
            },
            preset: {
                type: 'Array<String>',
                values: Object.keys(__SSugarConfig.get('markdownBuilder.presets')),
                alias: 'p',
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU01hcmtkb3duQnVpbGRlckJ1aWxkUGFyYW1zSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU01hcmtkb3duQnVpbGRlckJ1aWxkUGFyYW1zSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBRTFELE1BQU0sQ0FBQyxPQUFPLE9BQU8sb0NBQXFDLFNBQVEsWUFBWTtJQUMxRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDO2FBQzlEO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDO2FBQy9EO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDO2FBQ2hFO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDO2FBQy9EO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDO2FBQ2hFO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDO2FBQ2pFO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxTQUFTO2dCQUNmLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDO2FBQzlEO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUM7Z0JBQzVCLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDO2FBQ2hFO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxlQUFlO2dCQUNyQixNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FDZixjQUFjLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQ2hEO2dCQUNELEtBQUssRUFBRSxHQUFHO2FBQ2I7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=