// @ts-nocheck
// @shared
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
     * @name              author
     * @namespace           sugar.js.docblock.tags
     * @type              Function
     * @status              wip
     *
     * Parse the author tag
     *
     * @param       {Object}          data        The data object parsed in the string
     * @return      {Object}                      The formated object
     *
     * @todo      interface
     * @todo      doc
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com>
     */
    function author(data) {
        var authorNfo = /^([^<(]+?)?[ \t]*(?:<([^>(]+?)>)?[ \t]*(?:\(([^)]+?)\)|$)/gm.exec(data.value);
        if (!authorNfo)
            return null;
        return {
            name: authorNfo[1],
            email: authorNfo[2],
            url: authorNfo[3]
        };
    }
    exports.default = author;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXV0aG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7SUFFVjs7Ozs7Ozs7Ozs7Ozs7OztPQWdCRztJQUNILFNBQVMsTUFBTSxDQUFDLElBQUk7UUFDbEIsSUFBTSxTQUFTLEdBQUcsNkRBQTZELENBQUMsSUFBSSxDQUNsRixJQUFJLENBQUMsS0FBSyxDQUNYLENBQUM7UUFDRixJQUFJLENBQUMsU0FBUztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBRTVCLE9BQU87WUFDTCxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNsQixLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNuQixHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztTQUNsQixDQUFDO0lBQ0osQ0FBQztJQUNELGtCQUFlLE1BQU0sQ0FBQyJ9