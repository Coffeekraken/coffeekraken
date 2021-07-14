function viteSingleFile() {
    return {
        name: "vite-singlefile",
        transform(src, id, ...args) {
            console.log('SISISI');
            console.log(src, id);
            return src;
            // Only use this plugin during build
            if (!ctx || !ctx.bundle)
                return html;
            // Get the bundle
            let extraCode = "";
            for (const [, value] of Object.entries(ctx.bundle)) {
                const o = value;
                const a = value;
                if (o.code) {
                    const reScript = new RegExp(`<script type="module"[^>]*?src="/${value.fileName}"[^>]*?></script>`);
                    const code = `<script type="module">\n//${o.fileName}\n${o.code}\n</script>`;
                    html = html.replace(reScript, (_) => code);
                }
                else if (value.fileName.endsWith(".css")) {
                    const reCSS = new RegExp(`<link rel="stylesheet"[^>]*?href="/${value.fileName}"[^>]*?>`);
                    const code = `<!-- ${a.fileName} --><style type="text/css">\n${a.source}\n</style>`;
                    html = html.replace(reCSS, (_) => code);
                }
                else {
                    extraCode += "\n<!-- ASSET NOT INLINED: " + a.fileName + " -->\n";
                }
            }
            return html.replace(/<\/body>/, extraCode + "</body>");
        }
    };
}
export default viteSingleFile();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZ2xlRmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNpbmdsZUZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSUEsU0FBUyxjQUFjO0lBQ3RCLE9BQU87UUFDTixJQUFJLEVBQUUsaUJBQWlCO1FBQ3ZCLFNBQVMsQ0FBQyxHQUFXLEVBQUUsRUFBVSxFQUFFLEdBQUcsSUFBSTtZQUV6QyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRXRCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRXJCLE9BQU8sR0FBRyxDQUFDO1lBRVgsb0NBQW9DO1lBQ3BDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTTtnQkFBRSxPQUFPLElBQUksQ0FBQTtZQUNwQyxpQkFBaUI7WUFDakIsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFBO1lBQ2xCLEtBQUssTUFBTSxDQUFDLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ25ELE1BQU0sQ0FBQyxHQUFHLEtBQW9CLENBQUE7Z0JBQzlCLE1BQU0sQ0FBQyxHQUFHLEtBQW9CLENBQUE7Z0JBQzlCLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRTtvQkFDWCxNQUFNLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxvQ0FBb0MsS0FBSyxDQUFDLFFBQVEsbUJBQW1CLENBQUMsQ0FBQTtvQkFDbEcsTUFBTSxJQUFJLEdBQUcsNkJBQTZCLENBQUMsQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDLElBQUksYUFBYSxDQUFBO29CQUM1RSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFBO2lCQUMxQztxQkFBTSxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO29CQUMzQyxNQUFNLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxzQ0FBc0MsS0FBSyxDQUFDLFFBQVEsVUFBVSxDQUFDLENBQUE7b0JBQ3hGLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxDQUFDLFFBQVEsZ0NBQWdDLENBQUMsQ0FBQyxNQUFNLFlBQVksQ0FBQTtvQkFDbkYsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtpQkFDdkM7cUJBQU07b0JBQ04sU0FBUyxJQUFJLDRCQUE0QixHQUFHLENBQUMsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFBO2lCQUNqRTthQUNEO1lBQ0QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxTQUFTLEdBQUcsU0FBUyxDQUFDLENBQUE7UUFDdkQsQ0FBQztLQUNELENBQUE7QUFDRixDQUFDO0FBRUQsZUFBZSxjQUFjLEVBQUUsQ0FBQyJ9