"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterfaceRenderer_js_1 = __importDefault(require("./SInterfaceRenderer.js"));
const fs_1 = require("@coffeekraken/sugar/fs");
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
class SInterfaceTerminalRenderer extends SInterfaceRenderer_js_1.default {
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
        super(int, Object.assign({ templatesDir: `${(0, fs_1.__dirname)()}/terminal` }, settings));
    }
    renderType(type) { }
}
SInterfaceTerminalRenderer.id = 'terminal';
exports.default = SInterfaceTerminalRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0Esb0ZBQTJEO0FBSTNELCtDQUFtRDtBQUVuRDs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxNQUFNLDBCQUEyQixTQUFRLCtCQUFvQjtJQUd6RDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNJLEdBQWlCLEVBQ2pCLFFBQStDO1FBRS9DLEtBQUssQ0FBQyxHQUFHLGtCQUNMLFlBQVksRUFBRSxHQUFHLElBQUEsY0FBUyxHQUFFLFdBQVcsSUFDcEMsUUFBUSxFQUNiLENBQUM7SUFDUCxDQUFDO0lBRUQsVUFBVSxDQUFDLElBQUksSUFBRyxDQUFDOztBQXRCWiw2QkFBRSxHQUFHLFVBQVUsQ0FBQztBQXlCM0Isa0JBQWUsMEJBQTBCLENBQUMifQ==