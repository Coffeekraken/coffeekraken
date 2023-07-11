import __SDashboard from './SDashboard.js';
(() => {
    function initDashboard(e) {
        if ((e.key === 's' || e.key === 'y') && e.ctrlKey) {
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
                env: e.key === 'y' ? 'development' : 'production',
            });
            dashboard.open();
        }
    }
    document.addEventListener('keyup', initDashboard);
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLGlCQUFpQixDQUFDO0FBRTNDLENBQUMsR0FBRyxFQUFFO0lBQ0YsU0FBUyxhQUFhLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFO1lBQy9DLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFFckQsWUFBWTtZQUNaLE1BQU0sU0FBUyxHQUFHLElBQUksWUFBWSxDQUFDO2dCQUMvQixNQUFNLEVBQUU7b0JBQ0o7d0JBQ0ksMEJBQTBCO3dCQUMxQix3QkFBd0I7d0JBQ3hCLG9CQUFvQjt3QkFDcEIsb0JBQW9CO3FCQUN2QjtvQkFDRCxDQUFDLDhCQUE4QixDQUFDO2lCQUNuQztnQkFDRCxPQUFPLEVBQUUsRUFBRTtnQkFDWCxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsWUFBWTthQUNwRCxDQUFDLENBQUM7WUFDSCxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDcEI7SUFDTCxDQUFDO0lBRUQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQztBQUN0RCxDQUFDLENBQUMsRUFBRSxDQUFDIn0=