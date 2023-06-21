import __SDashboard from './SDashboard';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLGNBQWMsQ0FBQztBQUV4QyxDQUFDLEdBQUcsRUFBRTtJQUNGLFNBQVMsYUFBYSxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRTtZQUMvQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBRXJELFlBQVk7WUFDWixNQUFNLFNBQVMsR0FBRyxJQUFJLFlBQVksQ0FBQztnQkFDL0IsTUFBTSxFQUFFO29CQUNKO3dCQUNJLDBCQUEwQjt3QkFDMUIsd0JBQXdCO3dCQUN4QixvQkFBb0I7d0JBQ3BCLG9CQUFvQjtxQkFDdkI7b0JBQ0QsQ0FBQyw4QkFBOEIsQ0FBQztpQkFDbkM7Z0JBQ0QsT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLFlBQVk7YUFDcEQsQ0FBQyxDQUFDO1lBQ0gsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3BCO0lBQ0wsQ0FBQztJQUVELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFDdEQsQ0FBQyxDQUFDLEVBQUUsQ0FBQyJ9