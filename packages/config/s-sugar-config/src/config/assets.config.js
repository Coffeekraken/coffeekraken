import __sugarConfig from '@coffeekraken/s-sugar-config';
export default {
    css: {
        main: {
            id: 'main',
            defer: true,
            path: `${__sugarConfig('storage.srcDir')}/css/index.css`,
            dev: {
                path: `${__sugarConfig('storage.srcDir')}/css/index.css`
            }
        }
    },
    js: {
        main: {
            id: 'main',
            type: 'module',
            defer: true,
            path: `${__sugarConfig('storage.distDir')}/js/index.js`,
            dev: {
                path: `${__sugarConfig('storage.srcDir')}/js/index.ts`
            }
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFzc2V0cy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxhQUFhLE1BQU0sOEJBQThCLENBQUM7QUFFekQsZUFBZTtJQUNiLEdBQUcsRUFBRTtRQUNILElBQUksRUFBRTtZQUNKLEVBQUUsRUFBRSxNQUFNO1lBQ1YsS0FBSyxFQUFFLElBQUk7WUFDWCxJQUFJLEVBQUUsR0FBRyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCO1lBQ3hELEdBQUcsRUFBRTtnQkFDSCxJQUFJLEVBQUUsR0FBRyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCO2FBQ3pEO1NBQ0Y7S0FDRjtJQUNELEVBQUUsRUFBRTtRQUNGLElBQUksRUFBRTtZQUNKLEVBQUUsRUFBRSxNQUFNO1lBQ1YsSUFBSSxFQUFFLFFBQVE7WUFDZCxLQUFLLEVBQUUsSUFBSTtZQUNYLElBQUksRUFBRSxHQUFHLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjO1lBQ3ZELEdBQUcsRUFBRTtnQkFDSCxJQUFJLEVBQUUsR0FBRyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsY0FBYzthQUN2RDtTQUNGO0tBQ0Y7Q0FDRixDQUFDIn0=