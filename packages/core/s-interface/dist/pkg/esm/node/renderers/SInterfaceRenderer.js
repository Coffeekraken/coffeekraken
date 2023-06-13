var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SClass from '@coffeekraken/s-class';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __upperFirst } from '@coffeekraken/sugar/string';
import __fs from 'fs';
/**
 * @___name            SInterfaceRenderer
 * @___namespace       node.renderers
 * @___type            Class
 * @___extends         SClass
 * @___platform        node
 * @___status          beta
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
class SInterfaceRenderer extends __SClass {
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    render(settings) {
        return __awaiter(this, void 0, void 0, function* () {
            const set = (__deepMerge(this.settings, {}, settings));
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
                            __fs.existsSync(`${set.templatesDir}/${propKey}.js`)) {
                            // load the template
                            const { default: templateFunction } = yield import(`${set.templatesDir}/${propKey}.js`);
                            // execute the template function
                            renderedProperties[key][propKey] =
                                templateFunction(toRenderObj);
                        }
                        else if (this[`render${__upperFirst(propKey)}`] &&
                            typeof this[`render${__upperFirst(propKey)}`] ===
                                'function') {
                            renderedProperties[key][propKey] =
                                this[`render${__upperFirst(propKey)}`](toRenderObj);
                        }
                    }
                }
            }
            // render the template
            let templateFunction = null;
            if (set.templatesDir &&
                __fs.existsSync(`${set.templatesDir}/template.js`)) {
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
export default SInterfaceRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDMUQsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBUXRCOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILE1BQU0sa0JBQW1CLFNBQVEsUUFBUTtJQTBCckM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDSSxHQUFpQixFQUNqQixRQUErQztRQUUvQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO0lBQzFCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDRyxNQUFNLENBQ1IsUUFBK0M7O1lBRS9DLE1BQU0sR0FBRyxHQUFnQyxDQUNyQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQzNDLENBQUM7WUFFRixNQUFNLGtCQUFrQixHQUF3QixFQUFFLENBQUM7WUFFbkQsK0NBQStDO1lBQy9DLEtBQUssTUFBTSxHQUFHLElBQVUsSUFBSSxDQUFDLFVBQVcsQ0FBQyxVQUFVLEVBQUU7Z0JBQ2pELE1BQU0sV0FBVyxHQUF3QyxDQUNyRCxJQUFJLENBQUMsVUFBVSxDQUNqQixDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJO29CQUFFLFdBQVcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO2dCQUU5QyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsR0FBRztvQkFDdEIsSUFBSSxFQUFFLEdBQUc7aUJB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