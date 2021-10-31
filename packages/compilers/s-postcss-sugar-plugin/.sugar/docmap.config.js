export default (env, config) => {
    if (env.platform !== 'node')
        return;
    return {
        build: {
            exclude: [
                '**/__tests__/**/*',
                '**/__tests__.wip/**/*',
                '**/__wip__/**/*',
                '**/mixins/**/*',
                '**/functions/**/*',
            ],
        },
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jbWFwLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRvY21hcC5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZUFBZSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUMzQixJQUFJLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFDcEMsT0FBTztRQUNILEtBQUssRUFBRTtZQUNILE9BQU8sRUFBRTtnQkFDTCxtQkFBbUI7Z0JBQ25CLHVCQUF1QjtnQkFDdkIsaUJBQWlCO2dCQUNqQixnQkFBZ0I7Z0JBQ2hCLG1CQUFtQjthQUN0QjtTQUNKO0tBQ0osQ0FBQztBQUNOLENBQUMsQ0FBQyJ9