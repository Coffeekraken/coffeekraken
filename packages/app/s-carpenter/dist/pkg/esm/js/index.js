var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { define as __sActivateFeature } from '@coffeekraken/s-activate-feature';
import { define as _sSpecsEditorComponentDefine } from '@coffeekraken/s-specs-editor-component/webcomponent';
(() => __awaiter(void 0, void 0, void 0, function* () {
    // features
    __sActivateFeature();
    // components
    setTimeout(() => {
        _sSpecsEditorComponentDefine();
    }, 1000);
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLElBQUksa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRixPQUFPLEVBQUUsTUFBTSxJQUFJLDRCQUE0QixFQUFFLE1BQU0scURBQXFELENBQUM7QUFFN0csQ0FBQyxHQUFTLEVBQUU7SUFDUixXQUFXO0lBQ1gsa0JBQWtCLEVBQUUsQ0FBQztJQUVyQixhQUFhO0lBQ2IsVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNaLDRCQUE0QixFQUFFLENBQUM7SUFDbkMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ2IsQ0FBQyxDQUFBLENBQUMsRUFBRSxDQUFDIn0=