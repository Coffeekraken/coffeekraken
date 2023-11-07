"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name                astNodesToString
 * @namespace           node.utils
 * @type                Function
 * @platform            node
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
function astNodesToString(nodes) {
    const res = nodes
        .map((node) => {
        if (node.type === 'decl')
            return node.toString() + ';';
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
exports.default = astNodesToString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsU0FBd0IsZ0JBQWdCLENBQUMsS0FBSztJQUMxQyxNQUFNLEdBQUcsR0FBRyxLQUFLO1NBQ1osR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDVixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssTUFBTTtZQUFFLE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUN2RCxPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMzQixDQUFDLENBQUM7U0FDRCxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNWLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3pDLElBQUksSUFBSSxHQUFHLENBQUM7U0FDZjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzFCLENBQUM7QUFkRCxtQ0FjQyJ9