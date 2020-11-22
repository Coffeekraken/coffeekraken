var _a;
import _getExtendsStack from '../class/getExtendsStack';
import _argsToObject from '../cli/argsToObject';
import _SError from '../error/SError';
import _deepMerge from '../object/deepMerge';
import _trimLines from '../string/trimLines';
import _validateObject from '../validation/object/validateObject';
import _validateObjectOutputString from '../validation/object/validateObjectOutputString';
import _typeof from '../value/typeof';
import _set from '../object/set';
/**
 * @name              SInterface
 * @namespace           sugar.js.class
 * @type              Function
 *
 * This class allows you to define an interface that you can later apply to an object instance
 * to make sure this particular instance has all the features, methods and properties you want.
 *
 * @todo      Enhance the interface validation for things like missing "type" property, etc...
 *
 * @example         js
 * import SInterface from '@coffeekraken/sugar/js/class/SInterface';
 * class MyCoolInterface extends SInterface {
 *    static definitionObj = {
 *      title: {
 *        type: 'String',
 *        required: true
 *      },
 *      doSomething: {
 *        type: 'Function',
 *        required: true
 *      }
 *    }
 * }
 *
 * class MyClass {
 *    constructor() {
 *      MyCoolInterface.apply(this);
 *    }
 * }
 *
 * const myObject = new MyClass();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com>
 */
class STsAbstractInterface {
    constructor() {
        this.type = 'interface';
    }
}
class SInterface {
    /**
     * @name          getDefaultValues
     * @type          Function
     * @static
     *
     * This static method allows you to get the default values object
     * that this interface represent
     *
     * @return      {Object}        An object of all default values represented by this interface
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static getDefaultValues() {
        return this.applyAndComplete({});
    }
    /**
     * @name          applyAndThrow
     * @type          Function
     * @static
     *
     * This static method do the exact same as the ```apply``` one but will throw an error if something is wrong...
     *
     * @param       {Object}                instance              The instance to apply the interface on
     * @return      {Boolean}                                     Return true is all is ok. Throw an error otherwise
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static applyAndThrow(instance, settings = {}) {
        const apply = SInterface.apply.bind(this);
        return apply(instance, Object.assign(Object.assign({}, settings), { throw: true }));
    }
    /**
     * @name          applyAndComplete
     * @type          Function
     * @static
     *
     * This static method allows you to complete the passed data object and apply the interface
     * directly. If something goes wrong, it will throw an error, otherwise, return the
     * completed object
     *
     * @param       {Object}      object        The object on which to apply the interface and to complete
     * @param       {Object}      [settings={}]     An object of settings to configure your process
     * - duplicate (false) {Boolean}: Specify if you want to get back a new object or the passed one completed
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static applyAndComplete(object, settings = {}) {
        settings = _deepMerge({
            duplicate: false
        }, settings);
        const completedObject = this.complete(object, settings);
        this.applyAndThrow(completedObject, settings);
        return completedObject;
    }
    /**
     * @name          complete
     * @type          Function
     * @static
     *
     * This static method allows you to pass an object to complete with the "default" values
     * of the definition object if needed
     *
     * @param         {Object}            data              The data object to complete
     * @return        {Object}                              The completed data object
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static complete(data, settings = {}) {
        settings = _deepMerge({
            duplicate: false
        }, settings);
        let argsObj = data;
        if (settings.duplicate) {
            argsObj = Object.assign({}, data);
        }
        // loop on all the arguments
        Object.keys(this.definitionObj).forEach((argString) => {
            const argDefinitionObj = this.definitionObj[argString];
            // check if we have an argument passed in the properties
            if (argsObj[argString] === undefined &&
                argDefinitionObj.default !== undefined) {
                _set(argsObj, argString, argDefinitionObj.default);
            }
        });
        return argsObj;
    }
    /**
     * @name          outputString
     * @type          Function
     * @static
     *
     * This static method allows you to get the ```apply``` result
     * in a readable way.
     *
     * @param         {Object}               resultObj               The resulting object coming from the ```apply``` method
     * @return        {String}                                    The string version of the result
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static outputString(resultObj, settings = {}) {
        const headerString = this._outputHeaderString(settings);
        const string = _validateObjectOutputString(resultObj, settings);
        return _trimLines(`${headerString}${string}`);
    }
    /**
     * @name          output
     * @type          Function
     * @static
     *
     * This static method allows you to console.log the ```apply``` result
     * in a readable way.
     *
     * @param         {Object}               resultObj               The resulting object coming from the ```apply``` method
     * @return        {String}                                    The string version of the result
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static output(resultObj, settings = {}) {
        const string = this.outputString(resultObj, settings);
        console.log(string);
    }
    /**
     * @name                _outputHeaderString
     * @type                Function
     * @private
     *
     * This method simply generate the output header depending on the passed settings like:
     * - title: The title you want to display
     * - description: A description to explain a little bit more the issue
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static _outputHeaderString(settings = {}) {
        const array = [];
        if (settings.title) {
            array.push(`<red><underline>${settings.title}</underline></red>`);
            array.push(' ');
        }
        if (settings.description) {
            array.push(`${settings.description}`);
            array.push(' ');
        }
        return array.join('\n');
    }
    /**
     * @name                parse
     * @type                Function
     * @static
     *
     * This method take a string like "-v 'something' --temp" and convert it into an object of arguments
     * depending on the definition object of this interface
     *
     * @param       {String}            string            The string to parse
     * @return      {Object}                              The object of arguments values
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static parse(string) {
        const args = _argsToObject(string, this.definitionObj);
        return args;
    }
    /**
     * @name                parseAndComplete
     * @type                Function
     * @static
     *
     * This method take a string like "-v 'something' --temp" and convert it into an object of arguments
     * depending on the definition object of this interface.
     * It will also complete the data object obtained with the "default" values if needed
     *
     * @param       {String}            string            The string to parse
     * @return      {Object}                              The object of arguments values
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static parseAndComplete(string) {
        let args = _argsToObject(string, this.definitionObj);
        args = this.complete(args);
        return args;
    }
    /**
     * @name          extends
     * @type          Function
     * @static
     *
     * This static method allows you to start from this particular interface and to extends it
     * by passing an object containing these properties:
     * - definitionObj ({}) {Object}: An object to extends the static definitionObj one
     * - settings ({}) {Object}: An object of settings to extends the static settings one
     * @param     {Object}      extendsObj      An object to extends the static ones of the duplicated interface
     * @return    {SInterface}                  A new SInterface class based on the extended one
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static extends(extendsObj) {
        class ExtendedInterface extends this {
        }
        ExtendedInterface.definitionObj = _deepMerge(ExtendedInterface.definitionObj, extendsObj.definitionObj || {});
        ExtendedInterface.settings = _deepMerge(ExtendedInterface.settings, extendsObj.settings || {});
        return ExtendedInterface;
    }
}
