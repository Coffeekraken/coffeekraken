import __SSpecs from '@coffeekraken/s-specs';

/**
 * @name            spec
 * @namespace       node.helpers
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This helper allows you to access a json spec registered in the
 *
 * @param       {String}        dotPath            The spec dotpath to get
 * @return      {Any}                           The sanitized value
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default function spec(dotPath: string): string {
    const specs = new __SSpecs();
    const value = specs.read(dotPath);
    return value;
}
