const __SError = require('../error/SError');
const __execPhp = require('exec-php');
const __deepMerge = require('../object/deepMerge');
const __sugarConfig = require('../config/sugar');
const __fs = require('fs');
const __path = require('path');
const __SPromise = require('../promise/SPromise');

/**
 * @name                      bladePhp
 * @namespace                 node.template
 * @type                      Function
 *
 * Compile a blade php view and return a promise with the
 * resulting template
 *
 * @param    {String}               view                            relative path to the view to render
 * @param    {Object}               [data={}]                        The data to pass to the view
 * @param     {Object}              [settings={}]                     A settings object to configure your blade compilation
 * - rootDir (__sugarConfig('views.rootDir')) {String}: Specify the root views folder
 * - cacheDir (__sugarConfig('views.cacheDir')) {String}: Specify the root views cache folder
 * @return    {Promise}                                                A promise with the template result passed in
 *
 * @example    js
 * const bladePhp = require('@coffeekraken/sugar/template/bladePhp');
 * bladePhp('my-cool-view', {
 *   hello: 'World'
 * }).then((result) => {
 *   // do something with the result
 * });
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = (view, data = {}, settings = {}) => {};
