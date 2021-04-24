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
        define(["require", "exports", "../dom/imageLoaded", "../../shared/object/deepMerge"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var imageLoaded_1 = __importDefault(require("../dom/imageLoaded"));
    var deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
    /**
     * @name 		imagesLoadedAttribute
     * @namespace            js.feature
     * @type      Feature
     * @stable
     *
     * Add on every images the attribute "loaded" when it has been fully loaded. This is useful
     * for styling purposes and for others thinks as well.
     *
     * @param     {Object}        [settings={}]       An object of settings to configure your feature
     *
     * @todo            interface
     * @todo            doc
     * @todo            tests
     *
     * @example 	js
     * import imagesLoadedAttribute from '@coffeekraken/sugar/js/feature/imagesLoadedAttribute';
     * imagesLoadedAttribute();
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function imagesLoadedAttribute(settings) {
        if (settings === void 0) { settings = {}; }
        settings = deepMerge_1.default({}, settings);
        document.addEventListener('load', function (e) {
            if (!e.target.tagName)
                return;
            if (e.target.tagName.toLowerCase() !== 'img')
                return;
            if (e.target.hasAttribute('loaded'))
                return;
            e.target.setAttribute('loaded', true);
        }, true);
        [].forEach.call(document.querySelectorAll('img'), function (img) {
            imageLoaded_1.default(img).then(function (img) {
                if (img.hasAttribute('loaded'))
                    return;
                img.setAttribute('loaded', true);
            });
        });
    }
    exports.default = imagesLoadedAttribute;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VzTG9hZGVkQXR0cmlidXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW1hZ2VzTG9hZGVkQXR0cmlidXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLG1FQUErQztJQUMvQyw0RUFBd0Q7SUFFeEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXFCRztJQUNILFNBQVMscUJBQXFCLENBQUMsUUFBYTtRQUFiLHlCQUFBLEVBQUEsYUFBYTtRQUMxQyxRQUFRLEdBQUcsbUJBQVcsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDckMsUUFBUSxDQUFDLGdCQUFnQixDQUN2QixNQUFNLEVBQ04sVUFBQyxDQUFDO1lBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTztnQkFBRSxPQUFPO1lBQzlCLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEtBQUssS0FBSztnQkFBRSxPQUFPO1lBQ3JELElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDO2dCQUFFLE9BQU87WUFDNUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3hDLENBQUMsRUFDRCxJQUFJLENBQ0wsQ0FBQztRQUNGLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsRUFBRSxVQUFDLEdBQUc7WUFDcEQscUJBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFHO2dCQUMxQixJQUFJLEdBQUcsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDO29CQUFFLE9BQU87Z0JBQ3ZDLEdBQUcsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ25DLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0Qsa0JBQWUscUJBQXFCLENBQUMifQ==