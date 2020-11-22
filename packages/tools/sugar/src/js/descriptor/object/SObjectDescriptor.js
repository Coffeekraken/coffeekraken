"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SDescriptor_1 = __importDefault(require("../SDescriptor"));
/**
 * @name              SObjectDescriptor
 * @namespace           sugar.js.descriptor.object
 * @type              Class
 *
 * This class allows you to describe an object by setting some "rules" like the type you want for a property,
 * the default value you want, etc...
 *
 * @example         js
 * import SObjectDescriptor from '@coffeekraken/sugar/js/descriptor/object/SObjectDescriptor';
 * class MyCoolDescriptor extends SObjectDescriptor {
 *    static description = {
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
 *      MyCoolDescriptor.apply(this);
 *    }
 * }
 *
 * const myObject = new MyClass();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com>
 */
const Cls = class SObjectDescriptor extends SDescriptor_1.default {
};
exports.default = Cls;
