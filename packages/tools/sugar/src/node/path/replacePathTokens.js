import __packageTmpDir from './packageTmpDir';
import __packageLocalDir from './packageLocalDir';
import __packageCacheDir from './packageCacheDir';
import __packageRootDir from './packageRootDir';
import __srcRootDir from './srcRootDir';
import __distRootDir from './distRootDir';
import __srcJsDir from './srcJsDir';
import __srcCssDir from './srcCssDir';
import __srcDocDir from './srcDocDir';
import __srcFontsDir from './srcFontsDir';
import __srcIconsDir from './srcIconsDir';
import __srcImgDir from './srcImgDir';
import __srcNodeDir from './srcNodeDir';
import __srcViewsDir from './srcViewsDir';
import __distJsDir from './distJsDir';
import __distCssDir from './distCssDir';
import __distDocDir from './distDocDir';
import __distFontsDir from './distFontsDir';
import __distIconsDir from './distIconsDir';
import __distImgDir from './distImgDir';
import __distNodeDir from './distNodeDir';
import __distViewsDir from './distViewsDir';
export default function replacePathTokens(paths, settings) {
    const set = Object.assign({ packageTmpDir: true, packageLocalDir: true, packageCacheDir: true, packageRootDir: true, srcRootDir: true, distRootDir: true, srcJsDir: true, srcCssDir: true, srcDocDir: true, srcFontsDir: true, srcIconsDir: true, srcImgDir: true, srcNodeDir: true, srcViewsDir: true, distJsDir: true, distCssDir: true, distDocDir: true, distFontsDir: true, distIconsDir: true, distImgDir: true, distNodeDir: true, distViewsDir: true }, settings);
    const isArray = Array.isArray(paths);
    if (!isArray)
        paths = [paths];
    const finalPaths = paths.map((path) => {
        if (set.packageTmpDir)
            path = path.replace('%packageTmpDir', __packageTmpDir());
        if (set.packageLocalDir)
            path = path.replace('%packageLocalDir', __packageLocalDir());
        if (set.packageCacheDir)
            path = path.replace('%packageCacheDir', __packageCacheDir());
        if (set.packageRootDir)
            path = path.replace('%packageRootDir', __packageRootDir());
        if (set.srcRootDir)
            path = path.replace('%srcRootDir', __srcRootDir());
        if (set.distRootDir)
            path = path.replace('%distRootDir', __distRootDir());
        if (set.srcJsDir)
            path = path.replace('%srcJsDir', __srcJsDir());
        if (set.srcCssDir)
            path = path.replace('%srcCssDir', __srcCssDir());
        if (set.srcDocDir)
            path = path.replace('%srcDocDir', __srcDocDir());
        if (set.srcFontsDir)
            path = path.replace('%srcFontsDir', __srcFontsDir());
        if (set.srcIconsDir)
            path = path.replace('%srcIconsDir', __srcIconsDir());
        if (set.srcImgDir)
            path = path.replace('%srcImgDir', __srcImgDir());
        if (set.srcNodeDir)
            path = path.replace('%srcNodeDir', __srcNodeDir());
        if (set.srcViewsDir)
            path = path.replace('%srcViewsDir', __srcViewsDir());
        if (set.distJsDir)
            path = path.replace('%distJsDir', __distJsDir());
        if (set.distCssDir)
            path = path.replace('%distCssDir', __distCssDir());
        if (set.distDocDir)
            path = path.replace('%distDocDir', __distDocDir());
        if (set.distFontsDir)
            path = path.replace('%distFontsDir', __distFontsDir());
        if (set.distIconsDir)
            path = path.replace('%distIconsDir', __distIconsDir());
        if (set.distImgDir)
            path = path.replace('%distImgDir', __distImgDir());
        if (set.distNodeDir)
            path = path.replace('%distNodeDir', __distNodeDir());
        if (set.distViewsDir)
            path = path.replace('%distViewsDir', __distViewsDir());
        path = path.replace(/\/\//gm, '/');
        return path;
    });
    if (isArray)
        return finalPaths;
    else
        return finalPaths[0];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbGFjZVBhdGhUb2tlbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXBsYWNlUGF0aFRva2Vucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGVBQWUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5QyxPQUFPLGlCQUFpQixNQUFNLG1CQUFtQixDQUFDO0FBQ2xELE9BQU8saUJBQWlCLE1BQU0sbUJBQW1CLENBQUM7QUFDbEQsT0FBTyxnQkFBZ0IsTUFBTSxrQkFBa0IsQ0FBQztBQUNoRCxPQUFPLFlBQVksTUFBTSxjQUFjLENBQUM7QUFDeEMsT0FBTyxhQUFhLE1BQU0sZUFBZSxDQUFDO0FBRTFDLE9BQU8sVUFBVSxNQUFNLFlBQVksQ0FBQztBQUNwQyxPQUFPLFdBQVcsTUFBTSxhQUFhLENBQUM7QUFDdEMsT0FBTyxXQUFXLE1BQU0sYUFBYSxDQUFDO0FBQ3RDLE9BQU8sYUFBYSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLGFBQWEsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxXQUFXLE1BQU0sYUFBYSxDQUFDO0FBQ3RDLE9BQU8sWUFBWSxNQUFNLGNBQWMsQ0FBQztBQUN4QyxPQUFPLGFBQWEsTUFBTSxlQUFlLENBQUM7QUFFMUMsT0FBTyxXQUFXLE1BQU0sYUFBYSxDQUFDO0FBQ3RDLE9BQU8sWUFBWSxNQUFNLGNBQWMsQ0FBQztBQUN4QyxPQUFPLFlBQVksTUFBTSxjQUFjLENBQUM7QUFDeEMsT0FBTyxjQUFjLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxjQUFjLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxZQUFZLE1BQU0sY0FBYyxDQUFDO0FBQ3hDLE9BQU8sYUFBYSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLGNBQWMsTUFBTSxnQkFBZ0IsQ0FBQztBQStDNUMsTUFBTSxDQUFDLE9BQU8sVUFBVSxpQkFBaUIsQ0FDckMsS0FBSyxFQUNMLFFBQThDO0lBRTlDLE1BQU0sR0FBRyxHQUFHLGdCQUNSLGFBQWEsRUFBRSxJQUFJLEVBQ25CLGVBQWUsRUFBRSxJQUFJLEVBQ3JCLGVBQWUsRUFBRSxJQUFJLEVBQ3JCLGNBQWMsRUFBRSxJQUFJLEVBQ3BCLFVBQVUsRUFBRSxJQUFJLEVBQ2hCLFdBQVcsRUFBRSxJQUFJLEVBQ2pCLFFBQVEsRUFBRSxJQUFJLEVBQ2QsU0FBUyxFQUFFLElBQUksRUFDZixTQUFTLEVBQUUsSUFBSSxFQUNmLFdBQVcsRUFBRSxJQUFJLEVBQ2pCLFdBQVcsRUFBRSxJQUFJLEVBQ2pCLFNBQVMsRUFBRSxJQUFJLEVBQ2YsVUFBVSxFQUFFLElBQUksRUFDaEIsV0FBVyxFQUFFLElBQUksRUFDakIsU0FBUyxFQUFFLElBQUksRUFDZixVQUFVLEVBQUUsSUFBSSxFQUNoQixVQUFVLEVBQUUsSUFBSSxFQUNoQixZQUFZLEVBQUUsSUFBSSxFQUNsQixZQUFZLEVBQUUsSUFBSSxFQUNsQixVQUFVLEVBQUUsSUFBSSxFQUNoQixXQUFXLEVBQUUsSUFBSSxFQUNqQixZQUFZLEVBQUUsSUFBSSxJQUNmLFFBQVEsQ0FDZCxDQUFDO0lBRUYsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxJQUFJLENBQUMsT0FBTztRQUFFLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlCLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNsQyxJQUFJLEdBQUcsQ0FBQyxhQUFhO1lBQ2pCLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUM7UUFDN0QsSUFBSSxHQUFHLENBQUMsZUFBZTtZQUNuQixJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxpQkFBaUIsRUFBRSxDQUFDLENBQUM7UUFDakUsSUFBSSxHQUFHLENBQUMsZUFBZTtZQUNuQixJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxpQkFBaUIsRUFBRSxDQUFDLENBQUM7UUFDakUsSUFBSSxHQUFHLENBQUMsY0FBYztZQUNsQixJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7UUFDL0QsSUFBSSxHQUFHLENBQUMsVUFBVTtZQUFFLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksR0FBRyxDQUFDLFdBQVc7WUFDZixJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQztRQUV6RCxJQUFJLEdBQUcsQ0FBQyxRQUFRO1lBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDakUsSUFBSSxHQUFHLENBQUMsU0FBUztZQUFFLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ3BFLElBQUksR0FBRyxDQUFDLFNBQVM7WUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUNwRSxJQUFJLEdBQUcsQ0FBQyxXQUFXO1lBQ2YsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUM7UUFDekQsSUFBSSxHQUFHLENBQUMsV0FBVztZQUNmLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDO1FBQ3pELElBQUksR0FBRyxDQUFDLFNBQVM7WUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUNwRSxJQUFJLEdBQUcsQ0FBQyxVQUFVO1lBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7UUFDdkUsSUFBSSxHQUFHLENBQUMsV0FBVztZQUNmLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDO1FBRXpELElBQUksR0FBRyxDQUFDLFNBQVM7WUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUNwRSxJQUFJLEdBQUcsQ0FBQyxVQUFVO1lBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7UUFDdkUsSUFBSSxHQUFHLENBQUMsVUFBVTtZQUFFLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksR0FBRyxDQUFDLFlBQVk7WUFDaEIsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUM7UUFDM0QsSUFBSSxHQUFHLENBQUMsWUFBWTtZQUNoQixJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztRQUMzRCxJQUFJLEdBQUcsQ0FBQyxVQUFVO1lBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7UUFDdkUsSUFBSSxHQUFHLENBQUMsV0FBVztZQUNmLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDO1FBQ3pELElBQUksR0FBRyxDQUFDLFlBQVk7WUFDaEIsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUM7UUFFM0QsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ25DLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUMsQ0FBQyxDQUFDO0lBQ0gsSUFBSSxPQUFPO1FBQUUsT0FBTyxVQUFVLENBQUM7O1FBQzFCLE9BQU8sVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzlCLENBQUMifQ==