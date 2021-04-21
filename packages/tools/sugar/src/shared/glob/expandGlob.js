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
     * @namespace            js.glob
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
        const finalPatterns = [];
        globs.forEach((globPattern) => {
            // handle "maxDepth"
            const maxDepthMatch = globPattern.match(/\/?\*\*\{(([0-9]+,[0-9]+|[0-9]+))\}\/?/gm);
            if (maxDepthMatch) {
                const minMaxStr = maxDepthMatch[0]
                    .replace('**{', '')
                    .replace('}', '')
                    .replace(/[\{\}\/]/g, '');
                let toReplace = maxDepthMatch[0].replace(/\//g, '');
                const spl = minMaxStr.split(',');
                let min = 0;
                let max = parseInt(spl[0]);
                if (spl.length === 2) {
                    min = parseInt(spl[0]);
                    max = parseInt(spl[1]);
                }
                let foldersArray = [
                    ...'* '
                        .repeat(min)
                        .split(' ')
                        .filter((l) => l !== '')
                ];
                for (let i = min; i < max; i++) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5kR2xvYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4cGFuZEdsb2IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW1CRztJQUNILFNBQVMsVUFBVSxDQUFDLEtBQUs7UUFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQUUsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFM0MsTUFBTSxhQUFhLEdBQWEsRUFBRSxDQUFDO1FBRW5DLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtZQUM1QixvQkFBb0I7WUFDcEIsTUFBTSxhQUFhLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FDckMsMENBQTBDLENBQzNDLENBQUM7WUFDRixJQUFJLGFBQWEsRUFBRTtnQkFDakIsTUFBTSxTQUFTLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQztxQkFDL0IsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7cUJBQ2xCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDO3FCQUNoQixPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUU1QixJQUFJLFNBQVMsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFFcEQsTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDakMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dCQUNaLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtvQkFDcEIsR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdkIsR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDeEI7Z0JBQ0QsSUFBSSxZQUFZLEdBQUc7b0JBQ2pCLEdBQUcsSUFBSTt5QkFDSixNQUFNLENBQUMsR0FBRyxDQUFDO3lCQUNYLEtBQUssQ0FBQyxHQUFHLENBQUM7eUJBQ1YsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO2lCQUMzQixDQUFDO2dCQUNGLEtBQUssSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQzlCLGFBQWEsQ0FBQyxJQUFJLENBQ2hCLFdBQVc7eUJBQ1IsT0FBTyxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3lCQUMxQyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUN6QixDQUFDO29CQUNGLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ3hCO2dCQUNELGFBQWEsQ0FBQyxJQUFJLENBQ2hCLFdBQVc7cUJBQ1IsT0FBTyxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUMxQyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUN6QixDQUFDO2FBQ0g7aUJBQU07Z0JBQ0wsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUNqQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxhQUFhLENBQUM7SUFDdkIsQ0FBQztJQUNELGtCQUFlLFVBQVUsQ0FBQyJ9