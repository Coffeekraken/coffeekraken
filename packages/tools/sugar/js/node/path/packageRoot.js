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
        define(["require", "exports", "../fs/folderPath", "../is/file", "find-package-json"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var folderPath_1 = __importDefault(require("../fs/folderPath"));
    var file_1 = __importDefault(require("../is/file"));
    var find_package_json_1 = __importDefault(require("find-package-json"));
    /**
     * @name                    packageRoot
     * @namespace           sugar.node.path
     * @type                    Function
     *
     * Return the path to either the first finded package root going up the folders, or the highest package root finded
     *
     * @feature         Support file path as input
     * @feature         Allows you to specify if you want the highest package.json founded using the ```highest``` parameter
     *
     * @param           {String}              [from=process.cwd()]    Specify from where the research has to be done
     * @param           {Boolean}             [highest=false]         Specify if you want the highest package root or the first finded
     * @return          {String}                                      The finded package path or false if not finded
     *
     * @example         js
     * import packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
     * const root = packageRoot();
     *
     * @see       https://www.npmjs.com/package/find-package-json
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function packageRoot(from, highest) {
        if (from === void 0) { from = process.cwd(); }
        if (highest === void 0) { highest = false; }
        if (file_1.default(from))
            from = folderPath_1.default(from);
        var f = find_package_json_1.default(from);
        var file = f.next();
        if (!highest) {
            var filename = file.filename || false;
            if (!filename)
                return filename;
            return filename.split('/').slice(0, -1).join('/');
        }
        var finalFile;
        while (!file.done) {
            if (file.done)
                break;
            finalFile = file;
            file = f.next();
        }
        if (finalFile.filename) {
            return finalFile.filename.split('/').slice(0, -1).join('/');
        }
        return false;
    }
    exports.default = packageRoot;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZVJvb3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbm9kZS9wYXRoL3BhY2thZ2VSb290LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLGdFQUE0QztJQUU1QyxvREFBa0M7SUFDbEMsd0VBQThDO0lBRTlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW9CRztJQUNILFNBQVMsV0FBVyxDQUFDLElBQW9CLEVBQUUsT0FBZTtRQUFyQyxxQkFBQSxFQUFBLE9BQU8sT0FBTyxDQUFDLEdBQUcsRUFBRTtRQUFFLHdCQUFBLEVBQUEsZUFBZTtRQUN4RCxJQUFJLGNBQVEsQ0FBQyxJQUFJLENBQUM7WUFBRSxJQUFJLEdBQUcsb0JBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUU5QyxJQUFNLENBQUMsR0FBRywyQkFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVwQixJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxLQUFLLENBQUM7WUFDeEMsSUFBSSxDQUFDLFFBQVE7Z0JBQUUsT0FBTyxRQUFRLENBQUM7WUFDL0IsT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDbkQ7UUFFRCxJQUFJLFNBQVMsQ0FBQztRQUNkLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2pCLElBQUksSUFBSSxDQUFDLElBQUk7Z0JBQUUsTUFBTTtZQUNyQixTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDakI7UUFDRCxJQUFJLFNBQVMsQ0FBQyxRQUFRLEVBQUU7WUFDdEIsT0FBTyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzdEO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBQ0Qsa0JBQWUsV0FBVyxDQUFDIn0=