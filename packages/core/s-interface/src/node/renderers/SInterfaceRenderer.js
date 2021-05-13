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
                        const templateFunction = require(`${set.templatesDir}/${propKey}.js`)
                            .default;
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
export default SInterfaceRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ludGVyZmFjZVJlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0ludGVyZmFjZVJlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUs3QyxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLFlBQVksTUFBTSw4Q0FBOEMsQ0FBQztBQUd4RTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILE1BQU0sa0JBQW1CLFNBQVEsUUFBUTtJQTBCdkM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDRSxHQUFpQixFQUNqQixRQUErQztRQUUvQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILE1BQU0sQ0FBQyxRQUErQztRQUNwRCxNQUFNLEdBQUcsR0FBZ0MsQ0FDdkMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUMxQyxDQUFDO1FBRUYsTUFBTSxrQkFBa0IsR0FBd0IsRUFBRSxDQUFDO1FBRW5ELCtDQUErQztRQUMvQyxLQUFLLE1BQU0sR0FBRyxJQUFVLElBQUksQ0FBQyxVQUFXLENBQUMsVUFBVSxFQUFFO1lBQ25ELE1BQU0sV0FBVyxHQUF3QyxJQUFJLENBQUMsVUFBVztpQkFDdEUsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSTtnQkFBRSxXQUFXLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztZQUU5QyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsR0FBRztnQkFDeEIsSUFBSSxFQUFFLEdBQUc7YUFDVixDQUFDO1lBRUYs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