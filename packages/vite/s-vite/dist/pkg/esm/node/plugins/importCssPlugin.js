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
export default importCssPlugin();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQW9DQSxTQUFTLGVBQWU7SUFDcEIsT0FBTztRQUNILElBQUksRUFBRSxpQkFBaUI7UUFFdkIsS0FBSyxFQUFFLE9BQU87UUFDZCxPQUFPLEVBQUUsTUFBTTtRQUVmLGtCQUFrQjtRQUNsQiw2QkFBNkI7UUFDN0IsS0FBSztRQUVMLFNBQVMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNiLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLG9DQUFvQyxDQUFDO2dCQUFFLE9BQU87WUFFNUQsdURBQXVEO1lBRXZELGlCQUFpQjtZQUNqQixpQ0FBaUM7WUFDakMseUVBQXlFO1lBQ3pFLGtFQUFrRTtZQUNsRSw0QkFBNEI7WUFDNUIsVUFBVTtZQUNWLElBQUk7WUFFSixPQUFPO2dCQUNILElBQUksRUFBRSxHQUFHO2dCQUNULEdBQUcsRUFBRSxJQUFJO2FBQ1osQ0FBQztRQUNOLENBQUM7UUFDRCxJQUFJLENBQUMsRUFBRTtZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEIsQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDO0FBRUQsZUFBZSxlQUFlLEVBQUUsQ0FBQyJ9