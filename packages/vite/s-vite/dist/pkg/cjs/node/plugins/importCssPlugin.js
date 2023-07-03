"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function importCssPlugin() {
    return {
        name: 'vite-import-css',
        apply: 'build',
        enforce: 'post',
        // resolveId(id) {
        //     console.log('ID', id);
        // },
        transform(src, id) {
            if (!id.match(/\.(js|jsx|ts|tsx|riot|vue|svelte)$/))
                return;
            // const matches = src.match(/import\s?\".*\.css\"/gm);
            // if (matches) {
            //     matches.forEach(match => {
            //         const path = match.replace(/import\s?\"/, '').replace('"','');
            //         const css = __fs.readFileSync(path, 'utf8').toString();
            //         console.log(css);
            //     });
            // }
            return {
                code: src,
                map: null,
            };
        },
        load(id) {
            console.log(id);
        },
    };
}
exports.default = importCssPlugin();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBbUNBLFNBQVMsZUFBZTtJQUNwQixPQUFPO1FBQ0gsSUFBSSxFQUFFLGlCQUFpQjtRQUV2QixLQUFLLEVBQUUsT0FBTztRQUNkLE9BQU8sRUFBRSxNQUFNO1FBRWYsa0JBQWtCO1FBQ2xCLDZCQUE2QjtRQUM3QixLQUFLO1FBRUwsU0FBUyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ2IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsb0NBQW9DLENBQUM7Z0JBQUUsT0FBTztZQUU1RCx1REFBdUQ7WUFFdkQsaUJBQWlCO1lBQ2pCLGlDQUFpQztZQUNqQyx5RUFBeUU7WUFDekUsa0VBQWtFO1lBQ2xFLDRCQUE0QjtZQUM1QixVQUFVO1lBQ1YsSUFBSTtZQUVKLE9BQU87Z0JBQ0gsSUFBSSxFQUFFLEdBQUc7Z0JBQ1QsR0FBRyxFQUFFLElBQUk7YUFDWixDQUFDO1FBQ04sQ0FBQztRQUNELElBQUksQ0FBQyxFQUFFO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNwQixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUM7QUFFRCxrQkFBZSxlQUFlLEVBQUUsQ0FBQyJ9