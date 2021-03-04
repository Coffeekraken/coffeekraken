// @shared
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @name            expandGlob
     * @namespace       sugar.js.glob
     * @type            Function
     *
     * This function take some extended glob pattern(s) and expand them to standard supported
     * glob patterns. With this, you will have access to some syntax sugar like these:
     * - /something/**{2,4}/*.ts => **{2,4} = search in level 2 bis level 4
     *
     * @param       {String|Array<String>}      globs           The glob(s) to expand
     * @return      {Array<String>}                             An array of expanded globs
     *
     * @example         js
     * import expandGlob from '@coffeekraken/sugar/js/glob/expandGlob';
     * expandGlob('/something/**{2,4}/*.ts');
     * // ['/something/* /* /*.ts','/something/* /* /* /*.ts', '/something/* /* /* /* /*.ts']
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function expandGlob(globs) {
        if (!Array.isArray(globs))
            globs = [globs];
        var finalPatterns = [];
        globs.forEach(function (globPattern) {
            // handle "maxDepth"
            var maxDepthMatch = globPattern.match(/\/?\*\*\{(([0-9]+,[0-9]+|[0-9]+))\}\/?/gm);
            if (maxDepthMatch) {
                var minMaxStr = maxDepthMatch[0]
                    .replace('**{', '')
                    .replace('}', '')
                    .replace(/[\{\}\/]/g, '');
                var toReplace = maxDepthMatch[0].replace(/\//g, '');
                var spl = minMaxStr.split(',');
                var min = 0;
                var max = parseInt(spl[0]);
                if (spl.length === 2) {
                    min = parseInt(spl[0]);
                    max = parseInt(spl[1]);
                }
                var foldersArray = __spreadArrays('* '
                    .repeat(min)
                    .split(' ')
                    .filter(function (l) { return l !== ''; }));
                for (var i = min; i < max; i++) {
                    finalPatterns.push(globPattern
                        .replace(toReplace, foldersArray.join('/'))
                        .replace(/\/\//g, '/'));
                    foldersArray.push('*');
                }
                finalPatterns.push(globPattern
                    .replace(toReplace, foldersArray.join('/'))
                    .replace(/\/\//g, '/'));
            }
            else {
                finalPatterns.push(globPattern);
            }
        });
        return finalPatterns;
    }
    exports.default = expandGlob;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5kR2xvYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4cGFuZEdsb2IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsVUFBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BbUJHO0lBQ0gsU0FBUyxVQUFVLENBQUMsS0FBSztRQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFBRSxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUzQyxJQUFNLGFBQWEsR0FBYSxFQUFFLENBQUM7UUFFbkMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFdBQVc7WUFDeEIsb0JBQW9CO1lBQ3BCLElBQU0sYUFBYSxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQ3JDLDBDQUEwQyxDQUMzQyxDQUFDO1lBQ0YsSUFBSSxhQUFhLEVBQUU7Z0JBQ2pCLElBQU0sU0FBUyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUM7cUJBQy9CLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO3FCQUNsQixPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQztxQkFDaEIsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFFNUIsSUFBSSxTQUFTLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBRXBELElBQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pDLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztnQkFDWixJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7b0JBQ3BCLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZCLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3hCO2dCQUNELElBQUksWUFBWSxrQkFDWCxJQUFJO3FCQUNKLE1BQU0sQ0FBQyxHQUFHLENBQUM7cUJBQ1gsS0FBSyxDQUFDLEdBQUcsQ0FBQztxQkFDVixNQUFNLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxDQUFDLEtBQUssRUFBRSxFQUFSLENBQVEsQ0FBQyxDQUMzQixDQUFDO2dCQUNGLEtBQUssSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQzlCLGFBQWEsQ0FBQyxJQUFJLENBQ2hCLFdBQVc7eUJBQ1IsT0FBTyxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3lCQUMxQyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUN6QixDQUFDO29CQUNGLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ3hCO2dCQUNELGFBQWEsQ0FBQyxJQUFJLENBQ2hCLFdBQVc7cUJBQ1IsT0FBTyxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUMxQyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUN6QixDQUFDO2FBQ0g7aUJBQU07Z0JBQ0wsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUNqQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxhQUFhLENBQUM7SUFDdkIsQ0FBQztJQUNELGtCQUFlLFVBQVUsQ0FBQyJ9