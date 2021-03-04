// import __SSugarUiWebComponent from './webcomponents/SSugarUiWebComponent';
// __SSugarUiWebComponent.define();
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./component", "./prettier"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    require("./component");
    require("./prettier");
    // console.log(Component);
    // customElements.define('my-element', Component);
    console.log('ff');
});
// console.log 'd';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw2RUFBNkU7QUFDN0UsbUNBQW1DOzs7Ozs7Ozs7Ozs7SUFFbkMsdUJBQXFCO0lBQ3JCLHNCQUFvQjtJQUNwQiwwQkFBMEI7SUFDMUIsa0RBQWtEO0lBQ2xELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBQ2xCLG1CQUFtQiJ9