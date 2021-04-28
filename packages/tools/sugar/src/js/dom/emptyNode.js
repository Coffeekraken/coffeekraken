// @ts-nocheck
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
     * @name        emptyNode
     * @namespace            js.dom
     * @type        Function
     * @stable
     *
     * Empty a node by removing each childs one after the other
     *
     * @param           {HTMLElement}         node          The node to empty
     * @return          {HTMLElement}                       The node that was passed to maintain chainability
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * @import emptyNode from '@coffeekraken/sugar/js/dom/emptyNode';
     * emptyNode(myCoolNode);
     *
     * @since       1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function emptyNode(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
        return node;
    }
    exports.default = emptyNode;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1wdHlOb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdG9vbHMvc3VnYXIvc3JjL2pzL2RvbS9lbXB0eU5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7O0lBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXFCRztJQUNILFNBQVMsU0FBUyxDQUFDLElBQUk7UUFDckIsT0FBTyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ25DO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0Qsa0JBQWUsU0FBUyxDQUFDIn0=