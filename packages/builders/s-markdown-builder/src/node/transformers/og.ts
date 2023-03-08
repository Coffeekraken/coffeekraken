import { __scrapeUrl } from '@coffeekraken/sugar/og';

export default {
    reg: /<!-- og:(.*) -->/g,
    async transform(data, target) {
        const og = await __scrapeUrl(data[0]);
        if (!og) {
            return '';
        }

        return `
            <div class="s-card s-width:100 s-mbe:50">
                <figure class="s-card_media s-media-container">
                    <a href="${data[0]}" title="${og.ogTitle}" target="_blank">
                        <img class="s-card_img s-media" src="${og.ogImage.url}" alt="${og.ogTitle}" />
                    </a>
                </figure>
                <div class="s-card_content s-spacing:30">
                    <h1 class="s-card_title s-typo:h3 s-tc:accent">
                        <a class="s-text:decoration:none" href="${data[0]}" title="${og.ogTitle}" target="_blank">
                            ${og.ogTitle}
                        </a>
                    </h1>
                    <p class="s-card_text s-typo:p">
                        ${og.ogDescription}
                    </p>
                    <a class="s-btn s-color:accent" href="${data[0]}" title="${og.ogTitle}" target="_blank">
                        Check out more...
                    </a>
                </div>
            </div>
        `;
    },
};
