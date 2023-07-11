import __SClass from '@coffeekraken/s-class';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __upperFirst } from '@coffeekraken/sugar/string';
import __fs from 'fs';
import ISInterfaceRenderer, {
    ISInterfaceRendererRenderPropertyObj,
    ISInterfaceRendererSettings,
} from '../../shared/renderers/ISInterfaceRenderer.js';
import type { ISInterfaceDefinitionProperty } from '../SInterface.js';
import __SInterface from '../SInterface.js';

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
class SInterfaceRenderer extends __SClass implements ISInterfaceRenderer {
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
    static id = 'default';

    /**
     * @name        _interface
     * @type        ISInterface
     * @private
     *
     * Store the interface you want to render
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    private _interface: __SInterface;

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
    constructor(
        int: __SInterface,
        settings?: Partial<ISInterfaceRendererSettings>,
    ) {
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
    async render(
        settings?: Partial<ISInterfaceRendererSettings>,
    ): Promise<string> {
        const set = <ISInterfaceRendererSettings>(
            __deepMerge(this.settings, {}, settings)
        );

        const renderedProperties: Record<string, any> = {};

        // loop on each interface definition properties
        for (const key in (<any>this._interface).definition) {
            const propertyObj: ISInterfaceDefinitionProperty = (<any>(
                this._interface
            )).definition[key];
            if (!propertyObj.name) propertyObj.name = key;

            renderedProperties[key] = {
                name: key,
            };

            // loop on the propery object keys
            for (const propKey in propertyObj) {
                if (
                    propertyObj[propKey] !== undefined &&
                    set.exclude.indexOf(propKey) === -1
                ) {
                    // prepare the object to pass to the renderer function
                    const toRenderObj: ISInterfaceRendererRenderPropertyObj = {
                        value: propertyObj[propKey],
                        property: propertyObj,
                        interfaceClass: this._interface,
                    };

                    // check if we have a template directory specified and if
                    if (
                        set.templatesDir &&
                        __fs.existsSync(`${set.templatesDir}/${propKey}.js`)
                    ) {
                        // load the template
                        const { default: templateFunction } = await import(
                            `${set.templatesDir}/${propKey}.js`
                        );
                        // execute the template function
                        renderedProperties[key][propKey] =
                            templateFunction(toRenderObj);
                    } else if (
                        this[`render${__upperFirst(propKey)}`] &&
                        typeof this[`render${__upperFirst(propKey)}`] ===
                            'function'
                    ) {
                        renderedProperties[key][propKey] =
                            this[`render${__upperFirst(propKey)}`](toRenderObj);
                    }
                }
            }
        }

        // render the template
        let templateFunction: Function | null = null;
        if (
            set.templatesDir &&
            __fs.existsSync(`${set.templatesDir}/template.js`)
        ) {
            templateFunction = (await import(`${set.templatesDir}/template.js`))
                .default;
        } else if (
            this['renderTemplate'] &&
            typeof this['renderTemplate'] === 'function'
        ) {
            (templateFunction = this['renderTemplate']).bind(this);
        }

        if (!templateFunction) {
            throw new Error(
                `Sorry but your SInterfaceRenderer named "<yellow>${
                    (<any>this.constructor).name
                }</yellow>" need a template and seems to not have one defined... Either specify a "<cyan>renderTemplate</cyan>" method or create a "<cyan>${
                    set.templatesDir || (<any>this.constructor).id
                }/template.js</cyan>" file...`,
            );
        }

        // render the template
        return templateFunction({
            interfaceClass: this._interface,
            properties: renderedProperties,
        });
    }
}

export default SInterfaceRenderer;
