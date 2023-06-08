import __SClassmap from '@coffeekraken/s-classmap';
export default function ({ root, sharedData, postcssApi, settings, cacheDir }) {
    // if (!settings.compress?.variables) {
    //     return;
    // }
    const classmap = new __SClassmap();
    classmap.applyOnAst(root);
    classmap.saveSync();
    // console.log(classmap.map);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBRW5ELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFO0lBQ3pFLHVDQUF1QztJQUN2QyxjQUFjO0lBQ2QsSUFBSTtJQUVKLE1BQU0sUUFBUSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7SUFDbkMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsNkJBQTZCO0FBQ2pDLENBQUMifQ==