"use strict";
const __observeAttributes = require('../observeAttributes');
describe('sugar.js.dom.observeAttributes', () => {
    document.body.innerHTML = `
    <div id="testing"></div>
  `;
    const $elm = document.querySelector('#testing');
    let isMutated = false;
    __observeAttributes($elm).then((mutation) => {
        isMutated = true;
    });
    $elm.setAttribute('hello', 'world');
    it('Should observe the attributes updates correctly', () => {
        setTimeout(() => {
            expect(isMutated).toBe(true);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLG1CQUFtQixHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBRTVELFFBQVEsQ0FBQyxnQ0FBZ0MsRUFBRSxHQUFHLEVBQUU7SUFDOUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUc7O0dBRXpCLENBQUM7SUFDRixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRWhELElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQztJQUV0QixtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtRQUMxQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQ25CLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFFcEMsRUFBRSxDQUFDLGlEQUFpRCxFQUFFLEdBQUcsRUFBRTtRQUN6RCxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==