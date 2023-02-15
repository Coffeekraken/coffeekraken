"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    {
        slugs: ['/api'],
        views: ['pages.api.index'],
    },
    {
        slugs: ['/api/:namespace!'],
        views: [
            {
                data: 'docmapApi',
                path: 'pages.api.api',
            },
        ],
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0JBQWU7SUFDYjtRQUNFLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUNmLEtBQUssRUFBRSxDQUFDLGlCQUFpQixDQUFDO0tBQzNCO0lBQ0Q7UUFDRSxLQUFLLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztRQUMzQixLQUFLLEVBQUU7WUFDTDtnQkFDRSxJQUFJLEVBQUUsV0FBVztnQkFDakIsSUFBSSxFQUFFLGVBQWU7YUFDdEI7U0FDRjtLQUNGO0NBQ0YsQ0FBQyJ9