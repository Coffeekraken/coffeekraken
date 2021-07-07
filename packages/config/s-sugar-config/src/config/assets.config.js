export default {
    css: {
        main: {
            id: 'main',
            defer: true,
            src: `[config.storage.serve.cssDir]/index.css`,
            'src@dev': '[config.vite.server.hostname][config.storage.serve.cssDir]/index.css'
        }
    },
    js: {
        module: {
            id: 'module',
            type: 'module',
            defer: true,
            src: '[config.storage.serve.jsDir]/module.es.js',
            'src@dev': '[config.vite.server.hostname][config.storage.serve.jsDir]/index.ts'
        },
        main: {
            id: 'main',
            nomodule: true,
            defer: true,
            src: '[config.storage.serve.jsDir]/index.iife.js',
            'src@dev': undefined
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFzc2V0cy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZUFBZTtJQUNiLEdBQUcsRUFBRTtRQUNILElBQUksRUFBRTtZQUNKLEVBQUUsRUFBRSxNQUFNO1lBQ1YsS0FBSyxFQUFFLElBQUk7WUFDWCxHQUFHLEVBQUUseUNBQXlDO1lBQzlDLFNBQVMsRUFBRSxzRUFBc0U7U0FDbEY7S0FDRjtJQUNELEVBQUUsRUFBRTtRQUNGLE1BQU0sRUFBRTtZQUNOLEVBQUUsRUFBRSxRQUFRO1lBQ1osSUFBSSxFQUFFLFFBQVE7WUFDZCxLQUFLLEVBQUUsSUFBSTtZQUNYLEdBQUcsRUFBRSwyQ0FBMkM7WUFDaEQsU0FBUyxFQUFFLG9FQUFvRTtTQUNoRjtRQUNELElBQUksRUFBRTtZQUNKLEVBQUUsRUFBRSxNQUFNO1lBQ1YsUUFBUSxFQUFFLElBQUk7WUFDZCxLQUFLLEVBQUUsSUFBSTtZQUNYLEdBQUcsRUFBRSw0Q0FBNEM7WUFDakQsU0FBUyxFQUFFLFNBQVM7U0FDckI7S0FDRjtDQUNGLENBQUMifQ==