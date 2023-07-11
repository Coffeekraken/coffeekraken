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
import { __wait } from '@coffeekraken/sugar/datetime';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNuRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFdEQsQ0FBQyxHQUFHLEVBQUU7SUFDRixNQUFNLENBQ0Y7UUFDSSxLQUFLLEVBQUUsR0FBUyxFQUFFO1lBQ2QsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkIsT0FBTztnQkFDSCxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRTtnQkFDbEMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7YUFDbEMsQ0FBQztRQUNOLENBQUMsQ0FBQTtRQUNELFNBQVMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQ2hDLFFBQVEsSUFBSSxFQUFFO2dCQUNWLEtBQUssTUFBTTtvQkFDUCxPQUFPLElBQUksQ0FBQTswREFDdUIsSUFBSSxDQUFDLEtBQUs7eUJBQzNDLENBQUM7b0JBQ0YsTUFBTTtnQkFDVixLQUFLLFNBQVM7b0JBQ1YsT0FBTyxJQUFJLENBQUE7O3lCQUVWLENBQUM7b0JBQ0YsTUFBTTtnQkFDVixLQUFLLE9BQU87b0JBQ1IsT0FBTyxJQUFJLENBQUE7O3lCQUVWLENBQUM7b0JBQ0YsTUFBTTthQUNiO1FBQ0wsQ0FBQztLQUNKLEVBQ0QseUJBQXlCLENBQzVCLENBQUM7QUFDTixDQUFDLENBQUMsRUFBRSxDQUFDIn0=