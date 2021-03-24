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
        define(["require", "exports", "../crypt/md5"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const md5_1 = __importDefault(require("../crypt/md5"));
    /**
     * @name            gravatarUrl
     * @namespace           sugar.js.url
     * @type            Function
     * @stable
     *
     * Return a gravatar url depending on the passed user email and size
     *
     * @param           {String}            email             The user email
     * @param           {Number}            [size=200]        The wanted image size. From 1 to 2048
     * @return          {String}                              The generated gravatar url
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     * @todo      move into "gravatar" folder
     *
     * @example       js
     * import gravatarUrl from '@coffeekraken/sugar/js/util/gravatarUrl';
     * console.log(gravatarUrl('olivier.bossel@gmail.com')); // https://www.gravatar.com/avatar/b5df60055b6287bb7c90c0078ce20a5f
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function gravatarUrl(email, size = 200) {
        return `https://www.gravatar.com/avatar/${md5_1.default.encrypt(email)}?s=${size}`;
    }
    exports.default = gravatarUrl;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhdmF0YXJVcmwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJncmF2YXRhclVybC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCx1REFBaUM7SUFFakM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BdUJHO0lBQ0gsU0FBUyxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUksR0FBRyxHQUFHO1FBQ3BDLE9BQU8sbUNBQW1DLGFBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7SUFDN0UsQ0FBQztJQUNELGtCQUFlLFdBQVcsQ0FBQyJ9