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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ludGVyZmFjZVJlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NoYXJlZC9pbnRlcmZhY2UvcmVuZGVyZXJzL1NJbnRlcmZhY2VSZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHVFQUFpRDtBQUNqRCxnRUFBMEM7QUFHMUMsNENBQXNCO0FBRXRCLHlFQUFtRDtBQTZDbkQsTUFBTSxrQkFBbUIsU0FBUSxnQkFBUTtJQTBCdkM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDRSxHQUFpQixFQUNqQixRQUErQztRQUUvQyxLQUFLLENBQUMsbUJBQVcsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQztJQUN4QixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxNQUFNLENBQUMsUUFBK0M7UUFDcEQsTUFBTSxHQUFHLEdBQWdDLENBQ3ZDLG1CQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQzFDLENBQUM7UUFFRixNQUFNLGtCQUFrQixHQUF3QixFQUFFLENBQUM7UUFFbkQsK0NBQStDO1FBQy9DLEtBQUssSUFBSSxHQUFHLElBQVUsSUFBSSxDQUFDLFVBQVcsQ0FBQyxVQUFVLEVBQUU7WUFDakQsTUFBTSxXQUFXLEdBQXdDLElBQUksQ0FBQyxVQUFXO2lCQUN0RSxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJO2dCQUFFLFdBQVcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1lBRTlDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxHQUFHO2dCQUN4QixJQUFJLEVBQUUsR0FBRzthQUNWLENBQUM7WUFFRixrQ0FBa0M7WUFDbEMsS0FBSyxJQUFJLE9BQU8sSUFBSSxXQUFXLEVBQUU7Z0JBQy9CLElBQ0UsV0FBVyxD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