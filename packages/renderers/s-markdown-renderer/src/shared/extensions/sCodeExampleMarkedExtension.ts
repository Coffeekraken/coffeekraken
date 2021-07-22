/**
 * @name            sCodeExampleMarkedExtension
 * @namespace       shared.extensions
 * @type            Function
 * @platform        js
 * @platform        node
 * @platform        ts
 * @status          beta
 * 
 * This marked extension allows you to transform block code like:
 * ```js
 * const hello = 'world';
 * ```
 * into an s-code-example component
 * 
 * @example         js
 * import marked from 'marked';
 * import { sCodeExampleMarkedExtension } from '@coffeekraken/s-markdown-renderer';
 * marked.use({
 *  extensions: [sCodeExampleMarkedExtension]
 * });
 * marked('...');
 * 
 * @since           2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export interface ISCodeExampleMarkdownExtensionSettings {

}

export default function sCodeExampleMarkedExtension(settings?: Partial<ISCodeExampleMarkdownExtensionSettings>): any {
        
    return {
        name: 'SCodeExample',
        level: 'block',
        start(src) { return src.match(/```\s?([a-zA-Z0-9]+)\n([^:```]*)\n```/)?.index; },
        tokenizer(src, tokens) {
            const rule = /^```\s?([a-zA-Z0-9]+)\n([^:```]*)\n```/;
            const match = rule.exec(src);
            if (match && match.input.match(/^```/)) {
                return {                       
                type: 'SCodeExample',          
                raw: match[0],                 
                language: match[1],
                code: match[2],
                tokens: this.inlineTokens('')  
                };
            }
        },
        renderer(token) {
            return `
            <s-code-example>
                <template lang="${token.language}">
                ${token.code}
                </template>
            </s-code-example>
            `;
        }
    };
}