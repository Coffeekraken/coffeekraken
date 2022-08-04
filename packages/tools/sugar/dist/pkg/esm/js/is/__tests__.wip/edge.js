import { clear, mockUserAgent } from 'jest-useragent-mock';
module.exports = (__testFn) => {
    describe('sugar.js.is.edge', () => {
        afterEach(() => { clear(); });
        mockUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.74 Safari/537.36 Edg/79.0.309.43');
        it('Should detect the passed variable type correctly', () => {
            expect(__testFn()).toBe(true);
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFM0QsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLFFBQVEsRUFBRSxFQUFFO0lBRTVCLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLEVBQUU7UUFFaEMsU0FBUyxDQUFDLEdBQUcsRUFBRSxHQUFHLEtBQUssRUFBRSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsYUFBYSxDQUFDLG9JQUFvSSxDQUFDLENBQUM7UUFFcEosRUFBRSxDQUFDLGtEQUFrRCxFQUFFLEdBQUcsRUFBRTtZQUMxRCxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFFTCxDQUFDLENBQUMsQ0FBQztBQUVMLENBQUMsQ0FBQSJ9