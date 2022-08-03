import __scriptLoaded from '../scriptLoaded';
describe('sugar.js.dom.scriptLoaded', () => {
    document.head.innerHTML = `
    <script type="text/javascript" src="src/data/tests/testing.js"></script>
  `;
    const $elm = document.head.querySelector('script');
    let isLoaded = false, isError = false;
    __scriptLoaded($elm)
        .then(() => {
        isLoaded = true;
    })
        .catch((e) => {
        isError = true;
    });
    it('Should detect the script loading complete state', () => {
        $elm.onload();
        setTimeout(() => {
            expect(isLoaded).toBe(true);
            expect(isError).toBe(false);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sY0FBYyxNQUFNLGlCQUFpQixDQUFDO0FBRzdDLFFBQVEsQ0FBQywyQkFBMkIsRUFBRSxHQUFHLEVBQUU7SUFDekMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUc7O0dBRXpCLENBQUM7SUFDRixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUVuRCxJQUFJLFFBQVEsR0FBRyxLQUFLLEVBQ2xCLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFFbEIsY0FBYyxDQUFDLElBQUksQ0FBQztTQUNqQixJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ1QsUUFBUSxHQUFHLElBQUksQ0FBQztJQUNsQixDQUFDLENBQUM7U0FDRCxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNYLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDakIsQ0FBQyxDQUFDLENBQUM7SUFFTCxFQUFFLENBQUMsaURBQWlELEVBQUUsR0FBRyxFQUFFO1FBQ3pELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNkLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=