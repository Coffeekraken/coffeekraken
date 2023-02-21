import __SInterfaceRenderer from './SInterfaceRenderer';
import { __dirname } from '@coffeekraken/sugar/fs';
/**
 * @name            SInterfaceTerminalRenderer
 * @namespace       sugar.node.interface.renderers
 * @type            Class
 * @extends         SClass
 * @platform        node
 * @status          beta
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sb0JBQW9CLE1BQU0sc0JBQXNCLENBQUM7QUFJeEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRW5EOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILE1BQU0sMEJBQTJCLFNBQVEsb0JBQW9CO0lBR3pEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0ksR0FBaUIsRUFDakIsUUFBK0M7UUFFL0MsS0FBSyxDQUFDLEdBQUcsa0JBQ0wsWUFBWSxFQUFFLEdBQUcsU0FBUyxFQUFFLFdBQVcsSUFDcEMsUUFBUSxFQUNiLENBQUM7SUFDUCxDQUFDO0lBRUQsVUFBVSxDQUFDLElBQUksSUFBRyxDQUFDOztBQXRCWiw2QkFBRSxHQUFHLFVBQVUsQ0FBQztBQXlCM0IsZUFBZSwwQkFBMEIsQ0FBQyJ9