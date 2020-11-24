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
        define(["require", "exports", "fs-extra"], factory);
    }
})(function (require, exports) {
    "use strict";
    var fs_extra_1 = __importDefault(require("fs-extra"));
    /**
     * @name        writeFileSync
     * @namespace           sugar.node.fs
     * @type          Function
     * @stable
     *
     * Write a file. If don't exist, will be created as well as the directory structure if needed... (sync)
     *
     * @param       {String}              path           The file path to write
     * @param       {String}              data          The data to write in the file
     * @param       {Object}              [options={}]  options are what you'd pass to [fs.writeFileSync()](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import writeFileSync from '@coffeekraken/node/fs/writeFileSync';
     * try {
     *    writeFileSync('my/cool/file.txt', 'Hello World');
     * } catch(e) {}
     *
     * @see             https://github.com/jprichardson/node-fs-extra
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function writeFileSync(path, data, options) {
        if (options === void 0) { options = {}; }
        return fs_extra_1.default.outputFileSync(path, data, options);
    }
    return writeFileSync;
});
