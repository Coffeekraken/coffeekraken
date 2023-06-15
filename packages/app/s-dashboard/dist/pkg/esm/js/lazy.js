import __SDashboard from './SDashboard';
(() => {
    function initDashboard(e) {
        if (e.key === 's' && e.ctrlKey) {
            document.removeEventListener('keyup', initDashboard);
            // dashboard
            const dashboard = new __SDashboard({
                layout: [
                    [
                        's-dashboard-browserstack',
                        's-dashboard-google',
                        's-dashboard-web-vitals',
                    ],
                    ['s-dashboard-frontend-checker'],
                ],
                widgets: {},
            });
            dashboard.open();
        }
    }
    document.addEventListener('keyup', initDashboard);
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLGNBQWMsQ0FBQztBQUV4QyxDQUFDLEdBQUcsRUFBRTtJQUNGLFNBQVMsYUFBYSxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFO1lBQzVCLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFFckQsWUFBWTtZQUNaLE1BQU0sU0FBUyxHQUFHLElBQUksWUFBWSxDQUFDO2dCQUMvQixNQUFNLEVBQUU7b0JBQ0o7d0JBQ0ksMEJBQTBCO3dCQUMxQixvQkFBb0I7d0JBQ3BCLHdCQUF3QjtxQkFDM0I7b0JBQ0QsQ0FBQyw4QkFBOEIsQ0FBQztpQkFDbkM7Z0JBQ0QsT0FBTyxFQUFFLEVBQUU7YUFDZCxDQUFDLENBQUM7WUFDSCxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDcEI7SUFDTCxDQUFDO0lBRUQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQztBQUN0RCxDQUFDLENBQUMsRUFBRSxDQUFDIn0=