"use strict";
const __imagesLoaded = require('../imagesLoaded');
const __dispatchEvent = require('../dispatchEvent');
describe('sugar.js.dom.imagesLoaded', () => {
    document.head.innerHTML = `
    <img id="image1" src="src/data/tests/testing.jpg" />
    <img id="image2" src="src/data/tests/testing.jpg" />
    <img id="image3" src="src/data/tests/testing.jpg" />
  `;
    const $img1 = document.head.querySelector('#image1');
    const $img2 = document.head.querySelector('#image2');
    const $img3 = document.head.querySelector('#image3');
    let isLoaded = false, isError = false, imgsCount = 0;
    __imagesLoaded([$img1, $img2, $img3])
        .on('img.loaded', (_$img) => {
        imgsCount++;
    })
        .then((arrayImages) => {
        isLoaded = true;
    })
        .catch((e) => {
        isError = true;
    });
    __dispatchEvent($img1, 'load');
    __dispatchEvent($img2, 'load');
    __dispatchEvent($img3, 'load');
    it('Should detect when all the images are loaded correctly', () => {
        setTimeout(() => {
            expect(isLoaded).toBe(true);
            expect(isError).toBe(false);
            expect(imgsCount).toBe(3);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUNsRCxNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUVwRCxRQUFRLENBQUMsMkJBQTJCLEVBQUUsR0FBRyxFQUFFO0lBQ3pDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHOzs7O0dBSXpCLENBQUM7SUFDRixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNyRCxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNyRCxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUVyRCxJQUFJLFFBQVEsR0FBRyxLQUFLLEVBQ2xCLE9BQU8sR0FBRyxLQUFLLEVBQ2YsU0FBUyxHQUFHLENBQUMsQ0FBQztJQUVoQixjQUFjLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ2xDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUMxQixTQUFTLEVBQUUsQ0FBQztJQUNkLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO1FBQ3BCLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDbEIsQ0FBQyxDQUFDO1NBQ0QsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDWCxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBRUwsZUFBZSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMvQixlQUFlLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQy9CLGVBQWUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFFL0IsRUFBRSxDQUFDLHdEQUF3RCxFQUFFLEdBQUcsRUFBRTtRQUNoRSxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1QixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVCLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=