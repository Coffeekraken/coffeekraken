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
    const imageLoaded_1 = __importDefault(require("../dom/imageLoaded"));
    const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
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
    function imagesLoadedAttribute(settings = {}) {
        settings = deepMerge_1.default({}, settings);
        document.addEventListener('load', (e) => {
            if (!e.target.tagName)
                return;
            if (e.target.tagName.toLowerCase() !== 'img')
                return;
            if (e.target.hasAttribute('loaded'))
                return;
            e.target.setAttribute('loaded', true);
        }, true);
        [].forEach.call(document.querySelectorAll('img'), (img) => {
            imageLoaded_1.default(img).then((img) => {
                if (img.hasAttribute('loaded'))
                    return;
                img.setAttribute('loaded', true);
            });
        });
    }
    exports.default = imagesLoadedAttribute;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VzTG9hZGVkQXR0cmlidXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW1hZ2VzTG9hZGVkQXR0cmlidXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLHFFQUErQztJQUMvQyw4RUFBd0Q7SUFFeEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXFCRztJQUNILFNBQVMscUJBQXFCLENBQUMsUUFBUSxHQUFHLEVBQUU7UUFDMUMsUUFBUSxHQUFHLG1CQUFXLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3JDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FDdkIsTUFBTSxFQUNOLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDSixJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPO2dCQUFFLE9BQU87WUFDOUIsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsS0FBSyxLQUFLO2dCQUFFLE9BQU87WUFDckQsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUM7Z0JBQUUsT0FBTztZQUM1QyxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEMsQ0FBQyxFQUNELElBQUksQ0FDTCxDQUFDO1FBQ0YsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDeEQscUJBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDOUIsSUFBSSxHQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQztvQkFBRSxPQUFPO2dCQUN2QyxHQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNuQyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELGtCQUFlLHFCQUFxQixDQUFDIn0=