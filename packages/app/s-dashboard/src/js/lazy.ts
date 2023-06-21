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
