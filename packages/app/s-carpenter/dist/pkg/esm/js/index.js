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
import { define as _sCarpenterComponentDefine } from './SCarpenterComponent';
(() => __awaiter(void 0, void 0, void 0, function* () {
    // features
    __sActivateFeature();
    // components
    console.log(_sCarpenterComponentDefine);
    _sCarpenterComponentDefine();
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLElBQUksa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRixPQUFPLEVBQUUsTUFBTSxJQUFJLDBCQUEwQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFN0UsQ0FBQyxHQUFTLEVBQUU7SUFDUixXQUFXO0lBQ1gsa0JBQWtCLEVBQUUsQ0FBQztJQUVyQixhQUFhO0lBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0lBQ3hDLDBCQUEwQixFQUFFLENBQUM7QUFDakMsQ0FBQyxDQUFBLENBQUMsRUFBRSxDQUFDIn0=