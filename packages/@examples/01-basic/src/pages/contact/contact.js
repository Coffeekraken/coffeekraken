var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected);
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next(),
            );
        });
    };
import { __uniqid } from '@coffeekraken/sugar/string';
export default {
    views: [
        'sections.separator.separator',
        'sections.tabs.tabs',
        {
            path: 'sections.story.story',
            data() {
                return __awaiter(this, void 0, void 0, function* () {
                    const d = (yield import(
                        `../../views/sections/story/story-1.data.js?${__uniqid()}`
                    )).default;
                    return d;
                });
            },
        },
        {
            path: 'sections.card.card',
            data() {
                return __awaiter(this, void 0, void 0, function* () {
                    const d = (yield import(
                        `../../views/sections/card/card.data.js?${__uniqid()}`
                    )).default;
                    return d;
                });
            },
        },
        {
            path: 'sections.story.story',
            data() {
                return __awaiter(this, void 0, void 0, function* () {
                    const d = (yield import(
                        `../../views/sections/story/story-2.data.js?${__uniqid()}`
                    )).default;
                    return d;
                });
            },
        },
        'sections.contact.contact',
    ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV0RCxlQUFlO0lBQ1gsS0FBSyxFQUFFO1FBQ0gsOEJBQThCO1FBQzlCLG9CQUFvQjtRQUNwQjtZQUNJLElBQUksRUFBRSxzQkFBc0I7WUFDdEIsSUFBSTs7b0JBQ04sTUFBTSxDQUFDLEdBQUcsQ0FDTixNQUFNLE1BQU0sQ0FDUiw4Q0FBOEMsUUFBUSxFQUFFLEVBQUUsQ0FDN0QsQ0FDSixDQUFDLE9BQU8sQ0FBQztvQkFDVixPQUFPLENBQUMsQ0FBQztnQkFDYixDQUFDO2FBQUE7U0FDSjtRQUNEO1lBQ0ksSUFBSSxFQUFFLG9CQUFvQjtZQUNwQixJQUFJOztvQkFDTixNQUFNLENBQUMsR0FBRyxDQUNOLE1BQU0sTUFBTSxDQUNSLDBDQUEwQyxRQUFRLEVBQUUsRUFBRSxDQUN6RCxDQUNKLENBQUMsT0FBTyxDQUFDO29CQUNWLE9BQU8sQ0FBQyxDQUFDO2dCQUNiLENBQUM7YUFBQTtTQUNKO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsc0JBQXNCO1lBQ3RCLElBQUk7O29CQUNOLE1BQU0sQ0FBQyxHQUFHLENBQ04sTUFBTSxNQUFNLENBQ1IsOENBQThDLFFBQVEsRUFBRSxFQUFFLENBQzdELENBQ0osQ0FBQyxPQUFPLENBQUM7b0JBQ1YsT0FBTyxDQUFDLENBQUM7Z0JBQ2IsQ0FBQzthQUFBO1NBQ0o7UUFDRCwwQkFBMEI7S0FDN0I7Q0FDSixDQUFDIn0=
