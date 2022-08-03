"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const fs_1 = __importDefault(require("fs"));
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const upperFirst_1 = __importDefault(require("@coffeekraken/sugar/shared/string/upperFirst"));
/**
 * @name            SInterfaceRenderer
 * @namespace       sugar.node.interface.renderers
 * @type            Class
 * @extends         SClass
 *
 * This class represent the base for every interface renderers.
 * It handle things like registering types templates, properties to exclude, etc...
 *
 * @param        {SInterface}              interface           The interface you want to render
 * @param       {ISInterfaceRendererSettings}       [settings={}]       Some settings to configure your renderer like properties to exclude, etc...
 *
 * @example         js
 * import SInterfaceRenderer from '@coffeekraken/sugar/js/interface/renderers/SInterfaceRenderer';
 * class MyCoolRenderer extends SInterfaceRenderer {
 *      constructor(settings: ISInterfaceRendererSettings) {
 *          super({
 *              id: 'myCoolRenderer',
 *              ...settings
 *          });
 *      }
 * }
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
        super((0, deepMerge_1.default)({}, settings));
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
            const set = ((0, deepMerge_1.default)(this.settings, {}, settings));
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
                        //  console.log('s', key, propKey);
                        // check if we have a template directory specified and if
                        if (set.templatesDir &&
                            fs_1.default.existsSync(`${set.templatesDir}/${propKey}.js`)) {
                            // load the template
                            const { default: templateFunction } = yield Promise.resolve().then(() => __importStar(require(`${set.templatesDir}/${propKey}.js`)));
                            // execute the template function
                            renderedProperties[key][propKey] = templateFunction(toRenderObj);
                        }
                        else if (this[`render${(0, upperFirst_1.default)(propKey)}`] &&
                            typeof this[`render${(0, upperFirst_1.default)(propKey)}`] ===
                                'function') {
                            renderedProperties[key][propKey] = this[`render${(0, upperFirst_1.default)(propKey)}`](toRenderObj);
                        }
                    }
                }
            }
            // render the template
            let templateFunction = null;
            if (set.templatesDir &&
                fs_1.default.existsSync(`${set.templatesDir}/template.js`)) {
                templateFunction = (yield Promise.resolve().then(() => __importStar(require(`${set.templatesDir}/template.js`))))
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBc0I7QUFDdEIsb0VBQTZDO0FBSzdDLDRGQUFzRTtBQUN0RSw4RkFBd0U7QUFJeEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSCxNQUFNLGtCQUFtQixTQUFRLGlCQUFRO0lBMEJyQzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNJLEdBQWlCLEVBQ2pCLFFBQStDO1FBRS9DLEtBQUssQ0FBQyxJQUFBLG1CQUFXLEVBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7SUFDMUIsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNHLE1BQU0sQ0FDUixRQUErQzs7WUFFL0MsTUFBTSxHQUFHLEdBQWdDLENBQ3JDLElBQUEsbUJBQVcsRUFBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FDM0MsQ0FBQztZQUVGLE1BQU0sa0JBQWtCLEdBQXdCLEVBQUUsQ0FBQztZQUVuRCwrQ0FBK0M7WUFDL0MsS0FBSyxNQUFNLEdBQUcsSUFBVSxJQUFJLENBQUMsVUFBVyxDQUFDLFVBQVUsRUFBRTtnQkFDakQsTUFBTSxXQUFXLEdBQXdDLENBQ3JELElBQUksQ0FBQyxVQUFVLENBQ2pCLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNuQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUk7b0JBQUUsV0FBVyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7Z0JBRTlDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxHQUFHO29CQUN0QixJQUFJLEVBQUUsR0FBRztpQkFDWixDQUFDO2dCQUVGLGtDQUFrQztnQkFDbEMsS0FBSyxNQUFNLE9BQU8sSUFBSSxX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