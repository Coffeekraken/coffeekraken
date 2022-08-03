"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterfaceRenderer_1 = __importDefault(require("./SInterfaceRenderer"));
const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
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
class SInterfaceTerminalRenderer extends SInterfaceRenderer_1.default {
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
        super(int, Object.assign({ templatesDir: `${(0, dirname_1.default)()}/terminal` }, settings));
    }
    renderType(type) { }
}
SInterfaceTerminalRenderer.id = 'terminal';
exports.default = SInterfaceTerminalRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsOEVBQXdEO0FBSXhELGtGQUE0RDtBQUU1RDs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsTUFBTSwwQkFBMkIsU0FBUSw0QkFBb0I7SUFHekQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDSSxHQUFpQixFQUNqQixRQUErQztRQUUvQyxLQUFLLENBQUMsR0FBRyxrQkFDTCxZQUFZLEVBQUUsR0FBRyxJQUFBLGlCQUFTLEdBQUUsV0FBVyxJQUNwQyxRQUFRLEVBQ2IsQ0FBQztJQUNQLENBQUM7SUFFRCxVQUFVLENBQUMsSUFBSSxJQUFHLENBQUM7O0FBdEJaLDZCQUFFLEdBQUcsVUFBVSxDQUFDO0FBeUIzQixrQkFBZSwwQkFBMEIsQ0FBQyJ9