import __backgroundImageLoaded from '../load/backgroundImageLoaded';
import __dispatchEvent from '../event/dispatchEvent';
describe('sugar.js.dom.backgroundImageLoaded', () => {
    document.body.innerHTML = `
    <style>
      .testing {
        background-image: url('/test.jpg');
      }
    </style>
    <div id="testing" class="testing"></div>
  `;
    const $elm = document.querySelector('#testing');
    let isLoaded = false, isError = false;
    const promise = __backgroundImageLoaded($elm)
        .then(() => {
        isLoaded = true;
    })
        .catch((e) => {
        isError = true;
    });
    __dispatchEvent(promise.__$img, 'load');
    it('Should detect the background image loading complete state', () => {
        setTimeout(() => {
            expect(isLoaded).toBe(true);
            expect(isError).toBe(false);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sdUJBQXVCLE1BQU0sK0JBQStCLENBQUM7QUFDcEUsT0FBTyxlQUFlLE1BQU0sd0JBQXdCLENBQUM7QUFFckQsUUFBUSxDQUFDLG9DQUFvQyxFQUFFLEdBQUcsRUFBRTtJQUNsRCxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRzs7Ozs7OztHQU96QixDQUFDO0lBQ0YsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUVoRCxJQUFJLFFBQVEsR0FBRyxLQUFLLEVBQ2xCLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFFbEIsTUFBTSxPQUFPLEdBQUcsdUJBQXVCLENBQUMsSUFBSSxDQUFDO1NBQzFDLElBQUksQ0FBQyxHQUFHLEVBQUU7UUFDVCxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ2xCLENBQUMsQ0FBQztTQUNELEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ1gsT0FBTyxHQUFHLElBQUksQ0FBQztJQUNqQixDQUFDLENBQUMsQ0FBQztJQUVMLGVBQWUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRXhDLEVBQUUsQ0FBQywyREFBMkQsRUFBRSxHQUFHLEVBQUU7UUFDbkUsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==