// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../console/parseHtml", "../../../string/countLine"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var parseHtml_1 = __importDefault(require("../../../console/parseHtml"));
    var countLine_1 = __importDefault(require("../../../string/countLine"));
    /**
     * @name                layout
     * @namespace           sugar.js.interface.renderers.terminal
     * @type                Function
     *
     * Return the layout you want for the "terminal" renderer.
     * You can use tokens like these:
     * - %type : Will be replaced with the "type" field rendered string
     * - %default : Same but for the "default" field
     * - etc...
     *
     * @param       {ISInterfaceRendererRenderPropertyObj}          propertyObj             The property object to render
     * @return              String                  The renderer template string
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function default_1(_a) {
        var interfaceClass = _a.interfaceClass, properties = _a.properties;
        var tpl = [];
        tpl = tpl.concat([
            '',
            "<yellow>" + interfaceClass.name + "</yellow> interface help",
            ''
        ]);
        if (interfaceClass.description) {
            tpl.push(interfaceClass.description);
            tpl.push('');
        }
        for (var propKey in properties) {
            var propertyObj = properties[propKey];
            var titleStr = "--" + propertyObj.name + " " + (propertyObj.alias ? "(" + propertyObj.alias + ")" : '') + " " + propertyObj.type + " " + (propertyObj.default && countLine_1.default(propertyObj.default) <= 20
                ? propertyObj.default
                : '') + " " + (propertyObj.description || '');
            tpl.push(titleStr.replace(/\s{2,999}/gm, ' '));
            if (propertyObj.default && countLine_1.default(propertyObj.default) > 20) {
                tpl.push(propertyObj.default);
            }
        }
        return parseHtml_1.default(tpl.join('\n'));
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0ZW1wbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7SUFFVix5RUFBcUQ7SUFDckQsd0VBQW9EO0lBRXBEOzs7Ozs7Ozs7Ozs7Ozs7O09BZ0JHO0lBQ0gsbUJBQXlCLEVBQThCO1lBQTVCLGNBQWMsb0JBQUEsRUFBRSxVQUFVLGdCQUFBO1FBQ25ELElBQUksR0FBRyxHQUFhLEVBQUUsQ0FBQztRQUV2QixHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztZQUNmLEVBQUU7WUFDRixhQUFXLGNBQWMsQ0FBQyxJQUFJLDZCQUEwQjtZQUN4RCxFQUFFO1NBQ0gsQ0FBQyxDQUFDO1FBRUgsSUFBSSxjQUFjLENBQUMsV0FBVyxFQUFFO1lBQzlCLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3JDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDZDtRQUVELEtBQUssSUFBSSxPQUFPLElBQUksVUFBVSxFQUFFO1lBQzlCLElBQU0sV0FBVyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN4QyxJQUFJLFFBQVEsR0FBRyxPQUFLLFdBQVcsQ0FBQyxJQUFJLFVBQ2xDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQUksV0FBVyxDQUFDLEtBQUssTUFBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQy9DLFdBQVcsQ0FBQyxJQUFJLFVBQ2xCLFdBQVcsQ0FBQyxPQUFPLElBQUksbUJBQVcsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtnQkFDM0QsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFPO2dCQUNyQixDQUFDLENBQUMsRUFBRSxXQUNKLFdBQVcsQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFFLENBQUM7WUFDcEMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQy9DLElBQUksV0FBVyxDQUFDLE9BQU8sSUFBSSxtQkFBVyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ2hFLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQy9CO1NBQ0Y7UUFFRCxPQUFPLG1CQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUE5QkQsNEJBOEJDIn0=