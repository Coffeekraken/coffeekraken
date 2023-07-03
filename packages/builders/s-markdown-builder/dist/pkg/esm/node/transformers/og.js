var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { __scrapeUrl } from '@coffeekraken/sugar/og';
export default {
    reg: /<!-- og:(.*) -->/g,
    transform(data, target) {
        return __awaiter(this, void 0, void 0, function* () {
            const og = yield __scrapeUrl(data[0]);
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
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVyRCxlQUFlO0lBQ1gsR0FBRyxFQUFFLG1CQUFtQjtJQUNsQixTQUFTLENBQUMsSUFBSSxFQUFFLE1BQU07O1lBQ3hCLE1BQU0sRUFBRSxHQUFHLE1BQU0sV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxFQUFFLEVBQUU7Z0JBQ0wsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUVELE9BQU87OzsrQkFHZ0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxPQUFPOytEQUNHLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxVQUFVLEVBQUUsQ0FBQyxPQUFPOzs7OztrRUFLL0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxPQUFPOzhCQUNqRSxFQUFFLENBQUMsT0FBTzs7OzswQkFJZCxFQUFFLENBQUMsYUFBYTs7NERBRWtCLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxFQUFFLENBQUMsT0FBTzs7Ozs7U0FLaEYsQ0FBQztRQUNOLENBQUM7S0FBQTtDQUNKLENBQUMifQ==