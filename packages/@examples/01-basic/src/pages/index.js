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
              's-appear': true,
              in: Math.random() > 0.5 ? 'bottom' : 'top',
              delay: '300-600',
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
            const cellResult = yield viewRenderer.render(
              'sugar.bare.cell.cell',
              {
                content: result.value,
              }
            );
            cardsHtml.push(cellResult.value);
          }
          return {
            container: true,
            // frontspec: res.templateData.shared.frontspec,
            id: 'cards',
            attributes: {
              class: 'section-specs',
            },
            layout: {
              desktop: '1 2 3',
              mobile: '1 _ 2 _ 3',
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
      path: 'sections.card.card',
      data() {
        return __awaiter(this, void 0, void 0, function* () {
          const d = (yield import(
            `../views/sections/card/card.data.js?${__uniqid()}`
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
      path: 'sections.separator.separator',
      data() {
        return {
          title:
            'Don\'t be afraid to<br /><span class="s-tc:accent">Contact us</span>!',
          image: {
            url: '/dist/img/macos-wallpaper-02.webp',
            alt: '',
          },
        };
      },
    },
    'sections.contact.contact',
    // {
    //     path: 'sections.slider.slider',
    //     async data() {
    //         const d = (
    //             await import(
    //                 `../views/sections/slider/slider.data.js?${__uniqid()}`
    //             )
    //         ).default;
    //         return d;
    //     },
    // },
  ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV0RCxlQUFlO0lBQ1gsS0FBSyxFQUFFO1FBQ0gsMEJBQTBCO1FBQzFCO1lBQ0ksSUFBSSxFQUFFLDBCQUEwQjtZQUMxQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFFOztvQkFDNUIsTUFBTSxPQUFPLEdBQUcsZ0NBQWdDLENBQUM7b0JBRWpELE1BQU0sUUFBUSxHQUFHO3dCQUNiLEtBQUssRUFBRTs0QkFDSCxHQUFHLEVBQUUsT0FBTzs0QkFDWixHQUFHLEVBQUUsRUFBRTs0QkFDUCxLQUFLLEVBQUUsRUFBRTt5QkFDWjt3QkFDRCxVQUFVLEVBQUU7NEJBQ1IsS0FBSyxFQUFFLE1BQU07NEJBQ2IsVUFBVSxFQUFFLElBQUk7NEJBQ2hCLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUs7NEJBQzFDLEtBQUssRUFBRSxTQUFTO3lCQUNuQjt3QkFDRCxLQUFLLEVBQUUsZUFBZTt3QkFDdEIsS0FBSyxFQUFFLGlDQUFpQzt3QkFDeEMsSUFBSSxFQUFFLCtJQUErSTt3QkFDckosR0FBRyxFQUFFOzRCQUNELEtBQUssRUFBRSxrQkFBa0I7NEJBQ3pCLEtBQUssRUFBRSxRQUFROzRCQUNmLElBQUksRUFBRTtnQ0FDRixHQUFHLEVBQUUsbUJBQW1CO2dDQUN4QixNQUFNLEVBQUUsUUFBUTtnQ0FDaEIsS0FBSyxFQUFFLDRCQUE0Qjs2QkFDdEM7eUJBQ0o7cUJBQ0osQ0FBQztvQkFFRixNQUFNLFNBQVMsR0FBYSxFQUFFLENBQUM7b0JBRS9CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7d0JBQ3hCLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDbEQsTUFBTSxNQUFNLEdBQUcsTUFBTSxZQUFZLENBQUMsTUFBTSxDQUNwQyw0QkFBNEIsRUFDNUIsUUFBUSxDQUNYLENBQUM7d0JBQ0YsTUFBTSxVQUFVLEdBQUcsTUFBTSxZQUFZLENBQUMsTUFBTSxDQUN4QyxzQkFBc0IsRUFDdEI7NEJBQ0ksT0FBTyxFQUFFLE1BQU0sQ0FBQyxLQUFLO3lCQUN4QixDQUNKLENBQUM7d0JBRUYsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ3BDO29CQUVELE9BQU87d0JBQ0gsU0FBUyxFQUFFLElBQUk7d0JBQ2YsZ0RBQWdEO3dCQUNoRCxFQUFFLEVBQUUsT0FBTzt3QkFDWCxVQUFVLEVBQUU7NEJBQ1IsS0FBSyxFQUFFLGVBQWU7eUJBQ3pCO3dCQUNELE1BQU0sRUFBRTs0QkFDSixPQUFPLEVBQUUsT0FBTzs0QkFDaEIsTUFBTSxFQUFFLFdBQVc7eUJBQ3RCO3dCQUNELE9BQU8sRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzt3QkFDN0IsR0FBRyxFQUFFLEVBQUU7cUJBQ1YsQ0FBQztnQkFDTixDQUFDO2FBQUE7U0FDSjtRQUNELDhCQUE4QjtRQUM5QixvQkFBb0I7UUFDcEI7WUFDSSxJQUFJLEVBQUUsc0JBQXNCO1lBQ3RCLElBQUk7O29CQUNOLE1BQU0sQ0FBQyxHQUFHLENBQ04sTUFBTSxNQUFNLENBQ1IsMkNBQTJDLFFBQVEsRUFBRSxFQUFFLENBQzFELENBQ0osQ0FBQyxPQUFPLENBQUM7b0JBQ1YsT0FBTyxDQUFDLENBQUM7Z0JBQ2IsQ0FBQzthQUFBO1NBQ0o7UUFDRDtZQUNJLElBQUksRUFBRSxvQkFBb0I7WUFDcEIsSUFBSTs7b0JBQ04sTUFBTSxDQUFDLEdBQUcsQ0FDTixNQUFNLE1BQU0sQ0FDUix1Q0FBdUMsUUFBUSxFQUFFLEVBQUUsQ0FDdEQsQ0FDSixDQUFDLE9BQU8sQ0FBQztvQkFDVixPQUFPLENBQUMsQ0FBQztnQkFDYixDQUFDO2FBQUE7U0FDSjtRQUNEO1lBQ0ksSUFBSSxFQUFFLHNCQUFzQjtZQUN0QixJQUFJOztvQkFDTixNQUFNLENBQUMsR0FBRyxDQUNOLE1BQU0sTUFBTSxDQUNSLDJDQUEyQyxRQUFRLEVBQUUsRUFBRSxDQUMxRCxDQUNKLENBQUMsT0FBTyxDQUFDO29CQUNWLE9BQU8sQ0FBQyxDQUFDO2dCQUNiLENBQUM7YUFBQTtTQUNKO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsOEJBQThCO1lBQ3BDLElBQUk7Z0JBQ0EsT0FBTztvQkFDSCxLQUFLLEVBQUUsdUVBQXVFO29CQUM5RSxLQUFLLEVBQUU7d0JBQ0gsR0FBRyxFQUFFLG1DQUFtQzt3QkFDeEMsR0FBRyxFQUFFLEVBQUU7cUJBQ1Y7aUJBQ0osQ0FBQztZQUNOLENBQUM7U0FDSjtRQUNELDBCQUEwQjtRQUMxQixJQUFJO1FBQ0osc0NBQXNDO1FBQ3RDLHFCQUFxQjtRQUNyQixzQkFBc0I7UUFDdEIsNEJBQTRCO1FBQzVCLDBFQUEwRTtRQUMxRSxnQkFBZ0I7UUFDaEIscUJBQXFCO1FBQ3JCLG9CQUFvQjtRQUNwQixTQUFTO1FBQ1QsS0FBSztLQUNSO0NBQ0osQ0FBQyJ9
