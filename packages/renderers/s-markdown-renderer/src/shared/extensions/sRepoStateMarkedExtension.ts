import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name            sRepoStateMarkedExtension
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
 * import { sRepoStateMarkedExtension } from '@coffeekraken/s-markdown-renderer';
 * marked.use({
 *  extensions: [sRepoStateMarkedExtension]
 * });
 * marked('...');
 * 
 * @since           2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export class SRepoStateMarkedExtensionInterface extends __SInterface {
    static definition = {
        package: {
            type: 'String',
            alias: 'p'
        },
        style: {
            type: 'String',
            values: ['plastic','flat','flat-square','for-the-badge','social'],
            default: __SSugarConfig.get('shieldsio.style')
        },
        shields: {
            type: 'Array<String>',
            alias: 's',
            default: __SSugarConfig.get('shieldsio.shields')
        }
    };
}

export interface ISRepoStateMarkdownExtensionSettings {

}

export default function sRepoStateMarkedExtension(settings?: Partial<ISRepoStateMarkdownExtensionSettings>): any {
        
    settings = {
        target: 'html',
        ...settings
    };

    return {
        name: 'repoState',
        level: 'block',
        start(src) { return src.match(/<!--\s%repoState\s.*?-->/)?.index; }, // Hint to Marked.js to stop and check for a match
        tokenizer(src, tokens) {
            const rule = /^<!--\s%repoState\s(.*?)-->/;
            const match = rule.exec(src);
            if (match && match.input.match(/^<!--\s%repoState\s/)) {      
                return {                                      
                type: 'repoState',                      
                raw: match[0],                          
                args: match[1],
                tokens: this.inlineTokens('')   
                };
            }
        },
        renderer(token) {

            const params = SRepoStateMarkedExtensionInterface.apply(token.args ?? {});

            const shieldsUrls = __SSugarConfig.get('shieldsio.urls');

            params.shields.forEach(shield => {
                const url = shieldsUrls[shield];
                
            });


            console.log(token, params);

            return `
            Yop
            `;
        }
    };
}