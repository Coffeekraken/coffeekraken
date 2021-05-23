// @ts-nocheck
import { doc } from 'prettier';
import { getText } from './lib/getText';
import { snippedTagContentAttribute } from './lib/snipTagContent';
import { isLine, trimRight } from './print/doc-helpers';
import { getAttributeTextValue, getLeadingComment, isIgnoreDirective, isNodeSupportedLanguage, isTypeScript } from './print/node-helpers';
const { builders: { concat, hardline, group, indent, literalline }, utils: { removeLines } } = doc;
export function embed(path, print, textToDoc, options) {
    const node = path.getNode();
    if (node.isJS) {
        try {
            const embeddedOptions = {
                parser: expressionParser
            };
            if (node.forceSingleQuote) {
                embeddedOptions.singleQuote = true;
            }
            const docs = textToDoc(forceIntoExpression(getText(node, options)), embeddedOptions);
            return node.forceSingleLine ? removeLines(docs) : docs;
        }
        catch (e) {
            return getText(node, options);
        }
    }
    const embedType = (tag, parser, isTopLevel) => embedTag(tag, path, (content) => formatBodyContent(content, parser, textToDoc, options), print, isTopLevel);
    const embedScript = (isTopLevel) => embedType('script', 
    // Use babel-ts as fallback because the absence does not mean the content is not TS,
    // the user could have set the default language. babel-ts will format things a little
    // bit different though, especially preserving parentheses around dot notation which
    // fixes https://github.com/sveltejs/prettier-plugin-svelte/issues/218
    isTypeScript(node) ? 'typescript' : 'babel-ts', isTopLevel);
    const embedStyle = (isTopLevel) => embedType('style', 'css', isTopLevel);
    switch (node.type) {
        case 'Script':
            return embedScript(true);
        case 'Style':
            return embedStyle(true);
        case 'Element': {
            if (node.name === 'script') {
                return embedScript(false);
            }
            else if (node.name === 'style') {
                return embedStyle(false);
            }
        }
    }
    return null;
}
function forceIntoExpression(statement) {
    // note the trailing newline: if the statement ends in a // comment,
    // we can't add the closing bracket right afterwards
    return `(${statement}\n)`;
}
function expressionParser(text, parsers, options) {
    const ast = parsers.babel(text, parsers, options);
    return Object.assign(Object.assign({}, ast), { program: ast.program.body[0].expression });
}
function preformattedBody(str) {
    const firstNewline = /^[\t\f\r ]*\n/;
    const lastNewline = /\n[\t\f\r ]*$/;
    // If we do not start with a new line prettier might try to break the opening tag
    // to keep it together with the string. Use a literal line to skip indentation.
    return concat([
        literalline,
        str.replace(firstNewline, '').replace(lastNewline, ''),
        hardline
    ]);
}
function getSnippedContent(node) {
    const encodedContent = getAttributeTextValue(snippedTagContentAttribute, node);
    if (encodedContent) {
        return Buffer.from(encodedContent, 'base64').toString('utf-8');
    }
    else {
        return '';
    }
}
function formatBodyContent(content, parser, textToDoc, options) {
    const indentContent = options.svelteIndentScriptAndStyle;
    try {
        const indentIfDesired = (doc) => (indentContent ? indent(doc) : doc);
        const body = textToDoc(content, { parser });
        trimRight([body], isLine);
        return concat([indentIfDesired(concat([hardline, body])), hardline]);
    }
    catch (error) {
        if (process.env.PRETTIER_DEBUG) {
            throw error;
        }
        // We will wind up here if there is a syntax error in the embedded code. If we throw an error,
        // prettier will try to print the node with the printer. That will fail with a hard-to-interpret
        // error message (e.g. "Unsupported node type", referring to `<script>`).
        // Therefore, fall back on just returning the unformatted text.
        console.error(error);
        return preformattedBody(content);
    }
}
function embedTag(tag, path, formatBodyContent, print, isTopLevel) {
    const node = path.getNode();
    const content = getSnippedContent(node);
    const previousComment = getLeadingComment(path);
    const body = isNodeSupportedLanguage(node) && !isIgnoreDirective(previousComment)
        ? content.trim() !== ''
            ? formatBodyContent(content)
            : content === ''
                ? ''
                : hardline
        : preformattedBody(content);
    const attributes = concat(path.map((childPath) => childPath.getNode().name !== snippedTagContentAttribute
        ? childPath.call(print)
        : '', 'attributes'));
    let result = group(concat(['<', tag, indent(group(attributes)), '>', body, '</', tag, '>']));
    if (isTopLevel) {
        // top level embedded nodes have been moved from their normal position in the
        // node tree. if there is a comment referring to it, it must be recreated at
        // the new position.
        if (previousComment) {
            result = concat([
                '<!--',
                previousComment.data,
                '-->',
                hardline,
                result,
                hardline
            ]);
        }
        else {
            result = concat([result, hardline]);
        }
    }
    return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1iZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlbWJlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxFQUFPLEdBQUcsRUFBMkIsTUFBTSxVQUFVLENBQUM7QUFDN0QsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4QyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVsRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3hELE9BQU8sRUFDTCxxQkFBcUIsRUFDckIsaUJBQWlCLEVBQ2pCLGlCQUFpQixFQUNqQix1QkFBdUIsRUFDdkIsWUFBWSxFQUNiLE1BQU0sc0JBQXNCLENBQUM7QUFHOUIsTUFBTSxFQUNKLFFBQVEsRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFDMUQsS0FBSyxFQUFFLEVBQUUsV0FBVyxFQUFFLEVBQ3ZCLEdBQUcsR0FBRyxDQUFDO0FBRVIsTUFBTSxVQUFVLEtBQUssQ0FDbkIsSUFBYyxFQUNkLEtBQWMsRUFDZCxTQUFpRCxFQUNqRCxPQUFzQjtJQUV0QixNQUFNLElBQUksR0FBUyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFFbEMsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1FBQ2IsSUFBSTtZQUNGLE1BQU0sZUFBZSxHQUFRO2dCQUMzQixNQUFNLEVBQUUsZ0JBQWdCO2FBQ3pCLENBQUM7WUFDRixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDekIsZUFBZSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7YUFDcEM7WUFFRCxNQUFNLElBQUksR0FBRyxTQUFTLENBQ3BCLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsRUFDM0MsZUFBZSxDQUNoQixDQUFDO1lBQ0YsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztTQUN4RDtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsT0FBTyxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQy9CO0tBQ0Y7SUFFRCxNQUFNLFNBQVMsR0FBRyxDQUNoQixHQUFXLEVBQ1gsTUFBeUMsRUFDekMsVUFBbUIsRUFDbkIsRUFBRSxDQUNGLFFBQVEsQ0FDTixHQUFHLEVBQ0gsSUFBSSxFQUNKLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsRUFDbkUsS0FBSyxFQUNMLFVBQVUsQ0FDWCxDQUFDO0lBRUosTUFBTSxXQUFXLEdBQUcsQ0FBQyxVQUFtQixFQUFFLEVBQUUsQ0FDMUMsU0FBUyxDQUNQLFFBQVE7SUFDUixvRkFBb0Y7SUFDcEYscUZBQXFGO0lBQ3JGLG9GQUFvRjtJQUNwRixzRUFBc0U7SUFDdEUsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFDOUMsVUFBVSxDQUNYLENBQUM7SUFDSixNQUFNLFVBQVUsR0FBRyxDQUFDLFVBQW1CLEVBQUUsRUFBRSxDQUN6QyxTQUFTLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztJQUV4QyxRQUFRLElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDakIsS0FBSyxRQUFRO1lBQ1gsT0FBTyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsS0FBSyxPQUFPO1lBQ1YsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsS0FBSyxTQUFTLENBQUMsQ0FBQztZQUNkLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7Z0JBQzFCLE9BQU8sV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzNCO2lCQUFNLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7Z0JBQ2hDLE9BQU8sVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzFCO1NBQ0Y7S0FDRjtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUVELFNBQVMsbUJBQW1CLENBQUMsU0FBaUI7SUFDNUMsb0VBQW9FO0lBQ3BFLG9EQUFvRDtJQUNwRCxPQUFPLElBQUksU0FBUyxLQUFLLENBQUM7QUFDNUIsQ0FBQztBQUVELFNBQVMsZ0JBQWdCLENBQUMsSUFBWSxFQUFFLE9BQVksRUFBRSxPQUFZO0lBQ2hFLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUVsRCx1Q0FBWSxHQUFHLEtBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsSUFBRztBQUM3RCxDQUFDO0FBRUQsU0FBUyxnQkFBZ0IsQ0FBQyxHQUFXO0lBQ25DLE1BQU0sWUFBWSxHQUFHLGVBQWUsQ0FBQztJQUNyQyxNQUFNLFdBQVcsR0FBRyxlQUFlLENBQUM7SUFFcEMsaUZBQWlGO0lBQ2pGLCtFQUErRTtJQUMvRSxPQUFPLE1BQU0sQ0FBQztRQUNaLFdBQVc7UUFDWCxHQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQztRQUN0RCxRQUFRO0tBQ1QsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELFNBQVMsaUJBQWlCLENBQUMsSUFBVTtJQUNuQyxNQUFNLGNBQWMsR0FBRyxxQkFBcUIsQ0FDMUMsMEJBQTBCLEVBQzFCLElBQUksQ0FDTCxDQUFDO0lBRUYsSUFBSSxjQUFjLEVBQUU7UUFDbEIsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDaEU7U0FBTTtRQUNMLE9BQU8sRUFBRSxDQUFDO0tBQ1g7QUFDSCxDQUFDO0FBRUQsU0FBUyxpQkFBaUIsQ0FDeEIsT0FBZSxFQUNmLE1BQXlDLEVBQ3pDLFNBQWlELEVBQ2pELE9BQXNCO0lBRXRCLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQztJQUV6RCxJQUFJO1FBQ0YsTUFBTSxlQUFlLEdBQUcsQ0FBQyxHQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTFFLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzFCLE9BQU8sTUFBTSxDQUFDLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztLQUN0RTtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRTtZQUM5QixNQUFNLEtBQUssQ0FBQztTQUNiO1FBRUQsOEZBQThGO1FBQzlGLGdHQUFnRztRQUNoRyx5RUFBeUU7UUFDekUsK0RBQStEO1FBQy9ELE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFckIsT0FBTyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNsQztBQUNILENBQUM7QUFFRCxTQUFTLFFBQVEsQ0FDZixHQUFXLEVBQ1gsSUFBYyxFQUNkLGlCQUEyQyxFQUMzQyxLQUFjLEVBQ2QsVUFBbUI7SUFFbkIsTUFBTSxJQUFJLEdBQVMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2xDLE1BQU0sT0FBTyxHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLE1BQU0sZUFBZSxHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBRWhELE1BQU0sSUFBSSxHQUNSLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUFDO1FBQ2xFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRTtZQUNyQixDQUFDLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDO1lBQzVCLENBQUMsQ0FBQyxPQUFPLEtBQUssRUFBRTtnQkFDaEIsQ0FBQyxDQUFDLEVBQUU7Z0JBQ0osQ0FBQyxDQUFDLFFBQVE7UUFDWixDQUFDLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFaEMsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUN2QixJQUFJLENBQUMsR0FBRyxDQUNOLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FDWixTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxLQUFLLDBCQUEwQjtRQUNyRCxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdkIsQ0FBQyxDQUFDLEVBQUUsRUFDUixZQUFZLENBQ2IsQ0FDRixDQUFDO0lBRUYsSUFBSSxNQUFNLEdBQVEsS0FBSyxDQUNyQixNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FDekUsQ0FBQztJQUVGLElBQUksVUFBVSxFQUFFO1FBQ2QsNkVBQTZFO1FBQzdFLDRFQUE0RTtRQUM1RSxvQkFBb0I7UUFDcEIsSUFBSSxlQUFlLEVBQUU7WUFDbkIsTUFBTSxHQUFHLE1BQU0sQ0FBQztnQkFDZCxNQUFNO2dCQUNOLGVBQWUsQ0FBQyxJQUFJO2dCQUNwQixLQUFLO2dCQUNMLFFBQVE7Z0JBQ1IsTUFBTTtnQkFDTixRQUFRO2FBQ1QsQ0FBQyxDQUFDO1NBQ0o7YUFBTTtZQUNMLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztTQUNyQztLQUNGO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyJ9