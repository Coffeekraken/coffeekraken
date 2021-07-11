var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __fs from 'fs';
import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __upperFirst from '@coffeekraken/sugar/shared/string/upperFirst';
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SInterfaceRenderer extends __SClass {
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
        super(__deepMerge({}, settings));
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    render(settings) {
        return __awaiter(this, void 0, void 0, function* () {
            const set = (__deepMerge(this._settings, {}, settings));
            const renderedProperties = {};
            // loop on each interface definition properties
            for (const key in this._interface.definition) {
                const propertyObj = this._interface
                    .definition[key];
                if (!propertyObj.name)
                    propertyObj.name = key;
                renderedProperties[key] = {
                    name: key
                };
                // loop on the propery object keys
                for (const propKey in propertyObj) {
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
                            __fs.existsSync(`${set.templatesDir}/${propKey}.js`)) {
                            // load the template
                            const { default: templateFunction } = yield import(`${set.templatesDir}/${propKey}.js`);
                            // execute the template function
                            renderedProperties[key][propKey] = templateFunction(toRenderObj);
                        }
                        else if (this[`render${__upperFirst(propKey)}`] &&
                            typeof this[`render${__upperFirst(propKey)}`] === 'function') {
                            renderedProperties[key][propKey] = this[`render${__upperFirst(propKey)}`](toRenderObj);
                        }
                    }
                }
            }
            // render the template
            let templateFunction = null;
            if (set.templatesDir &&
                __fs.existsSync(`${set.templatesDir}/template.js`)) {
                templateFunction = (yield import(`${set.templatesDir}/template.js`)).default;
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
export default SInterfaceRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ludGVyZmFjZVJlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0ludGVyZmFjZVJlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUs3QyxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLFlBQVksTUFBTSw4Q0FBOEMsQ0FBQztBQUd4RTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILE1BQU0sa0JBQW1CLFNBQVEsUUFBUTtJQTBCdkM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDRSxHQUFpQixFQUNqQixRQUErQztRQUUvQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDRyxNQUFNLENBQUMsUUFBK0M7O1lBQzFELE1BQU0sR0FBRyxHQUFnQyxDQUN2QyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQzFDLENBQUM7WUFFRixNQUFNLGtCQUFrQixHQUF3QixFQUFFLENBQUM7WUFFbkQsK0NBQStDO1lBQy9DLEtBQUssTUFBTSxHQUFHLElBQVUsSUFBSSxDQUFDLFVBQVcsQ0FBQyxVQUFVLEVBQUU7Z0JBQ25ELE1BQU0sV0FBVyxHQUF3QyxJQUFJLENBQUMsVUFBVztxQkFDdEUsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNuQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUk7b0JBQUUsV0FBVyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7Z0JBRTlDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxHQUFHO29CQUN4QixJQUFJLEVBQUUsR0FBRztp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