import __imageLoaded from '../load/imageLoaded';
import __dispatchEvent from '../event/dispatchEvent';
describe('sugar.js.dom.imageLoaded', () => {
    document.head.innerHTML = `
    <img src="src/data/tests/testing.jpg" />
  `;
    const $elm = document.head.querySelector('img');
    let isLoaded = false, isError = false;
    __imageLoaded($elm)
        .then(() => {
        isLoaded = true;
    })
        .catch((e) => {
        isError = true;
    });
    __dispatchEvent($elm, 'load');
    it('Should detect the image loading complete state', () => {
        setTimeout(() => {
            expect(isLoaded).toBe(true);
            expect(isError).toBe(false);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sYUFBYSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sZUFBZSxNQUFNLHdCQUF3QixDQUFDO0FBRXJELFFBQVEsQ0FBQywwQkFBMEIsRUFBRSxHQUFHLEVBQUU7SUFDeEMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUc7O0dBRXpCLENBQUM7SUFDRixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUVoRCxJQUFJLFFBQVEsR0FBRyxLQUFLLEVBQ2xCLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFFbEIsYUFBYSxDQUFDLElBQUksQ0FBQztTQUNoQixJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ1QsUUFBUSxHQUFHLElBQUksQ0FBQztJQUNsQixDQUFDLENBQUM7U0FDRCxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNYLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDakIsQ0FBQyxDQUFDLENBQUM7SUFFTCxlQUFlLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRTlCLEVBQUUsQ0FBQyxnREFBZ0QsRUFBRSxHQUFHLEVBQUU7UUFDeEQsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==