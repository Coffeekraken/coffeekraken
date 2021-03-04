"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SClass_1 = __importDefault(require("../../class/SClass"));
const fs_1 = __importDefault(require("fs"));
const upperFirst_1 = __importDefault(require("../../string/upperFirst"));
class SInterfaceRenderer extends SClass_1.default {
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
        super(deepMerge_1.default({}, settings));
        this._interface = int;
    }
    /**
     * @name          render
     * @type          Function
     *
     * This method simply render the passed interface
     *
     * @param         {ISInterfaceRendererSettings}       [settings={}]       Override some settings passed in the constructor if needed
     * @return            {String}                    The rendered interface string
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    render(settings) {
        const set = (deepMerge_1.default(this._settings, {}, settings));
        const renderedProperties = {};
        // loop on each interface definition properties
        for (let key in this._interface.definition) {
            const propertyObj = this._interface
                .definition[key];
            if (!propertyObj.name)
                propertyObj.name = key;
            renderedProperties[key] = {
                name: key
            };
            // loop on the propery object keys
            for (let propKey in propertyObj) {
                if (propertyObj[propKey] !== undefined &&
                    set.exclude.indexOf(propKey) === -1) {
                    // prepare the object to pass to the renderer function
                    const toRenderObj = {
                        value: propertyObj[propKey],
                        property: propertyObj,
                        interfaceClass: this._interface
                    };
                    //  console.log('s', key, propKey);
                    // check if we have a template directory specified and if
                    if (set.templatesDir &&
                        fs_1.default.existsSync(`${set.templatesDir}/${propKey}.js`)) {
                        // load the template
                        const templateFunction = require(`${set.templatesDir}/${propKey}.js`)
                            .default;
                        // execute the template function
                        renderedProperties[key][propKey] = templateFunction(toRenderObj);
                    }
                    else if (this[`render${upperFirst_1.default(propKey)}`] &&
                        typeof this[`render${upperFirst_1.default(propKey)}`] === 'function') {
                        renderedProperties[key][propKey] = this[`render${upperFirst_1.default(propKey)}`](toRenderObj);
                    }
                }
            }
        }
        // render the template
        let templateFunction = null;
        if (set.templatesDir &&
            fs_1.default.existsSync(`${set.templatesDir}/template.js`)) {
            templateFunction = require(`${set.templatesDir}/template.js`).default;
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
            properties: renderedProperties
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SInterfaceRenderer.id = 'default';
exports.default = SInterfaceRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ludGVyZmFjZVJlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0ludGVyZmFjZVJlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsdUVBQWlEO0FBQ2pELGdFQUEwQztBQUcxQyw0Q0FBc0I7QUFFdEIseUVBQW1EO0FBNkNuRCxNQUFNLGtCQUFtQixTQUFRLGdCQUFRO0lBMEJ2Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNFLEdBQWlCLEVBQ2pCLFFBQStDO1FBRS9DLEtBQUssQ0FBQyxtQkFBVyxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILE1BQU0sQ0FBQyxRQUErQztRQUNwRCxNQUFNLEdBQUcsR0FBZ0MsQ0FDdkMsbUJBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FDMUMsQ0FBQztRQUVGLE1BQU0sa0JBQWtCLEdBQXdCLEVBQUUsQ0FBQztRQUVuRCwrQ0FBK0M7UUFDL0MsS0FBSyxJQUFJLEdBQUcsSUFBVSxJQUFJLENBQUMsVUFBVyxDQUFDLFVBQVUsRUFBRTtZQUNqRCxNQUFNLFdBQVcsR0FBd0MsSUFBSSxDQUFDLFVBQVc7aUJBQ3RFLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUk7Z0JBQUUsV0FBVyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7WUFFOUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLEdBQUc7Z0JBQ3hCLElBQUksRUFBRSxHQUFHO2FBQ1YsQ0FBQztZQUVGLGtDQUFrQztZQUNsQyxLQUFLLElBQUksT0FBTyxJQUFJLFdBQVcsRUFBRTtnQkFDL0IsSUFDRSxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssU0FBUztvQkFDbEMsR0FBRyxDQUFDLE9B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