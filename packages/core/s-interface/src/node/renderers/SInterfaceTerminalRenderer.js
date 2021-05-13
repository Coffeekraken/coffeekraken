import __SInterfaceRenderer from './SInterfaceRenderer';
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(int, settings) {
        super(int, Object.assign({ templatesDir: `${__dirname}/terminal` }, settings));
    }
    renderType(type) { }
}
SInterfaceTerminalRenderer.id = 'terminal';
export default SInterfaceTerminalRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ludGVyZmFjZVRlcm1pbmFsUmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTSW50ZXJmYWNlVGVybWluYWxSZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLG9CQUFvQixNQUFNLHNCQUFzQixDQUFDO0FBS3hEOzs7Ozs7Ozs7Ozs7O0dBYUc7QUFDSCxNQUFNLDBCQUEyQixTQUFRLG9CQUFvQjtJQUczRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNFLEdBQWlCLEVBQ2pCLFFBQStDO1FBRS9DLEtBQUssQ0FBQyxHQUFHLGtCQUNQLFlBQVksRUFBRSxHQUFHLFNBQVMsV0FBVyxJQUNsQyxRQUFRLEVBQ1gsQ0FBQztJQUNMLENBQUM7SUFFRCxVQUFVLENBQUMsSUFBSSxJQUFHLENBQUM7O0FBdEJaLDZCQUFFLEdBQUcsVUFBVSxDQUFDO0FBeUJ6QixlQUFlLDBCQUEwQixDQUFDIn0=