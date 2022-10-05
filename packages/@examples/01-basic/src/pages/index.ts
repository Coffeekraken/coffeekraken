import { __uniqid } from '@coffeekraken/sugar/string';

export default {
  views: [
    'sections.heading.heading',
    {
      path: 'sugar.bare.layout.layout',
      async data({ res, viewRenderer }) {
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

        const cardsHtml: string[] = [];

        for (let i = 0; i < 3; i++) {
          cardData.image.url = imgPath.replace('%i', i + 1);
          const result = await viewRenderer.render(
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
      },
    },
    'sections.separator.separator',
    'sections.tabs.tabs',
    {
      path: 'sections.story.story',
      async data() {
        const d = (
          await import(`../views/sections/story/story-1.data.js?${__uniqid()}`)
        ).default;
        return d;
      },
    },
    {
      path: 'sections.story.story',
      async data() {
        const d = (
          await import(`../views/sections/story/story-2.data.js?${__uniqid()}`)
        ).default;
        return d;
      },
    },
    {
      path: 'sections.slider.slider',
      async data() {
        const d = (
          await import(`../views/sections/slider/slider.data.js?${__uniqid()}`)
        ).default;
        return d;
      },
    },
  ],
};
