import { __uniqid } from '@coffeekraken/sugar/string';

export default {
    views: [
        'sections.heading.heading',
        'sections.separator.separator',
        'sections.tabs.tabs',
        {
            path: 'sugar.bare.layout.layout',
            async data({ res, viewRenderer }) {
                const imgPath = '/dist/img/album-0%i.jpg';

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
                        cardData,
                    );
                    cardsHtml.push(`<div s-appear in="bottom" delay="500-1000">
            ${result.value}
          </div>`);
                }

                return {
                    container: 'wide',
                    frontspec: res.frontspec,
                    id: 'cards',
                    attributes: {
                        class: 'section-specs',
                    },
                    layout: {
                        default: '1 2 3',
                        mobile: '1 _ 2 _ 3',
                    },
                    content: cardsHtml.join('\n'),
                    gap: 50,
                };
            },
        },
        {
            path: 'sections.story.story',
            async data() {
                const d = (
                    await import(
                        `../views/sections/story/story-1.data.js?${__uniqid()}`
                    )
                ).default;
                return d;
            },
        },
        {
            path: 'sections.slider.slider',
            async data() {
                const d = (
                    await import(
                        `../views/sections/slider/slider.data.js?${__uniqid()}`
                    )
                ).default;
                return d;
            },
        },
        {
            path: 'sections.story.story',
            async data() {
                const d = (
                    await import(
                        `../views/sections/story/story-2.data.js?${__uniqid()}`
                    )
                ).default;
                return d;
            },
        },
        {
            path: 'sections.separator.separator',
            data() {
                return {
                    title: 'Don\'t be afraid to<br /><span class="s-tc:accent">Contact us</span>!',
                    image: null,
                };
            },
        },
        'sections.contact.contact',
    ],
};
