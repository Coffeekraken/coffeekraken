var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default {
    reg: /<!-- og:(.*) -->/g,
    transform(data, target) {
        return __awaiter(this, void 0, void 0, function* () {
            return;
            // const og = await __scrapeUrl(data[1]);
            // return og ?? {};
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGVBQWU7SUFDWCxHQUFHLEVBQUUsbUJBQW1CO0lBQ2xCLFNBQVMsQ0FBQyxJQUFJLEVBQUUsTUFBTTs7WUFDeEIsT0FBTztZQUNQLHlDQUF5QztZQUN6QyxtQkFBbUI7UUFDdkIsQ0FBQztLQUFBO0NBQ0osQ0FBQyJ9