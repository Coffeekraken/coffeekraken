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
      path: '@sugar.bare.layout.layout',
      data({ res, viewRenderer }) {
        return __awaiter(this, void 0, void 0, function* () {
          const cardData = {
            title: 'Supercharged!',
            intro: 'Up to 18 hours of battery life.',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pharetra libero tincidunt arcu dignissim rhoncus. Vivamus a ipsum eget mauris.',
            cta: {
              label: 'Discover more...',
              link: {
                url: 'https://apple.com',
                target: '_blank',
                title: 'Discover more on apple.com',
              },
            },
          };
          const cardsHtml = [];
          for (let i = 0; i < 3; i++) {
            const result = yield viewRenderer.render(
              'components.card.card',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV0RCxlQUFlO0lBQ2IsS0FBSyxFQUFFO1FBQ0wsMEJBQTBCO1FBQzFCO1lBQ0UsSUFBSSxFQUFFLDJCQUEyQjtZQUMzQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFFOztvQkFDOUIsTUFBTSxRQUFRLEdBQUc7d0JBQ2YsS0FBSyxFQUFFLGVBQWU7d0JBQ3RCLEtBQUssRUFBRSxpQ0FBaUM7d0JBQ3hDLFdBQVcsRUFDVCwrSUFBK0k7d0JBQ2pKLEdBQUcsRUFBRTs0QkFDSCxLQUFLLEVBQUUsa0JBQWtCOzRCQUN6QixJQUFJLEVBQUU7Z0NBQ0osR0FBRyxFQUFFLG1CQUFtQjtnQ0FDeEIsTUFBTSxFQUFFLFFBQVE7Z0NBQ2hCLEtBQUssRUFBRSw0QkFBNEI7NkJBQ3BDO3lCQUNGO3FCQUNGLENBQUM7b0JBRUYsTUFBTSxTQUFTLEdBQWEsRUFBRSxDQUFDO29CQUUvQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO3dCQUMxQixNQUFNLE1BQU0sR0FBRyxNQUFNLFlBQVksQ0FBQyxNQUFNLENBQ3RDLHNCQUFzQixFQUN0QixRQUFRLENBQ1QsQ0FBQzt3QkFDRixTQUFTLENBQUMsSUFBSSxDQUFDO2NBQ1gsTUFBTSxDQUFDLEtBQUs7aUJBQ1QsQ0FBQyxDQUFDO3FCQUNWO29CQUVELE9BQU87d0JBQ0wsU0FBUyxFQUFFLElBQUk7d0JBQ2YsU0FBUyxFQUFFLEdBQUcsQ0FBQyxTQUFTO3dCQUN4QixFQUFFLEVBQUUsT0FBTzt3QkFDWCxVQUFVLEVBQUU7NEJBQ1YsS0FBSyxFQUFFLGVBQWU7eUJBQ3ZCO3dCQUNELE1BQU0sRUFBRTs0QkFDTixNQUFNLEVBQUUsV0FBVzs0QkFDbkIsT0FBTyxFQUFFLE9BQU87eUJBQ2pCO3dCQUNELE9BQU8sRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzt3QkFDN0IsR0FBRyxFQUFFLEVBQUU7cUJBQ1IsQ0FBQztnQkFDSixDQUFDO2FBQUE7U0FDRjtRQUNELDhCQUE4QjtRQUM5QixvQkFBb0I7UUFDcEI7WUFDRSxJQUFJLEVBQUUsc0JBQXNCO1lBQ3RCLElBQUk7O29CQUNSLE1BQU0sQ0FBQyxHQUFHLENBQ1IsTUFBTSxNQUFNLENBQUMsMkNBQTJDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FDdEUsQ0FBQyxPQUFPLENBQUM7b0JBQ1YsT0FBTyxDQUFDLENBQUM7Z0JBQ1gsQ0FBQzthQUFBO1NBQ0Y7UUFDRDtZQUNFLElBQUksRUFBRSxzQkFBc0I7WUFDdEIsSUFBSTs7b0JBQ1IsTUFBTSxDQUFDLEdBQUcsQ0FDUixNQUFNLE1BQU0sQ0FBQywyQ0FBMkMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUN0RSxDQUFDLE9BQU8sQ0FBQztvQkFDVixPQUFPLENBQUMsQ0FBQztnQkFDWCxDQUFDO2FBQUE7U0FDRjtRQUNEO1lBQ0UsSUFBSSxFQUFFLHdCQUF3QjtZQUN4QixJQUFJOztvQkFDUixNQUFNLENBQUMsR0FBRyxDQUNSLE1BQU0sTUFBTSxDQUFDLDJDQUEyQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQ3RFLENBQUMsT0FBTyxDQUFDO29CQUNWLE9BQU8sQ0FBQyxDQUFDO2dCQUNYLENBQUM7YUFBQTtTQUNGO0tBQ0Y7Q0FDRixDQUFDIn0=
