import { clear, mockUserAgent } from 'jest-useragent-mock';
module.exports = (__testFn) => {
    describe('sugar.js.is.tablet', () => {
        afterEach(() => { clear(); });
        mockUserAgent('Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148');
        it('Should detect the passed variable type correctly', () => {
            expect(__testFn()).toBe(true);
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFM0QsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLFFBQVEsRUFBRSxFQUFFO0lBRTVCLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLEVBQUU7UUFFbEMsU0FBUyxDQUFDLEdBQUcsRUFBRSxHQUFHLEtBQUssRUFBRSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsYUFBYSxDQUFDLHNHQUFzRyxDQUFDLENBQUM7UUFFdEgsRUFBRSxDQUFDLGtEQUFrRCxFQUFFLEdBQUcsRUFBRTtZQUMxRCxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFFTCxDQUFDLENBQUMsQ0FBQztBQUVMLENBQUMsQ0FBQSJ9