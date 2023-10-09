"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const object_1 = require("@coffeekraken/sugar/object");
const string_1 = require("@coffeekraken/sugar/string");
const fs_1 = __importDefault(require("fs"));
/**
 * @name            SInterfaceRenderer
 * @namespace       node.renderers
 * @type            Class
 * @extends         SClass
 * @platform        node
 * @status          beta
 * @private
 *
 * This class represent the base for every interface renderers.
 * It handle things like registering types templates, properties to exclude, etc...
 *
 * @param        {SInterface}              interface           The interface you want to render
 * @param       {ISInterfaceRendererSettings}       [settings={}]       Some settings to configure your renderer like properties to exclude, etc...
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SInterfaceRenderer extends s_class_1.default {
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
        super((0, object_1.__deepMerge)({}, settings));
        this._interface = int;
    }
    /**
     * @name          render
     * @type          Function
     * @async
     *
     * This method simply render the passed interface
     *
     * @param         {ISInterfaceRendererSettings}       [settings={}]       Override some settings passed in the constructor if needed
     * @return            {String}                    The rendered interface string
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    render(settings) {
        return __awaiter(this, void 0, void 0, function* () {
            const set = ((0, object_1.__deepMerge)(this.settings, {}, settings));
            const renderedProperties = {};
            // loop on each interface definition properties
            for (const key in this._interface.definition) {
                const propertyObj = (this._interface).definition[key];
                if (!propertyObj.name)
                    propertyObj.name = key;
                renderedProperties[key] = {
                    name: key,
                };
                // loop on the propery object keys
                for (const propKey in propertyObj) {
                    if (propertyObj[propKey] !== undefined &&
                        set.exclude.indexOf(propKey) === -1) {
                        // prepare the object to pass to the renderer function
                        const toRenderObj = {
                            value: propertyObj[propKey],
                            property: propertyObj,
                            interfaceClass: this._interface,
                        };
                        // check if we have a template directory specified and if
                        if (set.templatesDir &&
                            fs_1.default.existsSync(`${set.templatesDir}/${propKey}.js`)) {
                            // load the template
                            const { default: templateFunction } = yield import(`${set.templatesDir}/${propKey}.js`);
                            // execute the template function
                            renderedProperties[key][propKey] =
                                templateFunction(toRenderObj);
                        }
                        else if (this[`render${(0, string_1.__upperFirst)(propKey)}`] &&
                            typeof this[`render${(0, string_1.__upperFirst)(propKey)}`] ===
                                'function') {
                            renderedProperties[key][propKey] =
                                this[`render${(0, string_1.__upperFirst)(propKey)}`](toRenderObj);
                        }
                    }
                }
            }
            // render the template
            let templateFunction = null;
            if (set.templatesDir &&
                fs_1.default.existsSync(`${set.templatesDir}/template.js`)) {
                templateFunction = (yield import(`${set.templatesDir}/template.js`))
                    .default;
            }
            else if (this['renderTemplate'] &&
                typeof this['renderTemplate'] === 'function') {
                (templateFunction = this['renderTemplate']).bind(this);
            }
            if (!templateFunction) {
                throw new Error(`Sorry but your SInterfaceRenderer named "<yellow>${this.constructor.name}</yellow>" need a template and seems to not have one defined... Either specify a "<cyan>renderTemplate</cyan>" method or create a "<cyan>${set.templatesDir || this.constructor.id}/template.js</cyan>" file...`);
            }
            // render the template
            return templateFunction({
                interfaceClass: this._interface,
                properties: renderedProperties,
            });
        });
    }
}
/**
 * @name            id
 * @type            String
 * @static
 *
 * Store the id of the renderer.
 * This id has to be used when you call the ```interface.render('{id}', {})``` method of the SInterface instance.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
SInterfaceRenderer.id = 'default';
exports.default = SInterfaceRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLHVEQUF5RDtBQUN6RCx1REFBMEQ7QUFDMUQsNENBQXNCO0FBUXRCOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILE1BQU0sa0JBQW1CLFNBQVEsaUJBQVE7SUEwQnJDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0ksR0FBaUIsRUFDakIsUUFBK0M7UUFFL0MsS0FBSyxDQUFDLElBQUEsb0JBQVcsRUFBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQztJQUMxQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0csTUFBTSxDQUNSLFFBQStDOztZQUUvQyxNQUFNLEdBQUcsR0FBZ0MsQ0FDckMsSUFBQSxvQkFBVyxFQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUMzQyxDQUFDO1lBRUYsTUFBTSxrQkFBa0IsR0FBd0IsRUFBRSxDQUFDO1lBRW5ELCtDQUErQztZQUMvQyxLQUFLLE1BQU0sR0FBRyxJQUFVLElBQUksQ0FBQyxVQUFXLENBQUMsVUFBVSxFQUFFO2dCQUNqRCxNQUFNLFdBQVcsR0FBd0MsQ0FDckQsSUFBSSxDQUFDLFVBQVUsQ0FDakIsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSTtvQkFBRSxXQUFXLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztnQkFFOUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLEdBQUc7b0JBQ3RCLElBQUksRUFBRSxHQUFHO2lCQUNaLENBQUM7Z0JBRUYsa0NBQWtDO2dCQUNsQyxLQUFLLE1BQU0sT0FBTyxJQUFJLFdBQVcsRUFBRTtvQkFDL0IsSUFDSSxXQUFXLENBQUMs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