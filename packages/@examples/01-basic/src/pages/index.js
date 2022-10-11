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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV0RCxlQUFlO0lBQ2IsS0FBSyxFQUFFO1FBQ0wsMEJBQTBCO1FBQzFCO1lBQ0UsSUFBSSxFQUFFLDBCQUEwQjtZQUMxQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFFOztvQkFDOUIsTUFBTSxPQUFPLEdBQUcsZ0NBQWdDLENBQUM7b0JBRWpELE1BQU0sUUFBUSxHQUFHO3dCQUNmLEtBQUssRUFBRTs0QkFDTCxHQUFHLEVBQUUsT0FBTzs0QkFDWixHQUFHLEVBQUUsRUFBRTs0QkFDUCxLQUFLLEVBQUUsRUFBRTt5QkFDVjt3QkFDRCxVQUFVLEVBQUU7NEJBQ1YsS0FBSyxFQUFFLE1BQU07eUJBQ2Q7d0JBQ0QsS0FBSyxFQUFFLGVBQWU7d0JBQ3RCLEtBQUssRUFBRSxpQ0FBaUM7d0JBQ3hDLElBQUksRUFBRSwrSUFBK0k7d0JBQ3JKLEdBQUcsRUFBRTs0QkFDSCxLQUFLLEVBQUUsa0JBQWtCOzRCQUN6QixLQUFLLEVBQUUsUUFBUTs0QkFDZixJQUFJLEVBQUU7Z0NBQ0osR0FBRyxFQUFFLG1CQUFtQjtnQ0FDeEIsTUFBTSxFQUFFLFFBQVE7Z0NBQ2hCLEtBQUssRUFBRSw0QkFBNEI7NkJBQ3BDO3lCQUNGO3FCQUNGLENBQUM7b0JBRUYsTUFBTSxTQUFTLEdBQWEsRUFBRSxDQUFDO29CQUUvQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO3dCQUMxQixRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQ2xELE1BQU0sTUFBTSxHQUFHLE1BQU0sWUFBWSxDQUFDLE1BQU0sQ0FDdEMsNEJBQTRCLEVBQzVCLFFBQVEsQ0FDVCxDQUFDO3dCQUNGLFNBQVMsQ0FBQyxJQUFJLENBQUM7Y0FDWCxNQUFNLENBQUMsS0FBSztpQkFDVCxDQUFDLENBQUM7cUJBQ1Y7b0JBRUQsT0FBTzt3QkFDTCxTQUFTLEVBQUUsSUFBSTt3QkFDZixnREFBZ0Q7d0JBQ2hELEVBQUUsRUFBRSxPQUFPO3dCQUNYLFVBQVUsRUFBRTs0QkFDVixLQUFLLEVBQUUsZUFBZTt5QkFDdkI7d0JBQ0QsTUFBTSxFQUFFOzRCQUNOLE9BQU8sRUFBRSxPQUFPOzRCQUNoQixNQUFNLEVBQUUsV0FBVzt5QkFDcEI7d0JBQ0QsT0FBTyxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO3dCQUM3QixHQUFHLEVBQUUsRUFBRTtxQkFDUixDQUFDO2dCQUNKLENBQUM7YUFBQTtTQUNGO1FBQ0QsOEJBQThCO1FBQzlCLG9CQUFvQjtRQUNwQjtZQUNFLElBQUksRUFBRSxzQkFBc0I7WUFDdEIsSUFBSTs7b0JBQ1IsTUFBTSxDQUFDLEdBQUcsQ0FDUixNQUFNLE1BQU0sQ0FBQywyQ0FBMkMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUN0RSxDQUFDLE9BQU8sQ0FBQztvQkFDVixPQUFPLENBQUMsQ0FBQztnQkFDWCxDQUFDO2FBQUE7U0FDRjtRQUNEO1lBQ0UsSUFBSSxFQUFFLG9CQUFvQjtZQUNwQixJQUFJOztvQkFDUixNQUFNLENBQUMsR0FBRyxDQUNSLE1BQU0sTUFBTSxDQUFDLHVDQUF1QyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQ2xFLENBQUMsT0FBTyxDQUFDO29CQUNWLE9BQU8sQ0FBQyxDQUFDO2dCQUNYLENBQUM7YUFBQTtTQUNGO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsc0JBQXNCO1lBQ3RCLElBQUk7O29CQUNSLE1BQU0sQ0FBQyxHQUFHLENBQ1IsTUFBTSxNQUFNLENBQUMsMkNBQTJDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FDdEUsQ0FBQyxPQUFPLENBQUM7b0JBQ1YsT0FBTyxDQUFDLENBQUM7Z0JBQ1gsQ0FBQzthQUFBO1NBQ0Y7UUFDRDtZQUNFLElBQUksRUFBRSw4QkFBOEI7WUFDcEMsSUFBSTtnQkFDRixPQUFPO29CQUNMLEtBQUssRUFDSCx1RUFBdUU7b0JBQ3pFLEtBQUssRUFBRTt3QkFDTCxHQUFHLEVBQUUsbUNBQW1DO3dCQUN4QyxHQUFHLEVBQUUsRUFBRTtxQkFDUjtpQkFDRixDQUFDO1lBQ0osQ0FBQztTQUNGO1FBQ0QsMEJBQTBCO1FBQzFCLElBQUk7UUFDSixzQ0FBc0M7UUFDdEMscUJBQXFCO1FBQ3JCLHNCQUFzQjtRQUN0Qiw0QkFBNEI7UUFDNUIsMEVBQTBFO1FBQzFFLGdCQUFnQjtRQUNoQixxQkFBcUI7UUFDckIsb0JBQW9CO1FBQ3BCLFNBQVM7UUFDVCxLQUFLO0tBQ047Q0FDRixDQUFDIn0=
