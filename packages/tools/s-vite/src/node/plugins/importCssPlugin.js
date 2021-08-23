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
            console.log(src);
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
export default importCssPlugin();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0Q3NzUGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW1wb3J0Q3NzUGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWtDQSxTQUFTLGVBQWU7SUFDcEIsT0FBTztRQUNILElBQUksRUFBRSxpQkFBaUI7UUFFdkIsS0FBSyxFQUFFLE9BQU87UUFDZCxPQUFPLEVBQUUsTUFBTTtRQUVmLGtCQUFrQjtRQUNsQiw2QkFBNkI7UUFDN0IsS0FBSztRQUVMLFNBQVMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNiLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLG9DQUFvQyxDQUFDO2dCQUFFLE9BQU87WUFFNUQsdURBQXVEO1lBRXZELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFakIsaUJBQWlCO1lBQ2pCLGlDQUFpQztZQUNqQyx5RUFBeUU7WUFDekUsa0VBQWtFO1lBQ2xFLDRCQUE0QjtZQUM1QixVQUFVO1lBQ1YsSUFBSTtZQUVKLE9BQU87Z0JBQ0gsSUFBSSxFQUFFLEdBQUc7Z0JBQ1QsR0FBRyxFQUFFLElBQUk7YUFDWixDQUFDO1FBQ04sQ0FBQztRQUNELElBQUksQ0FBQyxFQUFFO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNwQixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUM7QUFFRCxlQUFlLGVBQWUsRUFBRSxDQUFDIn0=