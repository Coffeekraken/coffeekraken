import __fs from 'fs';
import __SClass from '../../../shared/class/SClass';
import ISInterfaceRenderer, {
  ISInterfaceRendererRenderPropertyObj,
  ISInterfaceRendererSettings
} from '../../../shared/interface/renderers/ISInterfaceRenderer';
import __SInterface, {
  ISInterfaceDefinitionProperty
} from '../../../shared/interface/_SInterface';
import __deepMerge from '../../../shared/object/deepMerge';
import __upperFirst from '../../../shared/string/upperFirst';

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
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(
    int: __SInterface,
    settings?: Partial<ISInterfaceRendererSettings>
  ) {
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
  render(settings?: Partial<ISInterfaceRendererSettings>): string {
    const set = <ISInterfaceRendererSettings>(
      __deepMerge(this._settings, {}, settings)
    );

    const renderedProperties: Record<string, any> = {};

    // loop on each interface definition properties
    for (const key in (<any>this._interface).definition) {
      const propertyObj: ISInterfaceDefinitionProperty = (<any>this._interface)
        .definition[key];
      if (!propertyObj.name) propertyObj.name = key;

      renderedProperties[key] = {
        name: key
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
            interfaceClass: this._interface
          };

          //  console.log('s', key, propKey);

          // check if we have a template directory specified and if
          if (
            set.templatesDir &&
            __fs.existsSync(`${set.templatesDir}/${propKey}.js`)
          ) {
            // load the template
            const templateFunction = require(`${set.templatesDir}/${propKey}.js`)
              .default;
            // execute the template function
            renderedProperties[key][propKey] = templateFunction(toRenderObj);
          } else if (
            this[`render${__upperFirst(propKey)}`] &&
            typeof this[`render${__upperFirst(propKey)}`] === 'function'
          ) {
            renderedProperties[key][propKey] = this[
              `render${__upperFirst(propKey)}`
            ](toRenderObj);
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
      templateFunction = require(`${set.templatesDir}/template.js`).default;
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
        }/template.js</cyan>" file...`
      );
    }

    // render the template
    return templateFunction({
      interfaceClass: this._interface,
      properties: renderedProperties
    });
  }
}

export default SInterfaceRenderer;
