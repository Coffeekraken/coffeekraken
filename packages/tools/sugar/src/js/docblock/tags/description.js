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
     * @name              description
     * @namespace           sugar.js.docblock.tags
     * @type              Function
     * @status              wip
     *
     * Parse the description tag
     *
     * @param       {Object}          data        The data object parsed in the string
     * @return      {Object}                      The formated object
     *
     * @todo      interface
     * @todo      doc
     *
     * @since     2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com>
     */
    function description(data) {
        if (data.content && data.content[data.content.length - 1] === '') {
            data.content = data.content.slice(0, -1);
        }
        if (!data.content)
            return '';
        return data.content
            .map(function (c) { return c.trim(); })
            .join('\n')
            .trim();
    }
    exports.default = description;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVzY3JpcHRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZXNjcmlwdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7O0lBRVY7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQkc7SUFDSCxTQUFTLFdBQVcsQ0FBQyxJQUFJO1FBQ3ZCLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNoRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzFDO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFDN0IsT0FBTyxJQUFJLENBQUMsT0FBTzthQUNoQixHQUFHLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQVIsQ0FBUSxDQUFDO2FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDVixJQUFJLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFDRCxrQkFBZSxXQUFXLENBQUMifQ==