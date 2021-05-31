export default {
    css: {
        main: {
            id: 'main',
            defer: true,
            src: `./dist/css/index.css`,
            'src@dev': '[config.vite.server.hostname]/src/css/index.css'
        }
    },
    js: {
        main: {
            id: 'main',
            type: 'module',
            defer: true,
            src: './dist/js/index.js',
            'src@dev': '[config.vite.server.hostname]/src/js/index.ts'
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFzc2V0cy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZUFBZTtJQUNiLEdBQUcsRUFBRTtRQUNILElBQUksRUFBRTtZQUNKLEVBQUUsRUFBRSxNQUFNO1lBQ1YsS0FBSyxFQUFFLElBQUk7WUFDWCxHQUFHLEVBQUUsc0JBQXNCO1lBQzNCLFNBQVMsRUFBRSxpREFBaUQ7U0FDN0Q7S0FDRjtJQUNELEVBQUUsRUFBRTtRQUNGLElBQUksRUFBRTtZQUNKLEVBQUUsRUFBRSxNQUFNO1lBQ1YsSUFBSSxFQUFFLFFBQVE7WUFDZCxLQUFLLEVBQUUsSUFBSTtZQUNYLEdBQUcsRUFBRSxvQkFBb0I7WUFDekIsU0FBUyxFQUFFLCtDQUErQztTQUMzRDtLQUNGO0NBQ0YsQ0FBQyJ9