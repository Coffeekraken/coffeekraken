import __SClassmap from '@coffeekraken/s-classmap';
export default function ({ root, sharedData, postcssApi, settings, cacheDir }) {
    if (!settings.classmap) {
        return;
    }
    const classmap = new __SClassmap();
    classmap.applyOnAst(root);
    classmap.saveSync();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBRW5ELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFO0lBQ3pFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFO1FBQ3BCLE9BQU87S0FDVjtJQUVELE1BQU0sUUFBUSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7SUFDbkMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDeEIsQ0FBQyJ9