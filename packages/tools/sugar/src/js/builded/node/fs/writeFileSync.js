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
        define(["require", "exports", "./folderPath", "./ensureDirSync", "fs-extra", "../path/replacePathTokens"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var folderPath_1 = __importDefault(require("./folderPath"));
    var ensureDirSync_1 = __importDefault(require("./ensureDirSync"));
    var fs_extra_1 = __importDefault(require("fs-extra"));
    var replacePathTokens_1 = __importDefault(require("../path/replacePathTokens"));
    /**
     * @name        writeFileSync
     * @namespace           sugar.node.fs
     * @type          Function
     * @stable
     *
     * Write a file. If don't exist, will be created as well as the directory structure if needed... (sync)
     * Support the ```replacePathTokens``` tokens
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
        path = replacePathTokens_1.default(path);
        var folderPath = folderPath_1.default(path);
        ensureDirSync_1.default(folderPath);
        return fs_extra_1.default.outputFileSync(path, data, options);
    }
    exports.default = writeFileSync;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVGaWxlU3luYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL25vZGUvZnMvd3JpdGVGaWxlU3luYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCw0REFBd0M7SUFDeEMsa0VBQThDO0lBQzlDLHNEQUE0QjtJQUM1QixnRkFBNEQ7SUFFNUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BMEJHO0lBQ0gsU0FBUyxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFZO1FBQVosd0JBQUEsRUFBQSxZQUFZO1FBQzdDLElBQUksR0FBRywyQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxJQUFNLFVBQVUsR0FBRyxvQkFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLHVCQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDNUIsT0FBTyxrQkFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFDRCxrQkFBZSxhQUFhLENBQUMifQ==