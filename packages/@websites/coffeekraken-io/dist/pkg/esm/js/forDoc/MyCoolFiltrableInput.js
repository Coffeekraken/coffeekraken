var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { define } from '@coffeekraken/s-filtrable-input-component';
import __wait from '@coffeekraken/sugar/shared/datetime/wait';
(() => {
    define({
        items: () => __awaiter(void 0, void 0, void 0, function* () {
            yield __wait(1000);
            return [
                { title: 'Hello', value: 'World' },
                { title: 'Plop', value: 'Yop' },
            ];
        }),
        templates: ({ type, item, html }) => {
            switch (type) {
                case 'item':
                    return html `
                            <li class="_item">My title: ${item.title}</li>
                        `;
                    break;
                case 'loading':
                    return html `
                            <li class="_loading">Loading, please wait...</li>
                        `;
                    break;
                case 'empty':
                    return html `
                            <li class="_empty">No items found...</li>
                        `;
                    break;
            }
        },
    }, 'my-cool-filtrable-input');
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNuRSxPQUFPLE1BQU0sTUFBTSwwQ0FBMEMsQ0FBQztBQUU5RCxDQUFDLEdBQUcsRUFBRTtJQUNGLE1BQU0sQ0FDRjtRQUNJLEtBQUssRUFBRSxHQUFTLEVBQUU7WUFDZCxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuQixPQUFPO2dCQUNILEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFO2dCQUNsQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTthQUNsQyxDQUFDO1FBQ04sQ0FBQyxDQUFBO1FBQ0QsU0FBUyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDaEMsUUFBUSxJQUFJLEVBQUU7Z0JBQ1YsS0FBSyxNQUFNO29CQUNQLE9BQU8sSUFBSSxDQUFBOzBEQUN1QixJQUFJLENBQUMsS0FBSzt5QkFDM0MsQ0FBQztvQkFDRixNQUFNO2dCQUNWLEtBQUssU0FBUztvQkFDVixPQUFPLElBQUksQ0FBQTs7eUJBRVYsQ0FBQztvQkFDRixNQUFNO2dCQUNWLEtBQUssT0FBTztvQkFDUixPQUFPLElBQUksQ0FBQTs7eUJBRVYsQ0FBQztvQkFDRixNQUFNO2FBQ2I7UUFDTCxDQUFDO0tBQ0osRUFDRCx5QkFBeUIsQ0FDNUIsQ0FBQztBQUNOLENBQUMsQ0FBQyxFQUFFLENBQUMifQ==