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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ludGVyZmFjZVRlcm1pbmFsUmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2hhcmVkL2ludGVyZmFjZS9yZW5kZXJlcnMvU0ludGVyZmFjZVRlcm1pbmFsUmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSw4RUFBd0Q7QUFLeEQ7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNILE1BQU0sMEJBQTJCLFNBQVEsNEJBQW9CO0lBRzNEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0UsR0FBaUIsRUFDakIsUUFBK0M7UUFFL0MsS0FBSyxDQUFDLEdBQUcsa0JBQ1AsWUFBWSxFQUFFLEdBQUcsU0FBUyxXQUFXLElBQ2xDLFFBQVEsRUFDWCxDQUFDO0lBQ0wsQ0FBQztJQUVELFVBQVUsQ0FBQyxJQUFJLElBQUcsQ0FBQzs7QUF0QlosNkJBQUUsR0FBRyxVQUFVLENBQUM7QUF5QnpCLGtCQUFlLDBCQUEwQixDQUFDIn0=