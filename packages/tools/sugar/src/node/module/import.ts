/**
 * @name                import
 * @namespace           node.module
 * @type                Function
 * @platform            node
 * @status              beta
 * @async
 *
 * This function is the same as the native "import" one unless it allows you to pass an array with 2 values when the
 * first is the package name from which to import things, and the second is the "export" to import.
 *
 * @param       {String|Array}              what            Either a string like with the native "import" function, either an array with 2 values. 1st is the package name, 2nd is the "export" to import
 * @return      {any}                                       The imported things
 *
 * @example         js
 * import { __import } from '@coffeekraken/sugar/module';
 * __import('@coffeekraken/s-typescript-builder');
 * __import(['@coffeekraken/s-typescript-builder', 'STypescriptBuilderBuildParamsInterface']);
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default async function _import(what: string | string[]) {
    let settings = {};
    if (Array.isArray(what)) {
        if (what[0].match(/\.json$/)) {
            settings = { assert: { type: 'json' } };
        }
        const imported = await import(what[0], settings);
        return imported[what[1]];
    }
    if (what.match(/\.json$/)) {
        settings = { assert: { type: 'json' } };
    }
    return (await import(what, settings)).default;
}
