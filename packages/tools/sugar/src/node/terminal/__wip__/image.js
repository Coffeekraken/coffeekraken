"use strict";
const __imaging = require('imaging');
const __deepMerge = require('../object/deepMerge');
const __colorConvert = require('color-convert');
/**
 * @name                                    image
 * @namespace           sugar.node.terminal
 * @type                                    Function
 *
 * Load and display an image with simple options like width, height, etc...
 * Available settings:
 * - width {Number}: (optional) The width wanted
 * - height {Number}: (optional) The height wanted
 * - transparent (true) {Boolean}: (optional) Specify if you want the white color treated as a transparent pixel
 * - char (▇) {String}: (optional) Specify the character that you want to use as pixel
 *
 * @param               {String}                url                     The image url to load
 * @param               {Object}                [settings={}]           A settings object like width, height, etc...
 * @return              {Promise}                                        A promise that will be resolved when the picture has been loaded and converted to terminal pixels
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = async function image(url, settings = {}) {
    settings = __deepMerge({
        transparent: true,
        char: '▇',
        color: null
    }, settings);
    return new Promise((resolve, reject) => {
        __imaging.draw(url, settings, function (resp, status) {
            if (status === 'fail')
                return reject(resp);
            if (!settings.char || settings.char === '▇') {
                resp = resp.split('▇').join('▇▇');
                if (settings.transparent) {
                    resp = resp.split('[37m▇▇\u001b').join('[37m  \u001b');
                }
            }
            else if (settings.transparent) {
                resp = resp.split(`[37m${settings.char}\u001b`).join('[37m \u001b');
            }
            if (settings.color) {
                const ansiColor = __colorConvert.hex.ansi16(settings.color);
                const char = !settings.char || settings.char === '▇' ? '▇▇' : settings.char;
                resp = resp
                    .split(`[30m${char}\u001b`)
                    .join(`[${ansiColor}m${char}\u001b`);
                resp = resp
                    .split(`[90m${char}\u001b`)
                    .join(`[${ansiColor}m${char}\u001b`);
            }
            return resolve(resp);
        });
    });
};
