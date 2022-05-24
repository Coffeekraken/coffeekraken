import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';

/**
 * @name                astNodesToString
 * @namespace           node.utils
 * @type                Function
 * @status              beta
 *
 * This function just take an AST nodes array and returns the string version of it
 * with ";" when needed, etc...
 *
 * @param           {Array}        nodes      An array of AST nodes to transform into string
 * @return          {String}                            The processed css string
 *
 * @since       2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function astNodesToString(nodes) {
    const res = nodes
        .map((node) => {
            if (node.type === 'decl') return node.toString() + ';';
            return node.toString();
        })
        .map((item) => {
            item = item.trim();
            if (!item.match(/\}$/) && !item.match(/;$/)) {
                item += ';';
            }
            return item;
        });
    return res.join('\n');
}
