var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { define } from "@coffeekraken/s-filtrable-input-component";
import __wait from "@coffeekraken/sugar/shared/time/wait";
(() => {
    define({
        items: () => __awaiter(void 0, void 0, void 0, function* () {
            yield __wait(1000);
            return [
                { title: "Hello", value: "World" },
                { title: "Plop", value: "Yop" },
            ];
        }),
        templates: ({ type, item, html }) => {
            switch (type) {
                case "item":
                    return html ` <li class="__item">My title: ${item.title}</li> `;
                    break;
                case "loading":
                    return html ` <li class="__loading">Loading, please wait...</li> `;
                    break;
                case "empty":
                    return html ` <li class="__empty">No items found...</li> `;
                    break;
            }
        },
    }, "my-cool-filtrable-input");
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNuRSxPQUFPLE1BQU0sTUFBTSxzQ0FBc0MsQ0FBQztBQUUxRCxDQUFDLEdBQUcsRUFBRTtJQUNKLE1BQU0sQ0FDSjtRQUNFLEtBQUssRUFBRSxHQUFTLEVBQUU7WUFDaEIsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkIsT0FBTztnQkFDTCxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRTtnQkFDbEMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7YUFDaEMsQ0FBQztRQUNKLENBQUMsQ0FBQTtRQUNELFNBQVMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQ2xDLFFBQVEsSUFBSSxFQUFFO2dCQUNaLEtBQUssTUFBTTtvQkFDVCxPQUFPLElBQUksQ0FBQSxpQ0FBaUMsSUFBSSxDQUFDLEtBQUssUUFBUSxDQUFDO29CQUMvRCxNQUFNO2dCQUNSLEtBQUssU0FBUztvQkFDWixPQUFPLElBQUksQ0FBQSxzREFBc0QsQ0FBQztvQkFDbEUsTUFBTTtnQkFDUixLQUFLLE9BQU87b0JBQ1YsT0FBTyxJQUFJLENBQUEsOENBQThDLENBQUM7b0JBQzFELE1BQU07YUFDVDtRQUNILENBQUM7S0FDRixFQUNELHlCQUF5QixDQUMxQixDQUFDO0FBQ0osQ0FBQyxDQUFDLEVBQUUsQ0FBQyJ9