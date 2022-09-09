import __SInterfaceRenderer from './SInterfaceRenderer';
import { __dirname } from '@coffeekraken/sugar/fs';
/**
 * @name            SInterfaceTerminalRenderer
 * @namespace       sugar.node.interface.renderers
 * @type            Class
 * @extends         SClass
 *
 * This class represent the terminal interface renderer
 *
 * @param        {ISInterface}              interface           The interface you want to render
 * @param       {ISInterfaceTerminalRendererSettings}       [settings={}]       Some settings to configure your renderer like properties to exclude, etc...
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SInterfaceTerminalRenderer extends __SInterfaceRenderer {
    /**
     * @name        constructor
     * @type          Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(int, settings) {
        super(int, Object.assign({ templatesDir: `${__dirname()}/terminal` }, settings));
    }
    renderType(type) { }
}
SInterfaceTerminalRenderer.id = 'terminal';
export default SInterfaceTerminalRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sb0JBQW9CLE1BQU0sc0JBQXNCLENBQUM7QUFJeEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRW5EOzs7Ozs7Ozs7Ozs7O0dBYUc7QUFDSCxNQUFNLDBCQUEyQixTQUFRLG9CQUFvQjtJQUd6RDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNJLEdBQWlCLEVBQ2pCLFFBQStDO1FBRS9DLEtBQUssQ0FBQyxHQUFHLGtCQUNMLFlBQVksRUFBRSxHQUFHLFNBQVMsRUFBRSxXQUFXLElBQ3BDLFFBQVEsRUFDYixDQUFDO0lBQ1AsQ0FBQztJQUVELFVBQVUsQ0FBQyxJQUFJLElBQUcsQ0FBQzs7QUF0QlosNkJBQUUsR0FBRyxVQUFVLENBQUM7QUF5QjNCLGVBQWUsMEJBQTBCLENBQUMifQ==