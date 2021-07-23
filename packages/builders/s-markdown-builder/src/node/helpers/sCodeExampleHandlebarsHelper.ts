import { ISMarkdownBuilderToken, ISMarkdownBuilderTokenExtractResult } from '../SMarkdownBuilder';

/**
 * @name            SCodeExampleHandlebarsHelper
 * @namespace       node.helpers
 * @type            Function
 * @platform        node
 * @platform        ts
 * @status          beta
 * 
 * This token allows to transform code like:
 * ```js
 * console.log('coco');
 * ```
 * Into an s-code-example tag when targeting html
 * 
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export interface ISMarkdownBuilderSCodeExampleHandlebarsHelperSettings {

}

export interface ISMarkdownBuilderSCodeExampleHandlebarsHelperParams extends ISMarkdownBuilderTokenExtractResult {
    language: string;
    code: string;
}

export default function sCodeExampleHandlebarsHelper(settings?: Partial<ISMarkdownBuilderSCodeExampleHandlebarsHelperSettings>): Function {

    return function (context, options) {

        return 'Jeéép world';

    }

//     return {
//         extract(source): ISMarkdownBuilderSCodeExampleHandlebarsHelperParams[] | undefined {

//             const matches = source.match(/^```\s?([a-zA-Z0-9]+)\n([^:```]*)\n```/gm);

//             if (!matches) {
//                 return;
//             }

//             const items: ISMarkdownBuilderSCodeExampleHandlebarsHelperParams[] = [];

//             matches.forEach(match => {
//                 const raw = match;
//                 match = match.replace(/^```/, '').replace(/```$/, '');
//                 const language = match.split('\n')[0].trim();
//                 const code = match.split('\n').slice(1).join('\n');
//                 items.push({
//                     raw,
//                     language,
//                     code
//                 });
//             });

//             return items;
//         },
//         render(params: ISMarkdownBuilderSCodeExampleHandlebarsHelperParams, target) {
//             switch(target) {
//                 case 'html':
//                     return `
// <s-code-example><template lang="${params.language}">
// ${params.code.trim()}
// </template></s-code-example>`
//                 break;
//             }
//         }
//     }

}