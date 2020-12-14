// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./typeMap", "../object/get", "../object/flatten"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var typeMap_1 = __importDefault(require("./typeMap"));
    var get_1 = __importDefault(require("../object/get"));
    var flatten_1 = __importDefault(require("../object/flatten"));
    /**
     * @name            instanciate
     * @namespace       sugar.js.action
     * @type            Function
     * @static
     *
     * This static method simply take an action descriptor object, instanciate
     * an action object from the corresponding class and return this instance.
     *
     * @param       {Object}      actionObj         The action object that MUST have at least an ```type``` property, an ```descriptor``` one and optionaly a ```settings``` one.
     * @return      {SAction}                       The instanciated SAction object
     *
     * @example       js
     * import SAction from '@coffeekraken/sugar/js/action/SAction';
     * const myInstance = instanciate({
     *    type: 'url',
     *    descriptor: {
     *      url: 'https://google.com',
     *      target: '_popup'
     *    },
     *    settings: {}
     * });
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function instanciate(actionObj) {
        if (!actionObj.type) {
            throw new Error("instanciate: The actionObj parameter MUST have a <cyan>type</cyan> property...");
        }
        if (!actionObj.descriptorObj) {
            throw new Error("instanciate: The actionObj parameter MUST have a <cyan>descriptorObj</cyan> property of type Object...");
        }
        var cls = get_1.default(typeMap_1.default, actionObj.type);
        if (!cls) {
            throw new Error("instanciate: Your passed \"type\" is not valid and must be one of those: " + Object.keys(flatten_1.default(typeMap_1.default)).join(', ') + "...");
        }
        // instanciate the object
        var instance = new cls(actionObj.descriptorObj, actionObj.settings || {});
        return instance;
    }
    exports.default = instanciate;
});
//# sourceMappingURL=module.js.map