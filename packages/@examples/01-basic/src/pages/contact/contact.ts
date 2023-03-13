import { __uniqid } from '@coffeekraken/sugar/string';

export default {
    views: [
        'sections.separator.separator',
        'sections.tabs.tabs',
        {
            path: 'sections.story.story',
            async data() {
                const d = (
                    await import(
                        `../../views/sections/story/story-1.data.js?${__uniqid()}`
                    )
                ).default;
                return d;
            },
        },
        {
            path: 'sections.card.card',
            async data() {
                const d = (
                    await import(
                        `../../views/sections/card/card.data.js?${__uniqid()}`
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
                        `../../views/sections/story/story-2.data.js?${__uniqid()}`
                    )
                ).default;
                return d;
            },
        },
        'sections.contact.contact',
    ],
};
