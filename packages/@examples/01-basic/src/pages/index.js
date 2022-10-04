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
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import { __uniqid } from '@coffeekraken/sugar/string';
export default {
  views: [
    'sections.heading.heading',
    'sections.specs.specs',
    'sections.separator.separator',
    'sections.tabs.tabs',
    {
      path: 'sections.story.story',
      data() {
        return __awaiter(this, void 0, void 0, function* () {
          const d = (yield import(
            `../views/sections/story/story-1.data.js?${__uniqid()}`
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
            `../views/sections/story/story-2.data.js?${__uniqid()}`
          )).default;
          return d;
        });
      },
    },
    {
      path: 'sections.slider.slider',
      data() {
        return __awaiter(this, void 0, void 0, function* () {
          const d = (yield import(
            `../views/sections/slider/slider.data.js?${__uniqid()}`
          )).default;
          return d;
        });
      },
    },
  ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV0RCxlQUFlO0lBQ1gsS0FBSyxFQUFFO1FBQ0gsMEJBQTBCO1FBQzFCLHNCQUFzQjtRQUN0Qiw4QkFBOEI7UUFDOUIsb0JBQW9CO1FBQ3BCO1lBQ0ksSUFBSSxFQUFFLHNCQUFzQjtZQUN0QixJQUFJOztvQkFDTixNQUFNLENBQUMsR0FBRyxDQUNOLE1BQU0sTUFBTSxDQUNSLDJDQUEyQyxRQUFRLEVBQUUsRUFBRSxDQUMxRCxDQUNKLENBQUMsT0FBTyxDQUFDO29CQUNWLE9BQU8sQ0FBQyxDQUFDO2dCQUNiLENBQUM7YUFBQTtTQUNKO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsc0JBQXNCO1lBQ3RCLElBQUk7O29CQUNOLE1BQU0sQ0FBQyxHQUFHLENBQ04sTUFBTSxNQUFNLENBQ1IsMkNBQTJDLFFBQVEsRUFBRSxFQUFFLENBQzFELENBQ0osQ0FBQyxPQUFPLENBQUM7b0JBQ1YsT0FBTyxDQUFDLENBQUM7Z0JBQ2IsQ0FBQzthQUFBO1NBQ0o7UUFDRDtZQUNJLElBQUksRUFBRSx3QkFBd0I7WUFDeEIsSUFBSTs7b0JBQ04sTUFBTSxDQUFDLEdBQUcsQ0FDTixNQUFNLE1BQU0sQ0FDUiwyQ0FBMkMsUUFBUSxFQUFFLEVBQUUsQ0FDMUQsQ0FDSixDQUFDLE9BQU8sQ0FBQztvQkFDVixPQUFPLENBQUMsQ0FBQztnQkFDYixDQUFDO2FBQUE7U0FDSjtLQUNKO0NBQ0osQ0FBQyJ9
