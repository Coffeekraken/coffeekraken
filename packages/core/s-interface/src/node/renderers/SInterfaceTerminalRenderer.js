"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterfaceRenderer_1 = __importDefault(require("./SInterfaceRenderer"));
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
class SInterfaceTerminalRenderer extends SInterfaceRenderer_1.default {
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
exports.default = SInterfaceTerminalRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ludGVyZmFjZVRlcm1pbmFsUmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTSW50ZXJmYWNlVGVybWluYWxSZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDhFQUF3RDtBQUt4RDs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsTUFBTSwwQkFBMkIsU0FBUSw0QkFBb0I7SUFHM0Q7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDRSxHQUFpQixFQUNqQixRQUErQztRQUUvQyxLQUFLLENBQUMsR0FBRyxrQkFDUCxZQUFZLEVBQUUsR0FBRyxTQUFTLFdBQVcsSUFDbEMsUUFBUSxFQUNYLENBQUM7SUFDTCxDQUFDO0lBRUQsVUFBVSxDQUFDLElBQUksSUFBRyxDQUFDOztBQXRCWiw2QkFBRSxHQUFHLFVBQVUsQ0FBQztBQXlCekIsa0JBQWUsMEJBQTBCLENBQUMifQ==