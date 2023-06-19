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
                        's-dashboard-web-vitals',
                        's-dashboard-assets',
                        's-dashboard-google',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLGNBQWMsQ0FBQztBQUV4QyxDQUFDLEdBQUcsRUFBRTtJQUNGLFNBQVMsYUFBYSxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFO1lBQzVCLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFFckQsWUFBWTtZQUNaLE1BQU0sU0FBUyxHQUFHLElBQUksWUFBWSxDQUFDO2dCQUMvQixNQUFNLEVBQUU7b0JBQ0o7d0JBQ0ksMEJBQTBCO3dCQUMxQix3QkFBd0I7d0JBQ3hCLG9CQUFvQjt3QkFDcEIsb0JBQW9CO3FCQUN2QjtvQkFDRCxDQUFDLDhCQUE4QixDQUFDO2lCQUNuQztnQkFDRCxPQUFPLEVBQUUsRUFBRTthQUNkLENBQUMsQ0FBQztZQUNILFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNwQjtJQUNMLENBQUM7SUFFRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBQ3RELENBQUMsQ0FBQyxFQUFFLENBQUMifQ==