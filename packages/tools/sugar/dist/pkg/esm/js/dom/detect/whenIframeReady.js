// @ts-nocheck
export default function __whenIframeReady($iframe, settings) {
    return new Promise((resolve) => {
        var _a, _b;
        if ((_b = (_a = $iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.document) === null || _b === void 0 ? void 0 : _b.body) {
            return resolve($iframe);
        }
        let int = setInterval(() => {
            var _a, _b;
            if ((_b = (_a = $iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.document) === null || _b === void 0 ? void 0 : _b.body) {
                clearInterval(int);
                resolve(null);
            }
        }, 10);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFvQ2QsTUFBTSxDQUFDLE9BQU8sVUFBVSxpQkFBaUIsQ0FDckMsT0FBMEIsRUFDMUIsUUFBNEM7SUFFNUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFOztRQUMzQixJQUFJLE1BQUEsTUFBQSxPQUFPLENBQUMsYUFBYSwwQ0FBRSxRQUFRLDBDQUFFLElBQUksRUFBRTtZQUN2QyxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUMzQjtRQUNELElBQUksR0FBRyxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUU7O1lBQ3ZCLElBQUksTUFBQSxNQUFBLE9BQU8sQ0FBQyxhQUFhLDBDQUFFLFFBQVEsMENBQUUsSUFBSSxFQUFFO2dCQUN2QyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ25CLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNqQjtRQUNMLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNYLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9