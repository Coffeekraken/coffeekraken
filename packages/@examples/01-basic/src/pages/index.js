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
    {
      path: 'sugar.bare.layout.layout',
      data({ res, viewRenderer }) {
        return __awaiter(this, void 0, void 0, function* () {
          const imgPath = '/dist/img/slider/slide-0%i.jpg';
          const cardData = {
            image: {
              url: imgPath,
              alt: '',
              title: '',
            },
            attributes: {
              class: 'card',
            },
            title: 'Supercharged!',
            intro: 'Up to 18 hours of battery life.',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pharetra libero tincidunt arcu dignissim rhoncus. Vivamus a ipsum eget mauris.',
            cta: {
              label: 'Discover more...',
              color: 'accent',
              link: {
                url: 'https://apple.com',
                target: '_blank',
                title: 'Discover more on apple.com',
              },
            },
          };
          const cardsHtml = [];
          for (let i = 0; i < 3; i++) {
            cardData.image.url = imgPath.replace('%i', i + 1);
            const result = yield viewRenderer.render(
              'sugar.components.card.card',
              cardData
            );
            cardsHtml.push(`<div>
            ${result.value}
          </div>`);
          }
          return {
            container: true,
            frontspec: res.frontspec,
            id: 'cards',
            attributes: {
              class: 'section-specs',
            },
            layout: {
              mobile: '1 _ 2 _ 3',
              desktop: '1 2 3',
            },
            content: cardsHtml.join('\n'),
            gap: 50,
          };
        });
      },
    },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV0RCxlQUFlO0lBQ1gsS0FBSyxFQUFFO1FBQ0gsMEJBQTBCO1FBQzFCO1lBQ0ksSUFBSSxFQUFFLDBCQUEwQjtZQUMxQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFFOztvQkFDNUIsTUFBTSxPQUFPLEdBQUcsZ0NBQWdDLENBQUM7b0JBRWpELE1BQU0sUUFBUSxHQUFHO3dCQUNiLEtBQUssRUFBRTs0QkFDSCxHQUFHLEVBQUUsT0FBTzs0QkFDWixHQUFHLEVBQUUsRUFBRTs0QkFDUCxLQUFLLEVBQUUsRUFBRTt5QkFDWjt3QkFDRCxVQUFVLEVBQUU7NEJBQ1IsS0FBSyxFQUFFLE1BQU07eUJBQ2hCO3dCQUNELEtBQUssRUFBRSxlQUFlO3dCQUN0QixLQUFLLEVBQUUsaUNBQWlDO3dCQUN4QyxJQUFJLEVBQUUsK0lBQStJO3dCQUNySixHQUFHLEVBQUU7NEJBQ0QsS0FBSyxFQUFFLGtCQUFrQjs0QkFDekIsS0FBSyxFQUFFLFFBQVE7NEJBQ2YsSUFBSSxFQUFFO2dDQUNGLEdBQUcsRUFBRSxtQkFBbUI7Z0NBQ3hCLE1BQU0sRUFBRSxRQUFRO2dDQUNoQixLQUFLLEVBQUUsNEJBQTRCOzZCQUN0Qzt5QkFDSjtxQkFDSixDQUFDO29CQUVGLE1BQU0sU0FBUyxHQUFhLEVBQUUsQ0FBQztvQkFFL0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTt3QkFDeEIsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUNsRCxNQUFNLE1BQU0sR0FBRyxNQUFNLFlBQVksQ0FBQyxNQUFNLENBQ3BDLDRCQUE0QixFQUM1QixRQUFRLENBQ1gsQ0FBQzt3QkFDRixTQUFTLENBQUMsSUFBSSxDQUFDO2NBQ3JCLE1BQU0sQ0FBQyxLQUFLO2lCQUNULENBQUMsQ0FBQztxQkFDRjtvQkFFRCxPQUFPO3dCQUNILFNBQVMsRUFBRSxJQUFJO3dCQUNmLFNBQVMsRUFBRSxHQUFHLENBQUMsU0FBUzt3QkFDeEIsRUFBRSxFQUFFLE9BQU87d0JBQ1gsVUFBVSxFQUFFOzRCQUNSLEtBQUssRUFBRSxlQUFlO3lCQUN6Qjt3QkFDRCxNQUFNLEVBQUU7NEJBQ0osTUFBTSxFQUFFLFdBQVc7NEJBQ25CLE9BQU8sRUFBRSxPQUFPO3lCQUNuQjt3QkFDRCxPQUFPLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7d0JBQzdCLEdBQUcsRUFBRSxFQUFFO3FCQUNWLENBQUM7Z0JBQ04sQ0FBQzthQUFBO1NBQ0o7UUFDRCw4QkFBOEI7UUFDOUIsb0JBQW9CO1FBQ3BCO1lBQ0ksSUFBSSxFQUFFLHNCQUFzQjtZQUN0QixJQUFJOztvQkFDTixNQUFNLENBQUMsR0FBRyxDQUNOLE1BQU0sTUFBTSxDQUNSLDJDQUEyQyxRQUFRLEVBQUUsRUFBRSxDQUMxRCxDQUNKLENBQUMsT0FBTyxDQUFDO29CQUNWLE9BQU8sQ0FBQyxDQUFDO2dCQUNiLENBQUM7YUFBQTtTQUNKO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsc0JBQXNCO1lBQ3RCLElBQUk7O29CQUNOLE1BQU0sQ0FBQyxHQUFHLENBQ04sTUFBTSxNQUFNLENBQ1IsMkNBQTJDLFFBQVEsRUFBRSxFQUFFLENBQzFELENBQ0osQ0FBQyxPQUFPLENBQUM7b0JBQ1YsT0FBTyxDQUFDLENBQUM7Z0JBQ2IsQ0FBQzthQUFBO1NBQ0o7UUFDRDtZQUNJLElBQUksRUFBRSx3QkFBd0I7WUFDeEIsSUFBSTs7b0JBQ04sTUFBTSxDQUFDLEdBQUcsQ0FDTixNQUFNLE1BQU0sQ0FDUiwyQ0FBMkMsUUFBUSxFQUFFLEVBQUUsQ0FDMUQsQ0FDSixDQUFDLE9BQU8sQ0FBQztvQkFDVixPQUFPLENBQUMsQ0FBQztnQkFDYixDQUFDO2FBQUE7U0FDSjtLQUNKO0NBQ0osQ0FBQyJ9
