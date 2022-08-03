"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFDSCxTQUF3QixnQkFBZ0IsQ0FBQyxLQUFLO0lBQzFDLE1BQU0sR0FBRyxHQUFHLEtBQUs7U0FDWixHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNWLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNO1lBQUUsT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQ3ZELE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzNCLENBQUMsQ0FBQztTQUNELEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ1YsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDekMsSUFBSSxJQUFJLEdBQUcsQ0FBQztTQUNmO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDMUIsQ0FBQztBQWRELG1DQWNDIn0=