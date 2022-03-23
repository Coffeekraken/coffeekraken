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
    function default_1(env) {
        if (env.platform !== 'node')
            return;
        return {
        // /**
        //  * @name              dirs
        //  * @namespace         config.core.sugarJson
        //  * @type              String|Array<String>
        //  * @default           []
        //  *
        //  * Set the directories where to search for sugar.json files
        //  *
        //  * @since             2.0.0
        //  * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        //  */
        // dirs: [__packageRoot(__dirname()), __packageRoot()],
        // /**
        //  * @name              imports
        //  * @namespace         config.core.sugarJson
        //  * @type              String|Array<String>
        //  * @default           all
        //  *
        //  * Specify what you want to import. Can be "all" or an Array of NPM packages names
        //  *
        //  * @since             2.0.0
        //  * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        //  */
        // imports: 'all',
        // /**
        //  * @name              exclude
        //  * @namespace         config.core.sugarJson
        //  * @type              String|Array<String>
        //  * @default           []
        //  *
        //  * Specify some NPM packages you want to exclude by adding his name into this array
        //  *
        //  * @since             2.0.0
        //  * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        //  */
        // exclude: [],
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXJKc29uLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN1Z2FySnNvbi5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFHQSxtQkFBeUIsR0FBRztRQUN4QixJQUFJLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtZQUFFLE9BQU87UUFFcEMsT0FBTztRQUNILE1BQU07UUFDTiw2QkFBNkI7UUFDN0IsOENBQThDO1FBQzlDLDZDQUE2QztRQUM3QywyQkFBMkI7UUFDM0IsS0FBSztRQUNMLDhEQUE4RDtRQUM5RCxLQUFLO1FBQ0wsOEJBQThCO1FBQzlCLGtHQUFrRztRQUNsRyxNQUFNO1FBQ04sdURBQXVEO1FBQ3ZELE1BQU07UUFDTixnQ0FBZ0M7UUFDaEMsOENBQThDO1FBQzlDLDZDQUE2QztRQUM3Qyw0QkFBNEI7UUFDNUIsS0FBSztRQUNMLHFGQUFxRjtRQUNyRixLQUFLO1FBQ0wsOEJBQThCO1FBQzlCLGtHQUFrRztRQUNsRyxNQUFNO1FBQ04sa0JBQWtCO1FBQ2xCLE1BQU07UUFDTixnQ0FBZ0M7UUFDaEMsOENBQThDO1FBQzlDLDZDQUE2QztRQUM3QywyQkFBMkI7UUFDM0IsS0FBSztRQUNMLHNGQUFzRjtRQUN0RixLQUFLO1FBQ0wsOEJBQThCO1FBQzlCLGtHQUFrRztRQUNsRyxNQUFNO1FBQ04sZUFBZTtTQUNsQixDQUFDO0lBQ04sQ0FBQztJQXpDRCw0QkF5Q0MifQ==