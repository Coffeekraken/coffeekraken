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
            container: 'wide',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV0RCxlQUFlO0lBQ1gsS0FBSyxFQUFFO1FBQ0gsMEJBQTBCO1FBQzFCO1lBQ0ksSUFBSSxFQUFFLDBCQUEwQjtZQUMxQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFFOztvQkFDNUIsTUFBTSxPQUFPLEdBQUcsZ0NBQWdDLENBQUM7b0JBRWpELE1BQU0sUUFBUSxHQUFHO3dCQUNiLEtBQUssRUFBRTs0QkFDSCxHQUFHLEVBQUUsT0FBTzs0QkFDWixHQUFHLEVBQUUsRUFBRTs0QkFDUCxLQUFLLEVBQUUsRUFBRTt5QkFDWjt3QkFDRCxVQUFVLEVBQUU7NEJBQ1IsS0FBSyxFQUFFLE1BQU07NEJBQ2IsVUFBVSxFQUFFLElBQUk7NEJBQ2hCLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUs7NEJBQzFDLEtBQUssRUFBRSxTQUFTO3lCQUNuQjt3QkFDRCxLQUFLLEVBQUUsZUFBZTt3QkFDdEIsS0FBSyxFQUFFLGlDQUFpQzt3QkFDeEMsSUFBSSxFQUFFLCtJQUErSTt3QkFDckosR0FBRyxFQUFFOzRCQUNELEtBQUssRUFBRSxrQkFBa0I7NEJBQ3pCLEtBQUssRUFBRSxRQUFROzRCQUNmLElBQUksRUFBRTtnQ0FDRixHQUFHLEVBQUUsbUJBQW1CO2dDQUN4QixNQUFNLEVBQUUsUUFBUTtnQ0FDaEIsS0FBSyxFQUFFLDRCQUE0Qjs2QkFDdEM7eUJBQ0o7cUJBQ0osQ0FBQztvQkFFRixNQUFNLFNBQVMsR0FBYSxFQUFFLENBQUM7b0JBRS9CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7d0JBQ3hCLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDbEQsTUFBTSxNQUFNLEdBQUcsTUFBTSxZQUFZLENBQUMsTUFBTSxDQUNwQyw0QkFBNEIsRUFDNUIsUUFBUSxDQUNYLENBQUM7d0JBQ0YsTUFBTSxVQUFVLEdBQUcsTUFBTSxZQUFZLENBQUMsTUFBTSxDQUN4QyxzQkFBc0IsRUFDdEI7NEJBQ0ksT0FBTyxFQUFFLE1BQU0sQ0FBQyxLQUFLO3lCQUN4QixDQUNKLENBQUM7d0JBRUYsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ3BDO29CQUVELE9BQU87d0JBQ0gsU0FBUyxFQUFFLE1BQU07d0JBQ2pCLGdEQUFnRDt3QkFDaEQsRUFBRSxFQUFFLE9BQU87d0JBQ1gsVUFBVSxFQUFFOzRCQUNSLEtBQUssRUFBRSxlQUFlO3lCQUN6Qjt3QkFDRCxNQUFNLEVBQUU7NEJBQ0osT0FBTyxFQUFFLE9BQU87NEJBQ2hCLE1BQU0sRUFBRSxXQUFXO3lCQUN0Qjt3QkFDRCxPQUFPLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7d0JBQzdCLEdBQUcsRUFBRSxFQUFFO3FCQUNWLENBQUM7Z0JBQ04sQ0FBQzthQUFBO1NBQ0o7UUFDRCw4QkFBOEI7UUFDOUIsb0JBQW9CO1FBQ3BCO1lBQ0ksSUFBSSxFQUFFLHNCQUFzQjtZQUN0QixJQUFJOztvQkFDTixNQUFNLENBQUMsR0FBRyxDQUNOLE1BQU0sTUFBTSxDQUNSLDJDQUEyQyxRQUFRLEVBQUUsRUFBRSxDQUMxRCxDQUNKLENBQUMsT0FBTyxDQUFDO29CQUNWLE9BQU8sQ0FBQyxDQUFDO2dCQUNiLENBQUM7YUFBQTtTQUNKO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsb0JBQW9CO1lBQ3BCLElBQUk7O29CQUNOLE1BQU0sQ0FBQyxHQUFHLENBQ04sTUFBTSxNQUFNLENBQ1IsdUNBQXVDLFFBQVEsRUFBRSxFQUFFLENBQ3RELENBQ0osQ0FBQyxPQUFPLENBQUM7b0JBQ1YsT0FBTyxDQUFDLENBQUM7Z0JBQ2IsQ0FBQzthQUFBO1NBQ0o7UUFDRDtZQUNJLElBQUksRUFBRSxzQkFBc0I7WUFDdEIsSUFBSTs7b0JBQ04sTUFBTSxDQUFDLEdBQUcsQ0FDTixNQUFNLE1BQU0sQ0FDUiwyQ0FBMkMsUUFBUSxFQUFFLEVBQUUsQ0FDMUQsQ0FDSixDQUFDLE9BQU8sQ0FBQztvQkFDVixPQUFPLENBQUMsQ0FBQztnQkFDYixDQUFDO2FBQUE7U0FDSjtRQUNEO1lBQ0ksSUFBSSxFQUFFLDhCQUE4QjtZQUNwQyxJQUFJO2dCQUNBLE9BQU87b0JBQ0gsS0FBSyxFQUFFLHVFQUF1RTtvQkFDOUUsS0FBSyxFQUFFO3dCQUNILEdBQUcsRUFBRSxtQ0FBbUM7d0JBQ3hDLEdBQUcsRUFBRSxFQUFFO3FCQUNWO2lCQUNKLENBQUM7WUFDTixDQUFDO1NBQ0o7UUFDRCwwQkFBMEI7UUFDMUIsSUFBSTtRQUNKLHNDQUFzQztRQUN0QyxxQkFBcUI7UUFDckIsc0JBQXNCO1FBQ3RCLDRCQUE0QjtRQUM1QiwwRUFBMEU7UUFDMUUsZ0JBQWdCO1FBQ2hCLHFCQUFxQjtRQUNyQixvQkFBb0I7UUFDcEIsU0FBUztRQUNULEtBQUs7S0FDUjtDQUNKLENBQUMifQ==
