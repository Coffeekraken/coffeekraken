// @ts-nocheck
import { print } from './print';
import { embed } from './embed';
import { snipScriptAndStyleTagContent } from './lib/snipTagContent';
import { compile as __riotCompile } from '@riotjs/compiler';
function locStart(node) {
    return node.start;
}
function locEnd(node) {
    return node.end;
}
export const languages = [
    {
        name: 'riot',
        parsers: ['riot'],
        extensions: ['.riot'],
        vscodeLanguageIds: ['riot']
    }
];
export const parsers = {
    riot: {
        parse: (text) => {
            try {
                const parsed = __riotCompile(text);
                console.log(parsed.meta.fragments);
                return {
                    // ...require(`svelte/compiler`).parse(text),
                    __isRoot: true
                };
            }
            catch (err) {
                if (err.start != null && err.end != null) {
                    // Prettier expects error objects to have loc.start and loc.end fields.
                    // Svelte uses start and end directly on the error.
                    err.loc = {
                        start: err.start,
                        end: err.end
                    };
                }
                throw err;
            }
        },
        preprocess: (text, options) => {
            text = snipScriptAndStyleTagContent(text);
            text = text.trim();
            // Prettier sets the preprocessed text as the originalText in case
            // the Svelte formatter is called directly. In case it's called
            // as an embedded parser (for example when there's a Svelte code block
            // inside markdown), the originalText is not updated after preprocessing.
            // Therefore we do it ourselves here.
            options.originalText = text;
            return text;
        },
        locStart,
        locEnd,
        astFormat: 'riot-ast'
    }
};
export const printers = {
    'riot-ast': {
        print,
        embed
    }
};
export { options } from './options';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBR2QsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUVoQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ2hDLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxPQUFPLElBQUksYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFNUQsU0FBUyxRQUFRLENBQUMsSUFBUztJQUN6QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDcEIsQ0FBQztBQUVELFNBQVMsTUFBTSxDQUFDLElBQVM7SUFDdkIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0FBQ2xCLENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSxTQUFTLEdBQStCO0lBQ25EO1FBQ0UsSUFBSSxFQUFFLE1BQU07UUFDWixPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7UUFDakIsVUFBVSxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQ3JCLGlCQUFpQixFQUFFLENBQUMsTUFBTSxDQUFDO0tBQzVCO0NBQ0YsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBMkI7SUFDN0MsSUFBSSxFQUFFO1FBQ0osS0FBSyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDZCxJQUFJO2dCQUNGLE1BQU0sTUFBTSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUVuQyxPQUFnQjtvQkFDZCw2Q0FBNkM7b0JBQzdDLFFBQVEsRUFBRSxJQUFJO2lCQUNmLENBQUM7YUFDSDtZQUFDLE9BQU8sR0FBRyxFQUFFO2dCQUNaLElBQUksR0FBRyxDQUFDLEtBQUssSUFBSSxJQUFJLElBQUksR0FBRyxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQUU7b0JBQ3hDLHVFQUF1RTtvQkFDdkUsbURBQW1EO29CQUNuRCxHQUFHLENBQUMsR0FBRyxHQUFHO3dCQUNSLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSzt3QkFDaEIsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHO3FCQUNiLENBQUM7aUJBQ0g7Z0JBRUQsTUFBTSxHQUFHLENBQUM7YUFDWDtRQUNILENBQUM7UUFDRCxVQUFVLEVBQUUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUU7WUFDNUIsSUFBSSxHQUFHLDRCQUE0QixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbkIsa0VBQWtFO1lBQ2xFLCtEQUErRDtZQUMvRCxzRUFBc0U7WUFDdEUseUVBQXlFO1lBQ3pFLHFDQUFxQztZQUNyQyxPQUFPLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUM1QixPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7UUFDRCxRQUFRO1FBQ1IsTUFBTTtRQUNOLFNBQVMsRUFBRSxVQUFVO0tBQ3RCO0NBQ0YsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLFFBQVEsR0FBNEI7SUFDL0MsVUFBVSxFQUFFO1FBQ1YsS0FBSztRQUNMLEtBQUs7S0FDTjtDQUNGLENBQUM7QUFFRixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sV0FBVyxDQUFDIn0=